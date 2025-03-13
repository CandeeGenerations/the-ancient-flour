import {DEFAULT_PAGE_SIZE, DEFAULT_PAGINATION_LIMIT} from '@/helpers/constants'
import {cn} from '@/lib/utils'
import {ChevronLeftIcon, ChevronRightIcon} from '@radix-ui/react-icons'
import React from 'react'

import {SelectBox} from '../form'

interface IPagination {
  totalCount: number
  pageNumber: number
  pageSize: number
  /* eslint-disable no-unused-vars */
  onPageChange: (number: number) => void
  onPageSizeChange: (number: number) => void
  /* eslint-enable no-unused-vars */
}

const Pagination = ({
  totalCount,
  pageNumber,
  pageSize = DEFAULT_PAGE_SIZE,
  onPageChange,
  onPageSizeChange,
}: IPagination): React.ReactElement => {
  const maxPages = Math.ceil(totalCount / pageSize)
  const handlePageChange = (e, newPage) => {
    e.preventDefault()

    if (newPage < 1 || newPage > maxPages || newPage === pageNumber) {
      return
    }

    onPageChange(newPage)
  }

  const generatePages = (): React.ReactNode[] => {
    const pages: React.ReactNode[] = []
    let lowerLimit = Math.min(pageNumber, maxPages)
    let upperLimit = Math.min(pageNumber, maxPages)

    for (let i = 1; i < DEFAULT_PAGINATION_LIMIT && i < maxPages; ) {
      if (lowerLimit > 1) {
        lowerLimit--
        i++
      }

      if (i < DEFAULT_PAGINATION_LIMIT && upperLimit < maxPages) {
        upperLimit++
        i++
      }
    }

    if (lowerLimit > 1) {
      pages.push(
        <a
          key="more-pre"
          className="bg-white border-muted-light text-muted-mid relative inline-flex items-center px-4 py-2 border font-medium"
        >
          ...
        </a>,
      )
    }

    for (let i = lowerLimit; i <= upperLimit; i++) {
      pages.push(
        <a
          key={i}
          href="client/src/components#"
          onClick={(e) => handlePageChange(e, i)}
          className={cn(
            i === pageNumber
              ? 'z-10 bg-primary-500 border-primary text-white'
              : 'bg-white border-muted-light text-muted-mid hover:bg-muted-lightest',
            'relative inline-flex items-center px-4 py-2 border font-medium',
          )}
        >
          {i}
        </a>,
      )
    }

    if (upperLimit < maxPages) {
      pages.push(
        <a
          key="more-post"
          className="bg-white border-muted-light text-muted-mid relative inline-flex items-center px-4 py-2 border font-medium"
        >
          ...
        </a>,
      )
    }

    return pages
  }

  return (
    <div className="bg-muted-lightest px-4 flex items-center justify-between border-t border-muted-light sm:px-6 rounded-b-lg">
      <div className="flex-1 flex justify-between sm:hidden">
        <a
          href="#"
          onClick={(e) => handlePageChange(e, pageNumber - 1)}
          className="relative inline-flex items-center px-4 py-2 border border-muted-light font-medium rounded text-muted-medium bg-white hover:bg-muted-lightest"
        >
          Previous
        </a>

        <a
          href="#"
          onClick={(e) => handlePageChange(e, pageNumber + 1)}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-muted-light font-medium rounded text-muted-dark bg-white hover:bg-muted-lightest"
        >
          Next
        </a>
      </div>

      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center divide-x divide-muted-light">
          <div className="pr-3">
            {totalCount > 0 ? (
              <p className="text-muted-medium">
                Showing <span className="font-medium">{(pageNumber - 1) * pageSize + 1}</span> to{' '}
                <span className="font-medium">{pageNumber === maxPages ? totalCount : pageSize * pageNumber}</span> of{' '}
                <span className="font-medium">{totalCount}</span> results
              </p>
            ) : (
              <p className="text-muted-medium">
                <span className="font-medium">{totalCount}</span> results
              </p>
            )}
          </div>

          <div className="py-3 pl-3 pr-6 !border-r border-muted-light relative">
            <SelectBox
              horizontal
              label="Page size:"
              value={pageSize.toString()}
              onChange={(value) => onPageSizeChange(Number(value))}
              values={[10, 25, 50, 100].map((x) => x.toString())}
            />
          </div>
        </div>

        <div>
          <nav className="relative z-0 inline-flex rounded shadow-sm -space-x-px" aria-label="Pagination">
            <a
              href="#"
              onClick={(e) => handlePageChange(e, pageNumber - 1)}
              className="relative inline-flex items-center px-2 py-2 rounded-l border border-muted-light bg-white font-medium text-muted-mid hover:bg-muted-lightest"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>

            {generatePages()}

            <a
              href="#"
              onClick={(e) => handlePageChange(e, pageNumber + 1)}
              className="relative inline-flex items-center px-2 py-2 rounded-r border border-muted-light bg-white font-medium text-muted-mid hover:bg-muted-lightest"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination
