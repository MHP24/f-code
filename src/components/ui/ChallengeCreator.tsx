import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import { fCodeApi } from '@/api';
import { IChallengeReport } from '../../interfaces/report';
import styles from '../styles/challengeCreator.module.css';
import { downloadCSV, toaster } from '@/utils';
import axios from 'axios';
interface IDifficulties {
  [key: number]: { class: string };
}

const difficulties: IDifficulties = {
  1: { class: styles.easy },
  2: { class: styles.medium },
  3: { class: styles.hard },
  4: { class: styles.insane },
};

interface Props {
  _id: string;
  slug: string;
  language: string;
  difficulty: number;
  isEditable?: boolean;
}

export const ChallengeCreator: FC<Props> = ({ _id, slug, language, difficulty, isEditable = true }) => {
  const handleDownload = async () => {
    try {
      const { data } = await fCodeApi.get<IChallengeReport[]>(`/reports/challenges/${_id}`);
      downloadCSV<IChallengeReport>(data, _id);
      toaster('Download generated successfully!', true);
    } catch (error) {
      toaster(axios.isAxiosError(error) ?
        `${error.response?.data.error}`
        : 'Failed generating download', false);
    }
  }

  return (
    <div className={`${styles.challenge} animate__animated animate__fadeIn`}>
      <div className={styles.challengeData}>
        <Image
          width={45}
          height={45}
          alt={language}
          src={`/techs/${language}.svg`}
        />
        <p className={styles.dataContent}>{`#${_id}`}</p>
        <p className={styles.dataContent}>{slug.replace(/\_/g, ' ').replace(/^\w/, w => w.toLocaleUpperCase())}</p>
        <div className={`${styles.difficulty} ${difficulties[difficulty].class}`}></div>
      </div>
      <div className={styles.challengeOptions}>
        <Link href={`/challenges/${language}/${slug}`} target='_blank' className={styles.option}>
          <Image
            width={25}
            height={25}
            alt='visit'
            src={'/illustrations/plane.svg'}
          />
        </Link>

        {
          isEditable &&

          <Link href={`/creator/edit/${language}/${slug}`} className={styles.option}>
            <Image
              width={25}
              height={25}
              alt='edit'
              src={'/illustrations/edit.svg'}
            />
          </Link>

        }



        <button className={styles.option}
          onClick={handleDownload}
        >
          <Image
            width={25}
            height={25}
            alt='download'
            src={'/illustrations/download.svg'}
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
