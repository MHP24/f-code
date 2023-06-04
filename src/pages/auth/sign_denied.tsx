import styles from '@/styles/signDenied.module.css';
import { Logo } from '@/components/ui';

const SignDeniedPage = () => {

  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <Logo
          isPrimary
          size={70}
          column
        />
        <h1 className={styles.title}>You are permanently banned from FCode</h1>
      </div>
    </section>
  )
}

export default SignDeniedPage;
