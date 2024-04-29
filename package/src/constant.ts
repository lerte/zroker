import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let filename = "zrok";
if (process.platform == "win32") {
  filename += ".exe";
}

export const zrokPath = path.resolve(__dirname, "..", "bin", filename);
