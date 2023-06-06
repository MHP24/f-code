import styles from '@/styles/signDenied.module.css';
import { Logo } from '@/components/ui';
import { useRouter } from 'next/router';

const SignDeniedPage = () => {
  const { query } = useRouter();

  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <Logo
          isPrimary
          size={70}
          column
        />
        <h1 className={styles.title}>{query.error ?? 'Error on sign in'}</h1>
      </div>
    </section>
  )
}

export default SignDeniedPage;
