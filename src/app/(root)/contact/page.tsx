'use client'
import React from 'react'
import { Metadata } from 'next'

export const metadata:Metadata={
  title:'The Gam3r Network Contact Page',
  description:'Contact the Gam3r Network!',
  creator:'The Gam3r Network'
}

type Props = {}

const Contact = (props: Props) => {
  return (
    <div className='flex grid grid-cols-4 grid-rows-4' >
      Contact
      </div>
  )
}

export default Contact