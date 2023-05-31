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


interface Inputs {
  [key: string]: string;
};


const Slug: NextPage<IChallenge> = (
  { _id, slug, tags: challengeTags,
    instructions: challengeInstructions,
    functionName, parameters,
    solution, caseSchema, language, difficulty
  }) => {

  const [instructions, setInstructions] = useState<string>(challengeInstructions);
  const [code, setCode] = useState<string>(solution);
  const [tags, setTags] = useState<string[]>(challengeTags);
  const [outputs, setOutputs] = useState<{ execution: any }[] | null>(null);

  const slugFormatted = slug.replace(/\_/g, ' ').replace(/^\w/, w => w.toUpperCase());

  let paramCases = {};

  Array(4).fill('').forEach((_, i) => {
    return Array((parameters.length ?? 0)).fill('').forEach((_, j) => {
      const propertyName = `case${i + 1}param${j + 1}`;
      const propertyValue = caseSchema[i][j];
      const obj: Inputs = {};
      obj[propertyName] = propertyValue;
      paramCases = { ...paramCases, ...obj };
    });
  });


  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      challengeName: slugFormatted,
      ...paramCases

    }
  });

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {

    const {
      challengeName, ...rest } = formData;

    const casesArray: string[][] = [];

    Object.keys(rest).forEach(key => {
      const [caseKey, paramKey] = key.split("param");
      const caseNumber = Number(caseKey.slice(4));
      const paramNumber = Number(paramKey);
      if (!casesArray[caseNumber - 1]) {
        casesArray[caseNumber - 1] = [];
      }
      casesArray[caseNumber - 1][paramNumber - 1] = rest[key];
    });

    const casesCleaned = casesArray.map(arr => arr.slice(0, parameters.length));

    const cases = casesCleaned.map((element) => {
      return { call: `${functionName}(${element.join(', ')})` }
    })

    if (!code || !instructions || tags.length < 2) return;
    const initialData = {
      ...formData,
      challengeName: slug,
      cases,
      code,
      technology: language,
      parameterCount: parameters.length,
      parameters: parameters.join(', '),
      functionName
    }

    try {
      const { data: { outputs } } = await fCodeApi.post('/creators/challenges/test?type=update', initialData);
      setOutputs(outputs);

      const submitData = {
        ...initialData,
        cases: initialData.cases.map(({ call }, i) => {
          return { call, expectedOutput: outputs[i].execution }
        }),
        instructions,
        tags,
        difficulty,
        caseSchema: casesCleaned,
      };

      await fCodeApi.post('/creators/challenges/submit?type=update', submitData);

    } catch (error) {
      setOutputs(
        [{
          execution: axios.isAxiosError(error) ?
            `${error.response?.data.error}`
            : 'Unexpected error'
        }]
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

                  {

                    Array(Number(4)).fill('').map((_, i) => {
                      return (
                        <div className={styles.case} key={`challenge-case-${i + 1}`}>
                          {
                            Array(Number(parameters.length ?? 0 + 1)).fill('').map((_, j) => {
                              return (
                                <FormInput
                                  key={`case${i + 1}param${j + 1}`}
                                  placeHolder='?'
                                  {...register(`case${i + 1}param${j + 1}`, { required: true })}
                                />)
                            })
                          }
                        </div>
                      )
                    })

                  }


                </div>

                <div className={styles.results}>
                  {
                    outputs?.map((xce, i) => {
                      return (
                        <code
                          key={`execution-${i}`}
                          className={styles.result}
                        >
                          {JSON.stringify(xce.execution) || 'undefined'}
                        </code>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className={styles.sendBtn}
        >
          <Button
            size={1}
            text='Test and submit'
          />
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
      .select('_id slug tags instructions functionName parameters solution caseSchema difficulty')
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