import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AdminLayout } from '@/components/layouts';
import { usePagination } from '@/hooks';
import { ISearchCreatorRequest } from '@/interfaces';
import { ApplicationsGrid, FormInput } from '@/components/ui';
import styles from '@/styles/admin/applications.module.css';

interface Inputs {
  search: string;
}

const ApplicationsPage = () => {

  const { register, handleSubmit } = useForm<Inputs>();
  const [inputSearch, setInputSearch] = useState<string>('');

  const data = usePagination<ISearchCreatorRequest>(`/admin/applications/search?query=${inputSearch}`);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { search } = data;
    setInputSearch(search.trim());
  };

  return (
    <AdminLayout
      pageDescription='Creator applications dashboard'
      title='Applications'
      formComponent={
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            placeHolder='Search by application ID'
            {...register('search', { required: false })}
          />
        </form>
      }
    >
      <ApplicationsGrid {...data} />

    </AdminLayout>
  );
}

export default ApplicationsPage;