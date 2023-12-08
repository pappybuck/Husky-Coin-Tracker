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

		collection, err := dao.FindCollectionByNameOrId("ojln7eb289s9sm4")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("vslhsy5b")

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("ojln7eb289s9sm4")
		if err != nil {
			return err
		}

		// add
		del_Icon := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "vslhsy5b",
			"name": "Icon",
			"type": "file",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"maxSelect": 1,
				"maxSize": 5242880,
				"mimeTypes": [],
				"thumbs": [],
				"protected": false
			}
		}`), del_Icon)
		collection.Schema.AddField(del_Icon)

		return dao.SaveCollection(collection)
	})
}
