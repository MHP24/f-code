import { FC } from 'react'
import ConfettiExplosion from 'react-confetti-explosion';
import Editor from '@monaco-editor/react';
import styles from '../styles/editorReward.module.css';

interface Props {
  solution: string;
  title: string;
  language: string;
}

export const EditorReward: FC<Props> = ({ solution, title, language }) => {
  return (
    <div className={styles.solution}>
      <ConfettiExplosion
        particleCount={200}
        duration={2200}
        width={1400}
        colors={['#07f7d36a', '#07f7d39c', '#5fff8f', '#5fff8fc1', '#13141aa7']}
      />
      <h3 className={styles.solveTitle}>{title}</h3>
      <div className={styles.editorSolution}>
        <Editor
          theme='vs-dark'
          height={'70vh'}
          value={solution}
          language={language ?? 'txt'}
        />
      </div>
    </div>
  )
}
