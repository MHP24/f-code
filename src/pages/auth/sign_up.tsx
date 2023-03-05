import { AuthLayout } from '@/components/layouts';
import { FormInput } from '@/components/ui';
import { NextPage } from 'next';

const signUp: NextPage = () => {
  return (
    <AuthLayout
      title={'Sign Up'}
      pageDescription={'Create a free account in F-Code'}
      image={'sign_up.jpg'}
    >
      <FormInput
        label={'Username'}
        name={'username'}
        placeHolder={'Your username'}
        type={'text'}
      />

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

export default signUp;


