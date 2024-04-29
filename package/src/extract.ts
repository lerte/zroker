// @ts-ignore
import inly from "inly";
import fs from "fs";
import path from "path";

export default function (filename: string) {
  const cwd = process.cwd();
  const from = path.join(cwd, filename);
  const to = `${cwd}/bin`;
  const extract = inly(from, to);

  return new Promise<boolean>((resolve, reject) => {
    extract.on("progress", (percent: number) => {
      console.log(`extracting...: ${percent}%`);
    });
    extract.on("error", () => {
      reject(false);
    });
    extract.on("end", () => {
      if (process.platform != "win32") {
        fs.chmodSync("/bin/zrok", 0o755);
      }
      resolve(true);
    });
  });
}
