'use client'
import React, { useContext, useState, useEffect, useRef } from 'react';
import { StoreStateContext } from '@/app/lib/context/storeContext';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import NavBar from '@/app/components/ui/nav/nav';
import Footer from '@/app/components/shared/footer/general/page';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { videoUpdate } from '@/app/lib/database/connections';

type Props = {}
//This is the correct upload file.
const Upload = (props: Props) => {
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [vidUrl, setVidUrl] = useState<string | null>(null);
  const [sent, setSent] = useState<boolean>(false);
  const [asset, setAsset] = useState<string | null>(null);
  const [addUserVid,setUserVid]=useState<any>();
  const [uploadMessage,setUploadMessage]=useState<any>('');
  const [uploadURL,setUploadURL]=useState<any>('');
  const [uploadID,setUploadID]=useState<any>('');
  const [currFileName,setCurrFileName]=useState<any>('')
  const [userState,setUserState]=useState<any>()
  const [moddedUser, setModdedUser]=useState<any>();
  const { data: session } = useSession();
  const ctx = useContext(StoreStateContext);
  
  const fileNameRef=useRef<any>()
  console.log(ctx.userData)
  const mutation=useMutation({
    mutationFn:async (video:any)=>{
     if(video!=undefined){
      const currVideo:any= await video;
      return videoUpdate(currVideo);
     }
     return {message: "No Data!"}
    },
    onSuccess:()=>{
      console.log("User data updated successfully")
    },
    onError:(error)=>{
      console.error("Error updating user data:", error)
    }
  })
  
  useEffect(() => {
    let currUser=localStorage.getItem("userdata");
    let currData=currUser?JSON.parse(currUser) : null;
    if(currData){
       setUserState(currData)
       console.log(ctx.userData)
    }
    if (vidUrl) { 
      return () => URL.revokeObjectURL(vidUrl);
    }
    if(sent && uploadURL && uploadID){
      const currUser = userState;
      const newUpload = {
        fileName: currFileName,
        assetId: uploadID,
        currMessage:uploadMessage,
        tags: ['user-selected tags'],
        user: currUser,
        url:uploadURL,
      };
      const updatedUser = {
        ...currUser,
        videos: [...(currUser.videos || []), newUpload],
      };
       setModdedUser(updatedUser)
      /*ctx.getUser({
        ...currUser,
        videos: [...currUser.videos || [], newUpload],
      });*/
      ctx.getUser(updatedUser); // Ensure this updates context and triggers re-renders.
       // Optional: Persist the update to the backend.
    axios.post('/api/updateuser', updatedUser).catch(console.error);
    }
    if(session?.user){
        setUserState(ctx.userData)
    }
  }, [vidUrl,sent]);
   if(session?.user){
    console.log(ctx.userData)
    console.log(userState)
   }
  const handleFileChange = () => {
    const file = inputFileRef?.current?.files ? inputFileRef.current.files[0] : null;
    if (file) {
      setVidUrl(URL.createObjectURL(file));
    }
  };

  const uploadFile = async () => {
    if (!inputFileRef.current?.files) {
      console.error('No file selected');
      return;
    }

    const file = inputFileRef.current.files[0];
    
    // Step 1: Request an upload URL from the backend
    const { data } = await axios.post('/api/uploads', { filename: file.name });
    const uploadUrl = data.uploadUrl;

    // Step 2: Upload the file to Mux using the upload URL
    try {
          
       const response=await axios.post('/api/uploads',{filename:file.name});
      
       const {uploadUrl,assetId}=response.data;
       setUploadURL(uploadUrl);
       setUploadID(assetId);
      const uploadResponse = await axios.put(uploadUrl, file, {
        headers: { 'Content-Type': 'application/octet-stream' },
      });
      setSent(true);
      setAsset(data.assetId); // Asset ID from Mux to store
      
      console.log('Video uploaded successfully:', uploadResponse.data);

      // Optional: Update user data context
      const currUser = userState;
      const newUpload = {
        fileName: currFileName?currFileName:'',
        assetId: uploadID,
        tags: ['user-selected tags'],
        user: currUser,
        url:uploadURL? uploadURL : ''  ,
      };
    //  currUser?.videos.map((vals:any)=>{
       // return [...vals, newUpload]
       //})
       const userData={
        user:session?.user?.name,
        fileName: currFileName?currFileName:'',
        assetId: uploadID,
        tags: ['user-selected tags'],//Modify to template literal containing user tags. 
        url:uploadURL? uploadURL : ''  ,
        time:new Date(),
        views:0
       }
       mutation.mutate(userData)
       currUser.videos.push(newUpload)
       //ctx.getUser(currUser)
       mutation.mutate(newUpload);
       localStorage.set("userdata",JSON.stringify(currUser))
       let newUser=localStorage.get("userdata");
       setUserState(JSON.parse(newUser));
      ctx.getUser({
        ...currUser,
        videos: [...currUser.videos, newUpload],
      });
      let currData=currUser
      
      
      const updateUser=await axios.post('/api/updateuser',currData);
      
        
      return updateUser
        /* 
      if (uploadResponse.status === 200) {
        setSent(true);
        setAsset(data.assetId); // Asset ID from Mux to store
        
        console.log('Video uploaded successfully:', uploadResponse.data);

        // Optional: Update user data context
        const currUser = ctx.userData;
        const newUpload = {
          fileName: file.name,
          assetId: uploadID,
          tags: ['user-selected tags'],
          user: currUser,
          url:uploadURL,
        };

        ctx.getUser({
          ...currUser,
          videos: [...currUser.videos, newUpload],
        });
        const updateUser=await axios.post('/api/updateuser',ctx.getUser);

        return updateUser
      }*/
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };
  const uploadFileName=()=>{
      setCurrFileName(fileNameRef.current.value)
  }
   if(sent){
    const currUser=ctx.userData
    console.log(uploadURL)
    console.log(currFileName)
    console.log(uploadID)
    console.log(currUser)
    console.log(ctx.userData)
   }
   console.log('Updated context user data:', userState);
    
   if(moddedUser!=undefined){
    console.log(moddedUser)
   }
   if(userState){
    console.log(userState)
   
   }
   const stateReset=()=>{
    if(sent){
      setSent(false)
    }
   }
  return (
    <div className="flex max-sm:h-full max-sm:flex-col grid grid-rows-4 max-sm:grid-rows-3 grid-cols-4 bg-white">
      <div className="col-start-1 max-sm:flex max-sm:flex-col col-span-4 row-start-1 z-10">
        <NavBar />
      </div>
      <div className="flex flex-col self-center row-start-2 row-span-2 max-sm:row-span-2 col-start-1 col-span-4">
        {vidUrl &&!sent && (
          <video className="md:h-1/2 md:w-1/2 flex justify-center" controls>
            <source src={vidUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        {!session?.user && (
          <div className="flex flex-col self-center">
            <h1 className="text-center">You must be signed in to upload.</h1>
            <Link className="text-center text-3xl" href="/testAuth">
              Sign In
            </Link>
          </div>
        )}
        {!sent && session?.user && 
          <input
          className="z-60 text-black bg-slate-200"
          onChange={handleFileChange}
          name="file"
          ref={inputFileRef}
          type="file"
          placeholder="Title"
          required
        />}
        {!sent && session?.user &&   <input className='z-60 text-black bg-slate-200' onChange={uploadFileName} ref={fileNameRef} placeholder='File Name' />} 
        {!sent && session?.user && <button className="rounded-lg bg-slate-200" onClick={uploadFile}>
          Upload
        </button>}
        
          
         {sent && <div className='flex z-60 ' >
             <button className='' onClick={()=>stateReset()} > Send another video? </button>
        </div>}
      </div>
    
      <div className="flex row-start-4 col-start-1 col-span-4">
        <Footer />
      </div>
    </div>
  );
};

export default Upload;
