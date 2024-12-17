'use client'
import React from 'react'
import { useState,useRef,useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { StoreStateContext } from '@/app/lib/context/storeContext'
type Props = {}

const Accessibility = (props: Props) => {
    const [fontSize,setFontSize]=useState<HTMLInputElement>();
    const [fontStyle,setFontStyle]=useState<HTMLInputElement>();
    const [contrast,setContrast]=useState<HTMLInputElement>();
    const [theme,setTheme]=useState<HTMLInputElement>();
    {/* Research Screen Reader Options*/}
    const accessOptions={
        fontSize:fontSize,
        fontStyle:fontStyle,
        contrast:contrast,
        theme:theme
    }
    type access={
        fontSize:any,
        fontStyle:any,
        contrast:any,
        theme:any
    }
    const {data}=useQuery({
        queryKey:['accessibility'],
        queryFn:()=>{},
        
    });

    const updateAccessibilityOptions=(options:access)=>{
      
    }

  return (
    <div className='' >
        Accessibility
        {/* selector for font size of available sizes in tailwind */}
        {/* selector for font style*/}
        {/* Slider for contrast*/}
        {/* Selectors for theme- Light(default) and Dark*/}
        <button className='' onClick={()=>updateAccessibilityOptions(accessOptions)} >Update </button>
        </div>
  )
}

export default Accessibility