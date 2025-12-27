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
import Gam3rs_News_Modal from '@/app/utils/images/redesign/Gam3rs_News_Modal.png'
import Image from 'next/image';
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
    <div className='flex grid max-sm:flex-col grid-cols-6 grid-rows-4 bg-gradient-to-b from-black  via-red-900  to-red-900 max-h-screen ' >
        <div className='row-start-1 col-start-1 col-span-6 max-sm:z-50  z-[9999] ' >
           <NavBar/>
        </div>
                  
           <div className='absolute flex  w-3/4 h-full overflow-hidden ' >
               <Image className='absolute w-full h-full top-[15vh] left-40 scale-x-[1.2] scale-y-[2] ' src={Gam3rs_News_Modal} alt='News Modal' />

                </div>
          {/* <div className='absolute  h-[40vh] w-[20vw] border-2 border-black top-64 left-[25vw] z-0 ' >
            
          </div> */}
         {/* <div className='absolute top-28 left-20 w-[10vw] h-[10vh] z-50' >
        <Image className='absolute border-2 border-black ' width={1000} height={1000} quality={100} src={Gam3rs_News_Modal} alt='Gam3rs Modal' />
       </div>*/}
           <div className=' flex max-sm:z-0 z-50 md:mt-20 grid max-sm:mt-4 max-sm:h-full h-full w-full grid-cols-6 grid-rows-4 flex-row  col-start-2 max-sm:col-start-1 col-span-4 max-sm:col-span-6 row-start-2  row-span-2  flex-col px-2 ' >
        {/* Add Design to this page. */}
     
            
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
        <div className='flex  col-start-1 col-span-6 justify-self-center self-center md:self-end row-start-4 max-sm:mt-20' >
           <Footer/>
        </div>
        </div>
  )
}

export default CreateForum