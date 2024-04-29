import { zrokPath } from "./constant";
import { spawn } from "child_process";

const removeCommand = (options: string) => {
  const commands = options.replace("zrok", "");
  const args = commands.split(" ").filter((item) => item != "");
  return args;
};

const zrok = {
  version: () => {
    return new Promise<string>((resolve, reject) => {
      const zrok = spawn(zrokPath, ["version"]);
      zrok.stdout.on("data", (data: string) => {
        const version = data.toString().match(/v\d+\.\d+\.\d+/)?.[0];
        resolve(version as string);
      });
      zrok.stderr.on("data", (data) => {
        reject(data.toString());
      });
    });
  },
  invite: async (email: string) => {
    const response = await fetch("https://api.zrok.io/api/v1/invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/zrok.v1+json",
      },
      body: JSON.stringify({ email }),
    });
    return response;
  },
  enable: (options: string) => {
    const args = removeCommand(options);
    return new Promise((resolve, reject) => {
      const zrok = spawn(zrokPath, args);
      zrok.stdout.on("data", (data) => {
        resolve(data.toString());
      });
      zrok.stderr.on("data", (data) => {
        reject(data.toString());
      });
    });
  },
  overview: () => {
    return new Promise((resolve, reject) => {
      const zrok = spawn(zrokPath, ["overview"]);
      zrok.stdout.on("data", (data) => {
        resolve(JSON.parse(data));
      });
      zrok.stderr.on("data", (data) => {
        reject(data.toString());
      });
    });
  },
  share: (options: string) => {
    const args = removeCommand(options);
    const child = spawn(zrokPath, args);
    return child;
  },
};

export default zrok;
