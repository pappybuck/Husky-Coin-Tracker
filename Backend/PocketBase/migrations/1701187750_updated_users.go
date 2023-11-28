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

		collection, err := dao.FindCollectionByNameOrId("_pb_users_auth_")
		if err != nil {
			return err
		}

		// add
		new_location := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "icpfqeko",
			"name": "location",
			"type": "text",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), new_location)
		collection.Schema.AddField(new_location)

		// add
		new_bio := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "yclfhrmz",
			"name": "bio",
			"type": "text",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), new_bio)
		collection.Schema.AddField(new_bio)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("_pb_users_auth_")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("icpfqeko")

		// remove
		collection.Schema.RemoveField("yclfhrmz")

		return dao.SaveCollection(collection)
	})
}
