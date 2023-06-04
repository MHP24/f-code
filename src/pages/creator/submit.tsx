import { useState } from 'react';
import Image from 'next/image';
import Editor from '@monaco-editor/react';
import { MainLayout } from '@/components/layouts';
import { Button, ErrorLabel, FormInput, FormSelect, MarkdownWriter, TagSelector } from '@/components/ui';
import { difficulties, technologies } from '@/mocks';
import { ISelect } from '@/interfaces';
import styles from '@/styles/submit.module.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { regExValidators, toaster } from '@/utils';
import { fCodeApi } from '@/api';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';

interface Inputs {
  challengeName: string;
  parameterCount: string;
  parameters: string;
  functionName: string;
  [key: string]: string;
};

const SubmitPage = () => {

  const [technology, setTechnology] = useState<ISelect>(technologies[0]);
  const [difficulty, setDifficulty] = useState<ISelect>(difficulties[0]);
  const [tags, setTags] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string>('_Write your description here..._');
  const [code, setCode] = useState<string>('');
  const [outputs, setOutputs] = useState<{ execution: any }[] | null>(null);
  const { register, watch, handleSubmit, formState: { errors } } = useForm<Inputs>({
    defaultValues: {
      parameterCount: '1'
    }
  });

  const router = useRouter();

  const paramCount = Number(watch('parameterCount'));

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {

    const {
      challengeName, parameterCount,
      parameters, functionName, ...rest } = formData;

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

    const casesCleaned = casesArray.map(arr => arr.slice(0, paramCount));

    const cases = casesCleaned.map((element) => {
      return { call: `${functionName}(${element.join(', ')})` }
    })

    if (!code || !instructions || tags.length < 2) return;
    const initialData = {
      ...formData,
      cases,
      code,
      technology: technology.value
    }

    try {
      const { data: { outputs } } = await fCodeApi.post('/creators/challenges/test?type=create', initialData);
      setOutputs(outputs);

      const submitData = {
        ...initialData,
        cases: initialData.cases.map(({ call }, i) => {
          return { call, expectedOutput: outputs[i].execution }
        }),
        instructions,
        tags,
        difficulty: difficulty.value,
        caseSchema: casesCleaned,
      };

      await fCodeApi.post('/creators/challenges/submit?type=create', submitData);

      toaster('Success!, Redirecting to your creator panel...', true);

      setTimeout(() => {
        router.push('/creator');
      }, 4500);
    } catch (error) {

      setOutputs(
        [{
          execution: axios.isAxiosError(error) ?
            `${error.response?.data.error}`
            : 'Unexpected error'
        }]
      );

      const errorData = axios.isAxiosError(error) ?
        `${error.response?.data.error}`
        : 'Unexpected error';

      setOutputs(
        [{
          execution: errorData
        }]
      );

      toaster(errorData, false);
    }
  }

  return (
    <MainLayout
      pageDescription={'Create a new challenge for fcode users'}
      title={'FCode - Create a challenge'}
    >
      <Toaster
        position='bottom-left'
        reverseOrder={false}
      />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.formStep1}>
          <div className={styles.formBasic}>
            <div className={styles.challengeName}>
              <FormInput
                placeHolder='example name'
                label='Challenge name'
                {...register('challengeName', { pattern: regExValidators.charactersNumbersSpaces, required: true })}
              />

              {errors.challengeName?.type === 'required' && <ErrorLabel text={'This field is required'} />}
              {errors.challengeName?.type === 'pattern' && <ErrorLabel text={'Invalid challenge name'} />}
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


          <div className={styles.functionDetails}>

            <div>
              <FormInput
                placeHolder='Parameter count'
                label='Parameter count'
                type='number'
                {...register('parameterCount', { min: 1, pattern: regExValidators.numbersOnly, required: true })}
              />
              {errors.parameterCount?.type === 'required' && <ErrorLabel text={'This field is required'} />}
              {errors.parameterCount?.type === 'min' && <ErrorLabel text={'Invalid quantity'} />}
              {errors.parameterCount?.type === 'pattern' && <ErrorLabel text={'Provide a number'} />}
            </div>

            <div>
              <FormInput
                placeHolder='n1, n2, n3...'
                label='Parameters (separated by comma)'
                {...register('parameters', { pattern: regExValidators.parametersStructure, required: true })}
              />

              {errors.parameters?.type === 'pattern' && <ErrorLabel text={'Invalid structure (n1, n2, n3)'} />}
              {errors.parameters?.type === 'required' && <ErrorLabel text={'This field is required'} />}

            </div>


            <div>
              <FormInput
                placeHolder='generateExample'
                label='Function name'
                {...register('functionName', {
                  pattern: (
                    technology.value !== 'python' ? regExValidators.charactersOnly
                      : regExValidators.snakeCase
                  ),
                  required: true
                })}
              />

              {errors.functionName?.type === 'pattern' && <ErrorLabel text={'Invalid structure (snake_case/cammelCase)'} />}
              {errors.functionName?.type === 'required' && <ErrorLabel text={'This field is required'} />}
            </div>

          </div>

          <div className={styles.codeTester}>
            <div className={styles.codeContainer}>
              <h3 className={styles.recommendationsTitle}>Paste/write your code here</h3>
              <Editor
                className={styles.editor}
                defaultLanguage={'txt'}
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
                        <div className={`${styles.case} ${paramCount > 1 && styles.caseNoBg}`} key={`challenge-case-${i + 1}`}>
                          {
                            Array(Number(paramCount ?? 0 + 1)).fill('').map((_, j) => {
                              return (
                                <FormInput
                                  key={`case${i + 1}param${j + 1}`}
                                  placeHolder={`Case ${i + 1}, Arg ${j + 1}`}
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
    </MainLayout>
  );
}

export default SubmitPage;