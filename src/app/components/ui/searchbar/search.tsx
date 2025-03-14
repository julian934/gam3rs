'use client'
import React from 'react'
import { useState,useRef,useContext,useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { LegacyRef, MutableRefObject } from 'react'
import type { DetailedHTMLProps } from 'react'
import type { InputHTMLAttributes } from 'react'
import { connectDB } from '@/app/lib/database/connections'
import search from '../../../utils/images/search/icons8-search-100.png'
import Image from 'next/image'
import Link from 'next/link'
import { getSearchData } from '@/app/lib/database/connections'
type Props = {}

const SearchBar = (props: Props) => {
   
  const {data}=useQuery({
    queryKey:['searchData'],
    queryFn:getSearchData
  })
  const [searchQuery,setSearchQuery]=useState<string>('')
  const [searchData,setSearchData]=useState<any>();
  const [searchState,setSearchState]=useState<any>(null);
  const inputRef=useRef<HTMLInputElement>(null);
  const handleInputChange=()=>{
     if(inputRef.current){
        setSearchQuery(inputRef?.current?.value)
        //localStorage.setItem('searchData',JSON.stringify(searchData));
        const currData:any=data?.filter((vals:any)=>{
          if(vals.title){
            const returnedData=vals.title.includes(searchQuery)
            return returnedData
          }
          if(vals.fileName){
            const returnedData=vals.fileName.includes(searchQuery)
            return returnedData
          }
        
        })
        if(currData){
          currData?.length>2?setSearchData(currData.slice(0,2)):setSearchData(currData)
          console.log(searchData)
        }
        setSearchData(currData)
        localStorage.setItem('searchData',JSON.stringify(searchData));
     }
  }
  if(searchQuery) console.log(searchQuery)
  if(searchData) console.log(searchData)
    console.log(inputRef.current?.value)
  useEffect(()=>{
     if(data){
      setSearchData(data)
     }
    },[data])
    if(searchData){
      console.log(searchData)
    }
    const findData=()=>{
      if(searchState==null){
        setSearchState(true)
      }
    }
    //Search is working now, render only top 10 results & send results to search page. 
  return (
    <div className='flex flex-col justify-around  rounded-md' >
      <div className='flex' >
      <input className='self-center space-x-4 rounded-lg  text-slate-400  ' onChange={handleInputChange} ref={inputRef as LegacyRef<HTMLInputElement>} type='text' placeholder='Search the site' />
        <button className=' self-center -ml-4 bg-slate-200 w-10 h-6 rounded-md hover:bg-yellow-300 hover:scale-110' onClick={findData} > <Link href='/search' > <Image className=' self-center w-8 h-4 px-2' src={search} alt='search'  /></Link></button>

      </div>
     
       {inputRef.current?.value ? <div className='overflow-y-auto h-20 bg-white text-black z-50 '   >
            {searchData && searchData.map((vals:any)=><div className='' key={vals?.playbackID} >
                {vals.id && <Link href={vals.game_url} > {vals.title} </Link>}
                {vals.playbackID && <Link href={`/videos/${vals.playbackID}`} >{vals.fileName}</Link> }
            </div>)}

        </div>:<>
        </>}
        
        {/*data && data?.filter((vals:any)=>vals.includes(searchQuery))?.map((vals:any)=>
        <div key={vals?.id} className='' >
          <p className='' key={vals.id} >{data?.vals}</p>
             
        </div>)*/}
      {/* Search results- visibility capped at 10 top results. */}
    </div>
  )
}

export default SearchBar