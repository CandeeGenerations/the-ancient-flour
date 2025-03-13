import {ISelectBoxValues} from '@/components/form/select-box'
import {yupResolver} from '@hookform/resolvers/yup'
import {format} from 'date-fns'
import {NextRouter} from 'next/router'
import {ValidationMode} from 'react-hook-form'
import {toast} from 'sonner'
import * as yup from 'yup'

import {DEFAULT_DATE_FORMAT} from './constants'

export function isStringArray(values: (string | ISelectBoxValues)[]): values is string[] {
  return values.every((x) => typeof x === 'string')
}

export const popToast = async (router: NextRouter, entity: string, pathname?: string) => {
  if (router.query['s'] === 'true') {
    toast.success(`The ${entity} has been saved.`, {id: 'success'})
    await router.replace(pathname || router.pathname, undefined, {shallow: true})
  } else if (router.query['d'] === 'true') {
    toast.error(`The ${entity} has been deleted.`, {id: 'delete'})
    await router.replace(pathname || router.pathname, undefined, {shallow: true})
  } else if (router.query['u'] === 'true') {
    toast.error(`You don't have access to this ${entity} or it doesn't exist.`, {id: 'unauthorized'})
    await router.replace(pathname || router.pathname, undefined, {shallow: true})
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const applySort = (sort: {column: string; asc: boolean}, dataset: any) =>
  dataset.slice().sort((a, b) =>
    ((sort.asc ? a : b)[sort.column] || '').toString().localeCompare((sort.asc ? b : a)[sort.column] || '', undefined, {
      numeric: true,
    }),
  )

export const formatDate = (date: string | Date): string | undefined =>
  date ? format(new Date(date), DEFAULT_DATE_FORMAT) : undefined

export const addCommas = (num: number): string => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export const getFileSize = (size: number): string => {
  if (size < 1000) {
    return `${size} bytes`
  }

  let computedSize = size / 1024

  if (computedSize < 1000) {
    return `${Math.ceil(computedSize)} kbs`
  }

  computedSize = computedSize / 1024

  if (computedSize < 1000) {
    return `${Math.ceil(computedSize)} mbs`
  }

  computedSize = computedSize / 1024

  if (computedSize < 1000) {
    return `${Math.ceil(computedSize)} gbs`
  }

  computedSize = computedSize / 1024

  if (computedSize < 1000) {
    return `${Math.ceil(computedSize)} tbs`
  }

  return ''
}

export function getForm<TFieldValues>(defaultValues: TFieldValues, yupObject, mode: keyof ValidationMode = 'onBlur') {
  return {
    defaultValues,
    mode,
    resolver: yupObject && yupResolver(yupObject),
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const requiredString = (label: string, schema?: any) => {
  if (!schema) {
    schema = yup.string()
  }

  return schema.required().label(label)
}

export const validEmail = (email: string): boolean =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email.toLowerCase().trim(),
  )

export const generateString = (
  length = 32,
  includeSpecialCharacters = false,
  includeUppercaseCharacters = false,
  includeNumbers = false,
): string => {
  let result = ''
  let characters = 'abcdefghijklmnopqrstuvwxyz'

  if (includeUppercaseCharacters) {
    characters = `${characters}ABCDEFGHIJKLMNOPQRSTUVWXYZ`
  }

  if (includeNumbers) {
    characters = `${characters}0123456789`
  }

  if (includeSpecialCharacters) {
    characters = `${characters}!@#$%^&*()_+-=[];",./{}|:<>?`
  }

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result
}
