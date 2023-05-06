import { MainLayout } from '@/components/layouts';
import { FormInput, FormSelect } from '@/components/ui';
import { useRef, useState } from 'react';
import { technologies } from '../../mocks/technologies.json';
import { difficulties } from '../../mocks/difficulties.json';
import { tags } from '../../mocks/tags.json';
import styles from '../../styles/submit.module.css';
import { editor } from 'monaco-editor';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import Editor from '@monaco-editor/react';

const SubmitPage = () => {
  const [technology, setTechnology] = useState<string>('Set a technology');
  const [difficulty, setDifficulty] = useState<string>('Set a difficulty');
  const [tagsSelected, setTagsSelected] = useState<string[]>([]);
  const [tagsNotSelected, setTagsNotSelected] = useState<string[]>(tags);
  const [instructions, setInstructions] = useState<string>('_Write your description here..._');


  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const handleEditor = (editor: editor.IStandaloneCodeEditor) => editorRef.current = editor;

  const handleTagSelection = (tag: string, add: boolean) => {
    if (add) {
      if (tagsSelected.length === 2) return;
      setTagsNotSelected(tagsNotSelected.filter(_tag => _tag !== tag))
      setTagsSelected([...tagsSelected, tag]);
      return;
    }
    setTagsSelected(tagsSelected.filter(_tag => _tag !== tag));
    setTagsNotSelected([...tagsNotSelected, tag]);
  }

  return (
    <MainLayout
      pageDescription={'Create a new challenge for fcode users'}
      title={'FCode - Create a challenge'}
    >
      <form className={styles.form}>
        <div className={styles.formGroup1}>
          <FormInput
            name='challengeName'
            placeHolder='example name'
            label='Challenge name'
          />

          <FormSelect
            label='Difficulty'
            options={difficulties}
            setter={setDifficulty}
            currentOption={difficulty}
          />
        </div>

        <div className={styles.formGroup2}>
          <FormSelect
            label='Technology'
            options={technologies}
            setter={setTechnology}
            currentOption={technology}
          />

          <div className={styles.selectedTags}>
            {
              tagsSelected.map(tag => (
                <p
                  className={styles.tag}
                  key={`tag-selected-${tag}`}
                  onClick={() => handleTagSelection(tag, false)}
                >
                  {tag}
                </p>
              ))
            }
          </div>

        </div>

        <div className={styles.tags}>
          {
            tagsNotSelected.map(tag => (
              <p
                className={styles.tag}
                key={`tag-not-selected-${tag}`}
                onClick={() => handleTagSelection(tag, true)}
              >
                {tag}
              </p>
            ))
          }
        </div>

        <div className={styles.recommendationsContainer}>
          <h3 className={styles.recommendationsTitle}>Tips for a good description</h3>
          <ul className={styles.recommendations}>
            <li>Be precise</li>
            <li>Be consistent</li>
            <li>Give examples to make it easier to understand</li>
            <li>Highlight important information</li>
          </ul>
        </div>

        <div className={styles.formGroup3}>
          <div className={styles.instructionsContainer}>
            <label className={styles.instructionsTitle}>{'Instructions Input (Markdown Syntax)'}</label>

            <Editor
              className={styles.instructionsInput}
              defaultLanguage={'markdown'}
              theme={'vs-dark'}
              onChange={(value) => setInstructions(`${value}`)}
              onMount={handleEditor}
              options={{
                fontSize: 16,
                lineHeight: 1.4,
                fontLigatures: true,
                lineNumbers: 'off',
              }}
              value={instructions}
            />
          </div>

          <div className={styles.instructionsContainer}>
            <label className={styles.instructionsTitle}>{'Instructions Output (Markdown)'}</label>
            <ReactMarkdown
              className={styles.markdownArea}
              remarkPlugins={[remarkGfm]}>
              {instructions}
            </ReactMarkdown>
          </div>

        </div>
      </form>

    </MainLayout>
  );
}

export default SubmitPage;