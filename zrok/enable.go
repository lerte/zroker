package zrok

import (
	"fmt"
	"os"

	user2 "os/user"

	"github.com/openziti/zrok/environment"
	"github.com/openziti/zrok/environment/env_core"
	"github.com/openziti/zrok/rest_model_zrok"
	"github.com/shirou/gopsutil/v3/host"

	httptransport "github.com/go-openapi/runtime/client"
	restEnvironment "github.com/openziti/zrok/rest_client_zrok/environment"
)


func Enable(token string) bool {
	env, err := environment.LoadRoot()
	if err != nil {
		fmt.Printf("[zrokEnable] environment LoadRoot failed: %v\n", err)
		return false
	}

	hostName, hostDetail, err := getHost()
	if err != nil {
		fmt.Printf("[zrokEnable] getHost failed: %v\n", err)
		return false
	}
	var username string
	user, err := user2.Current()
	if err != nil {
		username := os.Getenv("USER")
		if username == "" {
			if err != nil {
				fmt.Printf("[zrokEnable] unable to determine the current user: %v\n", err)
				return false
			}
		}
	} else {
		username = user.Username
	}

	zrok, err := env.Client()
	if err != nil {
		fmt.Printf("[zrokEnable] error creating service client %v\n", err)
		return false
	}
	auth := httptransport.APIKeyAuth("X-TOKEN", "header", token)
	req := restEnvironment.NewEnableParams()
	req.Body = &rest_model_zrok.EnableRequest{
		Description: fmt.Sprintf("%v@%v", username, hostName),
		Host:        fmt.Sprintf("%v; %v", username, hostDetail),
	}
	resp, _ := zrok.Environment.Enable(req, auth)
	apiEndpoint, _ := env.ApiEndpoint()
	if err := env.SetEnvironment(&env_core.Environment{Token: token, ZitiIdentity: resp.Payload.Identity, ApiEndpoint: apiEndpoint}); err != nil {
		fmt.Printf("[zrokEnable] there was an error saving the new environment %v\n", err)
		return false
	}
	if err := env.SaveZitiIdentityNamed(env.EnvironmentIdentityName(), resp.Payload.Cfg); err != nil {
		fmt.Printf("[zrokEnable] there was an error writing the new environment %v\n", err)
		return false
	}

	fmt.Printf("[zrokEnable] environment was successfully enabled\n")
	return true
}


func getHost() (string, string, error) {
	info, err := host.Info()
	if err != nil {
		return "", "", err
	}
	thisHost := fmt.Sprintf("%v; %v; %v; %v; %v; %v; %v",
		info.Hostname, info.OS, info.Platform, info.PlatformFamily, info.PlatformVersion, info.KernelVersion, info.KernelArch)
	return info.Hostname, thisHost, nil
}
