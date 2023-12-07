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

		collection, err := dao.FindCollectionByNameOrId("n1quij1kiho46sv")
		if err != nil {
			return err
		}

		// update
		edit_User := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "cuznr7mw",
			"name": "User",
			"type": "relation",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"collectionId": "_pb_users_auth_",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": null
			}
		}`), edit_User)
		collection.Schema.AddField(edit_User)

		// update
		edit_Coin := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "u5twncay",
			"name": "Coin",
			"type": "relation",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"collectionId": "ojln7eb289s9sm4",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": null
			}
		}`), edit_Coin)
		collection.Schema.AddField(edit_Coin)

		// update
		edit_Amount := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "ycg9w6q4",
			"name": "Amount",
			"type": "number",
			"required": false,
			"presentable": false,
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

		collection, err := dao.FindCollectionByNameOrId("n1quij1kiho46sv")
		if err != nil {
			return err
		}

		// update
		edit_User := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "cuznr7mw",
			"name": "user",
			"type": "relation",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"collectionId": "_pb_users_auth_",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": null
			}
		}`), edit_User)
		collection.Schema.AddField(edit_User)

		// update
		edit_Coin := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "u5twncay",
			"name": "coin",
			"type": "relation",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"collectionId": "ojln7eb289s9sm4",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": null
			}
		}`), edit_Coin)
		collection.Schema.AddField(edit_Coin)

		// update
		edit_Amount := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "ycg9w6q4",
			"name": "amount",
			"type": "number",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"min": 0,
				"max": null,
				"noDecimal": false
			}
		}`), edit_Amount)
		collection.Schema.AddField(edit_Amount)

		return dao.SaveCollection(collection)
	})
}
