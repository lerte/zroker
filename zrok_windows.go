package main

import (
	"os/exec"
	"syscall"
)

func zrokCmd(args []string) (*exec.Cmd) {
	zrokBin := "./resources/zrok.exe"
  cmd := exec.Command(zrokBin, args...)
	cmd.SysProcAttr = &syscall.SysProcAttr{HideWindow: true}
	return cmd
}