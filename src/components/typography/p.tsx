import {cn} from '@/lib/utils'
import React from 'react'

/**
 * ParagraphProps interface for the P component
 */
interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
  className?: string
}

/**
 * P component for rendering paragraphs with consistent styling
 * @param props - Component props
 * @param props.children - Content to be rendered inside the paragraph
 * @param props.className - Additional CSS classes to apply
 */
const P = ({children, className}: ParagraphProps): React.ReactElement => {
  return <p className={cn('text-muted-foreground leading-5 [&:last-child]:mb-4', className)}>{children}</p>
}

export default P
