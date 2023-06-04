import { GetServerSideProps, NextPage } from 'next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { regExValidators } from '@/utils';
import { Button, ErrorLabel, FormInput } from '@/components/ui';
import { AuthLayout } from '@/components/layouts';
import styles from '@/styles/auth.module.css';
import { getSession, signIn } from 'next-auth/react';

interface Inputs {
  email: string;
  password: string;
};

const SignIn: NextPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;
    try {
      await signIn('credentials', { email: `${email}@fcode`, password });
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <AuthLayout
      title={'Sign in'}
      pageDescription={'Start using your previous account'}
      image={'sign_in.jpg'}
    >
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <FormInput
            label={'E-mail'}
            placeHolder={'example@mail.com'}
            type={'email'}
            {...register('email', { pattern: regExValidators.email, required: true })}
          />
          {errors.email?.type === 'required' && <ErrorLabel text={'This field is required'} />}
          {errors.email?.type === 'pattern' && <ErrorLabel text={'Invalid email format'} />}
        </div>

        <div>
          <FormInput
            label={'Password'}
            placeHolder={'*********'}
            type={'password'}
            {...register('password', { pattern: regExValidators.securePassword, required: true })}
          />
          {errors.password && <ErrorLabel text={'Invalid password'} />}
        </div>
        <div className={styles.formBtn}>
          <Button
            text={'Sign in'}
            size={1.1}
          />
        </div>
      </form>
    </AuthLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  return { props: {} };
}

export default SignIn;


