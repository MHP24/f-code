import { useContext, useEffect, useRef, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import { AuthContext } from '@/context';
import { getSession } from 'next-auth/react';
import Editor from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import { ChallengeLayout } from '@/components/layouts';
import { Button, ChallengeData, EditorReward, Modal } from '@/components/ui';
import { fCodeApi } from '@/api';
import { buildFunction } from '@/utils';
import { db } from '@/database';
import { Solve } from '@/models';
import styles from '../../../styles/challenge.module.css';
import { useRouter } from 'next/router';
import { useSubmit } from '@/hooks';
import { IExecutionSummary } from '@/interfaces';

interface Props {
  _id: string;
  creatorId: string;
  instructions: string;
  language: string;
  slug: string;
  difficulty: number;
  initialValue: string;
  isCompleted: boolean;
  solution: string;
}

const Challenge: NextPage<Props> = (
  { _id, creatorId, language, slug,
    instructions, difficulty, initialValue, isCompleted, solution }) => {

  const { isLoggedIn, user } = useContext(AuthContext);
  const { submitCode, execution } = useSubmit(language);

  const router = useRouter();
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const handleEditor = (editor: editor.IStandaloneCodeEditor) => editorRef.current = editor;

  const [modal, setModal] = useState({
    isOpen: false,
    content: ''
  });

  useEffect(() => {
    if (!execution.isExecuting) {
      const { data } = execution as { data: IExecutionSummary };
      setModal(prevModal => ({
        ...prevModal,
        isOpen: data.errors === 0,
      }))
    }
  }, [execution])

  return (
    <ChallengeLayout
      title={`${(slug.replace(/\_+/gi, ' '))
        .replace(/^\w/gi, w => w.toUpperCase())}`}
      pageDescription={`${language} - Challenge ${slug}`}
      difficulty={difficulty}
      isCompleted={isCompleted}
    >
      <div className={styles.challengePanel}>


        <Modal
          open={modal.isOpen}
          setModal={setModal}
        >
          <EditorReward
            solution={solution}
            language={language}
            title='Challenge completed! Here you have another solution!'
          />
        </Modal>

        <div className={styles.editorContainer}>
          <Image
            className={styles.editorLanguage}
            src={`/techs/${language}.svg`}
            width={50}
            height={50}
            alt={language}
          />
          <Editor
            className={styles.editor}
            defaultLanguage={language}
            theme={'vs-dark'}
            onMount={handleEditor}
            options={{
              fontSize: 18,
              lineHeight: 1.4,
              fontLigatures: true,
              lineNumbers: 'on',
              minimap: { enabled: false }
            }}
            value={initialValue}
          />
          <div className={styles.submitContainer}>
            {
              isLoggedIn ?
                <Button
                  disabled={execution.isExecuting}
                  text={'Run tests'}
                  size={1.1}
                  fn={() =>
                    execution.isExecuting ? {}
                      : submitCode(_id, editorRef.current!.getValue(), creatorId, user?._id!, Number(difficulty))
                  }
                />
                :
                <Button
                  text={'Sign in to submit your solution!'}
                  size={1.1}
                  fn={() => router.push('/auth/sign_in')}
                />
            }

          </div>
        </div>

        <ChallengeData
          instructions={instructions}
          solveData={execution}
          solution={solution}
        />


      </div>
    </ChallengeLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (req) => {
  const { language = '', slug = '' } = req.params as { language: string, slug: string };

  if (!language || !slug) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  }

  try {
    const { data: { docs } } = await fCodeApi.get(`/challenges/search?language=${language}&slug=${slug}`);
    const [response] = docs;

    const session = await getSession(req) as any;

    await db.connect();

    const solve = await Solve
      .findOne({ challengeId: response._id, userId: session?.user?._id })
      .select('code -_id').lean();

    const functionToSolve = buildFunction(language, response.functionName, response.parameters);
    return {
      props: {
        ...response,
        initialValue: solve?.code ?? functionToSolve,
        isCompleted: Boolean(solve?.code)
      }
    }
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  } finally {
    await db.disconnect();
  }
}

export default Challenge;
