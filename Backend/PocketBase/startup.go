package main

import (
	"log"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/forms"
	"github.com/pocketbase/pocketbase/models"
)

func startup(app *pocketbase.PocketBase) {
	collection, err := app.Dao().FindCollectionByNameOrId("DashboardCoins")
	if err != nil {
		log.Println(err)
	}
	record := models.NewRecord(collection)

	form := forms.NewRecordUpsert(app, record)

	form.LoadData(map[string]any{
		"CoinId": "bitcoin",
		"Name":   "Bitcoin",
		"Symbol": "btc",
	})

	if err := form.Submit(); err != nil {
		log.Println(err)
	}

	record = models.NewRecord(collection)

	form = forms.NewRecordUpsert(app, record)

	form.LoadData(map[string]any{
		"CoinId": "ethereum",
		"Name":   "Ethereum",
		"Symbol": "eth",
	})

	if err := form.Submit(); err != nil {
		log.Println(err)
	}

	record = models.NewRecord(collection)

	form = forms.NewRecordUpsert(app, record)

	form.LoadData(map[string]any{
		"CoinId": "cardano",
		"Name":   "Cardano",
		"Symbol": "ada",
	})

	if err := form.Submit(); err != nil {
		log.Println(err)
	}

	record = models.NewRecord(collection)

	form = forms.NewRecordUpsert(app, record)

	form.LoadData(map[string]any{
		"CoinId": "dogecoin",
		"Name":   "Dogecoin",
		"Symbol": "doge",
	})

	if err := form.Submit(); err != nil {
		log.Println(err)
	}

	record = models.NewRecord(collection)

	form = forms.NewRecordUpsert(app, record)

	form.LoadData(map[string]any{
		"CoinId": "litecoin",
		"Name":   "Litecoin",
		"Symbol": "ltc",
	})

	if err := form.Submit(); err != nil {
		log.Println(err)
	}

	record = models.NewRecord(collection)

	form = forms.NewRecordUpsert(app, record)

	form.LoadData(map[string]any{
		"CoinId": "solana",
		"Name":   "Solana",
		"Symbol": "sol",
	})

	if err := form.Submit(); err != nil {
		log.Println(err)
	}

	record = models.NewRecord(collection)

	form = forms.NewRecordUpsert(app, record)

	form.LoadData(map[string]any{
		"CoinId": "tron",
		"Name":   "TRON",
		"Symbol": "trx",
	})

	if err := form.Submit(); err != nil {
		log.Println(err)
	}

}
