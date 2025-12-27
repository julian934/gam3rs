'use client'
import React from 'react'
import { useState,useEffect,useRef,useContext } from 'react';
import { StoreStateContext } from '@/app/lib/context/storeContext';
import NavBar from '@/app/components/ui/nav/nav';
import Footer from '@/app/components/shared/footer/general/page';
import axios from 'axios';
import { Navbar } from '@nextui-org/react';
import Link from 'next/link';
import { SignupForm } from '@/app/components/ui/sign-up/sign-up';
import MobileNav from '@/app/components/shared/modals/mobileNav';
type Props = {}

const SignUpRedux = (props: Props) => {
  return (
    <div className='bg-white min-h-screen' >
        <div className='flex w-full' >
          <NavBar/>
        </div>
        <div className=' max-sm:visible pointer-events-none fixed max max-sm:w-screen max-sm:h-screen  z-[9999] ' >
        <MobileNav/>
      </div>
         <div className='flex justify-center space-y-20 py-8 mt-20 ' >
              <SignupForm/>
         </div>
        
        <div className='flex justify-center ' >
            <Footer/>
        </div>
        </div>
  )
}

export default SignUpRedux