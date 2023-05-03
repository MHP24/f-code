import Image from 'next/image';
import styles from '../styles/noResults.module.css';

export const NoResults = () => {
  return (
    <div className={styles.noResults}>
      <Image
        src={'/illustrations/no-results.svg'}
        width={140}
        height={140}
        alt='no results'
      />
      <p className={styles.description}>No results found...</p>
    </div>
  );
}
