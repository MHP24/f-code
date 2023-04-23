import { GetServerSideProps, NextPage } from 'next';
import Editor from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import { MainLayout } from '@/components/layouts';
import styles from '../../../styles/challenge.module.css';
import { Button, ChallengeData } from '@/components/ui';
import { useRef } from 'react';
import { fCodeApi } from '@/api';
import axios from 'axios';

interface Props {
  _id: string;
  instructions: string;
  language: string;
  slug: string;
}

const Challenge: NextPage<Props> = ({ _id, language, slug, instructions }) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleEditor = (editor: editor.IStandaloneCodeEditor) => editorRef.current = editor;

  const submitCode = async () => {
    const { current } = editorRef;

    const code = current!.getValue();

    try {
      const { data } = await fCodeApi.post(`/challenges/solve?challengeId=${_id}`, { code });
      console.log({ data });
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.error);
      }

    }
  }

  return (
    <MainLayout
      title={`${(slug.replace(/\_+/gi, ' '))
        .replace(/^\w/gi, w => w.toUpperCase())}`}
      pageDescription={`${language} - Challenge ${slug}`}
    >
      <div className={styles.challengePanel}>
        <div className={styles.editorContainer}>
          <Editor
            className={styles.editor}
            defaultLanguage='javascript'
            theme={'vs-dark'}
            onMount={handleEditor}
            options={{
              fontSize: 18,
              lineHeight: 1.4,
              fontLigatures: true,
              lineNumbers: 'off'
            }}
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
        />
      </div>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { language = '', slug = '' } = params as { language: string, slug: string };

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
    return {
      props: {
        ...data[0]
      }
    }
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  }
}

export default Challenge;
