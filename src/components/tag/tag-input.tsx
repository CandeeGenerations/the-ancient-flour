import React, {useEffect, useRef, useState} from 'react'

import {Input} from '../ui/input'

interface ITagInput {
  value: string
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void
}

const TagInput = ({value, onChange}: ITagInput): React.ReactElement => {
  const [inputValue, setInputValue] = useState(value)
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.focus()
    }
  }, [])

  return (
    <Input
      ref={ref}
      value={inputValue}
      onFocus={(e) => e.target.select()}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onChange(inputValue)
        }
      }}
      onBlur={() => onChange(inputValue)}
    />
  )
}

export default TagInput
