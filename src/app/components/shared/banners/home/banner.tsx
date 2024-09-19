'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Suspense } from 'react'
//import Carousel from '../../carousel/newsCarousel'
type Props = {}

const Banner = (props: Props) => {
  //get carousel
  return (
    <div className='flex' >
        Banner
    <Suspense  fallback={<div className='' >Loading Spinner...</div>} >
    
    </Suspense>
        
        </div>
  )
}

export default Banner