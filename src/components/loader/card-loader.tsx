import {Card} from '../card'
import {ICard} from '../card/card'
import {Skeleton} from '../ui/skeleton'

export const CardLoader = (props: ICard) => {
  return (
    <Card {...props} contentClassName="space-y-2">
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-6 w-3/4" />
    </Card>
  )
}

export default CardLoader
