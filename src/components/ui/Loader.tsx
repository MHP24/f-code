import styles from '../styles/loader.module.css';


export const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <h3 className={styles.loader}>{'{ f/code }'}</h3>
      <div className={styles.barContainer}>
        <div className={styles.barBackground}></div>
        <div className={styles.bar}></div>
      </div>
      <p className={styles.subTitle}>{'Executing tests...'}</p>
    </div>
  );
}
