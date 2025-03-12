'use client';
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { cn } from "../../../lib/utils";
import { motion } from "framer-motion";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import { useSession } from 'next-auth/react';
import { useContext } from 'react';
import { StoreStateContext } from '@/app/lib/context/storeContext';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Mutation } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { videoUpdate } from '@/app/lib/database/connections';
type FileUploadProps = {
  onFileSelect: (file: File) => void;
};

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

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
    const inputFileRef = useRef<HTMLInputElement | null>(null);
    const [vidUrl, setVidUrl] = useState<string | null>(null);
    const [sent, setSent] = useState<boolean>(false);
    const [uploadMessage, setUploadMessage] = useState<string>('');
    const [uploadURL, setUploadURL] = useState<string>('');
    const [uploadID, setUploadID] = useState<string>('');
    const { data: session } = useSession();
    const ctx = useContext(StoreStateContext);
    
    const mutation = useMutation({
      mutationFn: async (video: any) => {
        if (video != undefined) {
          const currVideo: any = await video;
          return videoUpdate(currVideo);
        }
        return { message: "No Data!" }
      },
      onSuccess: () => {
        console.log("User data updated successfully");
      },
      onError: (error) => {
        console.error("Error updating user data:", error);
      }
    });
  
    const handleFileChange = () => {
      if (inputFileRef.current?.files && inputFileRef.current.files.length > 0) {
        const file = inputFileRef.current.files[0];
        setVidUrl(URL.createObjectURL(file)); // Create a preview URL
        onFileSelect(file); // Pass the selected file to the parent component
      }
    };
  
    const uploadFile = async () => {
      if (!inputFileRef.current?.files) {
        console.error('No file selected');
        return;
      }
  
      const file = inputFileRef.current.files[0];
  
      try {
        // Step 1: Request an upload URL from the backend
        const { data } = await axios.post('/api/uploads', { filename: file.name });
        const uploadUrl = data.uploadUrl;
        const assetId = data.assetId;
        setUploadURL(uploadUrl);
        setUploadID(assetId);
  
        // Step 2: Upload the file to Mux using the upload URL
        const uploadResponse = await axios.put(uploadUrl, file, {
          headers: { 'Content-Type': 'application/octet-stream' },
        });
  
        setSent(true);
  
        // Optional: Update user data context after successful upload
        const userData = {
          user: session?.user?.name,
          assetId: assetId,
          tags: ['user-selected tags'],
          url: uploadURL,
          time: new Date(),
          views: 0
        };
  
        mutation.mutate(userData); // Update user data in context
        localStorage.setItem("userdata", JSON.stringify(userData));
        
        console.log('Video uploaded successfully:', uploadResponse.data);
      } catch (error) {
        console.error("Error during file upload:", error);
        setUploadMessage("Error during upload. Please try again.");
      }
    };
  const { getRootProps, isDragActive } = useDropzone({
      multiple: false,
      noClick: true,
      onDrop: handleFileChange,
      onDropRejected: (error:any) => {
        console.log(error);
      },
    });
    const [files, setFiles] = useState<File[]>([]);
      const fileInputRef = useRef<HTMLInputElement>(null);
      const stateReset=()=>{
        if(sent){
          setSent(false)
        }
       }
  return (
    <div className="w-full" {...getRootProps()}>
     
       <div className="flex justify-center z-50 py-8" >
      {vidUrl && (
        <video
          src={vidUrl}
          controls
          className="mt-4 w-full max-w-lg border-2 border-gray-200 rounded-lg"
        />
      )}
      </div>
       <motion.div
              onClick={() => inputFileRef.current?.click()}
              whileHover="animate"
              className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
            >
              <input
        type="file"
        ref={inputFileRef}
        onChange={handleFileChange}
        className="z-60 max-sm:w-full text-black bg-slate-200 flex justify-center items-center w-1/2 md:w-2/3"
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
        {/*!sent && session?.user &&   <input className='z-60 text-black bg-slate-200 flex self-center -skew-x-12 ' onChange={uploadFileName} ref={fileNameRef} placeholder='File Name' />*/} 
        {!sent && session?.user && <button className="flex h-8 justify-center self-center text-lg flex rounded-sm  bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-28 text-white " onClick={uploadFile}>
          Upload
        </button>}
        </div>
        
          
         {sent && <div className='flex z-60 ' >
             <button className='' onClick={()=>stateReset()} > Send another video? </button>
        </div>} 
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