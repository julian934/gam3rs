'use client'
import React from 'react'
import { useContext,useState,useEffect,useRef } from 'react';
import { StoreStateContext } from '@/app/lib/context/storeContext';
import { useQuery } from '@tanstack/react-query';
type Props = {}

const Upload = (props: Props) => {
  const submitForm=()=>{
    
  }
  return (
    <div className='' >age
      <form className='' onSubmit={submitForm} >
        <input className='' placeholder='Title' />
        <input  className='' placeholder='Description' />
      </form>
    </div>
  )
}

export default Upload