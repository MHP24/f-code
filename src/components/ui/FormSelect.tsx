import { useState, MouseEvent, FC, Dispatch, SetStateAction } from 'react';
import styles from '../styles/formSelect.module.css';

interface Props {
  label?: string;
  options: {
    label: string;
    value: string;
  }[];
  setter: Dispatch<SetStateAction<string>>;
  currentOption: string;
}

export const FormSelect: FC<Props> = ({ label, options, currentOption, setter }) => {

  const [showOptions, setshowOptions] = useState<boolean>(false);

  const handleMenu = (e: MouseEvent) => {
    e.preventDefault();
    setshowOptions(!showOptions);
  }

  const handleOption = (e: MouseEvent, option: string) => {
    e.preventDefault();
    setter(option);
    setshowOptions(false);
  }

  return (
    <div className={styles.selectContainer}>
      {
        label &&
        <label className={styles.inputLabel}>{label}</label>
      }

      <div className={styles.select}>
        <button className={styles.currentOption} onClick={handleMenu}>{`${currentOption}`.replace(/^\w/, w => w.toUpperCase())}</button>
        {
          showOptions && (
            <div className={styles.options}>
              {
                options.map(({ label, value }) => {
                  return (
                    <button
                      key={value}
                      className={styles.option}
                      onClick={(e) => handleOption(e, value)}>
                      {label}
                    </button>
                  )
                })
              }
            </div>
          )
        }
      </div>
    </div>
  );
}