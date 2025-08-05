'use client'
import React,{useState,useEffect,useRef} from 'react'
import Search from '@/app/components/shared/search/search'
import NavBar from '@/app/components/ui/nav/nav'
import Footer from '@/app/components/shared/footer/general/page'
import { useQuery } from '@tanstack/react-query'
import { getGames } from '@/app/lib/actions/connections'
import { SetStateAction } from 'react'
import type { AxiosResponse } from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import Dropdown from '@/app/components/ui/dropdown/allgames'
import MobileNav from '@/app/components/shared/modals/mobileNav'
type Props = {}

const AllGames = (props: Props) => {
    const [games,setGames]=useState<AxiosResponse<any, any> | SetStateAction<never[] > | SetStateAction<any[] | any>>([]);
    const [searchQuery,setSearchQuery]=useState<string>('');
    const {data}=useQuery({
        queryKey:['allgames'],
        queryFn:getGames
    })
    const searchRef=useRef<HTMLInputElement | null>(null);
    useEffect(()=>{
        if(data){
          console.log(data?.data?.data)
        
          const currData=data;
          setGames(currData?.data?.data)
      }
      
      },[data])
      if(data){
        console.log(games)
      }
      const handleSearch=()=>{
        setSearchQuery(searchRef?.current?.value || '')
      }
  return (
    <div className='flex flex-col bg-white '   >
        <NavBar/>
        <div className=' max-sm:visible pointer-events-none fixed max max-sm:w-screen max-sm:h-screen  z-[9999] ' >
        <MobileNav/>
      </div>
        
        <div className='flex self-center z-50 space-x-23 pb-4 ' >
           <input className='' placeholder='Search...' onChange={handleSearch} ref={searchRef} />
           <div className='' >
            Genre:
           {/* Dropdown to select Genre: */}
           <Dropdown/>
         </div>
        </div>
        <div className='flex border-2 border-gray-200 bg-white flex-wrap justify-center self-center rounded-md w-3/5 ' >
        {games && !searchQuery && games?.map((vals:any)=>(<div key={vals.id} className='w-92 flex flex-col justify-center self-center h-92 p-4 ' >
         <Link className='text-black justify-around '  href={vals.game_url} >
         <div className='' >

         </div>
         <Image className='h-[50px] w-[50px] justify-self-center ' width={100} height={100} quality={100}  src={vals.thumbnail} alt={vals.title} />
         
         <h2 className='text-center' >{vals.title}</h2>
         <h2 className='text-center' >Platform:{vals.platform}</h2>
         </Link>
      </div>))}
        {games && searchQuery && games?.filter((vals:any)=>vals.title.toLocaleLowerCase().includes(searchQuery) ).map((vals:any)=>(<div key={vals.id} className='w-92 flex flex-col justify-center self-center h-92 p-4 ' >
         <Link className='text-black justify-around '  href={vals.game_url} >
         
         <Image className='h-[50px] w-[50px] justify-self-center ' width={100} height={100} quality={100}  src={vals.thumbnail} alt={vals.title} />
         
         <h2 className='text-center' >{vals.title}</h2>
         <h2 className='text-center' >Platform:{vals.platform}</h2>
         </Link>
      </div>))}
        </div>
        <Footer/>
        </div>
  )
}

export default AllGames