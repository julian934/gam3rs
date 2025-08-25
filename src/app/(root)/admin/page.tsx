'use client'
import React,{useState,useContext,useRef,useEffect} from 'react'
import { StoreStateContext } from '@/app/lib/context/storeContext'
import NavBar from '@/app/components/ui/nav/nav'
import Footer from '@/app/components/shared/footer/home/footer'
import MobileNav from '@/app/components/shared/modals/mobileNav'
import { getAdmin } from '@/app/lib/database/connections'
import * as motion from 'motion/react-client'
import UploadWidget from '@/app/components/shared/uploadImage/upload'
import { CldUploadWidget, CldImage } from "next-cloudinary";
import test from "node:test";
import { FileUpload } from '@/app/components/ui/file-upload/file-upload'
import axios from "axios";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { getUser } from "@/app/lib/database/connections";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from '@tanstack/react-query'
import { videoUpdate } from '@/app/lib/database/connections'
import { notificationUpdate } from '@/app/lib/database/connections'
type Props = {}


{/* Categories: video, notification, news */}
const Admin = (props: Props) => {
    const ctx=useContext(StoreStateContext);
     const inputFileRef = useRef<HTMLInputElement | null>(null);
    const userName=useRef<any>(null);
    const passWord=useRef<any>(null);
    const titleRef=useRef<any>(null);
    const bodyText=useRef<any>(null);
    const [verified, setVerified]=useState<any>(null);
    const [unverified,setUnverified]=useState(null);
    const [newsActive, setNewsActive]=useState<any>(null);
    const [postActive,setPostActive]=useState<any>(null);
    const [banActive,setBanActive]=useState<any>(null);
    const [addAdmin,setAddAdmin]=useState<any>(null);
     const [returnData,setReturnData]=useState<any>([]);
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
         const [currInputData,setInputData]=useState<any[]>([]);
    const [userData,setUserData]=useState<any>();
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [imageData,setImageData]=useState<any>();
    const [currVideoUrl,setCurrVideoUrl]=useState<any>(null);
    const [urlState,setURLState]=useState<any>();
    //const [userData,setUserData]=useState<any>();
    const [updated,setUpdated]=useState<any>(null)
    const [currData,setCurrData]=useState<any>()
      const [dataState,setDataState]=useState<any>()
    
     const {data:session}=useSession();
   // const ctx=useContext(StoreStateContext); 
    //const user:any=localStorage.getItem("userdata");
    //const finUserData=JSON.parse(user);
    //setUserData(ctx.getUserData);
    useEffect(() => {
      let currUser = localStorage.getItem("userdata");
      let currData = currUser ? JSON.parse(currUser) : null;
      console.log('Curr Data (updated):', ctx.blobUrl);
      //const storedUrl = localStorage.getItem('VidURL');
      const storedUrl=ctx.blobUrl;
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
      if (vidObj != null) {
        setUserVid(vidObj);
      }
    
      const storedVidUrl = localStorage.getItem("video");
    
      if (storedVidUrl) {
        setVidUrl(JSON.parse(storedVidUrl));
      }
    
    }, [vidUrl, sent]);
    if(imageUrl){
      console.log(imageUrl)
    }

    const mutation = useMutation({
      mutationFn: async (video: any) => {
        if (video != undefined) {
          const currVideo: any = await video;
          return notificationUpdate(currVideo);
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
    //if(finUserData!=null){
      //setUserData(finUserData)
   // }
    const verifyUser=(e:React.FormEvent)=>{
        e.preventDefault()
        const user={
            username:userName?.current?.value,
            password:passWord?.current?.value
        }

        let adminTest=getAdmin(user);
        if(adminTest!=undefined && adminTest!=null){
            setVerified(adminTest)

        }


    }
    const handleFileChange = () => {
      const file = inputFileRef?.current?.files ? inputFileRef.current.files[0] : null;
      if (file) {
        setVidUrl(URL.createObjectURL(file));
      }
    };

    const sendToNetwork=()=>{

    }
    const handlefileName=()=>{
      setCurrFileName(titleRef?.current?.value)
    }

    const uploadFile = async () => {
      /*if (!inputFileRef.current?.files) {
        console.error('No file selected');
        return;
      }

      const file = inputFileRef.current.files[0];*/
    //  const file=localStorage.getItem('VidURL');
    //const file=urlState;
       //file!=null && file!=undefined && JSON.parse(file);
     // const fileData:any=localStorage.getItem("videoData");
      const fileURL=ctx.file && {
        fileName: ctx.file.name,
        size: ctx.file.size,
        modified: ctx.file.lastModified,
      };
      console.log('Check File: ', fileURL)
      // Step 1: Request an upload URL from the backend
      const { data } = await axios.post('/api/uploads', { filename: fileURL && fileURL?.fileName });
      const uploadUrl = data.uploadUrl;

      // Step 2: Upload the file to Mux using the upload URL
      try {
       
        const response = await axios.post('/api/uploads', { filename: fileURL && fileURL.fileName }); //filename is the file sent through. 

        const { uploadUrl, assetId } = response.data;
        setUploadURL(uploadUrl);
        setUploadID(assetId);

        const uploadResponse = await axios.put(uploadUrl, ctx.file, {
          headers: { 'Content-Type': ctx.file?.type },
        });
        setSent(true);
        setAsset(data.assetId); // Asset ID from Mux to store

        console.log('Video uploaded successfully:', uploadResponse.data);

        // Optional: Update user data context
        const currUser = userState;
        const videoUrl: any = localStorage.getItem("video");
        console.log("Video check:", JSON.parse(videoUrl));

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

  

    const stateReset = () => {
      if (sent) {
        setSent(false);
      }
    };



   console.log('Curr User: ', userName?.current?.value)
   console.log('Curr Pass: ', passWord?.current?.value)
   console.log('Admin Test: ', verified)
   console.log('Verification Status: ', verified)
   console.log('State Test: ')
   console.log('Update Test: ', updated)
//   let currVideo= localStorage.getItem("AdminVideoData")
 //  console.log('Admin Video Data: ',currVideo)
  return (
    <div className='bg-white  min-h-screen ' >
        
        <NavBar/>
        <div className=' max-sm:visible pointer-events-none fixed max max-sm:w-screen max-sm:h-screen  z-[9999] ' >
        <MobileNav/>
      </div>
      {verified ?<div className='flex relative max-sm:top-12 justify-center z-[9999]  w-1/2' >
        {/* Generate Notifications & automatically send out  */}
        <div className='flex w-full md:absolute max-sm:w-5/6 max-sm:space-around justify-around h-32 p-4  md:w-2/3 md:ml-0 ' >
           <h1 className='flex h-8 font-Gardion relative max-sm:left-20 md:left-36 justify-center text-2xl max-sm:text-xl flex rounded-sm  bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-56 text-white ' > Admin </h1>

        </div>
        {!newsActive && !postActive && !banActive && !addAdmin &&    <motion.div className='flex flex-col  max-sm:relative max-sm:-left-24 w-full w-1/2 space-y-12 mt-20 ' >
          
          <motion.button onClick={()=>setNewsActive(!newsActive)} >
          <h1 className='flex h-8 font-Gardion relative max-sm:left-8 md:left-36 justify-center text-2xl max-sm:text-xl flex rounded-sm  bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-56 text-white ' > 
              Create News
               </h1>
          </motion.button>
          <motion.button onClick={()=>setPostActive(!postActive)} >
          <h1 className='flex h-8 font-Gardion relative max-sm:left-8 md:left-36 justify-center text-2xl max-sm:text-xl flex rounded-sm  bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-56 text-white ' > 
              Create Post
               </h1>
          </motion.button>
          <motion.button onClick={()=>setBanActive(!banActive)} >
          <h1 className='flex h-8 font-Gardion relative max-sm:left-12 md:left-36 justify-center text-2xl max-sm:text-xl flex rounded-sm  bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-56 text-white ' > 
              Ban User
               </h1>
          </motion.button>
          <motion.button onClick={()=>setAddAdmin(!addAdmin)} >
          <h1 className='flex h-8 font-Gardion relative max-sm:left-12 md:left-36 justify-center text-2xl max-sm:text-xl flex rounded-sm  bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-96 max-sm:w-80 text-white ' > 
              Add or Remove Administrator
               </h1>
          </motion.button>

          </motion.div>}
          {newsActive && <motion.div className='flex flex-col border-2 md:relative md:left-48 border-black  z-[9999] md:self-center md:w-3/4 ' >
            {/*  Set Up News Pipeline */}
            <div className='flex flex-col relative md:left-48 md:top-28 items-center space-y-4' >
                {/* Set Image Thumbnail */}
                <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={(result) => {
          console.log("Full upload result:", result);

          if (result?.event === "success" && typeof result?.info  === "object" && result.info !== null) {
            const uploadedUrl =(result.info as { secure_url?: string }).secure_url; // ✅ Extract correct URL
            
            if (typeof uploadedUrl === "string" && uploadedUrl.trim() !== "") {
              console.log("Validated URL before setting state:", uploadedUrl);
                    //userData?.settings?.thumbnails.push(uploadedUrl);
                    const dataPoint:any=localStorage.getItem('username')
                    const user=JSON.parse(dataPoint)
                    const userObj={
                      userName:"The Gam3r Network",
                      imageURL:uploadedUrl,
                      title:titleRef.current.value,
                      bodyText:bodyText.current.value
                    }

                    axios.post('/api/updates/newsUpdate',userObj)
              setImageUrl(uploadedUrl);
              redirect('/')
            } else {
              console.error("Invalid URL received:", uploadedUrl);
            }
            
            if (typeof uploadedUrl === "string" && uploadedUrl.trim() !== "") {
              const userObj={
                username:session?.user?.name,
                imageURL:uploadedUrl
              }
              axios.post('/api/updates/userThumbNailUpdate',{data:userObj})
        setImageUrl(uploadedUrl);
        redirect('/')
              console.log("Uploaded Image URL:", uploadedUrl);
            } else {
              console.error("Invalid URL received:", uploadedUrl);
            }
          } else {
            console.error("Unexpected upload result structure", result);
          }
        }}
      >
        {({ open }) => (
          <button
            onClick={() => open()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Upload Image
          </button>
        )}
      </CldUploadWidget>
            </div>
            <div className='flex flex-col space-y-4 ' >
                {/* Set Title and Body Text*/}
              <input className='rounded-lg p-4 ' placeholder='Title' ref={titleRef} />
              <input className='rounded-lg p-4 ' placeholder='Body text' ref={bodyText} />


            </div>
            <button className='' >

            </button>

          </motion.div> }
         
          {postActive && <motion.div className=' flex max-sm:flex-col  md:min-w-[60vw] md:min-h-[50vh] md:relative md:top-16 md:left-96 ' >
             {/* Set Up Forum Pipeline */}
             <div className='   ' >
                {/* Video */}
                    <div className='flex z-50 '>
                                       <FileUpload />
                                   </div>
             </div>
             <div className='flex flex-col items-center space-y-4 md:relative md:top-12' >
                {/* Thumbnail, title, and body text */}
                <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={(result) => {
          console.log("Full upload result:", result);

          if (result?.event === "success" && typeof result?.info  === "object" && result.info !== null) {
            const uploadedUrl =(result.info as { secure_url?: string }).secure_url; // ✅ Extract correct URL
            
            if (typeof uploadedUrl === "string" && uploadedUrl.trim() !== "") {
              console.log("Validated URL before setting state:", uploadedUrl);
                    //userData?.settings?.thumbnails.push(uploadedUrl);
                    const dataPoint:any=localStorage.getItem('username')
                    const user=JSON.parse(dataPoint)
                    const userObj={
                      userName:"The Gam3r Network",
                      imageURL:uploadedUrl,
                      title:titleRef.current.value,
                      bodyText:bodyText.current.value
                    }
                    setCurrData(userObj)
                    axios.post('/api/updates/newsUpdate',userObj)
              setImageUrl(uploadedUrl);
              redirect('/')
            } else {
              console.error("Invalid URL received:", uploadedUrl);
            }
            
            if (typeof uploadedUrl === "string" && uploadedUrl.trim() !== "") {
              const userObj={
                username:session?.user?.name,
                imageURL:uploadedUrl
              }
              axios.post('/api/updates/userThumbNailUpdate',{data:userObj})
        setImageUrl(uploadedUrl);
        redirect('/')
              console.log("Uploaded Image URL:", uploadedUrl);
            } else {
              console.error("Invalid URL received:", uploadedUrl);
            }
          } else {
            console.error("Unexpected upload result structure", result);
          }
        }}
      >
        {({ open }) => (
          <button
            onClick={() => open()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Upload Thumbnail
          </button>
        )}
      </CldUploadWidget>
                <input className='rounded-lg p-4 md:ml-4 ' placeholder='Title' onChange={handlefileName} ref={titleRef} />
                <input className='rounded-lg p-4 ' placeholder='Body text' ref={bodyText} />
               <button  onClick={()=>uploadFile()} className='flex z-[9999] h-8 font-Gardion relative md:absolute   max-sm:left-20 md:left-10 md:top-56 justify-center text-2xl max-sm:text-xl flex rounded-sm  bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-96 text-white ' >
                   Post To Gam3r Network
               </button>
             </div>

            </motion.div>}
            {banActive && <motion.div>
                  {/* Set up Ban Pipeline  */}
     

                </motion.div>}
                {addAdmin && <motion.div>
                        {/* Set up Admin Pipeline  */}
                        <div className='' >
                        <input className=' bg-gray-200 rounded-xl w-full text-black  w-full p-2'  ref={userName} placeholder='username'  />
        <input className=' bg-gray-200 rounded-xl w-full  text-black w-full p-2 '  ref={passWord} placeholder='password'/>
        <button type='submit' className='flex h-8 font-Gardion relative max-sm:left-8 md:left-20 justify-center text-lg max-sm:text-xl flex rounded-sm  bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-28 text-white ' >
        <h1 className='' > Login</h1>
        </button>
                        </div>

                    </motion.div>}
        
      </div>:<form onSubmit={verifyUser} className='flex flex-col justify-self-center  h-[60vh] space-y-4 relative top-20 z-[9999] ' >
      <div className='flex w-full max-sm:w-5/6 max-sm:space-around justify-around h-32 p-4  md:w-2/3 md:ml-0 ' >
           <h1 className='flex h-8 font-Gardion relative max-sm:left-8 md:left-36 justify-center text-2xl max-sm:text-xl flex rounded-sm  bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-56 text-white ' > Admin </h1>

          
           
          
          
        </div>
        <input className=' bg-gray-200 rounded-xl w-full text-black  w-full p-2'  ref={userName} placeholder='username'  />
        <input className=' bg-gray-200 rounded-xl w-full  text-black w-full p-2 '  ref={passWord} placeholder='password'/>
        <button type='submit' className='flex h-8 font-Gardion relative max-sm:left-8 md:left-20 justify-center text-lg max-sm:text-xl flex rounded-sm  bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-28 text-white ' >
        <h1 className='' > Login</h1>
        </button>
        </form>}
        
      <div className='' >

      </div>
      

      <div className='flex self-end w-screen justify-around relative md:mt-72 '  >
        <Footer/>
      </div>

        </div>
  )
}

export default Admin