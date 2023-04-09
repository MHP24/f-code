import { FC } from "react";
import styles from '../styles/errorLabel.module.css';
interface Props {
  text: string;
}

export const ErrorLabel: FC<Props> = ({ text }) => {
  return (
    <small className={styles.error}>{text}</small>
  );
}
