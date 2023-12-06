package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/tools/types"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("_pb_users_auth_")
		if err != nil {
			return err
		}

		collection.UpdateRule = types.Pointer("id = @request.auth.id")

		options := map[string]any{}
		json.Unmarshal([]byte(`{
			"allowEmailAuth": true,
			"allowOAuth2Auth": true,
			"allowUsernameAuth": true,
			"exceptEmailDomains": null,
			"manageRule": "true = @request.auth.isAdmin",
			"minPasswordLength": 8,
			"onlyEmailDomains": null,
			"requireEmail": false
		}`), &options)
		collection.SetOptions(options)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("_pb_users_auth_")
		if err != nil {
			return err
		}

		collection.UpdateRule = types.Pointer("id = @request.auth.id || true = @request.auth.isAdmin")

		options := map[string]any{}
		json.Unmarshal([]byte(`{
			"allowEmailAuth": true,
			"allowOAuth2Auth": true,
			"allowUsernameAuth": true,
			"exceptEmailDomains": null,
			"manageRule": null,
			"minPasswordLength": 8,
			"onlyEmailDomains": null,
			"requireEmail": false
		}`), &options)
		collection.SetOptions(options)

		return dao.SaveCollection(collection)
	})
}
