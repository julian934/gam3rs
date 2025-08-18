import { cn } from "../../../lib/utils";
import { motion } from "framer-motion";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import React, { useContext, useState, useEffect, useRef } from 'react';
import { StoreStateContext } from '@/app/lib/context/storeContext';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import NavBar from '@/app/components/ui/nav/nav';
import Footer from '@/app/components/shared/footer/general/page';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { videoUpdate } from '@/app/lib/database/connections';

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const FileUpload = ({
  onChange,
}: {
  onChange?: (files: File[]) => void;
}) => {
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
    let currUser:any=localStorage.getItem("userdata");
    let currFinUser=currUser!=undefined && currUser!=null?JSON.parse(currUser):'Anonymous';
    let currData=currFinUser
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
  /*const handleFileChange = () => {
    const file = inputFileRef?.current?.files ? inputFileRef.current.files[0] : null;
    if (file) {
      setVidUrl(URL.createObjectURL(file));
    }
  };
  */

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
  const [files, setFiles] = useState<File[]>([]);
  const [newData,setData]=useState<any>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    onChange && onChange(newFiles);
   // setVidUrl(URL.createObjectURL(files[0]));
   if (newFiles.length>0) {
    const file:any=newFiles
    setVidUrl(URL.createObjectURL(newFiles[0]));
  }
   const currFile:any=files.reverse();
  if(currFile){
    const newData=newFiles[0];
    const vals={
      name:'',
      fileName:newData? newData.name : '',
      size:newData? newData.size : '',
      type:newData? newData.type  : ''
    }
    setData(vals)
   newFiles &&  ctx.fileSet(newFiles[0]);
    localStorage.setItem("videoData",JSON.stringify(newData));
    localStorage.getItem("videoData")
  }
   onChange // && setVidUrl(currFile[0].name);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error:any) => {
      console.log(error);
    },
  });
vidUrl && console.log(vidUrl)
files && console.log(files)
files!=undefined && console.log(files[0]?.name)
newData && console.log(newData)
console.log('Current File: ', ctx.file)
const test=Object.create(ctx.file)
console.log('Object File: ',test?.fileName )
const fileURL=ctx.file && {
  fileName: ctx.file.name,
  size: ctx.file.size,
  modified: ctx.file.lastModified,
};
console.log(fileURL)
  return (
    <div className="w-full" {...getRootProps()}>
      <div  >
      {vidUrl!=undefined &&!sent && (
          <video className="md:h-full md:w-3/4 max-sm:w-full flex justify-center md:self-center" controls>
            <source src={vidUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-base">
            Upload file
          </p>
          <p className="relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2">
            Drag or drop your files here or click to upload
          </p>
          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {files.length > 0 &&
              files.map((file, idx) => (
                <motion.div
                  key={"file" + idx}
                  layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                  className={cn(
                    "relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                    "shadow-sm"
                  )}
                >
                  <div className="flex justify-between w-full items-center gap-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs"
                    >
                      {file.name}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input"
                    >
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </motion.p>
                  </div>

                  <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 "
                    >
                      {file.type}
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                    >
                      modified{" "}
                      {new Date(file.lastModified).toLocaleDateString()}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            {!files.length && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neutral-600 flex flex-col items-center"
                  >
                    Drop it
                    <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                )}
              </motion.div>
            )}

            {!files.length && (
              <motion.div
                variants={secondaryVariant}
                className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
              ></motion.div>
            )}
          </div>
        </div>
      </motion.div>
      <div className="flex flex-col" >
        

      </div>
    </div>
  );
};

export function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex bg-gray-100 dark:bg-neutral-900 flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px  scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex flex-shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? "bg-gray-50 dark:bg-neutral-950"
                  : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
              }`}
            />
          );
        })
      )}
    </div>
  );
}
