'use client'
import React from 'react'
import { useContext,useState,useEffect,useRef } from 'react';
import { StoreStateContext } from '@/app/lib/context/storeContext';
import { useQuery } from '@tanstack/react-query';
import { input } from '@nextui-org/theme';
import type { PutBlobResult } from '@vercel/blob';
import NavBar from '@/app/components/ui/nav/nav';
import Footer from '@/app/components/shared/footer/general/page';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
type Props = {}

const Upload = (props: Props) => {
  const inputFileRef = useRef<HTMLInputElement | null | any>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [asset,setAsset]=useState([]);
  const [vidData,setVidData]=useState<any>([]);
  const [vidUrl, setVidUrl] = useState<string | null>(null); // Store video URL for preview
  const [sent,setSent]=useState<boolean>(false);
  const [currInputData,setInputData]=useState<any[]>([]);
  const {data:session}=useSession();
  const [returnData,setReturnData]=useState<any>([]);
  const [userData,setUserData]=useState<any>();
  const files=inputFileRef?.current?.files? inputFileRef.current.files[0] : null;
  const currFile=files
  const ctx=useContext(StoreStateContext);
  //Run checks on filetype before sending as src in source tag.
  //add selectors to render video based on file type.
  useEffect(()=>{

     let currData=localStorage.get("userdata");
     let userVals=JSON.parse(currData);
     setUserData(userVals);
     
    if(sent){
      console.log('grab file from mux');
      try{
       //connect to backend to grab Mux file from storage.
        if(!session?.user){
            
        }       
      }catch(error){

      }
    return () => {
      if (vidUrl) {
        URL.revokeObjectURL(vidUrl); // Cleanup the object URL when component unmounts or a new file is chosen
      }
    };
    }
  },[sent,currInputData,vidUrl]);
 console.log(currInputData)
 const handleFileChange = () => {
  const file = inputFileRef?.current?.files ? inputFileRef.current.files[0] : null;
  if (file) {
    const videoUrl = URL.createObjectURL(file);
    setVidUrl(videoUrl); // Set the video URL for preview
  }
};

  const submitForm=async(event:any)=>{
    event.preventDefault();
    if(!inputFileRef.current?.files){
      throw new Error('No file selected');
    }
    const file=inputFileRef.current.files[0];
    const formData=new FormData();
    formData.append('file',file)
    try{
      
      const response:any=await fetch(`/api/uploads?filename=${file?.name}`,{
        method:'POST',
        body:formData
      });
      if(!response.ok){
        throw new Error('File upload failed');
      }
      const result=await response.json();
      console.log(result);
      const newBlob=(await response.json()) as PutBlobResult;
    setBlob(newBlob);
    }catch(error){
      console.log(error)
    }
   
    //return response
    
  }
  async function uploadFile(file:any) {
    const currFile=await file.files[0]?file.files[0].name:null
    const response = await fetch(`/api/muxupload?filename=${currFile}`, {
      method: 'POST',
    });
    const data = await response.json();
  
    if (data.uploadUrl && ctx.userData!=null ) {
      
      const id=await data.uploadUrl
      setReturnData(data)
      setAsset(id)
      let currUser=await userData
      let uploaded:any=await userData;
       const vids={//filename, assetId, tags, user
        fileName:currFile,
        assetId:asset,
        tags:['user-selected tags'],
        user:currUser,
        uploadUrl:data.uploadUrl
      }
          uploaded.push(vids)
         currUser?.videos.map((vals:any)=>{
          return [...vals, vids]
         })
         ctx.getUser(currUser)
         localStorage.set("userdata",currUser)
      if(currFile!=null ){
        
      }
     
      const uploadResponse = await fetch(data.uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/octet-stream' },
        body: currFile, // The file from an <input type="file" /> element
      }).then((res:any)=>{
        setSent(true)
        setAsset(res?.assetId)
      });
      
      /*if (uploadResponse.ok) {
      
        console.log('File successfully uploaded to Mux');
      } else {
        console.error('Error during upload:', uploadResponse.statusText);
      }
        */
    }
  }
  
  console.log(inputFileRef.current?.files);
  console.log(asset);//Successfully recorded Asset Id. Addd to User Data.
  console.log(vidData);
  console.log(returnData);
  console.log(ctx.userData);
  //onsole.log(ctx?.userData?.videos)
  console.log(userData)
  return (
    <div className='flex max-sm:h-full max-sm:flex-col grid grid-rows-4 max-sm:grid-rows-3 grid-cols-4 bg-white' >
    {/* <form className='' onSubmit={()=>uploadFile} >
        <input className='' name="file" ref={inputFileRef} type="file" placeholder='Title' required />
        <button type='submit'  >Upload</button>
      </form>*/}
      <div className='col-start-1 max-sm:flex max-sm:flex-col col-span-4 row-start-1 z-10 ' >
         <NavBar/>
      </div>
    
      <div className=' flex flex-col self-center row-start-2 row-span-2 max-sm:row-span-2 col-start-1 col-span-4 ' >
      {vidUrl && (
          <video className='md:h-1/2 md:w-1/2 flex justify-center' controls>
            <source src={vidUrl} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        )}
        {!session?.user && <div className='flex flex-col self-center' >
          <h1 className='text-center' >You must be signed in to upload.</h1>
          <Link className='text-center text-3xl ' href='/testAuth' >
          Sign In
          </Link>
          </div>}
      <input className='z-60 text-black bg-slate-200 ' onChange={handleFileChange} name="file" ref={inputFileRef} type="file"  placeholder='Title' required />
      <button className='rounded-lg bg-slate-200' onClick={()=>uploadFile(inputFileRef?.current)}  >Upload</button>
      </div>
      {/* {blob && (
        <div>
          Blob url: <a href={blob.url} >{blob.url}</a>
        </div>
      )}*/}
      <div className=' flex row-start-4 col-start-1  col-span-4' >
        <Footer/>
      </div>
    </div>
  )
}

export default Upload