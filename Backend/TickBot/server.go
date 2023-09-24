package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"math"
	"strconv"
	"time"

	"github.com/gorilla/websocket"
	qdb "github.com/questdb/go-questdb-client"
)

type Message struct {
	Type string `json:"type"`
}

type Ticker struct {
	Type      string    `json:"type"`
	Sequence  int64     `json:"sequence"`
	ProductID string    `json:"product_id"`
	Price     float64   `json:"price"`
	Open24h   float64   `json:"open_24h"`
	Volume24h float64   `json:"volume_24h"`
	Low24h    float64   `json:"low_24h"`
	High24h   float64   `json:"high_24h"`
	Volume30d float64   `json:"volume_30d"`
	BestBid   float64   `json:"best_bid"`
	BestBidS  float64   `json:"best_bid_size"`
	BestAsk   float64   `json:"best_ask"`
	BestAskS  float64   `json:"best_ask_size"`
	Side      string    `json:"side"`
	Time      time.Time `json:"time"`
	TradeID   int64     `json:"trade_id"`
	LastSize  float64   `json:"last_size"`
}

type CandleStick struct {
	ProductID string    `json:"product_id"`
	Open      float64   `json:"open"`
	OpenTime  time.Time `json:"open_time"`
	Close     float64   `json:"close"`
	CloseTime time.Time `json:"close_time"`
	High      float64   `json:"high"`
	Low       float64   `json:"low"`
}

var (
	CandleStickTable = map[string]CandleStick{}
)

func main() {
	ctx := context.TODO()
	sender, err := qdb.NewLineSender(ctx)
	if err != nil {
		log.Fatal(err)
	}
	// Make sure to close the sender on exit to release resources.
	defer sender.Close()

	c, _, err := websocket.DefaultDialer.Dial("wss://ws-feed.exchange.coinbase.com", nil)
	if err != nil {
		log.Fatal("dial:", err)
	}
	defer c.Close()

	sub := []byte(`{
		"type": "subscribe",
		"product_ids": [
			"ETH-USD",
			"BTC-USD"
		],
		"channels": ["ticker"]
	}`)
	err = c.WriteMessage(websocket.TextMessage, sub)
	if err != nil {
		log.Fatal("write:", err)
	}
	fmt.Print("Subscribed\n")

	batch := 0

	for {
		_, message, err := c.ReadMessage()
		if err != nil {
			log.Fatal("read:", err)
			break
		}

		mes := &Message{}
		err = json.Unmarshal(message, mes)
		if err != nil {
			log.Fatal(err)
		}
		if mes.Type != "ticker" {
			fmt.Printf("Not a ticker: %s\n %s\n", mes.Type, message)
			continue
		}

		tick, err := CreateTick(message)

		if err != nil {
			log.Fatal(err)
		}

		UpdateCandleStick(tick)

		err = sender.
			Table("tickers").
			Symbol("product_id", tick.ProductID).
			Symbol("side", tick.Side).
			Int64Column("sequence", tick.Sequence).
			Float64Column("price", tick.Price).
			Float64Column("open_24h", tick.Open24h).
			Float64Column("volume_24h", tick.Volume24h).
			Float64Column("low_24h", tick.Low24h).
			Float64Column("high_24h", tick.High24h).
			Float64Column("volume_30d", tick.Volume30d).
			Float64Column("best_bid", tick.BestBid).
			Float64Column("best_bid_size", tick.BestBidS).
			Float64Column("best_ask", tick.BestAsk).
			Float64Column("best_ask_size", tick.BestAskS).
			Int64Column("trade_id", tick.TradeID).
			Float64Column("last_size", tick.LastSize).
			At(ctx, tick.Time.UnixNano())

		if err != nil {
			log.Fatal(err)
		}
		batch++
		sendTime := time.Now().Minute() - 2
		if sendTime < 0 {
			sendTime += 60
		}
		key := tick.ProductID + strconv.Itoa(sendTime)
		if _, ok := CandleStickTable[key]; ok {
			batch++
			err = sender.
				Table("candlesticks").
				Symbol("product_id", CandleStickTable[key].ProductID).
				Float64Column("open", CandleStickTable[key].Open).
				Float64Column("close", CandleStickTable[key].Close).
				Float64Column("high", CandleStickTable[key].High).
				Float64Column("low", CandleStickTable[key].Low).
				At(ctx, CandleStickTable[key].CloseTime.UnixNano())

			if err != nil {
				log.Fatal(err)
			}
			delete(CandleStickTable, key)
		}
		if batch >= 100 {
			err = sender.Flush(ctx)
			if err != nil {
				log.Fatal(err)
			}
			println("Flushed")
			batch = 0
		}

	}

}

