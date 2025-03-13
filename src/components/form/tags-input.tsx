import {Alert} from '@/components/alert'
import {Tag, TagInput} from '@/components/tag'
import {validEmail} from '@/helpers'
import {cn} from '@/lib/utils'
import {sentenceCase} from 'change-case-all'
import React, {useState} from 'react'
import TagsInput from 'react-tagsinput'

interface ITag {
  id: string
  text: string
}

interface ITagsInput {
  label?: string
  placeholder?: string
  required?: boolean
  tags?: ITag[]
  horizontal?: boolean
  type?: 'email' | 'text'
  /* eslint-disable no-unused-vars */
  onEdit?: (item: {text: string; id: string}, index: number) => void
  onAdd: (item: {text: string; id: string}) => void
  onDelete: (index: number) => void
  /* eslint-enable no-unused-vars */
  tooltip?: React.ReactNode
  id?: string
  caseSensitive?: boolean
}

const TagsInputComponent = ({
  onEdit,
  onAdd,
  onDelete,
  type = 'text',
  tags = [],
  label,
  horizontal = false,
  required = false,
  caseSensitive = false,
  placeholder = 'item',
  // tooltip,
  id,
}: ITagsInput): React.ReactElement => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const [focusedTagKey, setFocusedTagKey] = useState<number | undefined>(undefined)

  const handleAddItem = (item) => {
    if (type === 'email' && !validEmail(item.text)) {
      setErrorMessage(`The ${placeholder} must be a valid email address.`)
      setFocusedTagKey(undefined)
    } else if (
      caseSensitive
        ? tags.some((x) => x.text.trim() === item.text.trim())
        : tags.some((x) => x.text.toLowerCase().trim() === item.text.toLowerCase().trim())
    ) {
      setErrorMessage(`This ${placeholder} already exists. Please try another.`)
      setFocusedTagKey(undefined)
    } else {
      setErrorMessage(undefined)
      setFocusedTagKey(undefined)
      onAdd({...item, text: item.text.trim()})
    }
  }

  const handleEditItem = (tag: ITag, value: string, key: number) => {
    if (type === 'email' && !validEmail(value)) {
      setErrorMessage(`The ${placeholder} must be a valid email address.`)
      setFocusedTagKey(undefined)
    } else if (
      caseSensitive
        ? tags.some((x) => x.id !== tag.id && x.text.trim() === value.trim())
        : tags.some((x) => x.id !== tag.id && x.text.toLowerCase().trim() === value.toLowerCase().trim())
    ) {
      setErrorMessage(`This ${placeholder} already exists. Please try another.`)
      setFocusedTagKey(undefined)
    } else {
      setErrorMessage(undefined)
      setFocusedTagKey(undefined)
      onEdit({...tag, text: value.trim()}, key)
    }
  }

  const handleDeleteItem = (i) => {
    setErrorMessage(undefined)
    setFocusedTagKey(undefined)
    onDelete(i)
  }

  const handleTagClick = (i) => {
    if (onEdit) {
      setErrorMessage(undefined)
      setFocusedTagKey(i)
    } else {
      navigator.clipboard.writeText(tags[i].text)
    }
  }

  return (
    <div className={cn(horizontal ? 'sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 w-full' : '')}>
      {label && (
        <div className="text-muted-medium font-bold">
          {sentenceCase(label)}
          {required && <span className="ml-1 text-destructive-medium">*</span>}
        </div>
      )}

      <div className={cn(horizontal ? 'sm:col-span-2 sm:mt-0' : '', 'space-y-4')}>
        <TagsInput
          value={tags}
          onChange={(tags) => handleAddItem({...tags[tags.length - 1], id: tags.length})}
          tagDisplayProp="text"
          className="mt-1"
          inputProps={{
            id,
            className:
              'focus:ring-2 focus:ring-offset-2 focus:ring-secondary-300 focus:border-secondary-300 border-muted-light rounded shadow-sm block w-full border py-2 px-4 outline-0',
            placeholder: `Press Enter to add another ${placeholder}...`,
          }}
          renderTag={({tag, key, getTagDisplayValue}) =>
            focusedTagKey === key && onEdit ? (
              <TagInput
                key={key}
                value={getTagDisplayValue(tag)}
                onChange={(value) => handleEditItem(tag, value, key)}
              />
            ) : (
              <Tag key={key} onRemove={() => handleDeleteItem(key)} onClick={() => handleTagClick(key)}>
                {getTagDisplayValue(tag)}
              </Tag>
            )
          }
          renderLayout={(tagElements, inputElement) => (
            <div>
              {inputElement}

              <div className="mt-3 flex flex-wrap gap-2">{tagElements}</div>
            </div>
          )}
        />

        {errorMessage && <Alert variant="destructive" message={errorMessage} title="An error occurred" />}
      </div>
    </div>
  )
}

export default TagsInputComponent
