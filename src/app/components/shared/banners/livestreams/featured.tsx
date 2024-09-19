'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import Placeholder from '@/app/components/ui/placeholder/placeholder'
type Props = {}

const Featured = (props: Props) => {
  const {data}=useQuery({
    queryKey:['featured'],
    queryFn:()=>{}
  })
  if(!data) return(<div className='' >
    <h1 className='' >Featured LiveStreams</h1>
    <div className='' >
      <Placeholder/> 
      <Placeholder/> 
      <Placeholder/> 
       </div>

  </div>)
  return (
    <div>Featured LiveStreams</div>
  )
}

export default Featured