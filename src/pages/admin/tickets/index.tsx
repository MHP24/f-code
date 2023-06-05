import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { usePagination } from '@/hooks';
import { AdminLayout } from '@/components/layouts'
import { AdminTicketCard, FormInput } from '@/components/ui';
import { IUserActionReport } from '@/interfaces';
import styles from '@/styles/admin/tickets.module.css';


interface Inputs {
  search: string;
}

const ReportsPage = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [inputSearch, setInputSearch] = useState<string>('');
  const data = usePagination<IUserActionReport>(`/admin/users/reports/search?query=${inputSearch}`);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { search } = data;
    setInputSearch(search.trim());
  };

  return (
    <AdminLayout
      pageDescription='Tickets (report)'
      title='Tickets'
      formComponent={
        <div>
          <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormInput
              placeHolder='Search...'
              {...register('search', { required: false })}
            />
          </form>
        </div>
      }
    >
      {
        data.data?.map((report, i) => {
          return <AdminTicketCard key={`user-report-${report._id}-i-dashboard`} {...report} />
        })
      }

    </AdminLayout>
  )
}

export default ReportsPage