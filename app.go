package main

import (
	"context"
	"net/http"
	"runtime/debug"
	"zroker/zrok"

	"github.com/openziti/zrok/environment"
	"github.com/openziti/zrok/sdk/golang/sdk"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}


// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) Minimize() {
	runtime.WindowMinimise(a.ctx)
}

func (a *App) Maximize() {
	if runtime.WindowIsMaximised(a.ctx) {
		runtime.WindowUnmaximise(a.ctx)
	} else{
		runtime.WindowMaximise(a.ctx)
	}
}

func (a *App) Quit() {
	runtime.Quit(a.ctx)
}

func (a *App) ChooseFolder() (string, error) {
	folder,_  :=  runtime.OpenDirectoryDialog(a.ctx, runtime.OpenDialogOptions{
		Title: "Choose a folder",
	})
	return folder,nil
}

func (a *App) Invite(email string) string {
	return zrok.Invite(email)
}

func (a *App) IsEnable() bool {
	root, _ := environment.LoadRoot()
	return root.IsEnabled()
}

func (a *App) Enable(token string) bool {
	return zrok.Enable(token)
}

func (a *App) Disable() bool {
	_,err := environment.LoadRoot()
	return err == nil
}


func (a *App) DeleteShare(share *sdk.Share) bool {
	root,_ := environment.LoadRoot()
	err := sdk.DeleteShare(root, share)
	return err == nil
}

func (a *App) Version() string {
	bi,ok := debug.ReadBuildInfo()
	if ok {
		for _, dep := range bi.Deps {
			if(dep.Path == "github.com/openziti/zrok") {
				return dep.Version
			}
		}
	}
	return "unknown"
}

func (a *App) Overview() string {
	root, err := environment.LoadRoot()
	if err != nil {
		return "error"
	}
	overview,_ := sdk.Overview(root)
	return overview
}

func (a *App) Sharing(shareRequest sdk.ShareRequest) *sdk.Share {
	return zrok.Sharing(shareRequest)
}

// Open link in browser
func (a *App) OpenExternal(link string) {
	runtime.BrowserOpenURL(a.ctx, link)
}

// Request Url
func (a *App) Request(url string) int {

	resp,_ := http.Get(url+"/api/v1/invite")

	return resp.StatusCode
}

