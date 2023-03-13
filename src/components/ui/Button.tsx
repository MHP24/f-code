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
          background-color: ${variant ? 'var(--c3)' : 'var(--c1)'};
          border: var(--c3) 3px solid;
          color: ${variant ? 'var(--c1)' : 'var(--c3)'};
          ${w && `max-width: ${w}px;`}
        }

        .button:hover {
          background-color: var(--c3);
          color: var(--c2);
        }
      `}</style>
    </button >

  )
}
