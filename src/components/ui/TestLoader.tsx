import styles from '../styles/testLoader.module.css';
import { Logo } from '.';


export const TestLoader = () => {
  return (
    <div className={`${styles.loaderContainer} animate__animated animate__fadeIn`}>
      <Logo isPrimary={false} size={80} column />
      <div className={styles.barContainer}>
        <div className={styles.barBackground}></div>
        <div className={styles.bar}></div>
      </div>
      <p className={styles.subTitle}>{'Executing tests...'}</p>
    </div>
  );
}
