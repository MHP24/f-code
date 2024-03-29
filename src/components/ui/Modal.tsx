import ReactDOM from 'react-dom';
import React, { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';
import styles from '../styles/modal.module.css';
import { Logo } from '.';
import Image from 'next/image';

interface Props {
  open: boolean;
  setModal: Dispatch<SetStateAction<{
    isOpen: boolean;
    content: string;
  }>>
}

export const Modal: FC<PropsWithChildren<Props>> =
  (
    { open, setModal, children }
  ) => {

    return (
      <>
        {
          open && typeof window !== 'undefined' &&
          ReactDOM.createPortal(
            <div className={styles.modal}>
              <div className={`${styles.modalContent} animate__animated animate__zoomIn`}>
                <button
                  className={styles.closeBtn}
                  onClick={() => setModal((prev) => ({ ...prev, isOpen: false }))}
                >
                  <Image
                    src={'/illustrations/close.svg'}
                    alt='close'
                    width={30}
                    height={30}
                  />
                </button>
                <div className={styles.modalHeader}>
                  <Logo
                    isPrimary={false}
                    column
                    size={50}
                  />
                </div>

                <div className={styles.modalBody}>
                  {children}
                </div>

              </div>
            </div >, document.getElementById('root-modal')!)
        }
      </>
    );
  }
