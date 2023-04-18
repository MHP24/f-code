import { NextPage, GetServerSideProps } from 'next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthLayout } from '@/components/layouts';
import { Button, ErrorLabel, FormInput } from '@/components/ui';
import { regExValidators } from '@/utils';
import styles from '@/styles/auth.module.css';
import { useContext, useState } from 'react';
import { AuthContext } from '@/context';
import { getSession, signIn } from 'next-auth/react';

interface Inputs {
  username: string;
  email: string;
  password: string;
};

const SignUp: NextPage = () => {
  const { registerUser } = useContext(AuthContext);
  const [error, setError] = useState({ hasError: false, message: '' });
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();


  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { hasError, message = '' } = await registerUser(data);
    if (hasError) {
      setError({ ...error, hasError, message });
      setTimeout(() => {
        setError({ ...error, hasError: false, message: '' });
      }, 5000);
      return;
    }

    const { email, password } = data;
    await signIn('credentials', { email, password });
  };

  return (
    <AuthLayout
      title={'Sign Up'}
      pageDescription={'Create a free account in F-Code'}
      image={'sign_up.jpg'}
    >
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>

        {
          error.hasError &&
          <div className={styles.errorContainer}>
            <p className={styles.errorMessage}>{error.message}</p>
          </div>
        }

        <div>
          <FormInput
            label={'Username'}
            placeHolder={'Your username'}
            type={'text'}
            {...register('username', { pattern: regExValidators.charactersAndNumbersOnly, required: true })}
          />
          {errors.username?.type === 'required' && <ErrorLabel text={'This field is required'} />}
          {errors.username?.type === 'pattern' && <ErrorLabel text={'Invalid username'} />}
        </div>

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
          {errors.password?.type === 'required' && <ErrorLabel text={'This field is required'} />}
          {errors.password?.type === 'pattern' && <ErrorLabel text={'Weak password (examplePassword2023#FCode)'} />}
        </div>
        <div className={styles.formBtn}>
          <Button
            disabled={error.hasError}
            text={'Sign up'}
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

export default SignUp;