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

export const ChallengeData: FC = () => {
  const [instructions, setInstructions] = useState(true);

  return (
    <div className={styles.challengeData}>
      <div className={styles.actions}>
        <Button
          fn={() => setInstructions(true)}
          text={'Instructions'}
          variant={instructions}
          size={1}
          w={250}
        />
        <Button
          fn={() => setInstructions(false)}
          text={'Results'}
          size={1}
          w={250}
          variant={!instructions}
        />
      </div>

      <div>
        {
          !true ?
            <Loader />
            :
            instructions ?
              <ReactMarkdown
                className={styles.markdownArea}
                remarkPlugins={[remarkGfm]}>
                {markdownExample}
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