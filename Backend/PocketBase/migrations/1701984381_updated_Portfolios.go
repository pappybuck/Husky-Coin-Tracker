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

		collection, err := dao.FindCollectionByNameOrId("n1quij1kiho46sv")
		if err != nil {
			return err
		}

		collection.CreateRule = nil

		collection.UpdateRule = nil

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("n1quij1kiho46sv")
		if err != nil {
			return err
		}

		collection.CreateRule = types.Pointer("User.id = @request.auth.id || true = @request.auth.isAdmin")

		collection.UpdateRule = types.Pointer("User.id = @request.auth.id || true = @request.auth.isAdmin")

		return dao.SaveCollection(collection)
	})
}
