package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models/schema"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("1w3j6mto7k8w21l")
		if err != nil {
			return err
		}

		// update
		edit_Type := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "tktmlgtd",
			"name": "Type",
			"type": "select",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"maxSelect": 1,
				"values": [
					"Deposit",
					"Withdraw",
					"Buy",
					"Sell"
				]
			}
		}`), edit_Type)
		collection.Schema.AddField(edit_Type)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("1w3j6mto7k8w21l")
		if err != nil {
			return err
		}

		// update
		edit_Type := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "tktmlgtd",
			"name": "Type",
			"type": "select",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"maxSelect": 1,
				"values": [
					"Deposit",
					"Withdrawl",
					"Buy",
					"Sell"
				]
			}
		}`), edit_Type)
		collection.Schema.AddField(edit_Type)

		return dao.SaveCollection(collection)
	})
}
