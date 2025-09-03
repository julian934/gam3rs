"use client"
import React, { SetStateAction, useMemo } from "react"
import { createContext,useState,ReactNode, FC} from "react"
import { getGames } from "../actions/connections"
import axios from "axios"
interface userTypes{
    name:string | undefined | null,
    image: ImageData | string | undefined | null,
    id:string | number | undefined | null
}
export type User={
    username?:string | null | undefined,
    password?: string | null | undefined,
    wishlistItems?:any[] | null | undefined,
    cartItems?: any[] | null | undefined,
    settings?:any[] | null | undefined,
    videos?:any[] | null | undefined | {fileName:any, assetId:any, tags:any[], user:any}[],
    livestreams?: any[] | null | undefined | {fileName:any, assetId:any, tags:any[], user:any}[],
    uploadedGames?: any[] | null | undefined | {fileName:any, assetId:any, tags:any[], user:any}[],
    viewedContent?:any[] | null | undefined | {fileName:any, assetId:any, tags:any[], user:any}[],
    urlSet:string | null | undefined ,
    blobUrl: string |null | undefined,
    file: File | null,
    fileSet: File | null
  }
const initialContext={
   userCheck:(username:string,password:string)=>{
    
   },
   getUser:(user:User)=>{
        
   },
   getUserData:()=>{

   },
   getUserLives:(user?:User)=>{

   },
   getUserVideos:(user?:User)=>{

   },
   getUserGames:(user?:User)=>{

   },
   getUserViews:(user?:User)=>{

   },
   currUserData:()=>{

   }
   ,
   userData:null,
   forumUpdate:(forum:object)=>{

   },
   infoUpdate:(newData:object)=>{

   },
   purchaseUpdate:(newData:object)=>{

   },
   wishlistUpdate:(wishlist:object)=>{

   },
   urlSet:(file:string | null | undefined)=>{

   },
   currUrl:null,
   blobUrl:null as string | null,
   file:null as File | null,
   fileSet:(file:File | null)=>{

   }
}
type ContextType=typeof initialContext;
export const StoreStateContext=createContext<ContextType>(initialContext);

interface StoreStateContextProviderProps{
    children:ReactNode;
}



