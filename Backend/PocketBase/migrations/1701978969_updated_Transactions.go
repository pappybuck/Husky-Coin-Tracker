package migrations

import (
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/tools/types"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("1w3j6mto7k8w21l")
		if err != nil {
			return err
		}

		collection.CreateRule = types.Pointer("User.id = @request.auth.id || true = @request.auth.isAdmin")

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("1w3j6mto7k8w21l")
		if err != nil {
			return err
		}

		collection.CreateRule = types.Pointer("")

		return dao.SaveCollection(collection)
	})
}
