import * as React from "react"
import { useQuery } from "@tanstack/react-query"

import { Card, CardContent } from "../../../lib/shadcn/cardData"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../lib/shadcn/carouselData"

import { getNews } from "@/app/lib/database/connections"
import { useState,useEffect } from "react"


export function CarouselDemo() {
  const {data,error}=useQuery({
    queryKey:['News'],
    queryFn:getNews, //Add News section to database,
    enabled:!!getNews
  })
  const [dataState,setDataState]=useState<any>([])
   useEffect(()=>{
      if(data){
        const currData:any=data
        setDataState(currData)
      }
   },[data])
   if(data){
    console.log(data)
   }
  return (
    <Carousel className="w-full max-w-xs  ">
      <CarouselContent>
        
         { !data &&  Array.from({ length: 5 }).map((_, index) => ( //Add News Source and DB optional source. 
          <CarouselItem className="w-full"  key={index}>
            <div className="p-1 w-full  ">
              <Card className="bg-slate-400  " >
                <CardContent className="flex aspect-square items-center justify-center flex-col p-6">
                  <h1 className="flex flex-wrap -skew-x-12 bg-white text-3xl text-black  w-full py-4 px-2 " >Welcome to the <span className=" text-red-400 px-2" > Gam3r </span> Network! </h1>
                  <p className="flex flex-wrap py-4  " >The Gam3r Network is your home for unfiltered, game-related content and the place to find your gaming community.</p>
                  {/*data &&  <h2 className="flex -skew-x-12 bg-white " >{data?.title}</h2>*/}
                 
                  {/*  <span className="text-4xl font-semibold">{index + 1}</span>*/}
                  
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
