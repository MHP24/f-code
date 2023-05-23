import { useState } from 'react';
import Image from 'next/image';
import Editor from '@monaco-editor/react';
import { MainLayout } from '@/components/layouts';
import { Button, ErrorLabel, FormInput, FormSelect, MarkdownWriter, TagSelector } from '@/components/ui';
import { difficulties, technologies } from '@/mocks';
import { ISelect } from '@/interfaces';
import styles from '@/styles/submit.module.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { regExValidators } from '@/utils';
import { fCodeApi } from '@/api';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Inputs {
  challengeName: string;
  parameterCount: number;
  parameters: string;
  functionName: string;
  case1: string;
  case2: string;
  case3: string;
  case4: string;
};

const SubmitPage = () => {

  const [technology, setTechnology] = useState<ISelect>(technologies[0]);
  const [difficulty, setDifficulty] = useState<ISelect>(difficulties[0]);
  const [tags, setTags] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string>('_Write your description here..._');
  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const router = useRouter();


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
      technology: technology.value
    }

    try {
      const { data: { outputs } } = await fCodeApi.post('/creators/challenges/test?type=create', initialData)
      setOutput(outputs.map(({ execution }: any) => `${execution}`).join(', \n'));

      const submitData = {
        ...initialData,
        cases: initialData.cases.map(({ call }, i) => {
          return { call, expectedOutput: outputs[i].execution }
        }),
        instructions,
        tags,
        difficulty: difficulty.value,
        reason: 'create'
      };


      await fCodeApi.post('/creators/challenges/submit', submitData);

      //TODO Redirect to creator pannel || show modal

      // setTimeout(() => {
      //   router.push('/challenges');
      // }, 2000);

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
      pageDescription={'Create a new challenge for fcode users'}
      title={'FCode - Create a challenge'}
    >
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
    </MainLayout>
  );
}

export default SubmitPage;