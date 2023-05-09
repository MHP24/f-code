import { Dispatch, FC, SetStateAction, useRef } from 'react';
import Editor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from '../styles/markdownWriter.module.css';
import { editor } from 'monaco-editor';

interface Props {
  content: string;
  setContent: Dispatch<SetStateAction<string>>
}

export const MarkdownWriter: FC<Props> = ({ content, setContent }) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const handleEditor = (editor: editor.IStandaloneCodeEditor) => editorRef.current = editor;

  return (
    <div className={styles.writerContainer}>
      <div className={styles.container}>
        <label className={styles.title}>{'Input (Markdown Syntax)'}</label>

        <Editor
          className={styles.editorInput}
          defaultLanguage={'markdown'}
          theme={'vs-dark'}
          onChange={(value) => setContent(`${value}`)}
          onMount={handleEditor}
          options={{
            fontSize: 16,
            lineHeight: 1.4,
            fontLigatures: true,
            lineNumbers: 'off',
          }}
          value={content}
        />
      </div>

      <div className={styles.container}>
        <label className={styles.title}>{'Output (Markdown)'}</label>
        <ReactMarkdown
          className={styles.markdownArea}
          remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>

    </div>
  );
}
