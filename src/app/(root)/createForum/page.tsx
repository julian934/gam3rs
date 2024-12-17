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
    <div className='flex grid grid-cols-4 grid-rows-4 bg-white' >
        <div className='flex col-start-1 col-span-4 row-start-1' >
           <NavBar/>
        </div>
       {!submitted && <div className='flex flex-col row-start-2 col-start-2 col-span-2 z-50 ' >
           <form className='w-92 flex flex-col h-full border-2 ' onSubmit={handleSubmit} >
            <h1 className=' w-2/3 ' >Create Forum</h1>
              <input className='border-2' placeholder='Forum Name...'  ref={forumNameRef} />
              <input className='border-2' placeholder='Forum Description...'   ref={forumDesc} />
              {/* list of tags modal */}
              <ForumTags/>
              <input/>
              <button className='' type='submit' >Submit</button>
           </form>
        </div>}
        {submitted && <div className='flex flex-col row-start-2 col-start-2 col-span-2 z-50  ' > 
          <h1 className='' >Forum created. </h1>
          <Link href="/allForums" >Go to Forums</Link>
           </div>}
        <div className='flex col-start-1 col-span-4 row-satrt-4' >
           <Footer/>
        </div>
        </div>
  )
}

export default CreateForum