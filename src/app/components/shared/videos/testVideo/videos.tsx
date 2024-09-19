'use client'
import React from 'react';
import MuxPlayer from '@mux/mux-player-react';
import { useContext,useState,useEffect } from 'react';
import { StoreStateContext } from '@/app/lib/context/storeContext';
type Props = {}

const TestVideo = (props: Props) => {
  const [userVideoID, setUserVideoID]=useState('');
  const [userVideoTitle, setUserVideoTitle]=useState('');
  const [viewer_user_id, setViewer_User_ID]=useState('');
  const [playBackID,setPlayBackID]=useState('')
  //States are representational, get information out of user accounts and use context to access.
  return (
    <div className='' >
        Videos
        <MuxPlayer
          playbackId={playBackID}
         metadata={{
            video_id:userVideoID,
            video_title:userVideoTitle,
            viewer_user_id:viewer_user_id
        }} ></MuxPlayer>
        </div>
  )
}

export default TestVideo