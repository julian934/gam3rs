'use client'
import React,{useState,useEffect,useRef,useContext} from 'react'
import { signOut, useSession } from 'next-auth/react'
import { StoreStateContext } from '@/app/lib/context/storeContext'
import type { SetStateAction } from 'react'
import Link from 'next/link'
type Props = {}
//Need template in place for data.
const Settings = (props: Props) => {
  const {data:session}=useSession();
  const [settingsMenu,setSettingsMenu]=useState(false);
  const [userStatus,setUserStatus]=useState<SetStateAction<any>>()
  // const {data:session}=useSession();
   const ctx=useContext(StoreStateContext);
  const menu=()=>{
    if(!settingsMenu){
        setSettingsMenu(true)
    }else{
      setSettingsMenu(false)
    }
  }
  useEffect(()=>{
   if(session?.user){
    setUserStatus(ctx.userData)
    console.log(userStatus)
    console.log(ctx.userData)
   }
  },[session])
  return (
    <div id="dropdownAvatar" className="z-50  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 bg-red-300 absolute">
    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
      <div>{userStatus?.name}</div>
      <div className="font-medium truncate">{userStatus?.name}</div>
    </div>
    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
      {/* <li>
        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
      </li> */}
      <li>
        <Link href="/settings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</Link>
      </li>
      <li>
        <Link href="/help" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Help</Link>
      </li>
    </ul>
    <div className="py-2 flex">
      <button className=' self-center w-full justify-center block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white' onClick={()=>signOut()} >Sign out  </button>
     {/* <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a> */} 
    </div>
</div>
  )
}

export default Settings