package main

import (
	"bytes"
	"context"
	"fmt"
	"net/http"
	"os"
	"os/exec"
	"strings"
	"syscall"

	"github.com/gofiber/fiber/v2/log"
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
	requestBody := []byte(fmt.Sprintf(`{"email": "%s"}`, email))
	resp, err := http.Post("https://api.zrok.io/api/v1/invite", "application/zrok.v1+json", bytes.NewBuffer(requestBody))
	if err != nil {
		log.Error("发送请求时出错:", err)
	}
	defer resp.Body.Close()
	return resp.Status
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


// Zrok
func (a *App) Zrok(args []string) string {
	log.Info("Zrok", args)
	writeToFile("./resources/logs.txt", strings.Join(args, " "))
	zrokCommand := "./resources/zrok.exe"
	command := args[0]
	if command == "enable" {
		cmd := exec.Command(zrokCommand, args...)
		cmd.SysProcAttr = &syscall.SysProcAttr{HideWindow: true}
		// 创建一个缓冲区来保存标准错误输出
		var stderr bytes.Buffer
		cmd.Stderr = &stderr
		// 执行命令
		err := cmd.Run()
		if err != nil {
			// 如果命令执行出错，则打印标准错误输出
			fmt.Println("执行命令时出错:", err)
			fmt.Println("标准错误输出:", stderr.String())
			return stderr.String()
		}
	
		// 如果命令执行成功，则打印标准错误输出
		fmt.Println("标准错误输出:", stderr.String())
	}
	cmd := exec.Command(zrokCommand, args...)
	cmd.SysProcAttr = &syscall.SysProcAttr{HideWindow: true}
	output, _ := cmd.Output()
	return string(output)
}

