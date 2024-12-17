'use client'
import React from 'react'
import { useState,useRef,useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { LegacyRef, MutableRefObject } from 'react'
import type { DetailedHTMLProps } from 'react'
import type { InputHTMLAttributes } from 'react'
import { connectDB } from '@/app/lib/database/connections'
import search from '../../../utils/images/search/icons8-search-100.png'
import Image from 'next/image'
import Link from 'next/link'
type Props = {}

const SearchBar = (props: Props) => {
   
  const [searchQuery,setSearchQuery]=useState<string>('')
  const inputRef=useRef<HTMLInputElement>(null);
  const handleInputChange=()=>{
     if(inputRef.current){
        setSearchQuery(inputRef?.current?.value)
     }
  }
  if(searchQuery) console.log(searchQuery)
    
  return (
    <div className='flex flex-row justify-around space-x-2' >
      <input className='self-center space-x-4 -skew-x-12  text-slate-400  ' onChange={handleInputChange} ref={inputRef as LegacyRef<HTMLInputElement>} type='text' placeholder='Search the site' />
        <button className=' self-center bg-white w-6 h-6 rounded-lg hover:bg-yellow-300 hover:scale-110' onClick={()=>{}} > <Link href='/search' > <Image className='w-6 h-6' src={search} alt='search'  /></Link></button>
       
       
        {/*data && data?.filter((vals:any)=>vals.includes(searchQuery))?.map((vals:any)=>
        <div key={vals?.id} className='' >
          <p className='' key={vals.id} >{data?.vals}</p>
             
        </div>)*/}
      {/* Search results- visibility capped at 10 top results. */}
    </div>
  )
}

export default SearchBar