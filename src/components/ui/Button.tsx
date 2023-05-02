import { FC } from 'react';
import styles from '../styles/button.module.css';
interface Props {
  text: string;
  size: number;
  variant?: boolean;
  w?: number;
  disabled?: boolean;
  fn?: () => void;
}

export const Button: FC<Props> = ({ text, size, w = 0, fn, variant, disabled = false }) => {

  return (
    <button
      className={`${styles.button} button`}
      disabled={disabled}
      onClick={() => fn && fn()}
    >
      {text}
      <style jsx>{`
        .button {
          font-size: ${size}rem;
          background-color: ${variant ? 'var(--c6)' : 'var(--c1)'};
          color: ${variant ? 'var(--c4)' : 'var(--c3)'}; 
          ${w > 0 ? `max-width: ${w}px;` : 'width: 100%;'}
        }

        .button:hover {
          background-color: ${variant ? 'var(--c6-hover)' : 'var(--c1-hover)'};
        }



        .button:disabled:hover {
          background-color: var(--c1);
          color: var(--c3);
        }
      `}</style>
    </button >

  )
}
