import styles from '../styles/testLoader.module.css';
import { Logo } from '.';


export const TestLoader = () => {
  return (
    <div className={styles.loaderContainer}>
      {/* <h3 className={styles.loader}>{'{ f/code }'}</h3> */}
      <Logo isPrimary={false} size={80} column/>
      <div className={styles.barContainer}>
        <div className={styles.barBackground}></div>
        <div className={styles.bar}></div>
      </div>
      <p className={styles.subTitle}>{'Executing tests...'}</p>
    </div>
  );
}
