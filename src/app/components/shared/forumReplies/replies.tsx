'use client'
import React,{useState,useEffect,useRef,useContext} from 'react'
import { useQuery } from '@tanstack/react-query'
import { StoreStateContext } from '@/app/lib/context/storeContext'
import { getReplies } from '@/app/lib/database/connections'
import type { AxiosResponse } from 'axios'
import { SetStateAction } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
type Props = {id:string}

const Replies = ({forumID,postID}:{forumID: Props | undefined | string, postID:Props | string | undefined}) => {
    const {data}=useQuery({
        queryKey:['replies'],
        queryFn:()=>getReplies(forumID,postID)
    });
    const [forums,setForums]=useState<any>();
    const [posts,setPosts]=useState<any>();
    const [forumData,setForumData]=useState<AxiosResponse<any, any> | SetStateAction<never[] > | SetStateAction<any[] | any>>([]);
  const [response,setResponse]=useState();
  const [prepReply,setPrepReply]=useState<any>(false);
  const [replies,setReplies]=useState<any>();
  const [reply,setReply]=useState();
  
  const replyRef=useRef<any>();
  const {data:session}=useSession();
  const [checkId,setCheckID]=useState<any>();
  const [replyID,setReplyID]=useState<any>();
  const [replyMessage,setReplyMessage]=useState<any>('')
    const ctx=useContext(StoreStateContext);
    console.log(data)

    useEffect(()=>{
       if(data){
        let currData=data? data?.data?.data[0]:null;
        setForumData(currData);
       }
      if(forumID){
        setForums(forums);
        if(postID){
          setPosts(postID)
        }
      }

    },[forums,posts,data]);

    const sendReply=(forum:string | undefined | Props,post:string | undefined | Props)=>{
      setCheckID(forum);
      const currResponse={
         thread:checkId,
         time:new Date().toJSON(),
         forum:forums,
         message:replyMessage,
         user:session? session.user:'Anonymous',
         replies:[]
      }
      const data=axios.post(`/api/forums/reply?forum=${forumID}&post=${postID}`,currResponse);
      return data
   }

   const handleReply=()=>{
    setReplyMessage(replyRef.current.value)
   }

   data && console.log(forumData)
   console.log(replyMessage)
  return (
    <div className='flex flex-col' >
        Replies
        <h1 className='' >{forums}</h1>
        <h1 className='' >{posts}</h1>
        <input className='' onChange={handleReply} ref={replyRef} placeholder='Reply...'   />
        <button className='' onClick={()=>sendReply(forumID,postID)} >Post Reply</button>
        </div>
  )
}

export default Replies