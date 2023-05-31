import { GetServerSideProps, NextPage } from 'next';
import { AdminLayout } from "@/components/layouts";
import { fCodeApi } from '@/api';
import { IChallengeRequestSearch } from '@/interfaces';
import styles from '@/styles/admin/requests.module.css';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Editor from '@monaco-editor/react';
import { Button, Modal } from '@/components/ui';
import { useState } from 'react';

interface Props {
  data: IChallengeRequestSearch;
}

interface IDifficulties {
  [key: number]: { tag: string; class: string };
}

const difficulties: IDifficulties = {
  1: { tag: 'Easy', class: styles.easy },
  2: { tag: 'Medium', class: styles.medium },
  3: { tag: 'Hard', class: styles.hard },
  4: { tag: 'Insane', class: styles.insane },
};


const ChallengeRequestDetailPage: NextPage<Props> = ({ data }) => {
  const [modal, setModal] = useState({
    isOpen: false,
    content: '',
  });

  const closeModal = () => {
    setModal({ ...modal, isOpen: false })
  }


  const closeApplication = (approved: boolean) => {
    setModal({
      ...modal,
      isOpen: true,
      content: approved ? 'approve' : 'reject'
    })
  }

  const confirmAction = async (status: string, reason: string) => {
    try {

      console.log({ status, reason });

    } catch (error) {
    } finally {
    }
  }


  return (
    <AdminLayout
      pageDescription='Request details'
      title='Request details'
    >

      <Modal
        open={modal.isOpen}
        setModal={setModal}
      >
        <div>
          <p className={styles.message}>
            {`Are you sure to ${modal.content} ${data.reason} action for 
            "${data.slug.replace(/\_/g, ' ').replace(/^\w/, w => w.toUpperCase())}" ?`}
          </p>
          <div className={styles.modalActions}>
            <Button
              size={.8}
              text='Confirm'
              w={100}
              fn={() => confirmAction(modal.content, data.reason)}
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
      </Modal>

      <div className={styles.requestDetailContainer}>
        <section className={`${styles.step} ${styles.basicDetails}`}>
          <div className={styles.basic}>
            <h2 className={styles.title}>{data.slug.replace(/\_/g, ' ').replace(/^\w/, w => w.toLocaleUpperCase())}</h2>
            <div className={styles.tags}>
              {
                data.tags.map(tag => {
                  return <p className={styles.tag} key={`tag-challenge-${data.slug}-${tag}`}>{tag}</p>
                })
              }
              <p className={`${styles.challengeDetail} ${styles.reason} ${data.reason === 'update' ? styles.update : styles.create}`}>
                {data.reason.replace(/^\w/, w => w.toUpperCase())}
              </p>

              <p className={`${styles.difficultyTag} ${difficulties[data.difficulty].class}`}>{difficulties[data.difficulty].tag}</p>
            </div>
          </div>

          <Image
            className={styles.image}
            src={`/techs/${data.language}.svg`}
            width={150}
            height={150}
            alt={data.language}
          />
        </section>

        <section className={`${styles.step} ${styles.instructions}`}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}>
            {data.instructions}
          </ReactMarkdown>
        </section>

        <section className={`${styles.step} ${styles.codeDetails}`}>

          <div className={styles.container}>
            <h3 className={styles.subtitle}>Code details</h3>
            <div className={styles.codeDetail}>
              <p className={styles.detailName}>Function name</p>
              <p className={styles.detailContent}>{data.functionName}</p>
            </div>

            <div className={styles.codeDetail}>
              <p className={styles.detailName}>Parameters ({data.parametersCount})</p>
              <p className={styles.detailContent}>{data.parameters.join(', ')}</p>
            </div>

            <div className={styles.codeCases}>
              <h3 className={styles.subtitle}>Cases</h3>
              <ul className={styles.cases}>

                {

                  data.cases.map(({ call, expectedOutput }, i) => {
                    return (
                      <li key={`case-call-${i}-${data.slug}-${data.language}`} className={styles.case}>
                        <div className={styles.codeDetail}>
                          <p className={styles.detailName}>Function call</p>
                          <p className={styles.detailContent}>{call}</p>
                        </div>

                        <div className={styles.codeDetail}>
                          <p className={styles.detailName}>Output</p>
                          <p className={styles.detailContent}>{JSON.stringify(expectedOutput || 'undefined')}</p>
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
            </div>

          </div>

          <Editor
            className={styles.editor}
            defaultLanguage={data.language}
            height={'70vh'}
            theme={'vs-dark'}
            options={{
              fontSize: 16,
              lineHeight: 1.4,
              fontLigatures: true,
              lineNumbers: 'off',
            }}
            defaultValue={data.code}
          />
        </section>


        <section className={`${styles.step} ${styles.actions}`}>
          <h3 className={styles.subtitle}>A valid challenge meets the following requirements</h3>

          <ul className={styles.requirements}>
            <li className={styles.requirement}>It is precise</li>
            <li className={styles.requirement}>It is consistent</li>
            <li className={styles.requirement}>Has examples to make it easier to understand</li>
            <li className={styles.requirement}>Highlight important information</li>
            <li className={styles.requirement}>The code works</li>
            <li className={styles.requirement}>All cases has differences</li>
            <li className={styles.requirement}>The function name is representative</li>
          </ul>
          <div className={styles.actionsContainer}>
            <Button
              text='Approve'
              size={.9}
              w={150}
              fn={() => closeApplication(true)}
            />

            <Button
              text='Reject'
              size={.9}
              variant
              w={150}
              fn={() => closeApplication(false)}
            />
          </div>
        </section>

      </div>
    </AdminLayout>
  )
}

export default ChallengeRequestDetailPage;


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const { language = '', slug = '' } = params as { language: string, slug: string };

    if (!language || !slug) {
      return {
        redirect: {
          destination: '/admin/requests',
          permanent: false
        }
      }
    }

    const { data } = await fCodeApi.get(`/admin/challenges/search?slug=${slug}&language=${language}`);
    const { docs } = data;
    return {
      props: {
        data: docs[0]
      }
    }

  } catch (error) {
    console.error({ error });
    return {
      redirect: {
        destination: '/admin/requests',
        permanent: false
      }
    }
  }
}