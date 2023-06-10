import { fCodeApi } from '@/api';
import { AdminLayout } from '@/components/layouts';
import { db } from '@/database';
import Image from 'next/image';
import { ICreatorRequest, IProfileData } from '@/interfaces';
import { CreatorRequest } from '@/models/CreatorRequest';
import { GetServerSideProps, NextPage } from 'next';
import styles from '@/styles/admin/applications.module.css';
import { Button, ErrorLabel, LanguageProgress, Modal } from '@/components/ui';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toaster } from '@/utils';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';

interface Props {
  application: ICreatorRequest;
  profile: IProfileData;
}

interface Inputs {
  reason: string;
}

const ApplicationDetailPage: NextPage<Props> = ({ application, profile: { profile } }) => {


  const [modal, setModal] = useState({
    isOpen: false,
    content: '',
  });

  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const closeModal = () => {
    setModal({ ...modal, isOpen: false })
  }

  const closeApplication = (approved: boolean) => {
    setModal({
      ...modal,
      isOpen: true,
      content: approved ? 'approved' : 'rejected'
    })
  }

  const confirmApplication = async (approved: boolean, summary: string = 'approved') => {
    try {
      await fCodeApi.post(`/admin/applications/close/${application._id}`, {
        userId: profile.id,
        approved,
        summary
      });
      toaster(`#${profile.id} closed successfully`, true);

      router.push('/admin/applications');
    } catch (error) {
      toaster(`Failed closing #${profile.id}`, false);
    } finally {
      closeModal();
    }
  }


  const onSubmit = async ({ reason }: Inputs) => {
    confirmApplication(false, reason);
  }


  return (
    <AdminLayout
      pageDescription={`Creator application details`}
      title={`Application`}
    >
      <Toaster
        position='bottom-left'
        reverseOrder={false}
      />


      <>
        <Modal
          open={modal.isOpen}
          setModal={setModal}
        >
          {
            modal.content === 'approved' ?

              <div>
                <p className={styles.message}>{`Are you sure to approve ${profile.username} as new member FCode creators team ?`}</p>
                <div className={styles.modalActions}>
                  <Button
                    size={.8}
                    text='Confirm'
                    w={100}
                    fn={() => confirmApplication(true)}
                  />

                  <Button
                    size={.8}
                    text='Cancel'
                    w={100}
                    variant
                    fn={() => closeModal()}
                  />

                </div>
              </div>

              :

              <div>
                <p className={styles.message}>{`Explain why ${profile.username} can't be part of FCode creators team`}</p>
                <div className={styles.modalActions}>

                  <form onSubmit={handleSubmit(onSubmit)} className={styles.formReason}>
                    <div className={styles.reasonContainer}>
                      <textarea
                        placeholder='Reason...'
                        className={styles.reason}
                        {...register('reason', { required: true, maxLength: 150 })}
                      >
                      </textarea>

                      {errors.reason?.type === 'required' && <ErrorLabel text={'This field is required'} />}
                      {errors.reason?.type === 'maxLength' && <ErrorLabel text={'Max 150 characters'} />}
                    </div>
                    <Button
                      disabled={Boolean(errors?.reason) ?? false}
                      size={.8}
                      text='Send'
                      w={100}
                    />
                  </form>

                </div>
              </div>

          }
        </Modal>

        <section className={styles.userDetails}>
          <div className={styles.profileUser}>
            <Image
              className={styles.profilePicture}
              src={profile.picture}
              alt={profile.username}
              width={170}
              height={170}
            />

            <p className={`${styles.title} ${styles.username}`}>{profile.username}</p>


            <div className={styles.actions}>
              <Button
                size={.8}
                text='Approve'
                w={100}
                fn={() => closeApplication(true)}
              />

              <Button
                size={.8}
                text='Reject'
                w={100}
                variant
                fn={() => closeApplication(false)}
              />

            </div>
          </div>

          <div className={styles.applicationDetails}>
            <h3 className={styles.title}>{'Application details'}</h3>
            <div className={styles.applicationDetail}>
              <p className={styles.detailText}>{application.subject}</p>
            </div>

            <div className={styles.applicationDetail}>
              <p className={styles.detailText}>{application.description}</p>
            </div>
          </div>


        </section>

        <section className={styles.techs}>
          <div className={styles.challenges}>
            <p className={styles.challengesNumber}>{profile.technologies.challengesCompleted}</p>
            <p className={styles.challengeSubtitle}>Challenges completed</p>
          </div>
          <div className={styles.distribution}>
            {
              (
                profile.technologies
                  .challengeDistribution
              ).map((tech, i) => {
                return (
                  <LanguageProgress
                    key={`language-progress-application-dashboard-${i}-${tech.language}`}
                    {...tech}
                  />
                )
              })
            }
          </div>
        </section>
      </>

    </AdminLayout>
  )
}

export default ApplicationDetailPage;


export const getServerSideProps: GetServerSideProps = async (req) => {
  try {
    await db.connect();
    const { id = '' } = req.params as { id: string };

    const application = await CreatorRequest.findById(id).select('-__v -createdAt -updatedAt -staffId').lean();
    const { data: profile } = await fCodeApi.get(`/users/profile/${application.userId}`);

    if (!application || application.closed) {
      return {
        redirect: {
          destination: '/admin/applications',
          permanent: false
        }
      }
    }

    return {
      props: {
        application: {
          ...application,
          _id: `${application._id}`,
          userId: `${application.userId}`,
        },
        profile
      }
    }
  } catch (error) {
    console.error({ error });
    return {
      redirect: {
        destination: '/admin/applications',
        permanent: false
      }
    }
  } finally {
    await db.disconnect();
  }
}