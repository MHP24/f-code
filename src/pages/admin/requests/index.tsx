import { useState } from 'react';
import { AdminLayout } from '@/components/layouts';
import { CreatorChallenge, CreatorChallengeGrid, FormInput } from '@/components/ui';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from '@/styles/admin/requests.module.css';
import { usePagination } from '@/hooks';
import { IChallengeRequestSearch } from '@/interfaces';

interface Inputs {
  slug: string;
}

const RequestsPage = () => {

  const { register, handleSubmit } = useForm<Inputs>();
  const [inputSearch, setInputSearch] = useState<string>('');

  const data = usePagination<IChallengeRequestSearch>(`/admin/challenges/search?slug=${inputSearch}`);

  console.log(data.data);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { slug } = data;
    setInputSearch(slug.trim()
      .replace(/\s+/g, ' ')
      .replace(/\s/g, '_')
      .toLocaleLowerCase()
    );
  };

  return (
    <AdminLayout
      pageDescription='Challenge change Applications'
      title='Requests'
    >
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormInput
          placeHolder='Search...'
          {...register('slug', { required: false })}
        />


      </form>


      <CreatorChallengeGrid {...data} />
    </AdminLayout>
  );
}

export default RequestsPage;
