import React, { useEffect, useId, useRef, useState } from "react";
import { Card } from '@nextui-org/card'
import { Skeleton } from '@nextui-org/skeleton'
import { useQuery } from '@tanstack/react-query'
import { connectDB } from '@/app/lib/database/connections'
import Link from 'next/link'
import { useContext } from 'react';
import { StoreStateContext } from '@/app/lib/context/storeContext'
import { getGames } from '@/app/lib/database/connections'
import type { User } from '@/app/lib/context/storeContext'
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../../hooks/use-outside-clicks";
import { CloseIcon } from "../../ui/expandable-card-demo/expandable-card-demo";

type Props = {
  
  name?:string | null | undefined,
  id?:string | number | undefined,
  image?: string | ImageData | undefined
  currentUser?:string | null | undefined    
}

const Games = (props: Props) => {
  const ctx=useContext(StoreStateContext);
  const {data}=useQuery({
    queryKey:['gameData'],
    queryFn:()=>getGames()
  })
  const [dataState,setDataState]=useState<any>([]);
  {/* Connect to games api and check for most popular. If not, render first few inside list.*/}
  console.log(data)
  if(data){
    console.log(data)
  }
  useEffect(()=>{
    const currData=data?.data;
    console.log("Current Data: ", currData)
    if(currData){
         const preview=currData.data.slice(0,3);
         setDataState(preview)
    }    
  },[data])
  if(dataState){
    console.log(dataState)
  }
   const [active, setActive] = useState<any>(
      null
    );
    const ref = useRef<HTMLDivElement>(null);
    const id = useId();
  
    useEffect(() => {
      function onKeyDown(event: KeyboardEvent) {
        if (event.key === "Escape") {
          setActive(false);
        }
      }
  
      if (active && typeof active === "object") {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
  
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }, [active]);
  
    useOutsideClick(ref, () => setActive(null));
  return (
    <div className='flex justify-around bg-white  max-sm:self-center max-sm:flex-col bg-slate-50 rounded-md  md:w-full md:h-1/4 ' >
    <div className='w-[200px] space-y-5 p-4 flex  max-sm:flex-col bg-white md:self-center  ' >
     
      {/*  <h1 className='text-xl' >Games</h1> */}
      <h1 className='flex  justify-center text-xl flexrounded-sm  bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-20 text-white ' > 
        Games 
        </h1>
      
    </div>
    {data!==undefined?<div className='w-[200px] space-y-5  p-4  flex  max-sm:flex-col bg-white   md:mb-0 md:justify-self-center md:self-center  md:flex-row md:w-full md:h-full md:space-x-4' >
      <h1 className='' >{dataState?.data?.data?.title} </h1>
      {dataState && dataState.map((vals:any)=>
      <Link className='md:flex md:self-start  md:self-end'  href={`${vals.game_url}`} >
      <div className='flex  flex-col md:self-end   ' >
       
        <div className=' flex md:mt-12 grid max-sm:mt-4 h-full w-full grid-cols-6 grid-rows-4 flex-row  bg-gray-300 hover:bg-black   col-start-2 col-span-4 row-start-2 row-span-2 flex-col px-2 ' >
        {/* Add Design to this page. */}
     
        <div className='flex   -mt-4 py-2 px-2 ml-2 mt-0 row-start-1 col-start-4 col-span-3 bg-white w-3/4 max-sm:w-full h-1/2 skew-x-12 z-50 space-x-2' >
        {/* Upper Right white area & black design */}
        <div className=' bg-gray-300 h-full w-1/4 self-center  -skew-x-24  ' >
  
          </div>
        <div className='  bg-gray-300 h-full w-1/4 self-center -skew-x-24 ' >

          </div>
        <div className=' bg-gray-300 h-full w-1/4  self-center  -skew-x-24 ' >

            </div>
   
      </div>
      
    
     <div className='flex size-4 md:-ml-2 bg-gray-50 col-start-1   row-start-1 row-span-2' >


     </div>
     <div className='flex  flex-col md:w-2/3 md:h-full -ml-4 max-sm:-ml-6 w-1/3 max-sm:w-8 col-start-1 col-span-1 row-start-1 row-span-4 bg-white z-40 ' >
     {/* Left side white area */}
       <div className='flex md:w-full max-sm:h-16 max-sm:w-full max-sm:ml-6  -mt-16 max-sm:-mt-8  md:ml-4 ml-0 md:-mt-4 w-full md:w-full h-1/2 md:h-1/4 bg-white rotate-45 ' >
        {/*Left Side Upper Corner */}

       </div>

     </div>
     <div className='flex  -left-8 row-start-1 col-start-1 h-full w-1/2  ' >
        {/* left side lower slant */}

     </div>
     <div className='flex md:mt-2 md:ml-4 md:h-1/2 md:w-full md:-rotate-45 max-sm:ml-0 max-sm:-z-40 max-sm:mr-4 max-sm:pr-2 max-sm:mt-2 max-sm:h-1/2  rotate-45 max-sm:-rotate-45 row-start-1 row-span-2 
      col-start-6 z-50 ml-8 max-sm:ml-12 -mt-4 max-sm:mt-6 w-3/4 max-sm:w-full h-24 bg-white ' >
           {/*Extra top right white piece */}
      </div>
     <div className='flex md:-z-40  max-sm:mt-0 max-sm:ml-0 max-sm:z-40 row-start-4 row-span-2 col-start-1 -ml-8 mt-10 max-sm:mt-8 h-full w-full rotate-45 max-sm:-rotate-45 bg-white  ' >
        {/* Left Side Lower Corner */}
     </div>
     
     <div className='flex md:ml-2 md:mt-0 md:h-1/2 md:w-full  md:rotate-0  row-start-1 col-start-6 -mt-2 ml-16 max-sm:ml-8 max-sm:mt-0 w-full h-full bg-white rotate-45 max-sm:rotate-0 ' >
          {/* right side upper block */}
         
     </div>
     <div className='flex   md:-z-40 col-start-6 ml-20 max-sm:ml-8 mt-12 max-sm:mt-24 row-start-1 row-span-4 bg-white z-50 w-3/5 max-sm:w-4/5 h-5/6 max-sm:h-4/5 max-sm:w-4/5' >
        {/* right side bar */}
     </div>
     <div className='flex md:w-full  md:h-1/2 md:mt-8 md:ml-4  max-sm:-z-40  row-start-4 col-start-6 bg-white -rotate-45 max-sm:rotate-45 ml-2 mt-12 w-full h-full' >
         {/* right side lower */}
     </div>
      <div className='flex md:w-full md:h-full  flex-col rounded-md self-center justify-self-center  col-start-1 col-span-6 md:px-2 md:py-2 max-sm:row-start-1 max-sm:row-span-4 row-start-2 row-span-3 max-sm:w-full' >
        {/*  Space for Data */} 
        <Image className='flex w-full h-full rounded-md' src={vals.thumbnail} alt={vals.title} width={100} height={100} />
       
        {/*  <h1 className='flex text-md flex-wrap -skew-x-12 bg-white w-8 ' >{vals.title}</h1> */}
      
      </div>
      </div> 
       
      </div> {/* */}  </Link>)}
    </div>:
    <><Card className="w-[200px] space-y-5 p-4 flex  max-sm:flex-col bg-white " radius="lg">
    <Skeleton className="rounded-lg">
      <div className="h-24 rounded-lg bg-gray-300"></div>
    </Skeleton>
    <div className="space-y-3">
      <Skeleton className="w-3/5 rounded-lg">
        <div className="h-3 w-3/5 rounded-lg bg-gray-200"></div>
      </Skeleton>
      <Skeleton className="w-4/5 rounded-lg">
        <div className="h-3 w-4/5 rounded-lg bg-gray-200"></div>
      </Skeleton>
      <Skeleton className="w-2/5 rounded-lg">  
        <div className="h-3 w-2/5 rounded-lg bg-gray-300"></div>
      </Skeleton>
    </div>
  </Card>
  <Card className="w-[200px] space-y-5 p-4 flex max-sm:flex-col bg-white " radius="lg">
    <Skeleton className="rounded-lg">
      <div className="h-24 rounded-lg bg-gray-300"></div>
    </Skeleton>
    <div className="space-y-3">
      <Skeleton className="w-3/5 rounded-lg">
        <div className="h-3 w-3/5 rounded-lg bg-gray-200"></div>
      </Skeleton>
      <Skeleton className="w-4/5 rounded-lg">
        <div className="h-3 w-4/5 rounded-lg bg-gray-200"></div>
      </Skeleton>
      <Skeleton className="w-2/5 rounded-lg">  
        <div className="h-3 w-2/5 rounded-lg bg-gray-300"></div>
      </Skeleton>
    </div>
  </Card>
  <Card className="w-[200px] space-y-5 p-4 flex max-sm:flex-col bg-white " radius="lg">
    <Skeleton className="rounded-lg">
      <div className="h-24 rounded-lg bg-gray-300"></div>
    </Skeleton>
    <div className="space-y-3">
      <Skeleton className="w-3/5 rounded-lg">
        <div className="h-3 w-3/5 rounded-lg bg-gray-200"></div>
      </Skeleton>
      <Skeleton className="w-4/5 rounded-lg">
        <div className="h-3 w-4/5 rounded-lg bg-gray-200"></div>
      </Skeleton>
      <Skeleton className="w-2/5 rounded-lg">  
        <div className="h-3 w-2/5 rounded-lg bg-gray-300"></div>
      </Skeleton>
    </div>
  </Card>
  </>}
    
  <div className='flex' >
      <Link className='self-center text-lg' href='/games' >
      <h1 className='flex  justify-center text-xl flex transition ease-in-out rounded-sm animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-20 text-white ' > 
        View All 
        </h1>
      </Link>
  </div>
    </div>
  )
}

export default Games