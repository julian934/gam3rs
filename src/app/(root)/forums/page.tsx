import React,{useState,useRef,} from 'react'
import NavBar from '@/app/components/ui/nav/nav'
import Footer from '@/app/components/shared/footer/footer'
import { useQuery } from '@tanstack/react-query'
import { StoreStateContext } from '@/app/lib/context/storeContext'
type Props = {}

const Forums = (props: Props) => {
    //Utilize MongoDB for forums & optimize.
    //Implement Forums search option.
  return (
    <div className='' >
      <NavBar/>
      Forums
      <div className='' >

      </div>
      <div className='' >
        
      </div>
      <div className='' >
        
      </div>
      <Footer/>
      </div>
  )
}

export default Forums