'use client'
import React,{useState,useRef, SetStateAction,useEffect} from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useContext } from 'react';
import { signup } from '../../lib/signup/signup';
import SignUp from '@/app/components/shared/signup/signup';
//import SignIn from '@/app/components/shared/signin/signin';
import { StoreStateContext } from '@/app/lib/context/storeContext';
import { signIn } from 'next-auth/react';
import NavBar from '@/app/components/ui/nav/nav';
import Link from 'next/link';
import Footer from '@/app/components/shared/footer/home/footer';
import SignIn from '@/app/components/ui/sign-in/sign-in';
import MobileNav from '@/app/components/shared/modals/mobileNav';
type Props = {}

const Auth = (props: Props) => {

  return (
    <div className='bg-white' >
    <div className='flex w-full z-50' >
      <NavBar/>
    </div>
    <div className=' max-sm:visible pointer-events-none fixed max max-sm:w-screen max-sm:h-screen  z-[9999] ' >
        <MobileNav/>
      </div>
     <div className='flex justify-center space-y-20 z-0 md:z-20 md:mt-20' >
          <SignIn/>
     </div>
    
    <div className='flex  justify-center md:self-end md:mt-56 md:z-50' >
        <Footer/>
    </div>
    </div>
  )
}

export default Auth