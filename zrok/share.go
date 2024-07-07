package zrok

import (
	"github.com/labstack/gommon/log"
	"github.com/openziti/zrok/endpoints"
	"github.com/openziti/zrok/endpoints/proxy"
	"github.com/openziti/zrok/environment"
	"github.com/openziti/zrok/sdk/golang/sdk"
)

func Sharing(shareRequest sdk.ShareRequest) *sdk.Share {
	root, _ := environment.LoadRoot()
	share, err := sdk.CreateShare(root, &sdk.ShareRequest{
		BackendMode: shareRequest.BackendMode,
		ShareMode:   shareRequest.ShareMode,
		Frontends:   []string{"public"},
		Target:      shareRequest.Target,
	})
	if err != nil {
		log.Error("error", err)
	}
	zif, _ := root.ZitiIdentityNamed(root.EnvironmentIdentityName())

	requests := make(chan *endpoints.Request, 1024)

	cfg := &proxy.BackendConfig{
		IdentityPath: zif,
		EndpointAddress: shareRequest.Target,
		ShrToken: share.Token,
		Insecure: false,
		Requests: requests,
	}

	be, _ := proxy.NewBackend(cfg)
	go func() {
		err := be.Run()
		if err != nil {
		  log.Error("error running backedn", err)
		}
	}()


	return share
}