func CreateTick(message []byte) (Ticker, error) {
	bare := map[string]interface{}{}
	err := json.Unmarshal(message, &bare)
	if err != nil {
		return Ticker{}, err
	}
	output := Ticker{}
	output.Type = bare["type"].(string)
	seq := bare["sequence"].(float64)
	output.Sequence = int64(seq)
	output.ProductID = bare["product_id"].(string)
	price, err := strconv.ParseFloat(bare["price"].(string), 64)
	if err != nil {
		return Ticker{}, err
	}
	output.Price = price
	open24h, err := strconv.ParseFloat(bare["open_24h"].(string), 64)
	if err != nil {
		return Ticker{}, err
	}
	output.Open24h = open24h
	volume24h, err := strconv.ParseFloat(bare["volume_24h"].(string), 64)
	if err != nil {
		return Ticker{}, err
	}
	output.Volume24h = volume24h
	low24h, err := strconv.ParseFloat(bare["low_24h"].(string), 64)
	if err != nil {
		return Ticker{}, err
	}
	output.Low24h = low24h
	high24h, err := strconv.ParseFloat(bare["high_24h"].(string), 64)
	if err != nil {
		return Ticker{}, err
	}
	output.High24h = high24h
	volume30d, err := strconv.ParseFloat(bare["volume_30d"].(string), 64)
	if err != nil {
		return Ticker{}, err
	}
	output.Volume30d = volume30d
	bestBid, err := strconv.ParseFloat(bare["best_bid"].(string), 64)
	if err != nil {
		return Ticker{}, err
	}
	output.BestBid = bestBid
	bestBidS, err := strconv.ParseFloat(bare["best_bid_size"].(string), 64)
	if err != nil {
		return Ticker{}, err
	}
	output.BestBidS = bestBidS
	bestAsk, err := strconv.ParseFloat(bare["best_ask"].(string), 64)
	if err != nil {
		return Ticker{}, err
	}
	output.BestAsk = bestAsk
	bestAskS, err := strconv.ParseFloat(bare["best_ask_size"].(string), 64)
	if err != nil {
		return Ticker{}, err
	}
	output.BestAskS = bestAskS
	output.Side = bare["side"].(string)
	time, err := time.Parse(time.RFC3339, bare["time"].(string))
	if err != nil {
		return Ticker{}, err
	}
	output.Time = time
	output.TradeID = int64(bare["trade_id"].(float64))
	lastSize, err := strconv.ParseFloat(bare["last_size"].(string), 64)
	if err != nil {
		return Ticker{}, err
	}
	output.LastSize = lastSize
	return output, nil

}

func UpdateCandleStick(tick Ticker) {

	key := tick.ProductID + strconv.Itoa(tick.Time.Minute())
	nextkey := tick.ProductID
	if tick.Time.Minute() == 59 {
		nextkey += "0"
	} else {
		nextkey += strconv.Itoa(tick.Time.Minute() + 1)
	}

	if _, ok := CandleStickTable[key]; !ok {
		CandleStickTable[key] = CandleStick{
			ProductID: tick.ProductID,
			Open:      tick.Price,
			OpenTime:  tick.Time,
			Close:     tick.Price,
			CloseTime: tick.Time,
			High:      tick.Price,
			Low:       tick.Price,
		}
		CandleStickTable[nextkey] = CandleStick{
			ProductID: tick.ProductID,
			Open:      tick.Price,
			OpenTime:  tick.Time,
			Close:     tick.Price,
			CloseTime: tick.Time,
			High:      math.SmallestNonzeroFloat64,
			Low:       math.MaxFloat64,
		}
		return
	}

	if tick.Price > CandleStickTable[key].High {
		CandleStickTable[key] = CandleStick{
			ProductID: tick.ProductID,
			Open:      CandleStickTable[key].Open,
			OpenTime:  CandleStickTable[key].OpenTime,
			Close:     tick.Price,
			CloseTime: tick.Time,
			High:      tick.Price,
			Low:       CandleStickTable[key].Low,
		}
	} else if tick.Price < CandleStickTable[key].Low {
		CandleStickTable[key] = CandleStick{
			ProductID: tick.ProductID,
			Open:      CandleStickTable[key].Open,
			OpenTime:  CandleStickTable[key].OpenTime,
			Close:     tick.Price,
			CloseTime: tick.Time,
			High:      CandleStickTable[key].High,
			Low:       tick.Price,
		}
	} else {
		CandleStickTable[key] = CandleStick{
			ProductID: tick.ProductID,
			Open:      CandleStickTable[key].Open,
			OpenTime:  CandleStickTable[key].OpenTime,
			Close:     tick.Price,
			CloseTime: tick.Time,
			High:      CandleStickTable[key].High,
			Low:       CandleStickTable[key].Low,
		}
	}
	CandleStickTable[nextkey] = CandleStick{
		ProductID: tick.ProductID,
		Open:      tick.Price,
		OpenTime:  tick.Time,
		Close:     tick.Price,
		CloseTime: tick.Time,
		High:      math.SmallestNonzeroFloat64,
		Low:       math.MaxFloat64,
	}
}
