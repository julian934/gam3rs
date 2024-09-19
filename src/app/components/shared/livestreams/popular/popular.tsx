import React from 'react'
import { Suspense } from 'react'
import { useQuery } from '@tanstack/react-query'
import { filteredPopLives } from '@/app/lib/database/connections'
import type { User } from '@/app/lib/context/storeContext'
type Props = {}

const Popular = (props: Props) => {
  const {data}=useQuery({
    queryKey:['poplives'],
    queryFn:filteredPopLives
  })
  
  return (
    <div>
        <h1 className='' >Popular LiveStreams</h1>
        <Suspense fallback={<div className='' >Loading Spinner...</div>} >

        </Suspense>
        </div>
  )
}

export default Popular