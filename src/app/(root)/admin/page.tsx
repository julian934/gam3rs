'use client'
import React,{useState,useContext,useRef} from 'react'
import { StoreStateContext } from '@/app/lib/context/storeContext'
import NavBar from '@/app/components/ui/nav/nav'
import Footer from '@/app/components/shared/footer/home/footer'
import MobileNav from '@/app/components/shared/modals/mobileNav'
import { getAdmin } from '@/app/lib/database/connections'
import * as motion from 'motion/react-client'
import UploadWidget from '@/app/components/shared/uploadImage/upload'
import { CldUploadWidget, CldImage } from "next-cloudinary";
import test from "node:test";
import { FileUpload } from '@/app/components/ui/file-upload/admin-file-upload'
import axios from "axios";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { getUser } from "@/app/lib/database/connections";
import { useQuery } from "@tanstack/react-query";
type Props = {}


{/* Categories: video, notification, news */}
const Admin = (props: Props) => {
    const ctx=useContext(StoreStateContext);
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
    
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [imageData,setImageData]=useState<any>();
    const [userData,setUserData]=useState<any>();
    const [updated,setUpdated]=useState<any>(null)
    const [currData,setCurrData]=useState<any>()
      const [dataState,setDataState]=useState<any>()
    
     const {data:session}=useSession();
   // const ctx=useContext(StoreStateContext); 
    //const user:any=localStorage.getItem("userdata");
    //const finUserData=JSON.parse(user);
    //setUserData(ctx.getUserData);
    if(imageUrl){
      console.log(imageUrl)
    }
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

   console.log('Curr User: ', userName?.current?.value)
   console.log('Curr Pass: ', passWord?.current?.value)
   console.log('Admin Test: ', verified)
   console.log('Verification Status: ', verified)
   console.log('State Test: ')
  return (
    <div className='bg-white  min-h-screen ' >
        
        <NavBar/>
        <div className=' max-sm:visible pointer-events-none fixed max max-sm:w-screen max-sm:h-screen  z-[9999] ' >
        <MobileNav/>
      </div>
      {verified ?<div className='flex relative max-sm:top-12 justify-center z-[9999]  w-1/2' >
        {/* Generate Notifications & automatically send out  */}
        <div className='flex w-full max-sm:w-5/6 max-sm:space-around justify-around h-32 p-4  md:w-2/3 md:ml-0 ' >
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
          {newsActive && <motion.div className='' >
            {/*  Set Up News Pipeline */}
            <div className='flex flex-col items-center space-y-4' >
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
            <div className='' >
                {/* Set Title and Body Text*/}
              <input className='rounded-lg p-4 ' placeholder='Title' ref={titleRef} />
              <input className='rounded-lg p-4 ' placeholder='Body text' ref={bodyText} />


            </div>
            <button className='' >

            </button>

          </motion.div> }
         
          {postActive && <motion.div className='' >
             {/* Set Up Forum Pipeline */}
             <div className='' >
                {/* Video */}
                    <div className='flex z-50 '>
                                       <FileUpload />
                                   </div>
             </div>
             <div className='flex flex-col items-center space-y-4' >
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
            Upload Image
          </button>
        )}
      </CldUploadWidget>
                <input className='rounded-lg p-4 ' placeholder='Title' ref={titleRef} />
                <input className='rounded-lg p-4 ' placeholder='Body text' ref={bodyText} />

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
      

      <div className='flex self-end w-screen justify-around relative md:mt-56 '  >
        <Footer/>
      </div>

        </div>
  )
}

export default Admin