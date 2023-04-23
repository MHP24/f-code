import { FC, useState } from 'react';
import { Button, Loader, TestPanel } from '.';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from '../styles/challengeData.module.css';


const markdownExample =
  ' \
\
\
\## Installation Guide \
\
\n### 1. Install dependencies \
``` \
npm install \
``` \
\n\
\n\
this is an example text without styles\
\
\n### 2. Setup database \
> Complete DB_CONFIG from __config.js__ \
\`\`\` \
  DB_CONFIG: { \
    host: \'localhost\', \
    user: \'root\', \
    password: \'example\', \
    database: \'dbName\', \
  } \
\`\`\` \n\
### Tables\n \
\
### 3. Run project \
``` \
npm run start \
``` \
#\
*** \
'

interface Props {
  instructions: string;
}

export const ChallengeData: FC<Props> = ({ instructions }) => {
  const [tab, setTab] = useState(true);

  return (
    <div className={styles.challengeData}>
      <div className={styles.actions}>
        <Button
          fn={() => setTab(true)}
          text={'Instructions'}
          variant={tab}
          size={1}
          w={250}
        />
        <Button
          fn={() => setTab(false)}
          text={'Results'}
          size={1}
          w={250}
          variant={!tab}
        />
      </div>

      <div>
        {
          !true ?
            <Loader />
            :
            tab ?
              <ReactMarkdown
                className={styles.markdownArea}
                remarkPlugins={[remarkGfm]}>
                {instructions}
              </ReactMarkdown>
              :
              <TestPanel
                failed={false}
              />
        }
      </div>
    </div>
  );
}