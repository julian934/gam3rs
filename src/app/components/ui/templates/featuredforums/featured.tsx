"use client"
import React,{useState,useEffect,useRef} from 'react'
import Link from 'next/link'
import Image from 'next/image'
type Props = {}

const Featured = (props: any) => {
  const [currData,setCurrData]=useState<any>();
  useEffect(()=>{
    if(props.currentData){
         setCurrData(props.currentData);
    }
  },[])
  return (
    <div className='' >
      Featured
      {currData && <div className='flex' > 
         <Link href={`/videos/${currData._id}`} >
        {currData.thumbnail? <Image className='' src={currData?.thumbnail}  alt={currData.fileName} />:
        <Image className='' src={currData?.placeholder} alt={currData.fileName} />
        }
        
        <h1 className='text-xl' > {currData.fileName}</h1>
        </Link>
        </div>}
      </div>
  )
}

export default Featured