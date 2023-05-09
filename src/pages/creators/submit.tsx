import { MainLayout } from '@/components/layouts';
import { FormInput, FormSelect, MarkdownWriter, TagSelector } from '@/components/ui';
import { useState } from 'react';
import { technologies } from '../../mocks/technologies.json';
import { difficulties } from '../../mocks/difficulties.json';
import styles from '../../styles/submit.module.css';
import Image from 'next/image';
import { ISelect } from '@/interfaces';


const SubmitPage = () => {


  const [technology, setTechnology] = useState<ISelect>(technologies[0]);
  const [difficulty, setDifficulty] = useState<ISelect>(difficulties[0]);
  const [tags, setTags] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string>('_Write your description here..._');

  return (
    <MainLayout
      pageDescription={'Create a new challenge for fcode users'}
      title={'FCode - Create a challenge'}
    >
      <form className={styles.form}>
        <div className={styles.formStep1}>
          <div className={styles.formBasic}>
            <div className={styles.challengeName}>
              <FormInput
                name='challengeName'
                placeHolder='example name'
                label='Challenge name'
              />
            </div>

            <div className={styles.challengeTech}>
              <Image
                src={`/techs/${technology.label.toLowerCase()}.svg`}
                alt='Select a language'
                width={130}
                height={130}
              />
            </div>

            <div className={styles.difficulties}>
              <FormSelect
                label='Difficulty'
                options={difficulties}
                setter={setDifficulty}
                currentOption={difficulty}
              />
            </div>

            <div className={styles.technologies}>
              <FormSelect
                label='Technology'
                options={technologies}
                setter={setTechnology}
                currentOption={technology}
              />
            </div>
          </div>

          <TagSelector
            setTagsSelected={setTags}
            tagsSelected={tags}
          />
        </div>


        <div className={styles.formStep2}>
          <hr className={styles.separator} />

          <div className={styles.recommendationsContainer}>
            <h3 className={styles.recommendationsTitle}>{'Let\'s make a description'}</h3>
            <ul className={styles.recommendations}>
              <li>Be precise</li>
              <li>Be consistent</li>
              <li>Give examples to make it easier to understand</li>
              <li>Highlight important information</li>
            </ul>
          </div>

          <MarkdownWriter
            content={instructions}
            setContent={setInstructions}
          />
        </div>

      </form>
    </MainLayout>
  );
}

export default SubmitPage;