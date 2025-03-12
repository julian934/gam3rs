'use client'
import React,{useState,useEffect,useRef,useContext, MutableRefObject} from 'react';
import { StoreStateContext } from '@/app/lib/context/storeContext';
import { useQuery } from '@tanstack/react-query';
import NavBar from '@/app/components/ui/nav/nav';
import Footer from '@/app/components/shared/footer/general/page';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { SetStateAction } from 'react';
import ForumTags from '@/app/components/ui/dropdown/forumtags';
import Link from 'next/link';
type Props = {}

const CreateForum = (props: Props) => {
    const [forumName,setForumName]=useState<string | HTMLInputElement | undefined| SetStateAction<string | HTMLInputElement | undefined>>();
    const [forumTags,setForumTags]=useState<any>([]);
    const [forumDescription,setForumDescription]=useState<SetStateAction<SetStateAction<string | HTMLInputElement | undefined>>>('');
    const [submitted,setSubmitted]=useState(false)
    const forumNameRef=useRef<HTMLInputElement | null>(null);
    const forumDesc=useRef<HTMLInputElement | null>(null);;
    
    const {data:session}=useSession();
    /*const {data}=useQuery({
        queryKey:['createForm'],
        queryFn:()=>{}
    })*/
    const handleSubmit=(event: React.FormEvent)=>{
        event.preventDefault();
        const forumNameValue = forumNameRef?.current?.value;
    const forumDescValue = forumDesc?.current?.value;

    if (!forumNameValue || !forumDescValue) {
      console.log('Name or Description is missing');
      return;
    }
    if(!session){
      const sendForum=axios.post(`/api/forums/create`,{
        name:forumNameValue,
        desc:forumDescValue,
        tags:forumTags,
        creator:'anonymous'
    })
    }
       //const currUser=JSON.parse(localStorage.get("userdata"));

        const sendForum=axios.post(`/api/forums/create`,{
            name:forumNameValue,
            desc:forumDescValue,
            tags:forumTags,
            creator:session?.user,
            created: new Date()
        })
        const createdForum={
          name:forumNameValue,
          desc:forumDescValue,
          tags:forumTags,
          creator:session?.user,
          created: new Date()
      }
      
        setSubmitted(true)
        return sendForum
    }
   
    const handleTags=()=>{
        
    }
    console.log(forumNameRef);
    console.log(forumDesc);
    //ID created on backend route once name, tags and description are sent back.
  return (
    <div className='flex grid max-sm:flex-col grid-cols-6 grid-rows-4 bg-white' >
        <div className='row-start-1 col-start-1 col-span-6 max-sm:z-50' >
           <NavBar/>
        </div>
      
           <div className=' flex max-sm:z-0 md:mt-20 grid max-sm:mt-4 max-sm:h-full h-full w-full grid-cols-6 grid-rows-4 flex-row  bg-gray-300   col-start-2 max-sm:col-start-1 col-span-4 max-sm:col-span-6 row-start-2  row-span-2  flex-col px-2 ' >
        {/* Add Design to this page. */}
     
        <div className='flex  -mt-4 py-2 px-2 ml-2 mt-0 row-start-1 col-start-4 col-span-3 bg-white w-3/4 max-sm:w-full h-1/2 skew-x-12 z-50 space-x-2' >
        {/* Upper Right white area & black design */}
        <div className=' bg-red-600 h-full w-1/4 self-center  -skew-x-24  ' >
  
          </div>
        <div className='  bg-black h-full w-1/4 self-center -skew-x-24 ' >

          </div>
        <div className=' bg-red-600 h-full w-1/4  self-center  -skew-x-24 ' >

            </div>
   
      </div>
      
    
     <div className='flex border-2 border-black size-4 bg-gray-50 col-start-1 border-2 border-black row-start-1 row-span-2' >


     </div>
     <div className='flex  flex-col  -ml-4 max-sm:-ml-6 w-1/2 max-sm:w-10 col-start-1 col-span-1 row-start-1 row-span-4 bg-gray-50 z-40 ' >
     {/* Left side white area */}
       <div className='flex   -mt-16 ml-0 w-full h-1/2 bg-white rotate-45 ' >
        {/*Left Side Upper Corner */}

       </div>

     </div>
     <div className='flex  -left-8 row-start-1 col-start-1 h-full w-1/2  ' >
        {/* left side lower slant */}

     </div>
     <div className='flex  rotate-45 max-sm:-rotate-45 row-start-1 row-span-2  col-start-6 z-50 ml-8 max-sm:ml-12 -mt-4 max-sm:mt-6 w-3/4 max-sm:w-1/5 h-24 bg-white ' >
           {/*Extra top right white piece */}
      </div>
     <div className='flex  row-start-4 row-span-2 col-start-1 -ml-8 mt-10 max-sm:mt-10 h-full w-full rotate-45 max-sm:-rotate-45 bg-white  ' >
        {/* Left Side Lower Corner */}
     </div>
     
     <div className='flex  row-start-1 col-start-6 -mt-2 ml-16 max-sm:ml-8 max-sm:mt-0 w-full h-full bg-white rotate-45 max-sm:rotate-0 ' >
          {/* right side upper block */}
         
     </div>
     <div className='flex col-start-6 ml-20 max-sm:ml-8 mt-12 max-sm:mt-20 row-start-1 row-span-4 bg-white z-50 w-3/5 max-sm:w-4/5 h-5/6 max-sm:h-4/5 max-sm:w-4/5' >
        {/* right side bar */}
     </div>
     <div className='flex  row-start-4 col-start-6 bg-white -rotate-45 max-sm:rotate-45 ml-2 mt-12 w-full h-full' >
         {/* right side lower */}
     </div>
      <div className='flex md:w-3/4 md:h-full   flex-col rounded-md max-sm:self-center justify-self-center  max-sm:col-start-1 md:col-start-1  max-sm:col-span-6 md:col-span-6 max-sm:row-start-1 max-sm:row-span-4 row-start-2  max-sm:row-span-3 md:row-start-1 md:row-span-4 max-sm:w-full' >
        {/*  Space for Data */} 
       
        {!submitted && <div className='flex flex-col row-start-2 col-start-2 max-sm:col-start-1 max-sm:col-span-6 col-span-2 z-50 ' >
           <form className='w-92 flex flex-col h-full  space-y-8  ' onSubmit={handleSubmit} >
            <h1 className=' self-start   ml-8 md:mt-4 flex h-8 justify-center  text-lg flex rounded-sm  bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-32 text-white' >Create Forum</h1>
              <input className='border-2 -skew-x-12 w-1/2 self-center ' placeholder='Forum Name...'  ref={forumNameRef} />
              <input className='border-2 -skew-x-12 w-1/2 self-center ' placeholder='Forum Description...'   ref={forumDesc} />
              {/* list of tags modal */}
              
              {/*<ForumTags/> */}
              <input className='border-2 -skew-x-12 w-1/2 self-center ' placeholder='Forum tags...'  /> 
              {/* */} 
              <button className='self-center flex h-8 justify-center text-lg flex rounded-sm  bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-32 text-white' type='submit' >Submit</button>
           </form>
        </div>}
        {submitted && <div className='flex flex-col row-start-2 col-start-2 col-span-2 z-50  ' > 
          <h1 className='' >Forum created. </h1>
          <Link href="/allForums" >Go to Forums</Link>
           </div>}
        
        
      </div>
      </div> 
        <div className='flex bg-white col-start-1 col-span-6 justify-self-center self-center md:self-end row-start-4 max-sm:mt-20' >
           <Footer/>
        </div>
        </div>
  )
}

export default CreateForum