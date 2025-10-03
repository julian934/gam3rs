"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "../../ui/infinite-moving-cards/infinite-moving-cards";
import { useQuery } from "@tanstack/react-query";
import { getNews } from "@/app/lib/database/connections";

export function InfiniteMovingCardsDemo() {
     const [newsState,setNewsState]=useState<any>();
    const {data}=useQuery({
        queryKey:['newsModal'],
        queryFn:()=>getNews(),

    });

    useEffect(()=>{
        if(data){
            const currData=data? data?.data : null
           //  const testData=currData?.title=='Welcome to the Gam3r Network'?[currData,currData,currData]: currData;

   
            setNewsState(currData);
           /* if(testData!= null && testData.title=='Welcome to the Gam3r Network'){
                const newData=[testData,testData,testData]
                setNewsState(newData)
               }*/
        }
    },[data]);
    if(newsState){
        console.log(newsState)
    }
  return (
    <div className="h-[12.5rem] md:h-2/3 border-2 flex md:self-center border-black rounded-md flex antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <div className="flex full w-[25rem] " >
        <InfiniteMovingCards
        items={newsState}
        direction="right"
        speed="normal"
      />
        </div>
      
    </div>
  );
}