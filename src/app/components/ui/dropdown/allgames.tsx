'use client'
import React,{useState,useEffect,useRef} from 'react'
import Image from 'next/image'
import Link from 'next/link'
type Props = {}

const Dropdown = (props: Props) => {
  const [opened,setOpened]=useState<any>(false);
  const handleOpen=()=>{
    if(opened==false){ 
        setOpened(true)
    }else{
      setOpened(false)
    }
    
  }
  return (
    <div>
      
<button id="dropdownUsersButton" data-dropdown-toggle="dropdownUsers" data-dropdown-placement="bottom" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleOpen} type="button">Genre <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
</svg>
</button>

{opened==true &&<div id="dropdownUsers" className="z-50 relative absolute bg-white rounded-lg shadow w-60 dark:bg-gray-700">
  <ul className="h-48 py-2 overflow-y-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUsersButton">
    <li>
      <Link href="#" className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
        <Image className="w-6 h-6 me-2 rounded-full" width={100} height={100} src="/docs/images/people/profile-picture-1.jpg" alt="Jese image"/>
        MMORPG
      </Link>
    </li>
    <li>
      <Link href="#" className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
        <Image className="w-6 h-6 me-2 rounded-full" width={100} height={100} src="/docs/images/people/profile-picture-2.jpg" alt="Jese image"/>
        Shooter
      </Link>
    </li>
    <li>
      <Link href="#" className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
        <Image className="w-6 h-6 me-2 rounded-full" width={100} height={100} src="/docs/images/people/profile-picture-3.jpg" alt="Jese image"/>
        Strategy
      </Link>
    </li>
    <li>
      <Link href="#" className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
        <Image className="w-6 h-6 me-2 rounded-full" width={100} height={100} src="/docs/images/people/profile-picture-4.jpg" alt="Jese image"/>
        Action RPG
      </Link>
    </li>
    <li>
      <Link href="#" className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
        <Image className="w-6 h-6 me-2 rounded-full" width={100} height={100} src="/docs/images/people/profile-picture-5.jpg" alt="Jese image"/>
        Battle Royale
      </Link>
    </li>
    <li>
      <Link href="#" className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
        <Image className="w-6 h-6 me-2 rounded-full" width={100} height={100} src="/docs/images/people/profile-picture-2.jpg" alt="Jese image"/>
        APG
      </Link>
    </li>
          <li>
      <Link href="#" className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
        <Image className="w-6 h-6 me-2 rounded-full" width={100} height={100} src="/docs/images/people/profile-picture-3.jpg" alt="Jese image"/>
        MMOARPG
      </Link>
    </li>
   
  </ul>
  <Link href="#" className="flex items-center p-3 text-sm font-medium text-blue-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-blue-500 hover:underline">
      <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
        <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z"/>
      </svg>
      Add new user
  </Link>
</div>
 }

    </div>
  )
}

export default Dropdown