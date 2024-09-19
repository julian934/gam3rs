import React from 'react'
import { Suspense } from 'react'
import { useQuery } from '@tanstack/react-query'
import { filteredUpcomingLives } from '@/app/lib/database/connections'
type Props = {}

const UpcomingLives = (props: Props) => {
  const {data}=useQuery({
    queryKey:['filteredUpcomingLives'],
    queryFn:filteredUpcomingLives
  })
  return (
    <div>UpcomingLives
        <Suspense fallback={<div className='' >Loading Spinner...</div>} > 

        </Suspense>
    </div>
  )
}

export default UpcomingLives