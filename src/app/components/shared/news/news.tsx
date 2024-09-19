'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import Banner from '../banners/home/banner'
import { CarouselDemo } from '../carousel/newsCarousel'
import { Suspense } from 'react'
import Skeleton from '../../ui/skeleton/skeleton'
import { getNews } from '@/app/lib/actions/connections'
type Props = {}
//Configure props.
const News = ({user}:any) => {
    const {data}=useQuery({
      queryKey:['news'],
      queryFn:getNews
    })
    
  return (
    <div className='flex bg-slate-200 md:w-full md:h-1/2 flex-col rounded-lg md:justify-between' >
      <h1 className='flex justify-center text-3xl' > News </h1>
      {user?<h1 className='flex justify-center text-xl ' >Welcome {`${user}`}!  </h1>:<h1 className='flex justify-center' > Welcome User!</h1>}
      <div className='flex w-full self-center justify-center md:items-center  ' >
        <Suspense fallback={<div className='' > Loading... </div>} >
          <CarouselDemo/>
        </Suspense>
      </div>
      </div>
  )
}

export default News