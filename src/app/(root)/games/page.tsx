'use client'
import React, { SetStateAction } from 'react'
import { useState,useEffect,useContext,useRef,useId } from 'react'
import { useQuery } from '@tanstack/react-query';
import { getGames } from '@/app/lib/actions/connections';
import type { AxiosResponse } from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import NavBar from '@/app/components/ui/nav/nav';
import Footer from '@/app/components/shared/footer/general/page'; 
import Notifications from '@/app/components/shared/notifications/notifications';
import FriendsList from '@/app/components/shared/friends/friends';
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../../components/hooks/use-outside-clicks";
import { CloseIcon } from "../../components/ui/expandable-card-demo/expandable-card-demo";
import downArrow from '@/app/utils/images/down-arrow.png'
import upArrow from '@/app/utils/images/up-arrow.png'
import MobileNav from '@/app/components/shared/modals/mobileNav';
type Props = {}

const Games = (props: Props) => {
  const [games,setGames]=useState<AxiosResponse<any, any> | SetStateAction<never[] > | SetStateAction<any[] | any>>([]);
  const [userGame,setUserGame]=useState<any>([]);
    const {data}=useQuery({
        queryKey:['gameslist'],
        queryFn:getGames
    })
    useEffect(()=>{
      if(data){
        console.log(data?.data?.data)
      
        const currData=data;
        console.log(currData)
        setGames(currData?.data?.data)
    }
    
    },[data])
    if(data){
      console.log(games)
    }
    const addGame=(game:any,user:any)=>{
        //Add Game to user viewed game 
        //Increase views on MongoDB game views object by 1.
    }
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
    <div className='flex flex-col bg-white grid-cols-4 grid-rows-2 ' >
    <div className='row-start-1 col-start-1 col-span-4' >
       <NavBar/>
    </div>
    <div className=' max-sm:visible fixed max max-sm:w-screen max-sm:h-screen  z-[9999] ' >
        <MobileNav/>
      </div>
    {/* Add option to skip to the bottom. */}
    <div className='flex max-sm:invisible flex-col row-start-1 rounded-md row-span-2 col-start-1 md:col-start-2  z-50 bg-slate-200 md:mt-12 md:ml-44 md:w-2/3 ' id='top' >
        <Notifications/>
    </div>
    <div className='hover:bg-gray-300 rounded-3xl w-12 relative -right-8'  >
        <Link className='' href='#bottom' >
           <Image className='' src={downArrow} alt='Down Arrow' />
        </Link> 
    </div>
    <div className='flex max-sm:flex-col  md:flex-row row-start-2 row-span-2 col-start-2 col-span-2 md:col-start-1  md:col-span-4 flex-wrap w-2/3 md:w-full self-center h-full z-50 p-4 md:p-2 space-y-4' >
    {/*games && games?.sort().map((vals:any)=>(<div key={vals.id} className='flex w-92 h-92 bg-slate-200 p-4 ' >
         <Link className='text-black'  href={vals.game_url} >
         <Image className='h-62 w-62 justify-self-center self-center ' width={100} height={100} quality={100}  src={vals.thumbnail} alt={vals.title} />
         
         <h1 className='text-center' >{vals.title}</h1>
         <h2 className='text-center' >Platform:{vals.platform}</h2>
         </Link>
      </div>))*/}

       {games && games?.sort().map((vals:any)=>
              < div className=' flex md:w-1/3   md:px-12 md:space-x-4 md:py-4 ' key={vals.id} >
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
                            className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
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
                            className="p-4 flex flex-col   justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
                          >
                            <div className="flex gap-4 flex-col  ">
                              <motion.div className='md:justify-self-center' layoutId={`image-${vals.title}-${id}`}>
                                <Image
                                  width={300}
                                  height={300}
                                  quality={100}
                                  src={vals.thumbnail}
                                  alt={vals.title}
                                  className="h-40 w-40 md:h-full md:w-full rounded-lg object-cover object-top"
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
        
                          </div>)}
    </div>
    <div className='hover:bg-gray-300 rounded-3xl w-12 relative -right-8 '  >
        <Link className='' href='#top' >
           <Image className='' src={upArrow} alt='Up Arrow' />
        </Link> 
    </div>
      <div className='row-start-4 col-start-1 col-span-4 md:self-center bg-white md:justify-end md:z-50' id='bottom' >
          <Footer/>
      </div>
    </div>
  )
}

export default Games