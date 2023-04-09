import { NextPage } from 'next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { regExValidators } from '@/utils';
import { Button, ErrorLabel, FormInput } from '@/components/ui';
import { AuthLayout } from '@/components/layouts';
import styles from '@/styles/auth.module.css';
import { useContext, useState } from 'react';
import { AuthContext } from '@/context';

interface Inputs {
  email: string;
  password: string;
};

const SignIn: NextPage = () => {
  const { loginUser } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const [error, setError] = useState({ hasError: false, message: '' });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { hasError, message = '' } = await loginUser(data);
    if (hasError) {
      setError({ ...error, hasError, message });
      setTimeout(() => {
        setError({ ...error, hasError: false, message: '' });
      }, 5000);
      return;
    }
  };

  return (
    <AuthLayout
      title={'Sign in'}
      pageDescription={'Start using your previous account'}
      image={'sign_in.jpg'}
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
            w={250}
          />
        </div>
      </form>
    </AuthLayout>
  );
}

export default SignIn;


