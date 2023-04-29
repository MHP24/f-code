import { useContext, useRef, useState } from 'react';
import { AuthContext, ChallengeContext } from '@/context';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Editor from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import { ChallengeLayout } from '@/components/layouts';
import { Button, ChallengeData } from '@/components/ui';
import { fCodeApi } from '@/api';
import axios from 'axios';
import { IExecutionState } from '@/interfaces';
import { buildFunction } from '@/utils';
import { db } from '@/database';
import { Solve } from '@/models';
import styles from '../../../styles/challenge.module.css';

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
  const initialState = {
    executed: false,
    isExecuting: false,
    executionFailed: false,
    error: null,
    data: {}
  };
  const [executionData, setExecutionData] = useState<IExecutionState>(initialState);

  const { isLoggedIn, user } = useContext(AuthContext);

  const { updateChallengeContext } = useContext(ChallengeContext)

  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const handleEditor = (editor: editor.IStandaloneCodeEditor) => editorRef.current = editor;

  const submitCode = async () => {

    updateChallengeContext(language);

    const { current } = editorRef;
    const code = current!.getValue();


    try {
      const { data } = await fCodeApi.post(`/challenges/solve?challengeId=${_id}`, { code });

      if (data.accuracy === 100) {
        await fCodeApi.post(`/challenges/submit?challengeId=${_id}`, {
          code,
          creatorId,
          userId: user?._id,
          difficulty
        });
      }

      setExecutionData({
        ...executionData,
        executed: true,
        executionFailed: false,
        error: null,
        data
      });

    } catch (error) {
      setExecutionData({
        ...executionData,
        executed: true,
        executionFailed: true,
        error: axios.isAxiosError(error) ?
          `${error.response?.data.error}`
          : 'Unexpected error'
      });
    }
  }

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
            <Button
              text={'Run tests'}
              size={1.1}
              fn={submitCode}
            />
          </div>
        </div>

        <ChallengeData
          instructions={instructions}
          solveData={executionData}
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
    const { data } = await fCodeApi.get(`/challenges/search?language=${language}&slug=${slug}`);
    const [response] = data;

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
