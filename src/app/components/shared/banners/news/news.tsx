import React from 'react'

type Props = {}

const News_Modal = (props: Props) => {
  return (
   <div className='flex  max-sm:border-2 max-sm:border-black  max-sm:py-10 grid grid-cols-4 grid-rows-4  bg-black md:w-full md:h-1/2 flex-col rounded-lg md:justify-between' >
       {/*  <div className='col-start-1 border-2 border-black md:flex md:space-between -ml-2 -mt-4 row-start-1 inline-block -left-24  mt-20 h-20 w-60 z-60  skew-x-12 bg-white absolute rotate-90  ' >
              <div className=' border-2 border-black w-1/2 flex h-20 skew-x-12 bg-white  bottom-2  ' >
                
                 <div className='w-5/6 self-end skew-x-12 ml-8 mt-2 self-center justify-between rounded-sm h-1/2 bg-slate-200 ' >
                      
                 </div>
              </div>
              <div className='w-1/2 flex h-20 bg-white bottom-2 skew-x-12 ' >
                
                 <div className='w-1/2 flex h-4 bg-slate-200 skew-x-12 self-end mb-4 -ml-2 rounded-sm '  >
   
                 </div>
              </div>
            </div>  
             */}
             <div className='flex max-sm:w-full max-sm:h-full max-sm:-mt-24 max-sm:-ml-6 max-sm:border-2 max-sm:border-black  col-start-1 rotate-45 row-start-1 w-1/2   -ml-12 -mt-16   bg-white ' >
               {/* Upper left slant */}
             </div>
             <div className='flex max-sm:w-full max-sm:h-1/2 max-sm:mt-20 max-sm:-ml-2   col-start-1 row-start-2 w-1/2 h-1/2  bg-white -skew-x-12 rotate-90  -ml-12 mt-20' >
                  {/* Mid Left gap upper*/}
             </div>
             <div className='flex  max-sm:w-1/2 max-sm:h-1/2 max-sm:rotate-0 max-sm:h-full max-sm:mt-0 max-sm:-ml-12  col-start-1 row-start-2 w-full h-6  bg-black -skew-x-12 max-sm:skew-x-0 max-sm:rotate-0  -rotate-90 z-50  -ml-28 mt-14 -mr-2 ' >
                {/* Mid Left Design Upper */}
             </div>
             <div className='flex max-sm:w-full max-sm:h-3/4 max-sm:mt-20 max-sm:-ml-14   col-start-1 row-start-2 w-1/2 h-1/3  bg-red-600 -skew-x-12 -rotate-90  -ml-14 mt-24 -mt-6  z-50' >
                {/* Mid left Design Lower */}
             </div>
             <div className='flex max-sm:w-full max-sm:h-1/2 max-sm:mt-32 max-sm:-ml-2   col-start-1 row-start-2 w-1/2 h-1/2    bg-white skew-x-12 rotate-90 -ml-12 mt-28 ' >
               {/* Mid Left gap lower*/}  
             </div>
         <div className='flex flex-col col-start-1 z-10 row-start-1 p-4' >
          
       
         {/* News & user personalization*/}
         
            {/* {user?<h1 className='flex transition ease-in-out rounded-sm hover:animate-pulse bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-20' >
           Welcome {`${user}`}! 
            </h1>:
            <h1 className='flex justify-center' > Welcome!</h1>}*/}
         </div>
         <div className='flex md:w-full md:col-start-1 md:col-span-4  max-sm:self-center  max-sm:justify-self-start col-start-2 col-span-2 row-start-1 md:row-start-2 md:w-full md:justify-center row-span-3 md:-mt-20 z-10 p-4' >
         <div className='flex w-full self-start justify-center md:items-center  ' >
          <h1 className='flex' > The <span className='tex-red-500' > Gam3r </span> Network </h1>
         </div>
         </div>
         <div className='flex max-sm:h-2/3 max-sm:border-2 max-sm:border-black max-sm:-mt-24 max-sm:-ml-8 self-start pb-4 space-around -mt-16 w-4/5 h-full  col-start-3 row-start-1 col-span-3 justify-self-end bg-white skew-x-12 space-x-4 space-y-8 px-2 ' >
             {/* Right side upper design */}
             <div className='flex max-sm:border-2 max-sm:border-slate-200 w-full h-1/4 bg-black skew-x-12 self-end' >
   
             </div>
             <div className='flex max-sm:border-2 max-sm:border-slate-200 w-full h-1/4 bg-red-600 skew-x-12 self-end' >
   
             </div>
             <div className='flex max-sm:border-2 max-sm:border-slate-200 w-full h-1/4 bg-black skew-x-12 self-end' >
   
             </div>
             <div className='flex max-sm:border-2 max-sm:border-white w-full h-1/4 bg-white skew-x-12 self-end' >
   
             </div>
         </div>
         <div className='flex   w-1/6 h-full self-start row-start-1 col-start-4 z-50 ' >
            {/* Rightside mid Design*/}
         </div>
         <div className=' max-sm:flex max-sm:border-2 border-black col-start-1 row-start-4 md:flex md:space-between w-32 h-32 -ml-16 mt-8  origin-center rotate-45  bg-white' >
              {/* Bottom Left white area */}
         </div>
         <div className=' max-sm:flex max-sm:border-2 max-sm:border-black max-sm:mt-32 max-sm:ml-0 col-start-1 col-span-2 justify-center space-x-2 space-between bg-white flex self-end ml-12 w-48 h-8 row-start-4 skew-x-12 ' >
           <div className=' w-10 bg-black h-4 skew-x-12  self-end ' >
               {/* Bottom Left design */}
           </div>
           <div className='w-10  bg-red-600  h-4 skew-x-12 self-end ' >
   
           </div>
           <div className='w-10  bg-black  h-4 skew-x-12 self-end' >
   
           </div>
   
         </div>
         <div className='flex  z-60 row-start-1 col-start-4 w-3/4 h-full  bg-white rotate-45 ml-32 -mt-10 ' >
           {/* Upper right slant*/}
         </div>
         <div className='flex  z-60 row-start-3 col-start-4 w-3/4 h-1/2 -rotate-90 bg-white  skew-x-12 ml-24 mt-14 ' >
           {/* Mid-right slant*/}
         </div>
         <div className='flex max-sm:mt-40 max-sm:ml-16  max-sm:h-1/2  max-sm:border-2 max-sm:border-black z-60 row-start-4 col-start-4 w-full h-full bg-white  -rotate-45 ml-20 mt-8 ' >
           {/* Bottom Right */}
             
         </div>
          <div className='flex col-start-4 row-start-1 row-span-3 p-4' >
               {/* News Description*/}
          </div>
        
         </div>
  )
}

export default News_Modal