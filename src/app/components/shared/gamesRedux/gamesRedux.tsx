'use client'
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
//import React from 'react'

type Props = {}

const GamesRedux = (props: Props) => {
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
    <div className='flex justify-around bg-white  max-sm:self-center max-sm:w-full max-sm:px-2 max-sm:flex-col bg-slate-50 rounded-md  md:w-full md:h-1/4 ' >
    <div className='w-[200px] space-y-5 p-4 flex  max-sm:flex-col bg-white md:self-center  ' >
     
      {/*  <h1 className='text-xl' >Games</h1> */}
      <h1 className='flex  justify-center text-xl flexrounded-sm  bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-20 text-white ' > 
        Games 
        </h1>
      
    </div>
    {data!==undefined?<div className='w-[200px]   flex  max-sm:flex-col  bg-white   md:mb-0 md:justify-self-center self-center  md:flex-row w-full md:h-full md:space-x-2' >
      <h1 className='' >{dataState?.data?.data?.title} </h1>
      
      {dataState && dataState.map((vals:any)=>
       <>
      <AnimatePresence>
              {active && typeof active === "object" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/20 h-full w-full z-10"
                />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {active && typeof active === "object" ? (
                <div className="fixed inset-0  grid place-items-center z-[100]">
                  <motion.button
                    key={`button-${active.title}-${id}`}
                    layout
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                      transition: {
                        duration: 0.05,
                      },
                    }}
                    className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                    onClick={() => setActive(null)}
                  >
                    <CloseIcon />
                  </motion.button>
                  <motion.div
                    layoutId={`card-${active.title}-${id}`}
                    ref={ref}
                    className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col  bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
                  >
                    <motion.div layoutId={`image-${active.title}-${id}`}>
                      <Image
                        priority
                        width={200}
                        height={200}
                        src={active.thumbnail}
                        alt={active.title}
                        className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                      />
                    </motion.div>
      
                    <div>
                      <div className="flex justify-between items-start p-4">
                        <div className="">
                          <motion.h3
                            layoutId={`title-${active.title}-${id}`}
                            className="font-bold text-neutral-700 dark:text-neutral-200"
                          >
                            {active.title}
                          </motion.h3>
                          <motion.p
                            layoutId={`description-${active.short_description}-${id}`}
                            className="text-neutral-600 dark:text-neutral-400"
                          >
                            {active.short_description}
                          </motion.p>
                        </div>
      
                        <motion.a
                          layoutId={`button-${active.title}-${id}`}
                          href={active.ctaLink}
                          target="_blank"
                          className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                        >
                          {/*active.ctaText*/}
                          <Link className='md:flex md:self-start  md:self-end'  href={`${vals.game_url}`} >
                          <h1 className=" " >Play</h1>
                          </Link>
                        </motion.a>
                      </div>
                      <div className="pt-4 relative px-4">
                        <motion.div
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                        >
                          {typeof active.content === "function"
                            ? active.content()
                            : active.content}
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ) : null}
            </AnimatePresence>
         <motion.div
                    layoutId={`card-${vals.title}-${id}`}
                    key={`card-${vals.title}-${id}`}
                    onClick={() => setActive(vals)}
                    className="p-4 flex flex-col  justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
                  >
                    <div className="flex gap-4 flex-col md:flex-row ">
                      <motion.div layoutId={`image-${vals.title}-${id}`}>
                        <Image
                          width={100}
                          height={100}
                          src={vals.thumbnail}
                          alt={vals.title}
                          className=" max-sm:flex max-sm:justify-self-center max-sm:w-72  h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                        />
                      </motion.div>
                      <div className="">
                        <motion.h3
                          layoutId={`title-${vals.title}-${id}`}
                          className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                        >
                          {vals.title}
                        </motion.h3>
                        <motion.p
                          layoutId={`description-${vals.short_description}-${id}`}
                          className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                        >
                          {vals.short_description}
                        </motion.p>
                      </div>
                    </div>
                    <motion.button
                      layoutId={`button-${vals.title}-${id}`}
                      className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
                    >
                      <Link className='md:flex md:self-start  md:self-end'  href={`${vals.game_url}`} >
                      <h1 className=" " >Play</h1>
                      </Link>
                    </motion.button>
                  </motion.div>

                  </>)}
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
    </div>)
}


export default GamesRedux