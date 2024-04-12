package main

import (
	"bytes"
	"context"
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/gofiber/fiber/v2/log"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"mvdan.cc/xurls/v2"
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

func writeToFile(name string, data string) error {
	f, err := os.OpenFile(name, os.O_CREATE | os.O_APPEND | os.O_WRONLY, 0644)
	if err != nil {
		return err
	}
	defer f.Close()
	_, err = f.WriteString(data+"\n")
	if err != nil {
		return err
	}
	return nil
}

func (a *App) Invite(email string) string {
	status := []string{"status"}
	output, _ := zrokCmd(status).Output()

	xurlsStrict := xurls.Strict()
	find := xurlsStrict.FindAllString(string(output), -1)
	apiEndpoint := find[0]

	requestBody := []byte(fmt.Sprintf(`{"email": "%s"}`, email))
	resp, err := http.Post(apiEndpoint+"/api/v1/invite", "application/zrok.v1+json", bytes.NewBuffer(requestBody))
	if err != nil {
		log.Error("发送请求时出错:", err)
	}
	defer resp.Body.Close()
	return resp.Status
}

func (a *App) Version() string {
	version := []string{"version"}
	output, _ := zrokCmd(version).Output()
	return string(output)
}

func (a *App) Overview() string {
	overview := []string{"overview"}
	output, _ := zrokCmd(overview).Output()
	return string(output)
}

// Zrok
func (a *App) Zrok(args []string) string {
	log.Info("Zrok", args)
	writeToFile("./resources/logs.txt", strings.Join(args, " "))

	cmd := zrokCmd(args)
	// 创建一个缓冲区来保存标准错误输出
	var stdout bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr
	// 执行命令
	err := cmd.Run()
	if err != nil {
		// 如果命令执行出错，则打印标准错误输出
		log.Error("执行命令时出错:", err)
		log.Error("标准错误输出:", stderr.String())
		return stderr.String()
	}
	// 如果命令执行成功，则打印标准输出

	log.Info("标准输出:", stdout.String())
	return stdout.String()
}

