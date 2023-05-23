import { MainLayout } from '@/components/layouts';
import Image from 'next/image';
import { db } from '@/database';
import { IChallenge, ISession } from '@/interfaces';
import { Challenge } from '@/models';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import styles from '@/styles/submit.module.css';
import { ErrorLabel, FormInput, TagSelector, MarkdownWriter, Button } from '@/components/ui';
import { SubmitHandler, useForm } from 'react-hook-form';
import { regExValidators } from '@/utils';
import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { fCodeApi } from '@/api';
import axios from 'axios';

// interface Props {
//   _id: string;
//   slug: string;
//   tags: string[];
//   instructions: string;
//   functionName: string;
//   parameters: string[]
//   solution: string;
//   cases: {
//     call: string;
//   }[];
//   language: string;
//   difficulty: number;
// }

interface Inputs {
  challengeName: string;
  case1: string;
  case2: string;
  case3: string;
  case4: string;
};

const Slug: NextPage<IChallenge> = (
  { _id, slug, tags: challengeTags,
    instructions: challengeInstructions,
    functionName, parameters,
    solution, cases, language, difficulty
  }) => {

  const [instructions, setInstructions] = useState<string>(challengeInstructions);
  const [code, setCode] = useState<string>(solution);
  const [tags, setTags] = useState<string[]>(challengeTags);
  const [output, setOutput] = useState('')

  const slugFormatted = slug.replace(/\_/g, ' ').replace(/^\w/, w => w.toUpperCase());

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    defaultValues: {
      challengeName: slugFormatted,
      case1: cases[0].call,
      case2: cases[1].call,
      case3: cases[2].call,
      case4: cases[3]?.call ?? ''
    }
  });

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    if (!code || !instructions || tags.length < 2) return;

    const initialData = {
      ...formData,
      cases: [
        { call: formData.case1 },
        { call: formData.case2 },
        { call: formData.case3 },
        { call: formData.case4 }
      ],
      code,
      functionName,
      parameterCount: parameters.length,
      parameters: `${parameters.join(', ')}`,
      technology: language,
      difficulty
    }

    try {
      const { data: { outputs } } = await fCodeApi.post('/creators/challenges/test?type=update', initialData)
      setOutput(outputs.map(({ execution }: any) => `${execution}`).join(', \n'));

      const submitData = {
        ...initialData,
        cases: initialData.cases.map(({ call }, i) => {
          return { call, expectedOutput: outputs[i].execution }
        }),
        instructions,
        tags,
        reason: 'update'
      };

      await fCodeApi.post('/creators/challenges/submit?type=update', submitData);

    } catch (error) {
      setOutput(
        axios.isAxiosError(error) ?
          `${error.response?.data.error}`
          : 'Unexpected error'
      )
    }
  }


  return (
    <MainLayout
      pageDescription={`FCode - Edit challenge ${slugFormatted}`}
      title={`FCode - Edit ${slugFormatted}`}
    >
      <div className={styles.challengeHeader}>
        <Image
          src={`/techs/${language.toLowerCase()}.svg`}
          alt='Select a language'
          width={130}
          height={130}
        />

        <h2 className={styles.challengeName}>{slugFormatted}</h2>
      </div>


      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
                  <p>{output}</p>
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
      .select('_id slug tags instructions functionName parameters solution cases difficulty')
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