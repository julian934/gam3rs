'use client'
import React from 'react'
import { Suspense } from 'react'
import Spinner from '@/app/components/ui/spinner/spinner'
import { useQuery } from '@tanstack/react-query'
import { filteredLastestLives } from '@/app/lib/database/connections'
type Props = {}

const RecentLives = (props: Props) => {
  const {data}=useQuery({
    queryKey:['latestlives'],
    queryFn:filteredLastestLives
  })
  return (
    <div className='flex' >
        <h1 className='' >Recent Livestreams</h1>
        <Suspense fallback={<div className='flex justify-center self-center' ><Spinner/></div>} >

        </Suspense>
    </div>
  )
}

export default RecentLives