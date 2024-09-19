"use client"
import React, { SetStateAction } from "react"
import { createContext,useState,ReactNode, FC} from "react"

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
    currentSettings?:any[] | null | undefined
  }
const initialContext={
   userCheck:(username:string,password:string)=>{
    
   },
   getUser:(user:User)=>{
        
   },
   getUserData:(db:Object)=>{

   },
   userData:{
    username:'',
    image:'',
    id:'',
    wishlistItems:[],
    cartItems:[],
    currentSettings:[]
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
    const [userData,setUserData]=useState<SetStateAction<User>>()
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
    const getUser=(user:User)=>{
        let data=user
        setUserData(data)
    }
    const getUserData=(db:Object)=>{
      
    }
    const contextValue:any={
        userConf:userConf,
        setUserConf:setUserConf,
        userName:userName,
        setUserName:setUserName,
        userData:userData,
        setUserData:setUserData,
        userCheck:userCheck,
        getUser:getUser,
        getUserData:getUserData
    }

    return(<StoreStateContext.Provider value={contextValue} >
        {children}
    </StoreStateContext.Provider>)
}

export default StoreStateContextProvider