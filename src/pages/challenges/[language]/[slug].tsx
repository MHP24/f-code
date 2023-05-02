import { useContext, useRef } from 'react';
import { AuthContext } from '@/context';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Editor from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import { ChallengeLayout } from '@/components/layouts';
import { Button, ChallengeData } from '@/components/ui';
import { fCodeApi } from '@/api';
import { buildFunction } from '@/utils';
import { db } from '@/database';
import { Solve } from '@/models';
import styles from '../../../styles/challenge.module.css';
import { useRouter } from 'next/router';
import { useSubmit } from '@/hooks';

interface Props {
  _id: string;
  creatorId: string;
  instructions: string;
  language: string;
  slug: string;
  difficulty: number;
  initialValue: string;
}

const Challenge: NextPage<Props> = (
  { _id, creatorId, language, slug,
    instructions, difficulty, initialValue }) => {

  const { isLoggedIn, user } = useContext(AuthContext);
  const { submitCode, execution } = useSubmit(language);

  const router = useRouter();
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const handleEditor = (editor: editor.IStandaloneCodeEditor) => editorRef.current = editor;

  return (
    <ChallengeLayout
      title={`${(slug.replace(/\_+/gi, ' '))
        .replace(/^\w/gi, w => w.toUpperCase())}`}
      pageDescription={`${language} - Challenge ${slug}`}
    >
      <div className={styles.challengePanel}>
        <div className={styles.editorContainer}>
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
        initialValue: solve?.code ?? functionToSolve
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
