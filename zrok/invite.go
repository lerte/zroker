package zrok

import (
	"bytes"
	"fmt"
	"net/http"

	"github.com/labstack/gommon/log"
	"github.com/openziti/zrok/environment"
)

func Invite(email string) string {
	root, _ := environment.LoadRoot()
	apiEndpoint, _ := root.ApiEndpoint()

	requestBody := []byte(fmt.Sprintf(`{"email": "%s"}`, email))
	resp, err := http.Post(apiEndpoint+"/api/v1/invite", "application/zrok.v1+json", bytes.NewBuffer(requestBody))
	if err != nil {
		log.Error("发送请求时出错:", err)
	}
	defer resp.Body.Close()
	return resp.Status
}