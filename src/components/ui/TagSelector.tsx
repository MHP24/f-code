import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { tags } from '../../mocks/tags';
import styles from '../styles/tagSelector.module.css'

interface Props {
  setTagsSelected: Dispatch<SetStateAction<string[]>>;
  tagsSelected: string[];
}


export const TagSelector: FC<Props> = ({ tagsSelected, setTagsSelected }) => {
  const [tagsNotSelected, setTagsNotSelected] = useState<string[]>(tags);

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
    <div className={styles.tagSelector}>
      <div className={styles.currentTags}>
        <label>Tags</label>
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

      <div className={styles.tagPool}>
        <label
          className={`${tagsSelected.length === 2 ? styles.tagsOk : styles.tagsRequired}`}
        > {!(2 - tagsSelected.length) ? `Done!` : `Select ${(2 - tagsSelected.length)} tag(s)`} </label>
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
      </div>
    </div>
  )
}
