import { FC } from 'react';
import styles from '../styles/formInput.module.css';

interface Props {
  name: string;
  label?: string;
  placeHolder: string;
  type?: string;
}

export const FormInput: FC<Props> = ({ name, label = '', placeHolder, type = 'text' }) => {
  return (
    <div className={styles.inputContainer}>
      {
        label &&
        <label className={styles.inputLabel}>{label}</label>
      }

      <input
        className={styles.input}
        name={name}
        type={type}
        placeholder={placeHolder}
        autoComplete={'off'}
      />
    </div>
  );
}