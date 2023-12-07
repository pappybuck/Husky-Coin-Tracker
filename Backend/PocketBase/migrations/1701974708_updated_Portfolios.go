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
		edit_user := &schema.SchemaField{}
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
		}`), edit_user)
		collection.Schema.AddField(edit_user)

		// update
		edit_coin := &schema.SchemaField{}
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
		}`), edit_coin)
		collection.Schema.AddField(edit_coin)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("n1quij1kiho46sv")
		if err != nil {
			return err
		}

		// update
		edit_user := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "cuznr7mw",
			"name": "field",
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
		}`), edit_user)
		collection.Schema.AddField(edit_user)

		// update
		edit_coin := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "u5twncay",
			"name": "field1",
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
		}`), edit_coin)
		collection.Schema.AddField(edit_coin)

		return dao.SaveCollection(collection)
	})
}
