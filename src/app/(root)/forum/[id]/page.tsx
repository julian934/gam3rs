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
import Notifications from '@/app/components/shared/notifications/notifications';
import FriendsList from '@/app/components/shared/friends/friends';
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
      <div className='flex z-10 md:z-50 bg-slate-200 max-sm:self-center max-sm:w-full max-sm:z-auto max-sm:p-4 md:h-5/6 md:w-2/3 max-sm:h-20 md:mt-40  md:col-start-1 md:row-start-1 md:row-span-2 p-4 rounded-md p-4  ' >
       
       <Notifications/>
      </div>
      <div className='flex flex-col md:-mt-8 md:w-2/3 md:h-full md:justify-self-center flex-around row-start-2 row-span-2 col-start-1 col-span-4 z-20  -mt-12  ' >
         
          <div className=' flex  grid max-sm:mt-4 h-full w-full grid-cols-6 grid-rows-4 flex-row  bg-gray-300   col-start-2 col-span-4 row-start-2  row-span-2  flex-col px-2 ' >
        {/* Add Design to this page. */}
     
        <div className='flex  -mt-4 py-2 px-2 ml-2 mt-0 row-start-1 col-start-4 col-span-3 bg-white w-3/4 max-sm:w-full h-1/2 skew-x-12 z-50 space-x-2' >
        {/* Upper Right white area & black design */}
        <div className=' bg-gray-300 h-full w-1/4 self-center  -skew-x-24  ' >
  
          </div>
        <div className='  bg-gray-300 h-full w-1/4 self-center -skew-x-24 ' >

          </div>
        <div className=' bg-gray-300 h-full w-1/4  self-center  -skew-x-24 ' >

            </div>
   
      </div>
      
    
     <div className='flex size-4 bg-gray-50 col-start-1 border-2 border-black row-start-1 row-span-2' >


     </div>
     <div className='flex  flex-col  -ml-4 max-sm:-ml-6 w-1/2 max-sm:w-10 col-start-1 col-span-1 row-start-1 row-span-4 bg-gray-50 z-40 ' >
     {/* Left side white area */}
       <div className='flex  -mt-16 ml-0 w-full h-1/2 bg-white rotate-45 ' >
        {/*Left Side Upper Corner */}

       </div>

     </div>
     <div className='flex -left-8 row-start-1 col-start-1 h-full w-1/2  ' >
        {/* left side lower slant */}

     </div>
     <div className='flex rotate-45 max-sm:-rotate-45 row-start-1 row-span-2  col-start-6 z-50 ml-8 max-sm:ml-12 -mt-4 max-sm:mt-6 w-3/4 max-sm:w-full h-24 bg-white ' >
           {/*Extra top right white piece */}
      </div>
     <div className='flex  row-start-4 row-span-2 col-start-1 -ml-8 mt-10 max-sm:mt-8 h-full w-full rotate-45 max-sm:-rotate-45 bg-white  ' >
        {/* Left Side Lower Corner */}
     </div>
     
     <div className='flex  row-start-1 col-start-6 -mt-2 ml-16 max-sm:ml-8 max-sm:mt-0 w-full h-full bg-white rotate-45 max-sm:rotate-0 ' >
          {/* right side upper block */}
         
     </div>
     <div className='flex  col-start-6 ml-20 max-sm:ml-8 mt-12 max-sm:mt-24 row-start-1 row-span-4 bg-white z-50 w-3/5 max-sm:w-4/5 h-5/6 max-sm:h-4/5 max-sm:w-4/5' >
        {/* right side bar */}
     </div>
     <div className='flex  row-start-4 col-start-6 bg-white -rotate-45 max-sm:rotate-45 ml-2 mt-12 w-full h-full' >
         {/* right side lower */}
     </div>
      <div className='flex md:h-full  flex-col rounded-md max-sm:self-center justify-self-center  col-start-2 md:col-start-1  max-sm:col-span-4 md:col-span-6 max-sm:row-start-1 max-sm:row-span-4 row-start-2  max-sm:row-span-3 md:row-start-1 md:row-span-4 max-sm:w-full' >
        {/*  Space for Data */} 
       
        {forumData && <div className=' flex flex-col space-y-4 self-center col-start-2 col-span-3 w-full   rounded-md h-full' >
            {/*Features needed: make a post, reply to post and delete your post, and update the server with the new information. */}
            {forumData && <div className='flex flex-col w-92 h-full self-center md:space-y-8 md:pt-12 ' >
             <h1 className=' flex  h-8 justify-center text-3xl w-full flex rounded-sm md:self-center bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-64 text-white' > {forumData.name} </h1>
             <h3 className=' flex bg-white h-8 justify-center text-lg flex rounded-sm md:self-center   -skew-x-12 w-full text-black px-4' > {forumData.description} </h3>
          </div> } 
            {forumData?.threads?.length<1?<div className='flex flex-col h-full space-y-4 flex justify-self-center ' >
              
               <h3 className='px-4 bg-white flex justify-center -skew-x-12  ' >First one here? Be the first to post and get the conversation started! </h3>
               
            <input className='w-2/3 self-center -skew-x-12 px-4 ' onChange={handleType}  ref={postRef} placeholder='Type here...' />
            <button className='flex h-8 justify-center text-lg flex rounded-sm md:self-center bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-40 text-white' onClick={()=>sendPost(params?.id)} >Post Here!</button>
            </div>:<div className='flex flex-col w-full  h-full space-y-4 flex justify-self-center self-start md:mb-12' >
            
            {/* <h1 className='px-4 bg-white flex justify-center -skew-x-12 ' >Continue the conversation! </h1>*/}
            <input className='w-2/3 self-center -skew-x-12 px-4  ' onChange={handleType}  ref={postRef} placeholder='Type here to continue the conversation...' />
            <button className='flex h-8 justify-center text-lg flex rounded-sm md:self-center bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-40 text-white' onClick={()=>sendPost(params?.id)} >Post Here!</button>
            </div> }
            </div>}
        
        
      </div>
      </div> 
      
      <div className='flex z-50 flex-col overflow-auto max-h-[1000px] w-full max-w-4xl mx-auto space-y-4 md:pt-12' >
      {forumData && forumData?.threads?.length >0 &&  forumData?.threads?.map((vals:any)=><div className=' flex flex-col w-full p-4 border border-gray-300 rounded-md shadow-sm ' key={vals.id}  >
               
               <div className='flex justify-between ' >
                  <h1 className='' > User: {vals.user.name}</h1>
                  <button className='text-red-500' >Delete Message</button>
               </div>
                  <p className='' > Message: {vals.message}</p> 
                  {/* Add check to see if this message was posted by the current user, and if so, render delete button.*/}
                  
                  {/* <button className='' onClick={()=>PrepReply(vals[vals._id],vals.id)}   >Reply</button>
                  {prepReply && <Replies forumID={params?.id} postID={vals.id} />}*/}
                  
</div>)}
      </div>
          

         <input/>
      </div>
     
      <div className=' flex max-sm:border-2 md:z-50 max-sm:border-black amx-sm:h-full row-start-1 md:mt-40 row-span-2 md:h-5/6 md:w-2/3 md:px-8 justify-self-end rounded-md self-start md:col-start-4 bg-slate-200 ' >
        <FriendsList  friends={currUser?.friends} />
        </div>

      <div className='flex row-start-4 col-start-1 col-span-4 bg-white justify-self-center self-center z-50' >
         <Footer/>
      </div>
      </div>
  )
}

export default Forum