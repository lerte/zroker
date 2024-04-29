import fs from "fs";
import path from "path";
import https from "https";
import cliProgress from "cli-progress";

export default function (url: string) {
  const filename = path.basename(url);
  if (fs.existsSync(filename)) {
    return filename;
  }

  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  let body = "";
  let cur = 0;

  return new Promise<string>((resolve, _reject) => {
    https.get(`${url}?${Date.now()}`, (res) => {
      const fileStream = fs.createWriteStream(filename);
      res.pipe(fileStream);

      const total = parseInt(res.headers["content-length"]!, 10);
      bar.start(total, 0);

      res.on("data", (chunk) => {
        body += chunk;
        cur += chunk.length;
        bar.update(cur);
      });

      fileStream.on("finish", () => {
        fileStream.close();
        bar.stop();
        resolve(filename);
      });
    });
  });
}
