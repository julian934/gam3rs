import React from 'react'
import NavBar from '@/app/components/ui/nav/nav'
import Featured from '@/app/components/shared/banners/livestreams/featured'
import Popular from '@/app/components/shared/livestreams/popular/popular'
import RecentLives from '@/app/components/shared/livestreams/recent/recents'
import UpcomingLives from '@/app/components/shared/livestreams/upcoming/upcoming'
import Footer from '@/app/components/shared/footer/footer'
type Props = {}

const LiveStreams = (props: Props) => {
  return (
    <div className='' >
        <NavBar/>
        <div className='' >
         <div className='' >
          <Featured/>
         </div>
         <div className='' >
             <RecentLives/>   
         </div>
         <div className='' >
            <Popular/>
         </div>
        <div className='' >
            <UpcomingLives/>
        </div>
        </div>
        <Footer/>
        </div>
  )
}

export default LiveStreams