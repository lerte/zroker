import styles from "./styles.module.css";

export default function DownloadSections(): JSX.Element {
  const version = "v0.0.1";
  const windowUrl = `https://github.com/lerte/zroker/releases/download/${version}/Wails.Build.Windows.Zroker.zip`;
  const macosUrl = `https://github.com/lerte/zroker/releases/download/${version}/Wails.Build.macOS.Zroker.zip`;
  const linuxUrl = `https://github.com/lerte/zroker/releases/download/${version}/Wails.Build.Linux.Zroker.zip`;

  return (
    <section className={styles.downloads}>
      <div className="container">
        <div className="row">
          <div className="col col--4 text--center">
            <a
              download
              href={windowUrl}
            >
              <button className="button button--lg button--success">
                Windows
              </button>
            </a>
          </div>
          <div className="col col--4 text--center">
            <a
              download
              href={macosUrl}
            >
              <button className="button button--lg button--info">macOS</button>
            </a>
          </div>
          <div className="col col--4 text--center">
            <a
              download
              href={linuxUrl}
            >
              <button className="button button--lg button--warning">
                Linux
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
