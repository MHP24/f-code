import { FC, useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/admin/userCard.module.css';
import { fCodeApi } from '@/api';
import { toaster } from '@/utils';
import { Toaster } from 'react-hot-toast';

interface Props {
  picture: string;
  _id: string;
  username: string;
  email: string;
  provider: string;
  role: string;
  active: boolean;
}

const ROLES: string[] = [
  'admin',
  'creator',
  'user'
];

export const UserCard: FC<Props> = ({ picture, _id, username, email, provider, role, active }) => {

  const [showDropdown, setShowDropdown] = useState(false);
  const [currentRole, setCurrentRole] = useState(role);
  const [currentStatus, setCurrentStatus] = useState(active);

  const updateAccount = async (_id: string, role: string, status: boolean) => {
    try {
      const { data } = await fCodeApi.post(`/admin/users/edit/${_id}`, {
        role,
        status
      });
      toaster(`#${data._id} updated successfully!`, true);
      setCurrentRole(role);
      setCurrentStatus(status);
    } catch (error) {
      toaster(`Failed updating #${_id}`, false);
    }
  }

  return (
    <div className={styles.userCard}>
      <div className={`${styles.userData} ${styles.userProfileData}`}>
        <Image
          className={styles.userImage}
          src={picture}
          width={25}
          height={25}
          alt={username.slice(0, 3)}
        />
        <p className={styles.userText}>{`#${_id}`}</p>
      </div>

      <div className={styles.userData}>
        <p className={styles.userText}>{email.replace('@fcode', '')}</p>
      </div>

      <div className={`${styles.userData} ${styles.providerData}`}>
        <Image
          className={styles.userImage}
          src={`/media/${provider}.svg`}
          width={25}
          height={25}
          alt={provider}
        />
        <p className={styles.userText}>{`${username}`.slice(0, 15)}</p>
      </div>

      <div className={`${styles.userData} ${styles.roleSelector}`} onClick={() => setShowDropdown(!showDropdown)}>
        <div className={styles.currentRole}>
          <p
            className={styles.userText}>
            {currentRole.replace(/^\w/, w => w.toUpperCase())}
          </p>
          <Image
            className={styles.dropdownIndicator}
            src={showDropdown ? '/illustrations/up-arrow.svg' : '/illustrations/drop-arrow.svg'}
            alt='arrow'
            width={15}
            height={15}
          />
        </div>
        {
          showDropdown &&
          <div className={`${styles.roles} animate__animated`}>
            {
              ROLES.map(role => {
                if (role !== currentRole) {
                  return (
                    <button
                      key={`role-${role}-${_id}`}
                      className={styles.role}
                      onClick={() => updateAccount(_id, role, currentStatus)}
                    >
                      {role.replace(/^\w/, w => w.toUpperCase())}
                    </button>
                  )
                }
              })
            }
          </div>
        }
      </div>

      <div className={`${styles.userData} ${styles.userActions}`}>
        <div className={`${styles.status} ${currentStatus ? styles.active : styles.inactive}`}></div>
        <button
          className={styles.btn}
          onClick={() => updateAccount(_id, currentRole, !currentStatus)}
        >
          <Image
            src={`/illustrations/${currentStatus ? 'unlock' : 'lock'}.svg`}
            width={25}
            height={25}
            alt='lock'
          />
        </button>
        <button className={styles.btn}>
          <Image
            src='/illustrations/download.svg'
            width={25}
            height={25}
            alt='download'
          />
        </button>
      </div>

      <Toaster
        position='bottom-left'
        reverseOrder={false}
      />
    </div >
  );
}
