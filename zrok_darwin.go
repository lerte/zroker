package main

import (
	"fmt"
	"os/exec"
	"runtime"
	"syscall"
)

func zrokCmd(args []string) (*exec.Cmd) {
	zrokBin := fmt.Sprintf("./resources/darwin-%s-zrok", runtime.GOARCH)
  cmd := exec.Command(zrokBin, args...)
	cmd.SysProcAttr = &syscall.SysProcAttr{Setpgid: true, Pgid: 0}
	return cmd
}