import { AdminLayout } from '@/components/layouts';
import { FormInput, AdminChallengesGrid } from '@/components/ui';
import { usePagination } from '@/hooks';
import { IChallengeSearch } from '@/interfaces';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from '@/styles/admin/challenges.module.css';

interface Inputs {
  slug: string;
}

const ChallengesAdminPage = () => {


  const { register, handleSubmit } = useForm<Inputs>();
  const [inputSearch, setInputSearch] = useState<string>('');

  const data = usePagination<IChallengeSearch>(`/challenges/search?slug=${inputSearch}`);

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
      pageDescription='Admin, challenges dashboard'
      title='Challenges'
      formComponent={
        <div>
          <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormInput
              placeHolder='Search...'
              {...register('slug', { required: false })}
            />
          </form>
        </div>
      }
    >



      <AdminChallengesGrid {...data} />
    </AdminLayout>
  )
}

export default ChallengesAdminPage