import { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { fCodeApi } from '@/api';
import { regExValidators } from '@/utils';
import { MainLayout } from '@/components/layouts';
import { Button, ErrorLabel, FormInput, Modal } from '@/components/ui';
import styles from '@/styles/request.module.css';
import { getSession } from 'next-auth/react';
import { ISession } from '@/interfaces';
import { db } from '@/database';
import { CreatorRequest } from '@/models/CreatorRequest';

interface Inputs {
  subject: string;
  description: string;
}


interface Props {
  hasNotification: boolean;
  msg: string;
}

const RequestPage: NextPage<Props> = ({ hasNotification, msg }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const [modal, setModal] = useState({
    isOpen: hasNotification,
    content: msg
  });

  const onSubmit = async ({ subject, description }: Inputs) => {
    try {
      const { data: applyData } = await fCodeApi.post('/creators/applications/apply', { subject, description });
      setModal({ ...modal, isOpen: true, content: applyData.message })

    } catch (error) {
      setModal({
        ...modal,
        isOpen: true, content: axios.isAxiosError(error) ?
          error.response?.data.error
          :
          'Unexpected error, try again'
      });
    }
  }

  return (
    <MainLayout
      pageDescription='Apply for FCode creator'
      title='FCode Creator request'
    >

      <Modal
        open={modal.isOpen}
        setModal={setModal}
      >
        <p className={styles.message}>{modal.content}</p>
      </Modal>

      <section className={styles.infoContainer}>
        <Image
          src={'/illustrations/not_creator.svg'}
          alt='not-creator'
          height={250}
          width={250}
        />

        <div className={styles.info}>
          <strong className={styles.infoText}>{'You are not creator yet!'}</strong>
          <p className={styles.infoText}>{'Apply and send additional information if you are interested'}</p>
        </div>
      </section>

      <section className={styles.formContainer}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
        >

          <div>
            <FormInput
              placeHolder='Example: I am a code lover and teacher'
              label='Subject'
              {...register('subject', { pattern: regExValidators.charactersOnly, required: true })}
            />
            {errors.subject?.type === 'required' && <ErrorLabel text={'This field is required'} />}
            {errors.subject?.type === 'pattern' && <ErrorLabel text={'Characters only'} />}
          </div>

          <div className={styles.descriptionContainer}>
            <textarea
              placeholder='Explain your case and why you should be FCode creator'
              className={styles.description}
              {...register('description', { required: true })}
            >
            </textarea>

            {errors.description?.type === 'required' && <ErrorLabel text={'This field is required'} />}
          </div>

          <Button
            size={1}
            text='Send'
            w={200}
          />

        </form>
      </section>
    </MainLayout>
  );
}

export default RequestPage;


export const getServerSideProps: GetServerSideProps = async (req) => {
  const session = await getSession(req);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/sign_in',
        permanent: false
      }
    }
  }

  const { user: { _id } } = session as ISession;

  try {
    await db.connect();
    const requests = await CreatorRequest.find({ userId: _id }).sort({ createdAt: -1 });
    return {
      props: {
        msg: requests[0] && requests[0].closed
          ? requests[0].approved ?
            'Congrats! you are a member of the FCode creator team, re sign in to access your creator panel.'
            : requests[0].summary || 'Rejected'
          : requests[0] ? 'You already have an application pending, we will inform you when a staff member has verified' : '',
        hasNotification: Boolean(requests[0])
      }
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  } finally {
    await db.disconnect();
  }
}
