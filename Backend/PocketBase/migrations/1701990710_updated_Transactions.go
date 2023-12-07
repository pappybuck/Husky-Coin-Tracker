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
		edit_Amount := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "bq4cybhi",
			"name": "Amount",
			"type": "number",
			"required": true,
			"presentable": true,
			"unique": false,
			"options": {
				"min": 0,
				"max": null,
				"noDecimal": false
			}
		}`), edit_Amount)
		collection.Schema.AddField(edit_Amount)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("1w3j6mto7k8w21l")
		if err != nil {
			return err
		}

		// update
		edit_Amount := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "bq4cybhi",
			"name": "Amount",
			"type": "number",
			"required": true,
			"presentable": true,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"noDecimal": false
			}
		}`), edit_Amount)
		collection.Schema.AddField(edit_Amount)

		return dao.SaveCollection(collection)
	})
}
