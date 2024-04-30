import fs from "fs";
import path from "path";
import cliProgress from "cli-progress";
import progress from "fetch-progress";
import {Buffer} from "buffer";

export default async function (url: string) {
  const filename = path.basename(url);
  if (!fs.existsSync(filename)) {
    const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    const response = await fetch(url);
    let started = false;
    const blob = await progress({
      onProgress(progress) {
        if (!started) {
          bar.start(progress.total, 0);
          started = true;
        }
        bar.update(progress.transferred);
        if (progress.transferred === progress.total) {
          bar.stop();
        }
      },
    })(response);
    fs.writeFileSync(filename, Buffer.from(await blob.arrayBuffer()));
  }
  return filename;
}
