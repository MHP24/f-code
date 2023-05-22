import { MainLayout } from '@/components/layouts';
import Image from 'next/image';
import { db } from '@/database';
import { ISession } from '@/interfaces';
import { Challenge } from '@/models';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import styles from '@/styles/submit.module.css';
import { ErrorLabel, FormInput, TagSelector, MarkdownWriter, Button } from '@/components/ui';
import { useForm } from 'react-hook-form';
import { regExValidators } from '@/utils';
import { useState } from 'react';
import Editor from '@monaco-editor/react';

interface Props {
  _id: string;
  slug: string;
  tags: string[];
  instructions: string;
  solution: string;
  cases: {
    call: string;
  };
  language: string;
}

interface Inputs {
  challengeName: string;
  case1: string;
  case2: string;
  case3: string;
  case4: string;
};

const Slug: NextPage<Props> = (
  { _id, slug, tags: challengeTags,
    instructions: challengeInstructions,
    solution, cases, language
  }) => {
  const [instructions, setInstructions] = useState<string>(challengeInstructions);
  const [code, setCode] = useState<string>(solution);

  console.log({ _id, slug, challengeTags, instructions, solution, cases });

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const [tags, setTags] = useState<string[]>(challengeTags);

  return (
    <MainLayout
      pageDescription={`FCode - Edit challenge ${slug.replace(/\_/g, ' ').replace(/^\w/, w => w.toUpperCase())}`}
      title={`FCode - Edit ${slug.replace(/\_/g, ' ').replace(/^\w/, w => w.toUpperCase())}`}
    >


      <div className={styles.challengeHeader}>
        <Image
          src={`/techs/${language.toLowerCase()}.svg`}
          alt='Select a language'
          width={130}
          height={130}
        />

        <h2 className={styles.challengeName}>{slug.replace(/\_/g, ' ').replace(/^\w/, w => w.toUpperCase())}</h2>
      </div>


      <form className={styles.form}>
        <div className={styles.formStep1Update}>
          <div className={styles.formBasicUpdate}>
            <div className={styles.challengeName}>
              <FormInput
                placeHolder='example name'
                label='Challenge name'
                {...register('challengeName', { pattern: regExValidators.charactersNumbersSpaces, required: true })}
              />

              {errors.challengeName?.type === 'required' && <ErrorLabel text={'This field is required'} />}
              {errors.challengeName?.type === 'pattern' && <ErrorLabel text={'Invalid challenge name'} />}
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
            <h3 className={styles.recommendationsTitle}>{'Let\'s update the description'}</h3>
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

        <div className={styles.formStep3}>
          <hr className={styles.separator} />

          <div className={styles.recommendationsContainer}>
            <h3 className={styles.recommendationsTitle}>{'Code time!'}</h3>
            <ul className={styles.recommendations}>
              <li>At the left you must to paste/write the solution</li>
              <li>At the right you must to call the function 4 times</li>
              <li>The function name, parameters and quantity must match</li>
              <li>Include comments for an easily comprehension and code reading</li>
            </ul>
          </div>

          <div className={styles.codeTester}>
            <div className={styles.codeContainer}>
              <h3 className={styles.recommendationsTitle}>Paste/write your code here</h3>
              <Editor
                className={styles.editor}
                defaultLanguage={'txt'}
                value={code}
                theme={'vs-dark'}
                onChange={(value) => setCode(`${value}`)}
                options={{
                  fontSize: 16,
                  lineHeight: 1.4,
                  fontLigatures: true,
                  lineNumbers: 'off',
                }}
              />
            </div>


            <div className={styles.outputs}>
              <h3 className={styles.recommendationsTitle}>Test your solution</h3>
              <div className={styles.casesContainer}>
                <div className={styles.cases}>
                  <div>
                    <FormInput
                      placeHolder='exampleFunction()'
                      {...register('case1', { required: true })}
                    />
                    {errors.case1?.type === 'required' && <ErrorLabel text={'This field is required'} />}
                  </div>

                  <div>
                    <FormInput
                      placeHolder='exampleFunction()'
                      {...register('case2', { required: true })}
                    />
                    {errors.case2?.type === 'required' && <ErrorLabel text={'This field is required'} />}
                  </div>

                  <div>
                    <FormInput
                      placeHolder='exampleFunction()'
                      {...register('case3', { required: true })}
                    />
                    {errors.case3?.type === 'required' && <ErrorLabel text={'This field is required'} />}
                  </div>

                  <div>
                    <FormInput
                      placeHolder='exampleFunction()'
                      {...register('case4', { required: true })}
                    />
                    {errors.case4?.type === 'required' && <ErrorLabel text={'This field is required'} />}
                  </div>
                </div>

                <div className={styles.results}>
                  {/* <p>{output}</p> */}
                  <div className={styles.resultsButton}
                  >
                    <Button
                      size={1}
                      text='Test and submit'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </form>
    </MainLayout >
  );
}

export default Slug;


export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  try {
    const session = await getSession({ req });
    const { language, slug } = params as { language: string, slug: string };

    if (!session || !language || !slug) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    const { user } = session as ISession;
    await db.connect();

    const challenge = await Challenge
      .findOne({ creatorId: user._id, language, slug })
      .select('_id slug tags instructions solution cases')
      .lean();

    if (!challenge) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    const { _id, cases, ...rest } = challenge;

    return {
      props: {
        ...rest,
        _id: _id.toString(),
        cases: cases.map(({ call }) => {
          return {
            call
          }
        }),
        language
      }
    }
  } catch (error) {
    console.error({ error });
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  } finally {
    await db.disconnect();
  }
}