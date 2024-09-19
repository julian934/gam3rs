'use client'
import React from 'react'
import { useState,useRef,useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { LegacyRef, MutableRefObject } from 'react'
import type { DetailedHTMLProps } from 'react'
import type { InputHTMLAttributes } from 'react'
import { connectDB } from '@/app/lib/database/connections'
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
    <div className='' >
      <input className='' onChange={handleInputChange} ref={inputRef as LegacyRef<HTMLInputElement>} type='text' />
        {/*data && data?.filter((vals:any)=>vals.includes(searchQuery))?.map((vals:any)=>
        <div key={vals?.id} className='' >
          <p className='' key={vals.id} >{data?.vals}</p>
             
        </div>)*/}
      {/* Search results- visibility capped at 10 top results. */}
    </div>
  )
}

export default SearchBar