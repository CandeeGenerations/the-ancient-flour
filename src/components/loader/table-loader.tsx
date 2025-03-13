import {cn} from '@/lib/utils'
import {sentenceCase} from 'change-case-all'

import {Card} from '../card'
import {IColumnHeader} from '../table/sortable-table'
import {Skeleton} from '../ui/skeleton'

export interface ITableLoader {
  columns: IColumnHeader[]
  hasActions?: boolean
  hasFilters?: boolean
}

const TableLoaderRow = ({colSpan}: {colSpan: number}) => (
  <>
    {[0, 1, 2].map((x) => (
      <tr key={x}>
        <td colSpan={colSpan} className={cn(x === 0 ? 'pt-4' : x === 2 ? 'pb-4' : 'py-2', 'px-6 w-full')}>
          <Skeleton className={cn('h-6', x === 0 ? 'w-full' : x === 1 ? 'w-1/2' : 'w-3/4')} />
        </td>
      </tr>
    ))}
  </>
)

export const TableLoader = ({columns, hasActions = false, hasFilters = false}: ITableLoader) => {
  return (
    <Card noPadding>
      <div className="space-y-0">
        {hasFilters && (
          <div className="bg-muted-lightest border-b border-muted-light mb-0 px-6 py-4 flex flex-col sm:flex-row gap-3 sm:gap-6 sm:items-center rounded-t-lg h-[71px]" />
        )}

        <div className="overflow-y-auto rounded-t-lg">
          <table className="min-w-full divide-y divide-muted-light">
            <thead className="bg-muted-lightest">
              <tr>
                {columns.length > 0 ? (
                  <>
                    {columns.map(({name, maintainCase}, index) => (
                      <th
                        key={index}
                        scope="col"
                        className={cn(
                          'px-6 py-3 text-left font-medium text-muted-mid tracking-wider',
                          index === columns.length - 1 ? '' : 'border-r border-muted-light',
                        )}
                      >
                        <div className="flex">
                          <div className="flex-grow">{maintainCase ? name : sentenceCase(name)}</div>
                        </div>
                      </th>
                    ))}

                    {hasActions && <th scope="col" className="border-l border-muted-light px-6 py-3 tracking-wider" />}
                  </>
                ) : (
                  <th scope="col" className="px-6 py-3 text-left font-medium text-muted-mid tracking-wider">
                    ...
                  </th>
                )}
              </tr>
            </thead>

            <tbody className="bg-white">
              <TableLoaderRow colSpan={columns.length + 2} />
            </tbody>
          </table>
        </div>

        <div className="bg-muted-lightest px-4 flex items-center justify-between border-t border-muted-light sm:px-6 rounded-b-lg h-[62px]" />
      </div>
    </Card>
  )
}

export default TableLoader
