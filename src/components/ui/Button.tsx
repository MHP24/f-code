import { FC } from 'react';
import styles from '../styles/button.module.css';
interface Props {
  text: string;
  size: number;
  variant?: boolean;
  w?: number;
  fn: () => void;
}

export const Button: FC<Props> = ({ text, size, w = 0, fn, variant }) => {
  return (
    <button
      className={`${styles.button} button`}
      onClick={() => fn()}
    >
      {text}

      <style jsx>{`
        .button {
          font-size: ${size}rem;
          background-color: ${variant ? 'var(--c1)' : 'var(--c2)'};
          border: ${variant ? 'var(--c6)' : 'var(--c3)'} 2px solid;
          color: ${variant ? 'var(--c6)' : 'var(--c3)'};
          ${w && `max-width: ${w}px;`}
        }

        .button:hover {
          border: var(--c6) 2px solid;
          color: var(--c6);
          background-color: var(--c1);
        }
      `}</style>
    </button >

  )
}
