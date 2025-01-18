'use client'
import React,{useState,useEffect} from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
 //Featured
 import { thumbNailPic } from '@/app/lib/actions/connections';
type Props = {}

const Featured = ({currentData}: any) => {
  const [currData,setCurrData]=useState<any>();
  const {data}=useQuery({
    queryKey:['featuredThumbnail'],
    queryFn:()=>thumbNailPic(currentData)  //thumbnail
  })
  useEffect(()=>{
    if(currentData!=undefined){
         setCurrData(currentData);
    }
  },[currentData])
  if(currData){
    console.log(currData)
  }
  {/* Switch white areas for slate background unless going to a black/white look. */}
  return (
    <div className='flex grid grid-cols-6 grid-rows-4 max-sm:flex-col md:flex-row  bg-gray-300  max-sm:h-20 md:h-full md:w-full ' >
      <div className='flex ml-6 mt-0 row-start-1 col-start-4 col-span-3 bg-white w-3/4 h-1/2 skew-x-12 z-50 space-x-2' >
        {/* Upper Right white area & black design */}
        <div className=' bg-black h-full w-1/4 self-center  -skew-x-24 ' >
  
  </div>
  <div className='bg-black h-full w-1/4 self-center  -skew-x-24 ' >

   </div>
   <div className='bg-black h-full w-1/4  self-center   -skew-x-24 ' >

    </div>
   
      </div>
      
    
     <div className='flex size-4 bg-gray-50 col-start-1  row-start-1 row-span-2' >


     </div>
     <div className='flex flex-col w-1/2 col-start-1 col-span-1 row-start-1 row-span-4 bg-gray-50 z-40 ' >
     {/* Left side white area */}
       <div className='flex -mt-4 ml-0 w-full h-1/2 bg-white rotate-45 ' >
        {/*Left Side Upper Corner */}

       </div>

     </div>
     <div className='flex row-start-1 col-start-1 h-full w-1/2  ' >
        {/* left side lower slant */}

     </div>
     <div className='flex row-start-4 row-span-2 col-start-1 ml-0 mt-2 h-full w-full rotate-45 bg-white  ' >
        {/* Left Side Lower Corner */}
     </div>
     <div className='flex row-start-2 col-start-6 -mt-6 ml-8  w-1/2 h-full bg-white rotate-45 ' >
          {/* right side upper block */}
     </div>
     <div className='flex  -skew-y-12 col-start-6 ml-6 mt-4 row-start-2 row-span-2 bg-white z-50 w-1/3 h-full ' >
        {/* right side bar */}
     </div>
     <div className='flex row-start-4 col-start-6 bg-white -rotate-45 ml-2 mt-4 w-full h-full' >
         {/* right side lower */}
     </div>
      <div className='flex max-sm:flex-col md:flex-row  col-start-2 col-span-4 row-start-2 row-span-3 ' >
         {currentData && <div className='flex flex-row ' > 
         
        {currentData.thumbnail && currentData.placeholder? <Image className='' src={currentData?.thumbnail}  alt={currentData.fileName} />:
        <Image className='' src={currentData?.placeholder} alt={currentData?.fileName} />
        }
        
        <h1 className='text-xl' > {currData?.fileName}</h1>
        
        </div>}
        {!data && <div className='' >
              <h1 className='' >No THumbnail available</h1>
          </div>}
      </div>
     
     
      </div>
  )
}

export default Featured