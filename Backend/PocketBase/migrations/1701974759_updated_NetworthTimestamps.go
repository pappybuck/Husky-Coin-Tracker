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

		collection, err := dao.FindCollectionByNameOrId("ihnba1l55qzdma1")
		if err != nil {
			return err
		}

		// update
		edit_User := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "ksgds9hk",
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
		edit_Networth := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "ziuftmnc",
			"name": "Networth",
			"type": "number",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"min": 0,
				"max": null,
				"noDecimal": false
			}
		}`), edit_Networth)
		collection.Schema.AddField(edit_Networth)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("ihnba1l55qzdma1")
		if err != nil {
			return err
		}

		// update
		edit_User := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "ksgds9hk",
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
		}`), edit_User)
		collection.Schema.AddField(edit_User)

		// update
		edit_Networth := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "ziuftmnc",
			"name": "networth",
			"type": "number",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"min": 0,
				"max": null,
				"noDecimal": false
			}
		}`), edit_Networth)
		collection.Schema.AddField(edit_Networth)

		return dao.SaveCollection(collection)
	})
}
