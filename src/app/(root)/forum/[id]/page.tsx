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
import ForumPost from '@/app/components/ui/forums/forumPost';
import MobileNav from '@/app/components/shared/modals/mobileNav';
import  Gam3rs_News_Modal from '@/app/utils/images/redesign/Gam3rs_News_Modal.png'
import Image from 'next/image';
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
    <div className=' max-sm:w-screen max-sm:min-h-screen grid md:grid-cols-4 md:grid-rows-4 max-sm:grid-cols-3  bg-gradient-to-b from-black  via-red-900  to-red-900 max-sm:grid-rows-3  ' >
      <div className='flex max-sm:w-3/4 max-sm:w-screen md:row-start-1 md:col-start-1 col-span-4 ' >
         <NavBar/>
      </div>
      <div className=' max-sm:visible pointer-events-none fixed max max-sm:w-screen max-sm:h-screen  z-[9999] ' >
        <MobileNav/>
      </div>
      {/* Mobile Nav */}
      

      {/* Notifications */}
      <div className="h-full max-sm:invisible col-start-1 col-span-3 row-start-1 md:relative md:top-40 md:left-72 md:h-2/5 md:w-full-[30] rounded-md">
        <Notifications />
      </div>
      {/* <div className='flex max-sm:invisible z-10 md:z-50 bg-slate-200 max-sm:self-center max-sm:w-full max-sm:z-auto max-sm:p-4 md:h-5/6 md:w-2/3 max-sm:h-20 md:mt-40  md:col-start-1 md:row-start-1 md:row-span-2 p-4 rounded-md p-4  ' >
       
       <Notifications/>
      </div>*/}
      {forumData && <div className='absolute md:z-[9999] md:h-full md:w-full max-sm:top-[15vh] max-sm:left-[22.5vw] max-w-[60vw] max-h-[70vh] max-sm: max-sm:scale-x-[2.5] max-sm:scale-y-[3] overflow-hidden' >
           <Image className='md:z-[9999]' src={Gam3rs_News_Modal} alt='Forum Modal' />
         </div>}
      {forumData && forumData?.threads?.length>0? <div className='flex flex-col relative top-48 max-sm:-top-36 max-sm:left-10  max-sm:w-[85vw]  md:max-h-[600px]  md:w-2/3 md:h-full justify-self-center flex-around row-start-2 row-span-2 col-start-1 col-span-4 z-20  -mt-12  ' >
      
         <div className=' flex max-sm:justify-self-center  grid max-sm:mt-4 h-full w-full max-sm:grid-cols-3 max-sm:grid-rows-3 max-sm:justify-self-center max-sm:w-full grid-cols-6 grid-rows-4 flex-row  z-[9999]  col-start-2 col-span-4 row-start-2  row-span-2  flex-col px-2 ' >
       {/* Add Design to this page. */}
    
      
     <div className='flex  md:h-full  flex-col rounded-md max-sm:self-center justify-self-center  col-start-2 md:col-start-1  max-sm:col-span-4 md:col-span-6 max-sm:row-start-1 max-sm:row-span-4 row-start-2  max-sm:row-span-3 md:row-start-1 md:row-span-4 max-sm:w-full' >
       {/*  Space for Data */} 
      
       {forumData && <div className=' flex flex-col space-y-4 max-sm:space-y-8 self-center max-sm:col-start-1 md:col-start-2 col-span-3 w-full   rounded-md h-full' >
           {/*Features needed: make a post, reply to post and delete your post, and update the server with the new information. */}
           {forumData && <div className='flex max-sm:relative max-sm:-left-10 max-sm:pt-2 flex-col w-92 max-sm:w-full h-full self-center max-sm:space-y-4 md:space-y-8 md:pt-12 ' >
            <h1 className=' flex  h-auto justify-center text-3xl max-sm:text-xl w-full flex rounded-sm md:self-center bg-gradient-to-r from-red-900 via-red-500 
             shadow-xl   to-red-900  -skew-x-12 w-64 text-white' > {forumData.name} </h1>
            <h3 className=' flex bg-white h-auto justify-center text-lg max-sm:text-md flex rounded-sm md:self-center  overflow-y-hidden -skew-x-12 w-full text-black px-4' > {forumData.description} </h3>

         </div> } 
           {forumData?.threads?.length<1?<div className='flex flex-col w-full  h-full p-2 space-y-2 max-sm:-mt-8 flex justify-self-center self-start md:mb-0 ' >
             
              <h3 className='px-4 bg-white flex justify-center -skew-x-12  ' >First one here? Be the first to post and get the conversation started! </h3>
              
           <input className='w-full max-sm:w-full self-center -skew-x-12 px-4 ' onChange={handleType}  ref={postRef} placeholder='Type here...' />
           <button className='flex h-8 font-Gardion justify-center text-lg flex rounded-sm md:self-center bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-40 text-white' onClick={()=>sendPost(params?.id)} >Post Here</button>
           </div>:<div className='flex flex-col max-sm:-mt-4 w-full  h-full p-0 space-y-4 flex justify-self-center self-start md:mb-12' >
           
           {/* <h1 className='px-4 bg-white flex justify-center -skew-x-12 ' >Continue the conversation! </h1>*/}
           <input className='w-full max-sm:relative max-sm:-left-10 max-sm:w-full self-center -skew-x-12 px-4  ' onChange={handleType}  ref={postRef} placeholder='Type here to continue the conversation...' />
           <button className='flex h-8 font-Gardion justify-center text-lg flex rounded-sm md:self-center bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-40 text-white' onClick={()=>sendPost(params?.id)} >Post Here</button>
           </div> }
           </div>}
       
       
     </div>
     </div> 
     
     <div className='flex z-[9999] md:py-4 relative md:top-10  flex-col overflow-auto max-h-[1000px] w-full max-w-4xl max-sm:w-4/5 mx-auto space-y-4 max-sm:pt-8 ' >
     {forumData && forumData?.threads?.length >0 &&  forumData?.threads? forumData?.threads?.map((vals:any)=><div className=' flex flex-col w-full p-4  rounded-md shadow-sm  z-[9999]' key={vals.id}  >
              
              
              <ForumPost user={vals.user.name} message={vals.message} forum={forumData.name} />
              {/* Add check to see if this message was posted by the current user, and if so, render delete button.*/}
              
              {/* <button className='' onClick={()=>PrepReply(vals[vals._id],vals.id)}   >Reply</button>
              {prepReply && <Replies forumID={params?.id} postID={vals.id} />}*/}
              
</div>): <div className='flex flex-col w-full p-4 ' ></div>}
     </div>
         

        <input/>
     </div> :  <div className='flex flex-col relative md:top-[30vh] max-sm:-top-[65vh] max-sm:w-[95vw]  md:max-h-[500px]  md:w-2/3 md:h-full justify-self-center flex-around row-start-2 row-span-2 col-start-1 col-span-4 z-20    ' >
         
         <div className=' flex max-sm:justify-self-center  grid max-sm:mt-4 h-full w-full max-sm:grid-cols-3 max-sm:grid-rows-3 max-sm:justify-self-center max-sm:w-full grid-cols-6 grid-rows-4 flex-row  bg-black z-[9999]  col-start-2 col-span-4 row-start-2  row-span-2  flex-col px-2 ' >
       {/* Add Design to this page. */}
    
     
     
   
   
  
  
     <div className='flex  md:h-full  flex-col rounded-md max-sm:self-center justify-self-center  col-start-2 md:col-start-1  max-sm:col-span-4 md:col-span-6 max-sm:row-start-1 max-sm:row-span-4 row-start-2  max-sm:row-span-3 md:row-start-1 md:row-span-4 max-sm:w-full' >
       {/*  Space for Data */} 
      
       {forumData && <div className=' flex flex-col space-y-4 max-sm:space-y-8 self-center max-sm:col-start-1 md:col-start-2 col-span-3 w-full   rounded-md h-full' >
           {/*Features needed: make a post, reply to post and delete your post, and update the server with the new information. */}
           {forumData && <div className='flex max-sm:relative max-sm:-left-10 flex-col w-92 max-sm:w-full h-full self-center max-sm:space-y-4 md:space-y-8 md:pt-12 ' >
            <h1 className=' flex h-8 justify-center text-3xl max-sm:text-xl w-full flex rounded-sm md:self-center bg-gradient-to-r from-red-900 via-red-500 
             shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-64 text-white' > {forumData.name} </h1>
            <h3 className=' flex  bg-white h-8 justify-center text-lg max-sm:text-md flex rounded-sm md:self-center   -skew-x-12 w-full text-black px-4' > {forumData.description} </h3>

         </div> } 
           {forumData?.threads?.length<1?<div className='flex flex-col w-full  h-full p-0 space-y-4 flex justify-self-center self-start md:mb-12 ' >
             
              <h3 className='px-4 bg-white flex justify-center -skew-x-12  ' >First one here? Be the first to post and get the conversation started! </h3>
              
           <input className='w-full max-sm:w-full self-center -skew-x-12 px-4 ' onChange={handleType}  ref={postRef} placeholder='Type here...' />
           <button className='flex h-8 font-Gardion justify-center text-lg flex rounded-sm md:self-center bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-40 text-white' onClick={()=>sendPost(params?.id)} >Post Here</button>
           </div>:<div className='flex  flex-col w-full  h-full p-4 space-y-4 flex justify-self-center self-start md:mb-12' >
           
           {/* <h1 className='px-4 bg-white flex justify-center -skew-x-12 ' >Continue the conversation! </h1>*/}
           <input className='w-full max-sm:relative max-sm:-left-10  max-sm:w-full self-center -skew-x-12 px-4  ' onChange={handleType}  ref={postRef} placeholder='Type here to continue the conversation...' />
           <button className='flex h-8 font-Gardion justify-center text-lg flex rounded-sm md:self-center bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-40 text-white' onClick={()=>sendPost(params?.id)} >Post Here</button>
           </div> }
           </div>}
       
       
     </div>
     </div> 
     
     <div className='flex z-[9999] md:py-4  flex-col overflow-auto max-h-[1000px] w-full max-w-4xl max-sm:w-4/5 mx-auto space-y-4 max-sm:pt-8 md:pt-12' >
     {forumData && forumData?.threads?.length >0 &&  forumData?.threads? forumData?.threads?.map((vals:any)=><div className=' flex flex-col w-full p-4  rounded-md shadow-sm  z-[9999]' key={vals.id}  >
              
              
              <ForumPost user={vals.user.name} message={vals.message} forum={forumData.name} />
              {/* Add check to see if this message was posted by the current user, and if so, render delete button.*/}
              
              {/* <button className='' onClick={()=>PrepReply(vals[vals._id],vals.id)}   >Reply</button>
              {prepReply && <Replies forumID={params?.id} postID={vals.id} />}*/}
              
</div>): <div className='flex flex-col w-full p-4 ' ></div>}
     </div>
         

        <input/>
     </div>}
     
     
      
        {/* <div className=' flex max-sm:border-2 max-sm:invisible md:z-50 max-sm:border-black max-sm:h-full md:row-start-1 md:mt-40 md:row-span-2 md:h-5/6 md:w-2/3 md:px-8 justify-self-end rounded-md self-start md:col-start-4 bg-slate-200 ' >
        <FriendsList  friends={currUser?.friends} />
        </div>*/}

      <div className='flex row-start-4 col-start-1 col-span-4 bg-white justify-self-center self-center z-50' >
         <Footer/>
      </div>
      </div>
  )
}

export default Forum