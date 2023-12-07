package main

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/forms"
	"github.com/pocketbase/pocketbase/models"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
	"github.com/pocketbase/pocketbase/tools/cron"
	"github.com/spf13/cobra"

	_ "coin-tracker/migrations"
)

func main() {
	app := pocketbase.New()

	isGoRun := strings.HasPrefix(os.Args[0], os.TempDir())

	migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
		Automigrate: isGoRun,
	})

	app.RootCmd.AddCommand(&cobra.Command{
		Use: "init",
		Run: func(cmd *cobra.Command, args []string) {
			startup(app)
			UpdateDashboard(app)
		},
	})

	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		scheduler := cron.New()

		scheduler.MustAdd("UpdateDashboard", "*/10 * * * *", func() {
			log.Println("UpdateDashboard")
			UpdateDashboard(app)

		})

		scheduler.Start()

		return nil

	})

	app.OnRecordAfterCreateRequest("users").Add(func(e *core.RecordCreateEvent) error {
		collection, err := app.Dao().FindCollectionByNameOrId("Balances")
		if err != nil {
			log.Println(err)
		}
		record := models.NewRecord(collection)

		form := forms.NewRecordUpsert(app, record)

		form.LoadData(map[string]any{
			"User":    e.Record.Id,
			"Balance": 0,
		})

		if err := form.Submit(); err != nil {
			log.Println(err)
		}

		return nil

	})

	app.OnRecordAfterCreateRequest("Transactions").Add(func(e *core.RecordCreateEvent) error {

		user := e.Record.Get("User").(string)

		records, err := app.Dao().FindRecordsByExpr("Balances", dbx.HashExp{"User": user})
		if err != nil {
			log.Println(err)
		}

		for _, record := range records {
			switch e.Record.Get("Type") {
			case "Deposit":
				record.Set("Balance", record.Get("Balance").(float64)+e.Record.Get("Amount").(float64))
			case "Withdraw":
				if record.Get("Balance").(float64) < e.Record.Get("Amount").(float64) {
					return nil
				} else {
					record.Set("Balance", record.Get("Balance").(float64)-e.Record.Get("Amount").(float64))
				}
			}
			app.Dao().Save(record)
		}

		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}

}

func UpdateDashboard(app *pocketbase.PocketBase) {
	collection, err := app.Dao().FindCollectionByNameOrId("DashboardCoins")
	if err != nil {
		log.Println(err)
	}

	query := app.Dao().RecordQuery(collection)

	records := []*models.Record{}
	if err := query.All(&records); err != nil {
		log.Println(err)
	}

	for _, record := range records {
		response, err := http.Get("https://api.coingecko.com/api/v3/coins/" + record.Get("CoinId").(string))
		if err != nil {
			log.Println(err)
		}
		body, err := io.ReadAll(response.Body)
		if err != nil {
			log.Println(err)
		}

		parsed := map[string]interface{}{}
		if err := json.Unmarshal(body, &parsed); err != nil {
			log.Println(err)
		}

		price := parsed["market_data"].(map[string]interface{})["current_price"].(map[string]interface{})["usd"].(float64)
		hour := parsed["market_data"].(map[string]interface{})["price_change_percentage_1h_in_currency"].(map[string]interface{})["usd"].(float64)
		day := parsed["market_data"].(map[string]interface{})["price_change_percentage_24h"].(float64)
		week := parsed["market_data"].(map[string]interface{})["price_change_percentage_7d"].(float64)
		marketcap := parsed["market_data"].(map[string]interface{})["market_cap"].(map[string]interface{})["usd"].(float64)
		record.Set("Price", price)
		record.Set("Hour", hour)
		record.Set("Day", day)
		record.Set("Week", week)
		record.Set("Marketcap", marketcap)

		log.Println("Updated", record.Get("Name"))

		app.Dao().Save(record)

	}
}
