package main

import (
	"os/exec"
	"syscall"
)

func zrokCmd(args []string) (*exec.Cmd) {
	zrokBin := "./resources/linux-x64-zrok"
  cmd := exec.Command(zrokBin, args...)
	cmd.SysProcAttr = &syscall.SysProcAttr{Setpgid: true, Pgid: 0}
	return cmd
}