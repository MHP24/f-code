import { FC, useState } from 'react'
import Image from 'next/image';
import { IUserActionReport } from '@/interfaces'
import styles from '../../styles/admin/adminTicketCard.module.css';
import { Modal, Button } from '@/components/ui';
import { fCodeApi } from '@/api';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { toaster } from '@/utils';

export const AdminTicketCard: FC<IUserActionReport> = ({ _id, username, picture, createdAt, userId, reporterId }) => {
  const [modal, setModal] = useState({
    isOpen: false,
    content: '',
  });

  const closeModal = () => {
    setModal({ ...modal, isOpen: false });
  }

  const closeReport = (ban: boolean) => {
    setModal({
      ...modal,
      isOpen: true,
      content: ban ? 'ban' : 'close'
    });
  }

  const confirmAction = async (status: string) => {
    try {
      await fCodeApi.post(`/admin/users/reports/close/${userId}`, {
        ban: status === 'ban'
      });
      toaster(`Ticket #${_id} closed successfully!`, true);

    } catch (error) {
      toaster(axios.isAxiosError(error) ?
        `${error.response?.data.error}`
        : 'Failed closing request', false);
    } finally {
      closeModal();
    }
  }


  return (
    <div className={`${styles.card} animate__animated animate__fadeIn`}>
      <Toaster
        position='bottom-left'
        reverseOrder={false}
      />
      <Modal
        open={modal.isOpen}
        setModal={setModal}
      >
        <div>
          <p className={styles.message}>
            Are you sure to <strong>{modal.content}</strong> {username} ?
          </p>
          <div className={styles.modalActions}>
            <Button
              size={.8}
              text='Confirm'
              w={100}
              fn={() => confirmAction(modal.content)}
            />

            <Button
              size={.8}
              text='Cancel'
              w={100}
              variant
              fn={() => closeModal()}
            />
          </div>
        </div>
      </Modal>
      <p className={styles.cardData}>{`#${_id}`}</p>
      <div className={styles.cardGroup}>
        <Image
          className={styles.cardImage}
          src={picture}
          alt={username.slice(0, 4)}
          width={40}
          height={40}
        />
        <p className={`${styles.cardData} ${styles.username}`}>{username}</p>
      </div>
      <p className={styles.cardData}>{userId}</p>
      <p className={styles.cardData}>{createdAt}</p>

      <div className={styles.cardActions}>
        <button
          className={styles.action}
          onClick={() => closeReport(false)}
        >
          <p className={`${styles.actionText} ${styles.actionTextNo}`}>{'✘'}</p>
        </button>

        <button
          className={styles.action}
          onClick={() => closeReport(true)}
        >
          <p className={`${styles.actionText} ${styles.actionTextYes}`}>{'✔'}</p>
        </button>
      </div>

      <p className={styles.cardData}>{`By: #${reporterId}`}</p>
    </div>
  )
}
