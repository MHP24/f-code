import { FC } from 'react';
import styles from '../styles/button.module.css';
interface Props {
  text: string;
  size: number;
  w?: number;
  fn: () => void;
}

export const Button: FC<Props> = ({ text, size, w = 0, fn }) => {
  return (
    <button
      className={`${styles.button} button`}
      onClick={() => fn()}
    >
      {text}

      <style jsx>{`
        .button {
          font-size: ${size}rem;
          ${w && `max-width: ${w}px`}
        }
      `}</style>
    </button >

  )
}