export const StoreStateContextProvider:FC<StoreStateContextProviderProps>=({children})=>{
    const [state,setState]=useState(initialContext)
    const [userConf,setUserConf]=useState('')
    const [userName,setUserName]=useState('')
    const [userData,setUserData]=useState<SetStateAction<User | any>>()
    const [userLives,setUserLives]=useState([]);
    const [userGames,setUserGames]=useState([]);
    const [userVideos,setUserVideos]=useState([]);
    const [userViews,setUserViews]=useState([]);
    const [recommendedGames,setRecommendedGames]=useState([]);
    const [recommendedVideos,setRecommendedVideos]=useState([]);
    const [recommendedLives,setRecommendedLives]=useState([]);
    const [currUser,setCurrUser]=useState([]);
    const [blobUrl, setBlobUrl] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);


    /*const fileSet=(file:File | null)=>{
        if(file!=null){
            const fileURL=file;
            setFile(fileURL)
        }

    }*/
   const fileSet = (newFile: File | null) => {
  if (newFile) {
    setFile(newFile);
    // Optionally generate blob immediately
    const objectUrl = URL.createObjectURL(newFile);
    setBlobUrl(objectUrl);
  } else {
    setFile(null);
    setBlobUrl(null);
  }
};

   /* const urlSet=(file:any)=>{
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setBlobUrl(objectUrl);
          }
    }*/
   const urlSet = (newFile: File | null) => {
  if (newFile) {
    const objectUrl = URL.createObjectURL(newFile);
    setBlobUrl(objectUrl);
    // Also store file reference
    setFile(newFile);
  } else {
    setBlobUrl(null);
    setFile(null);
  }
};
    
    const userCheck=(username:string,password:string)=>{
        const userCheck= username.split(',');//Optimize with Regex
        const passCheck=password.split(','); //Optimize with Regex
        if(userCheck.length>8 &&userCheck.length<99 && passCheck.length>8 && passCheck.length<99 ){
            let message:any={message:'Successful User'}//add type definitions
            setUserConf(message)
            return userConf
        } 
        return {message:'Invalid User'}
    }
    const getUser=(user?:User | any | string)=>{
        let data:any=localStorage.getItem("userdata");
        let newData=JSON.parse(data);
        setUserData(newData)
    }
    const getUserData=async()=>{
      let data:any=localStorage.getItem("userdata");
      let currData=await JSON.parse(data);
      if(currData!=undefined){
          setCurrUser(currData);
      }
      return {message:"Make sure to log in!"}
    }
    const currUserData=async()=>{
        if(currUser!=undefined || currUser){
            return currUser
        }
        return {message:"No user selected"}
    }
    const getUserGames=async(user?:User)=>{
         if(user?.uploadedGames){
            const games=user?.uploadedGames
            if(games.length<1){
               
               return {flag:'No logged in user',data:await getGames()};
            }
            return {flag:'User Logged In'};
         }
         if(!user){
            return await getGames();
         } 
    }
    const forumUpdate=(forum?:object | void | null)=>{
        try {
            if(forum){
                const currData=forum;
                const backendConnect=axios.post('/api/updates/userForumUpdate',{currData});
                return backendConnect
            }
            return {message:"Invalid data"}
        } catch (error) {
            console.log(error)
        }
    }
    const infoUpdate=(newData:object)=>{
        try {
            if(newData){
                const currData=newData
                const backendConnect=axios.post('/api/updates/userInfoUpdate',{currData})
                return backendConnect
            }
            return {message: "Invalid Data"}
        } catch (error) {
            
        }
    }
    const purchaseUpdate=(purchase:object)=>{
        try {
            if(purchase){
                const currPurchase=purchase;
                const backendConnect=axios.post('/api/updates/userPurchseUpdate',{currPurchase});
                return backendConnect
            }
        } catch (error) {
            console.log(error);
        }
    }
    const wishlistUpdate=(wishlist:object)=>{
        try {
            if(wishlist){
                const currWishList=wishlist;
                const backendConnect=axios.post('/api/updates/userWishListUpdate',{currWishList})
                return backendConnect
            }
            return {message: "Invalid Data"}
        } catch (error) {
            console.log(error)
        }
    }
    const getUserVideos=(user:User)=>{
       
    }

    const getUserLives=(user:User)=>{

    }
    
    const getUserViews=(user:User,content:any)=>{

    }
    const getRecommendedGames=(user?:User)=>{

    }
    const getRecommendedVideos=(user?:User)=>{

    }
    const getRecommendedLives=(user?:User)=>{

    }
    const getRecommendedForums=(user?:User)=>{

    }

    /*const contextValue:any={
        userConf:userConf,
        currUser:currUser,
        setCurrUser:setCurrUser,
        setUserConf:setUserConf,
        userName:userName,
        setUserName:setUserName,
        userData:userData,
        currUserData:currUserData,
        setUserData:setUserData,
        userCheck:userCheck,
        getUser:getUser,
        getUserData:getUserData,
        getUserGames:getUserGames,
        getUserVideos:getUserVideos,
        getUserLives:getUserLives,
        getUserViews:getUserViews
    }*/
   const contextValue:any=useMemo(
    ()=>({
        userData,
        setUserData,
        userCheck,
        getUser,
        currUserData,
        forumUpdate,
        infoUpdate,
        purchaseUpdate,
        wishlistUpdate,
        urlSet,
        blobUrl,
        fileSet,
        file,
        
    }),
    [userData,blobUrl,file]
   );

    return(<StoreStateContext.Provider value={contextValue} >
        {children}
    </StoreStateContext.Provider>)
}

export default StoreStateContextProvider