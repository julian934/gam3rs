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
type Props = {}

const SignUpRedux = (props: Props) => {
  return (
    <div className='bg-white' >
        <div className='flex w-full' >
          <NavBar/>
        </div>
         <div className='flex justify-center space-y-20 py-8 md:mt-20 ' >
              <SignupForm/>
         </div>
        
        <div className='flex justify-center ' >
            <Footer/>
        </div>
        </div>
  )
}

export default SignUpRedux