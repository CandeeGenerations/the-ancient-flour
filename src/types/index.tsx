/* eslint-disable no-unused-vars */
import React from 'react'

export type ParentNode = (props: {
  child: React.ReactNode
  onSubmit: () => Promise<void>
  onDelete?: () => Promise<boolean>
  submitEnabled?: boolean
  submitting?: boolean
  deleting?: boolean
}) => React.ReactElement
