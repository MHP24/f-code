import { FC, LegacyRef, forwardRef } from 'react';
import styles from '../styles/formInput.module.css';

interface Props {
  name: string;
  label?: string;
  placeHolder: string;
  type?: string;
  className?: string;
}

export const FormInput: FC<Props> = forwardRef(({ name, label = '', placeHolder, type = 'text', ...rest }, ref: LegacyRef<HTMLInputElement>) => {

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
        {...rest}
        ref={ref}
      />
    </div>
  );
});

FormInput.displayName = 'FormInput';
