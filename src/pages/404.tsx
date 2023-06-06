import styles from '@/styles/404.module.css';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className={styles.noPage}>
      <p className={styles.notFound}>{'404'}</p>
      <p className={styles.notFoundText}>{`We couldn't find the page`}</p>
      <Link href={'/'} className={styles.link}>Return to Home</Link>
    </div>
  );
}

export default NotFound;
