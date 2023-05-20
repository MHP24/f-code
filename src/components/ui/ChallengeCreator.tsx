import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import { saveAs } from 'file-saver';
import { Workbook } from 'exceljs';
import { fCodeApi } from '@/api';
import { IChallengeReport } from '../../interfaces/report';
import styles from '../styles/challengeCreator.module.css';
import { toaster } from '@/utils';

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
}

export const ChallengeCreator: FC<Props> = ({ _id, slug, language, difficulty }) => {
  const handleDownload = async () => {
    try {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet(`Challenge ${slug.replace(/\_/g, ' ')}`);

      const { data } = await fCodeApi.get<IChallengeReport[]>(`/reports/challenges/${_id}`);

      worksheet.columns = [
        { header: 'SOLVE_ID', key: '_id', width: 30 },
        { header: 'CHALLENGE_ID', key: 'challengeId', width: 30 },
        { header: 'CREATED_AT', key: 'createdAt', width: 30 },
        { header: 'UPDATED_AT', key: 'updatedAt', width: 30 },
        { header: 'USER_ID', key: 'userId', width: 30 },
        { header: 'USERNAME', key: 'username', width: 30 },
        { header: 'EMAIL', key: 'email', width: 30 },
        { header: 'PROVIDER', key: 'provider', width: 30 },
        { header: 'CODE', key: 'code', width: 30 },
      ];

      data.forEach((row: IChallengeReport) => {
        worksheet.addRow({
          ...row,
          userId: row.userId._id,
          username: row.userId.username,
          email: row.userId.email,
          provider: row.userId.provider,
        });
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `${_id}.xlsx`);
      toaster('Download generated successfully!', true);
    } catch (error) {
      toaster('Failed generating download', false);
    }
  };


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

        <Link href={'/challenges'} className={styles.option}>
          <Image
            width={25}
            height={25}
            alt='edit'
            src={'/illustrations/edit.svg'}
          />
        </Link>

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
