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
import { FileUpload } from '@/app/components/ui/file-upload/file-upload';

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
    <div className="flex grid max-sm:flex-col grid-cols-6 grid-rows-4 bg-white">
      <div className="row-start-1 col-start-1 col-span-6">
        <NavBar />
      </div>
    
      {/*   <div className="flex flex-col self-center row-start-2 row-span-2 max-sm:row-span-2 col-start-1 col-span-4">
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
      </div> */}
      <div className=' flex max-sm:w-full max-sm:self-center max-sm:-ml-10 max-sm:justify-end max-sm:h-4/5 md:border-2 md:border-black  md:z-50 grid max-sm:mt-4 h-full w-full grid-cols-6 grid-rows-4 flex-row  bg-gray-300  col-start-1 col-span-6 col-start-2 col-span-4 row-start-2  row-span-2 md:row-span-2 md:self-center flex-col px-2 ' >
        {/* Add Design to this page. */}
     
        <div className='flex border-2 border-black -mt-4 py-2 px-2 ml-2 mt-0 row-start-1 col-start-4 col-span-3 bg-white w-3/4 max-sm:w-full h-1/2 skew-x-12 z-50 space-x-2' >
        {/* Upper Right white area & black design */}
        <div className=' bg-gray-300 h-full w-1/4 self-center  -skew-x-24  ' >
  
          </div>
        <div className='  bg-gray-300 h-full w-1/4 self-center -skew-x-24 ' >

          </div>
        <div className=' bg-gray-300 h-full w-1/4  self-center  -skew-x-24 ' >

            </div>
   
      </div>
      
    
     <div className='flex border-2 border-black size-4 bg-gray-50 col-start-1 border-2 border-black row-start-1 row-span-2' >


     </div>
     <div className='flex  flex-col border-black max-sm:hidden -ml-4 max-sm:-ml-6 w-1/2 max-sm:w-10 col-start-1 col-span-1 row-start-1 row-span-4 bg-gray-50 z-40 ' >
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
      <div className='flex max-sm:w-full md:w-full md:p-4 md:space-y-2 md:h-5/6 md:self-center   flex-col rounded-md max-sm:self-center justify-self-center  col-start-2 md:col-start-1  max-sm:col-span-4 md:col-span-6 max-sm:row-start-1 max-sm:row-span-4 row-start-2  max-sm:row-span-3 md:row-start-1 md:row-span-4 max-sm:w-full' >
        {/*  Space for Data */} 
       
        {vidUrl &&!sent && (
          <video className="md:h-full md:w-3/4 max-sm:w-full flex justify-center md:self-center" controls>
            <source src={vidUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        {!session?.user && (
          <div className="flex flex-col md:mt-16 self-center justify-self-end">
            <h1 className="text-center text-lg -skew-x-12  ">You must be signed in to upload.</h1>
            <Link className="flex h-8 justify-center self-center text-lg flex rounded-sm  bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-28 text-white" href="/testAuth">
              Sign In
            </Link>
          </div>
        )}
        {!sent && session?.user && 
          <input
          className="z-60 max-sm:w-full text-black bg-slate-200 flex w-1/2 justify-center md:self-center  "
          onChange={handleFileChange}
          name="file"
          ref={inputFileRef}
          type="file"
          placeholder="Title"
          required
        />}
       
        <div  className='flex md:self-center  md:flex-col  md:w-full md:h-full md:justify-center md:justify-around md:justify-self-center md:space-y-4 ' >
        {!sent && session?.user &&   <input className='z-60 text-black bg-slate-200 flex self-center -skew-x-12 ' onChange={uploadFileName} ref={fileNameRef} placeholder='File Name' />} 
        {!sent && session?.user && <button className="flex h-8 justify-center self-center text-lg flex rounded-sm  bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-28 text-white " onClick={uploadFile}>
          Upload
        </button>}
        </div>
        
          
         {sent && <div className='flex z-60 ' >
             <button className='' onClick={()=>stateReset()} > Send another video? </button>
        </div>}


        
         {/*  <MuxPlayer className='rounded-md flex md:w-full md:h-5/6 '
          playbackId={playBackID}
         metadata={{
            video_id:userVideoID,
            video_title:userVideoTitle,
            viewer_user_id:viewer_user_id
        }}/>
         <h1 className='flex self-center text-xl ' >{videoState?.data?.data?.fileName}</h1>
         <div className='flex max-sm:flex-col md:flex-row md:space-x-4 md:justify-around' >
            <div className='md:w-1/3 flex ' >
             
              <h3 className='flex text-xl' >{videoState?.data?.data?.user}</h3>
            </div>
            <div className='md:w-1/3 flex ' >
             
              <h4 className='flex text-lg ' >{videoState?.data?.data?.tags}</h4>
            </div>
         </div>*/} 
      </div>
      </div> 
      <div className="flex row-start-4 row-span-2 z-50 col-start-1 col-span-6 bg-white md:self-end md:justify-center">
        <Footer />
      </div>
    </div>
  );
};

export default Upload;
