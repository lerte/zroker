import chalk from "chalk";
import extract from "./extract";
import download from "./download";

const getDownladUrl = async () => {
  let downloadUrl = "https://github.com/openziti/zrok/releases/download/";
  const response = await fetch(
    "https://api.github.com/repos/openziti/zrok/releases/latest"
  );
  const { tag_name }: { tag_name: string } = await response.json();
  const version = tag_name.replace("v", "");

  const { platform, arch } = process;
  if (platform == "win32") {
    downloadUrl += `${tag_name}/zrok_${version}_windows_amd64.tar.gz`;
  } else if (arch == "x64") {
    downloadUrl += `${tag_name}/zrok_${version}_${platform}_amd64.tar.gz`;
  } else {
    downloadUrl += `${tag_name}/zrok_${version}_${platform}_amd64.tar.gz`;
  }
  return downloadUrl;
};

(async () => {
  const downloadUrl = await getDownladUrl();
  const filename = await download(downloadUrl);
  const result = await extract(filename);
  if (result) {
    console.log(chalk.bgGreen("Congratulation!"));
  } else {
    console.error(chalk.bgRed("Download failed!"));
  }
})();
