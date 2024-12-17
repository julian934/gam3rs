'use client'
import React,{useState, useEffect, useRef, useContext} from 'react';
import { StoreStateContext } from '@/app/lib/context/storeContext';
import { useQuery } from '@tanstack/react-query';
import NavBar from '@/app/components/ui/nav/nav';
import Footer from '@/app/components/shared/footer/general/page';
import { getForum } from '@/app/lib/database/connections';
import axios from 'axios';
import { AxiosResponse } from 'axios';
import { SetStateAction } from 'react';
import { useSession } from 'next-auth/react';
import Replies from '@/app/components/shared/forumReplies/replies';
import { useMutation } from '@tanstack/react-query';
import { forumUpdate } from '@/app/lib/database/connections';
type Props = {id:string}

const Forum = ({params}:{params: Props | undefined}) => {
  const [forumData,setForumData]=useState<AxiosResponse<any, any> | SetStateAction<never[] > | SetStateAction<any[] | any>>([]);
  const [response,setResponse]=useState();
  const [prepReply,setPrepReply]=useState<any>(false);
  const [replies,setReplies]=useState<any>();
  const [reply,setReply]=useState();
  const postRef=useRef<any>()
  const replyRef=useRef<any>();
  const {data:session}=useSession();
  const [checkId,setCheckID]=useState<any>();
  const [replyID,setReplyID]=useState<any>();
  const [currUser,setCurrUser]=useState<any>();

  const ctx=useContext(StoreStateContext);
  const {data}=useQuery({
    queryKey:['Forum'],
    queryFn:()=>getForum(params?.id) //Modify to refetch whenever the forumData changes
  });
  const mutation=useMutation({
   mutationFn:async (data:object)=>{
      if(data!=undefined){
         const response=forumUpdate(data)
      return response
      }
     return {message: "No data"}
   },
  })
  console.log(params?.id)
  useEffect(()=>{
     if(data){
        let currData=data? data?.data?.data[0]:null;
        setForumData(currData);

     }
     const storedData = localStorage.getItem("userdata");
     if (storedData) {
       try {
         const parsedUserData = JSON.parse(storedData);
         setCurrUser(parsedUserData);
       } catch (error) {
         console.error("Error parsing user data from localStorage:", error);
       }
     }
  },[data]);
   const handleType=(e:any)=>{
        setResponse(postRef.current.value);
   }  
   const handleReply=(e:any)=>{
      setReply(replyRef.current.value);
   } 
   const PrepReply=async(e:any,id:any)=>{
      const currID=await e
      const currVals=await id
            setReplies(currID)
            setPrepReply(!prepReply)
            setReplyID(currVals)
   }
   const sendPost=async(id:string | number |undefined)=>{
      //Add forum posts to user personal posts and add to total posts object.
    const currPost={
      forumID:forumData._id,
      forumName:forumData.name,
      time:new Date().toJSON(),
      message:response,
      user:session?session.user:'Anonymous',
      replies:[]
    }
    currUser.forumPosts.push(currPost);
    mutation.mutate(currPost)
    await localStorage.setItem("userdata",JSON.stringify(currUser));
    const data=axios.post(`/api/forums/response`,currPost);
    return data
   }
  /* const sendReply=(id:string | number |undefined)=>{
      setCheckID(id);
      const currResponse={
         thread:checkId,
         forum:params?.id,
         message:reply,
         user:session? session.user:'Anonymous',
         replies:[]
      }
      const data=axios.post('/api/forums/reply',currResponse);
      return data
   } */


   data && console.log(data);
   data && console.log(forumData);
   checkId && console.log(checkId)
   replies && console.log(replies)
   replyID && console.log(replyID);
   replies && console.log(replies)
   if(replies){
      console.log(replies)
   }
   if(currUser){
      console.log(currUser)
   }
   //Iterate over chosen
   //build separate component to handle forum replies and render it if prepReply==true
  return (
    <div className='flex grid grid-cols-4 grid-rows-4 bg-white ' >
      <div className='flex row-start-1 col-start-1 col-span-4 ' >
         <NavBar/>
      </div>
      <div className='flex flex-col flex-around row-start-2 row-span-2 col-start-1 col-span-4 z-50 border-2 border-slate-200 -mt-20  ' >
          {forumData && <div className='flex w-64 border-2 border-slate-200 self-center' >
             <h1 className=' text-center text-4xl ' > Forum: {forumData.name} </h1>
          </div> }
          {forumData && <div className=' flex flex-col space-y-4 self-center col-start-2 col-span-3 w-full  border-2 rounded-md h-full' >
            {/*Features needed: make a post, reply to post and delete your post, and update the server with the new information. */}
            
            {forumData?.threads?.length<1?<div className='flex flex-col h-full space-y-4 ' >
               <h1 className='' >First one here? Be the first to post and get the conversation started! </h1>
            <input className='' onChange={handleType}  ref={postRef} placeholder='Type here...' />
            <button className='border-2 border-slate-200' onClick={()=>sendPost(params?.id)} >Post Here!</button>
            </div>:<div className='flex flex-col h-full w-2/3 self-center space-y-4 ' >
            <h1 className='' >Continue the conversation! </h1>
            <input className='border-2 border-slate-200' onChange={handleType}  ref={postRef} placeholder='Type here...' />
            <button className='border-2 border-slate-200' onClick={()=>sendPost(params?.id)} >Post Here!</button>
            </div> }
            </div>}
            {forumData && forumData?.threads?.length >0 &&  forumData?.threads?.map((vals:any)=><div className=' flex flex-col w-2/3 self-center border-2 border-slate-200 z-50 space-x-2 ' key={vals.id}  >
               
                <div className='w-full h-12 flex justify-around' >
                   <h1 className='' > User: {vals.user.name}</h1>
                   <button className='' >Delete Message</button>
                </div>
                   <p className='' > Message: {vals.message}</p> 
                   {/* Add check to see if this message was posted by the current user, and if so, render delete button.*/}
                   
                   {/* <button className='' onClick={()=>PrepReply(vals[vals._id],vals.id)}   >Reply</button>
                   {prepReply && <Replies forumID={params?.id} postID={vals.id} />}*/}
                   
</div>)}

         <input/>
      </div>
     

      <div className='flex row-start-4 col-start-1 col-span-4' >
         <Footer/>
      </div>
      </div>
  )
}

export default Forum