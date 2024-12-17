'use client'
import React,{useState,useEffect,useRef,useContext} from 'react';
import { StoreStateContext } from '@/app/lib/context/storeContext';

type Props = {}

const ForumTags = (props: Props) => {
    const ctx=useContext(StoreStateContext);
  return (
    <div className='' >
        ForumTags
        </div>
  )
}

export default ForumTags