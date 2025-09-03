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
import { FileUpload } from '@/app/components/ui/file-upload/file-upload'
import MobileNav from '@/app/components/shared/modals/mobileNav';

type Props = {}

const TestUploadRedux = (props: Props) => {
    const inputFileRef = useRef<HTMLInputElement | null>(null);
    const [vidUrl, setVidUrl] = useState<string | null>(null);
    const [sent, setSent] = useState<boolean>(false);
    const [asset, setAsset] = useState<string | null>(null);
    const [addUserVid, setUserVid] = useState<any>();
    const [uploadMessage, setUploadMessage] = useState<any>('');
    const [uploadURL, setUploadURL] = useState<any>('');
    const [uploadID, setUploadID] = useState<any>('');
    const [currFileName, setCurrFileName] = useState<any>('');
    const [userState, setUserState] = useState<any>();
    const [moddedUser, setModdedUser] = useState<any>();
    const [urlState,setURLState]=useState<any>();
    const { data: session } = useSession();
    const ctx = useContext(StoreStateContext);

    const fileNameRef = useRef<any>();
    console.log(ctx.userData);

  const mutation = useMutation({
  mutationFn: async (video: any) => {
    if (!video) return Promise.reject(new Error("No video data provided"));
    return videoUpdate(video, session?.user?.name); // always returns a Promise
  },
  onSuccess: () => {
    console.log("User data updated successfully");
  },
  onError: (error) => {
    console.error("Error updating user data:", error);
  },
  retry:Infinity,
  retryDelay:1000
});

    useEffect(() => {
        let currUser = localStorage.getItem("userdata");
        let currData = currUser ? JSON.parse(currUser) : null;
        console.log('Curr Data (updated):', ctx.blobUrl);
        //const storedUrl = localStorage.getItem('VidURL');
        const storedUrl=ctx?.blobUrl;
        if (storedUrl) {
          setURLState(storedUrl);
        }
        if (vidUrl) { 
            return () => URL.revokeObjectURL(vidUrl);
          }
        // Ensure the user data is updated after a successful video upload
        if (sent && uploadURL && uploadID) {
          const updatedUser = {
            ...currData, // Spread the current user data
            videos: [
              ...(currData.videos || []), // Append to existing videos array
              {
                fileName: currFileName,
                assetId: uploadID,
                tags: ['user-selected tags'],
                user: currData,
                url: uploadURL,
              },
            ],
          };
      
          setModdedUser(updatedUser);
          ctx.getUser(updatedUser); // Trigger context update
      
          // Optional: Persist the updated user data to the backend or localStorage
          axios.post('/api/updateuser', updatedUser).catch(console.error);
        }
      
        // Reset state when video is uploaded or user logs in
        if (session?.user) {
          setUserState(ctx.userData);
        }
      
        // Video data handling
        const currVideo: any = localStorage.getItem("video");
        const vidObj = JSON.parse(currVideo);
        if (vidObj != null && vidObj!=undefined) {
          setUserVid(vidObj);
        }
      
        const storedVidUrl = localStorage.getItem("video");
      
        if (storedVidUrl && storedVidUrl!=null && storedVidUrl!=undefined) {
          setVidUrl(JSON.parse(storedVidUrl));
        }
      
      }, [vidUrl, sent]);
      
    const handleFileChange = () => {
      const file = inputFileRef?.current?.files ? inputFileRef.current.files[0] : null;
      if (file) {
        setVidUrl(URL.createObjectURL(file));
      }
    };

    const handleFileSelect = (file: File) => {
        setVidUrl(URL.createObjectURL(file));
        setCurrFileName(file.name);
    };
/*
    const uploadFile = async () => {
   

     // const file = inputFileRef.current.files[0];
    //  const file=localStorage.getItem('VidURL');
    //const file=urlState;
       //file!=null && file!=undefined && JSON.parse(file);
     // const fileData:any=localStorage.getItem("videoData");
      const fileURL=ctx.file && {
        fileName: ctx?.file?.name,
        size: ctx?.file?.size,
        modified: ctx?.file?.lastModified,
      };
      console.log('Check File: ', fileURL)
      // Step 1: Request an upload URL from the backend
      const { data } = await axios.post('/api/uploads', { filename: fileURL && fileURL?.fileName });
      const uploadUrl = data.uploadUrl;

      // Step 2: Upload the file to Mux using the upload URL
      try {
       
        const response = await axios.post('/api/uploads', { filename: fileURL && fileURL?.fileName }); //filename is the file sent through. 

        const { uploadUrl, assetId } = response.data;
        setUploadURL(uploadUrl);
        setUploadID(assetId);
        //  if(ctx.file!=null && ctx.file!=undefined){
               const uploadResponse = await axios.put(uploadUrl, ctx.file, {
          headers: { 'Content-Type': ctx.file?.type },
        });
        setSent(true);
        setAsset(data.assetId); // Asset ID from Mux to store

        console.log('Video uploaded successfully:', uploadResponse.data);
        //  }
      

        // Optional: Update user data context
        const currUser = userState;
        const videoUrl: any = localStorage.getItem("video");
        console.log("Video check:", JSON.parse(videoUrl));
          if(!videoUrl){
            return ;
          }
        const newUpload = {
          fileName: currFileName ? currFileName : '',
          assetId: uploadID,
          tags: ['user-selected tags'],
          user: currUser,
          url: uploadURL ? uploadURL : '',
        };

        const userData = {
          user: session?.user?.name,
          fileName: currFileName ? currFileName : '',
          assetId: uploadID,
          tags: ['user-selected tags'],
          url: uploadURL ? uploadURL : '',
          time: new Date(),
          views: 0
        };

        mutation.mutate(userData);
        currUser.videos.push(newUpload);
        localStorage.setItem("userdata", JSON.stringify(currUser));
        let newUser:any = localStorage.getItem("userdata");
        setUserState(JSON.parse(newUser));

        ctx.getUser({
          ...currUser,
          videos: [...currUser.videos, newUpload],
        });
        const currData = userState || JSON.parse(localStorage.getItem("userdata") || '{}');

        const updateUser = await axios.post('/api/updateuser', currData);

        return updateUser;

      } catch (error) {
        console.error("Error during file upload:", error);
      }
    };
*/
const uploadFile = async () => {
  try {
    /*
    if (!ctx.file) {
      console.error("No file selected in context");
      return;
    }*/

    // Step 1: Request an upload URL from backend
    
    const { data: uploadData } = await axios.post("/api/uploads", {
      filename: ctx?.file?.name,
    });

    const { uploadUrl, assetId } = uploadData;

    // Step 2: Upload the file to Mux using the upload URL
    await axios.put(uploadUrl, ctx.file!, {
      headers: { "Content-Type": ctx?.file!.type },
    });

    console.log("Video uploaded successfully:", { uploadUrl, assetId });

    // Step 3: Prepare new video entry
    const currUser = ctx.userData || JSON.parse(localStorage.getItem("userdata") || "{}");

    const newUpload = {
      fileName: currFileName || ctx?.file?.name,
      assetId,
      tags: ["user-selected tags"],
      user: currUser,
      url: uploadUrl,
    };

    // Step 4: Update full user object
    const updatedUser = {
      ...currUser,
      videos: [...(currUser.videos || []), newUpload],
    };

    // Step 5: Update context, local state, and localStorage
    ctx.getUser(updatedUser); // now sets context
    setUserState(updatedUser);
    localStorage.setItem("userdata", JSON.stringify(updatedUser));

    // Step 6: Optional backend update
    await axios.post("/api/updateuser", updatedUser);

    // Step 7: Mutation for analytics or logging (optional)
    mutation.mutate(updatedUser);

    // Step 8: Mark as sent
    setSent(true);
    setAsset(assetId);
   // setVidUrl(URL.createObjectURL(ctx?.file));
   setVidUrl(ctx.file ? URL.createObjectURL(ctx.file) : null);

  } catch (error) {
    console.error("Error during file upload:", error);
  }
};

    const uploadFileName = () => {
        setCurrFileName(fileNameRef.current.value);
    };

    const stateReset = () => {
      if (sent) {
        setSent(false);
      }
    };

   // let checkData=localStorage.getItem('VidURL')
   ctx.blobUrl && console.log(ctx.blobUrl);
   ctx.file && console.log('current file: ', ctx.file)
  // let currCheck=localStorage.getItem('videoData')
   //let currLink=localStorage.getItem('video')
   //console.log('curr file url: ', currCheck )
   console.log('Testing Video LinkL: ')
   console.log('Testing Upload URL: ', uploadURL)
    return (
        <div className='bg-white min-h-screen '>
            <div className='flex w-full'>
                <NavBar />
            </div>
            <div className=' max-sm:visible pointer-events-none fixed max max-sm:w-screen max-sm:h-screen  z-[9999] ' >
        <MobileNav/>
      </div>
            

            <div className='flex flex-col z-50 '>
                <div className='flex z-50 '>
                    <FileUpload />
                </div>
                <div>
                    
                    {!session?.user && (
                      <div className="flex flex-col md:mt-16 self-center justify-self-center">
                        <h1 className="text-center text-lg -skew-x-12">You must be signed in to upload.</h1>
                        <Link className="flex h-8 justify-center self-center text-lg flex rounded-sm  bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-28 text-white" href="/signin">
                          Sign In
                        </Link>
                      </div>
                    )}

                    {/*!sent && session?.user && (
                      <input
                        className="z-50 max-sm:w-full text-black bg-slate-200 flex w-1/2 justify-center md:self-center"
                        onChange={handleFileChange}
                        name="file"
                        ref={inputFileRef}
                        type="file"
                        placeholder="Title"
                        required
                      />
                    )*/}

                    <div className='flex bg-white md:z-50 md:self-center md:flex-col md:w-full md:h-full md:justify-center md:justify-around md:justify-self-center md:space-y-4'>
                        {!sent && session?.user && (
                          <input className='z-50 text-black bg-slate-200 flex self-center -skew-x-12 px-2 ' onChange={uploadFileName} ref={fileNameRef} placeholder='File Name' />
                        )}
                        {!sent && session?.user && <button className="flex h-8 justify-center self-center text-lg flex rounded-sm  bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-28 text-white " onClick={uploadFile}>
                          
                          Upload
                          
                         
                        </button>}
                    </div>

                    {sent && <div className='flex z-60'>
                        <button className='' onClick={() => stateReset()}> Send another video? </button>
                    </div>}
                </div>
            </div>

            <div className='flex bg-white  md:self-end md:justify-center md:relative md:top-24 '>
                <Footer />
            </div>
        </div>
    );
};

export default TestUploadRedux;

