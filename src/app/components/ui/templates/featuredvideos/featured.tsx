'use client'
import React,{useState,useEffect} from 'react'
import Image from 'next/image';
import Link from 'next/link';
type Props = {}

const Featured = (props: any) => {
  const [currData,setCurrData]=useState<any>();
  useEffect(()=>{
    if(props.currentData){
         setCurrData(props.currentData);
    }
  },[])
  return (
    <div className='flex grid grid-cols-6 grid-rows-4 max-sm:flex-col md:flex-row  bg-gray-300  max-sm:h-20 border-black border-2 ' >
     <div className='flex flex-row col-start-4 col-span-3 row-start-1  self-end space-x-2 size-4 bg-white  w-3/4 justify-around skew-x-12' >
       <div className=' bg-black h-full w-1/4 self-center  -skew-x-24 ' >
  
       </div>
       <div className='bg-black h-full w-1/4 self-center  -skew-x-24 ' >

        </div>
        <div className='bg-black h-full w-1/4  self-center   -skew-x-24 ' >

         </div>
         <div className='bg-white h-full w-1/4  self-center   -skew-x-24 ' >

         </div>
     </div>
     <div className='flex size-4 bg-gray-50 col-start-1  row-start-1 row-span-2' >


     </div>
     <div className='flex flex-col col-start-1 col-span-1 row-start-1 row-span-3 bg-gray-50 z-40 border-2 border-black' >
      {/* <div className='flex w-1/2 bg-gray-400 z-50 h-1/2' >
           
      </div>
      <div className='  flex h-1/2 z-40 ' >
        <div className=' skew-x-12 rotate-45 bg-black  w-1/2 ' >

        </div>
        <div className=' -skew-x-12 rotete-45 bg-black w-1/2 ' >

        </div>

      </div>*/}
      <div className=' border-2 border-black w-3/4 h-1/2  -skew-x-12 -rotate-90 ' >

      </div>
      <div className=' border-2 border-black w-3/4 h-1/2 bg-gray-300  ' >
              <div className=' h-full bg-gray-300 -skew-y-12 border-2 border-black ' >

              </div>
              <div className='h-full bg-gray-300 skew-y-12 border-2 border-black ' >

              </div>
      </div>

     </div>
     <div className='flex  skew-y-12 col-start-6 row-start-2 row-span-2 bg-white border-2 z-30 w-1/2 ' >

     </div>
      <div className='flex max-sm:flex-col md:flex-row  col-start-2 col-span-4 row-start-2 row-span-3 ' >
         {currData && <div className='flex flex-row ' > 
         <Link href={`/videos/${currData._id}`} >
        {currData.thumbnail? <Image className='' src={currData?.thumbnail}  alt={currData.fileName} />:
        <Image className='' src={currData?.placeholder} alt={currData.fileName} />
        }
        
        <h1 className='text-xl' > {currData.fileName}</h1>
        </Link>
        </div>}
      </div>
      <div className=' size-6 bg-gray-50 col-start-1 row-start-4 rotate-45  mr-2 -mt-2 ' >

      </div>
      <div className='size-6 bg-gray-50 col-start-6 row-start-4 rotate-45  mr-2 -mt-2' >

      </div>
     
      </div>
  )
}

export default Featured