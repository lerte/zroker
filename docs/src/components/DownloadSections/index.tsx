import styles from "./styles.module.css";

export default function DownloadSections(): JSX.Element {
  return (
    <section className={styles.downloads}>
      <div className="container">
        <div className="row">
          <div className="col col--4 text--center">
            <button className="button button--lg button--success">
              Windows
            </button>
          </div>
          <div className="col col--4 text--center">
            <button className="button button--lg button--info">macOS</button>
          </div>
          <div className="col col--4 text--center">
            <button className="button button--lg button--warning">Linux</button>
          </div>
        </div>
      </div>
    </section>
  );
}
