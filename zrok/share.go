package zrok

import (
	"github.com/labstack/gommon/log"
	"github.com/openziti/zrok/environment"
	"github.com/openziti/zrok/sdk/golang/sdk"
)

func Sharing(shareRequest sdk.ShareRequest) *sdk.Share {
	root, _ := environment.LoadRoot()
	share, err := sdk.CreateShare(root, &sdk.ShareRequest{
		BackendMode: shareRequest.BackendMode,
		ShareMode:   shareRequest.ShareMode,
		Frontends:   []string{"public"}, // 不是很懂这个参数
		Target:      shareRequest.Target,
	})
	if err != nil {
		log.Error("error", err)
	}
	log.Info("share", share)
	return share
}
