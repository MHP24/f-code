import { AdminLayout } from '@/components/layouts';
import { FormInput, UserGrid } from '@/components/ui';
import { usePagination } from '@/hooks';
import { IUser } from '@/interfaces';
import styles from '@/styles/admin/users.module.css';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Inputs {
  search: string;
}

const UsersPage = () => {

  const { register, handleSubmit } = useForm<Inputs>();
  const [inputSearch, setInputSearch] = useState<string>('');

  const data = usePagination<IUser>(`/admin/users/search?query=${inputSearch}`);


  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { search } = data;
    setInputSearch(search);
  };

  return (
    <AdminLayout
      pageDescription='User dashboard'
      title='Users'
      formComponent={
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            placeHolder='Search by username'
            {...register('search', { required: false })}
          />
        </form>}
    >
      <UserGrid {...data} />

    </AdminLayout>
  );
}

export default UsersPage;
