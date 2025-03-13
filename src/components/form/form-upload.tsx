import {getFileSize} from '@/helpers'
import {Cross1Icon, FileTextIcon, UploadIcon} from '@radix-ui/react-icons'
import React, {useEffect, useState} from 'react'
import {Accept, useDropzone} from 'react-dropzone'
import {Control, Controller, UseFormSetValue} from 'react-hook-form'
import ReactMarkdown from 'react-markdown'

import {ExternalA} from '../typography'

interface IFormUpload {
  name: string
  label?: string
  fileTypes?: string
  required?: boolean
  maxSize?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, object>
  reset: number
  accept?: Accept
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue?: UseFormSetValue<any>
  alert?: React.ReactElement
  multiple?: boolean
  helpText?: string
}

const FormUpload = ({
  name,
  control,
  required,
  label,
  setValue,
  fileTypes = 'Any',
  maxSize = '10MB',
  reset = 0,
  accept = {'application/json': ['.json']},
  alert,
  multiple = false,
  helpText,
}: IFormUpload): React.ReactElement => {
  const [dragClass, setDragClass] = useState<string>('')
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([])

  const {getRootProps, getInputProps} = useDropzone({
    accept,
    maxFiles: 100,
    multiple,
    maxSize: 10485760, // 10MB
    onDragEnter: () => setDragClass('border-secondary-600'),
    onDragLeave: () => setDragClass(''),
    onDropAccepted: (droppedFiles: File[]) => {
      const newFiles = [...acceptedFiles, ...droppedFiles]
      setAcceptedFiles(newFiles)
      if (setValue) {
        setValue(name, multiple ? newFiles : newFiles[0])
      }
    },
  })

  useEffect(() => {
    setAcceptedFiles([])
  }, [reset])

  return (
    <Controller
      control={control}
      name={name}
      render={() => (
        <div>
          {label && (
            <label className="block font-bold text-muted-medium">
              {label}
              {required && <span className="ml-1 text-destructive-medium">*</span>}
            </label>
          )}

          {alert}

          {acceptedFiles.length > 0 && (
            <div className="mt-2 mb-5">
              {acceptedFiles.map((file, i) => (
                <div key={i} className="flex items-center">
                  <FileTextIcon className="h-5 w-5 text-muted-medium" />

                  <p className="ml-2 text-muted-dark">
                    {file.name} ({getFileSize(file.size)})
                  </p>

                  <Cross1Icon
                    className="ml-2 h-5 w-5 text-danger cursor-pointer"
                    onClick={() => {
                      const newFiles = [...acceptedFiles]
                      newFiles.splice(i, 1)
                      setAcceptedFiles(newFiles)

                      if (setValue) {
                        setValue(name, '')
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          <div
            {...getRootProps({
              className: `${
                dragClass || 'border-muted-light'
              } transition-all mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded cursor-pointer bg-muted-lightest`,
            })}
          >
            <div className="space-y-1 text-center">
              <UploadIcon className="mx-auto mb-5 h-10 w-10 text-secondary" />

              <div className="flex text-muted-medium">
                <label
                  htmlFor={name}
                  className="cursor-pointer relative rounded text-secondary hover:text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                >
                  <span>Upload a file</span>

                  <input {...getInputProps()} />
                </label>

                <p className="pl-1">or drag and drop</p>
              </div>

              <p className="text-xs override text-muted-mid">
                {fileTypes} file types up to {maxSize}
              </p>
            </div>
          </div>

          {helpText && (
            <p className="mt-2 text-muted-mid">
              <ReactMarkdown components={{a: ExternalA}}>{helpText}</ReactMarkdown>
            </p>
          )}
        </div>
      )}
    />
  )
}

export default FormUpload
