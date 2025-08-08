'use client'
import React,{useState,useContext,useRef} from 'react'
import { StoreStateContext } from '@/app/lib/context/storeContext'
import NavBar from '@/app/components/ui/nav/nav'
import Footer from '@/app/components/shared/footer/home/footer'
import MobileNav from '@/app/components/shared/modals/mobileNav'
import { getAdmin } from '@/app/lib/database/connections'

type Props = {}


{/* Categories: video, notification, news */}
const Admin = (props: Props) => {
    const ctx=useContext(StoreStateContext);
    const userName=useRef<any>(null);
    const passWord=useRef<any>(null);
    const [verified, setVerified]=useState<any>(null);
    const [unverified,setUnverified]=useState(null);

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
  return (
    <div className='bg-white  min-h-screen ' >
        
        <NavBar/>
        <div className=' max-sm:visible pointer-events-none fixed max max-sm:w-screen max-sm:h-screen  z-[9999] ' >
        <MobileNav/>
      </div>
      {verified ?<div className='flex relative justify-center z-[9999]' >
        {/* Generate Notifications & automatically send out  */}



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
      

      <div className='flex self-end w-screen justify-around   '  >
        <Footer/>
      </div>

        </div>
  )
}

export default Admin