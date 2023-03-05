import { AuthLayout } from '@/components/layouts';
import { FormInput } from '@/components/ui';
import { NextPage } from 'next';

const signIn: NextPage = () => {
  return (
    <AuthLayout
      title={'Sign in'}
      pageDescription={'Start using your previous account'}
      image={'sign_in.jpg'}
    >

      <FormInput
        label={'E-mail'}
        name={'mail'}
        placeHolder={'example@mail.com'}
        type={'email'}
      />

      <FormInput
        label={'Password'}
        name={'password'}
        placeHolder={'*********'}
        type={'password'}
      />

    </AuthLayout>
  );
}

export default signIn;


