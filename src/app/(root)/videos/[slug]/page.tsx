'use client'
import React, { useState, useEffect } from 'react'
import MuxPlayer from '@mux/mux-player-react'
import { useQuery } from '@tanstack/react-query'
import NavBar from '@/app/components/ui/nav/nav'
import Footer from '@/app/components/shared/footer/general/page'
import { getVideoInfo } from '@/app/lib/database/connections'
import Notifications from '@/app/components/shared/notifications/notifications'
import FriendsList from '@/app/components/shared/friends/friends'
import MobileNav from '@/app/components/shared/modals/mobileNav'

const VideoPlayer = ({ params }: { params: { slug: string } }) => {
  const [playBackID, setPlayBackID] = useState<string | null>(null)
  const [isReady, setIsReady] = useState(false)

  const { data } = useQuery({
    queryKey: ['videoplayer', params.slug],
    queryFn: () => getVideoInfo(params?.slug),
    // retry: false, // optional: avoid retries if asset not found
  })

  // videoData from backend
  const videoData = data && 'data' in data ? data.data.data : null

  useEffect(() => {
    if (params?.slug) {
      setPlayBackID(params?.slug)
    }
  }, [params.slug])

  // Poll until asset is ready
  useEffect(() => {
    if (!videoData) return

    const checkReady = async () => {
      if (videoData.status === 'ready') {
        setIsReady(true)
      } else {
        // poll every 2 seconds until ready
        const interval = setInterval(async () => {
          const updated = await getVideoInfo(params.slug)
          const updatedData = 'data' in updated ? updated.data.data : null
          if (updatedData?.status === 'ready') {
            setIsReady(true)
            clearInterval(interval)
          }
        }, 2000)
      }
    }

    checkReady()
  }, [videoData, params.slug])
 console.log('Current Video Data: ', params);
 console.log('Testing Data: ', data)
  return (
    <div className="max-sm:flex md:min-h-screen max-sm:flex-col  bg-white">
      {/* Nav */}
      <div className="row-start-1 col-start-1 col-span-6">
        <NavBar />
      </div>

      {/* Mobile Nav */}
      <div className="fixed z-[9999] max-sm:visible pointer-events-none max-sm:w-screen max-sm:h-screen">
        <MobileNav />
      </div>

      {/* Notifications */}
      <div className="h-full max-sm:invisible col-start-1 row-start-1 md:relative md:top-12 md:h-1/5 md:w-1/3 rounded-md">
        <Notifications />
      </div>

      {/* Player */}
      <div className=" justify-self-center  md:w-1/2 md:px-4 self-start rounded-md md:relative md:-top-[205vh]  ">
        <div className="rounded-xl w-full md:h-full flex">
          {playBackID  ? (
            <MuxPlayer
              className="rounded-xl w-full"
              playbackId={playBackID}
              metadata={{
                video_id: videoData?._id ?? '',
                video_title: videoData?.fileName ?? '',
                viewer_user_id: 'viewer-id',
              }}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-black text-white">
              Loading video...
            </div>
          )}
          {/* {playBackID && isReady ? (
            <MuxPlayer
              className="rounded-xl w-full"
              playbackId={playBackID}
              metadata={{
                video_id: videoData?._id ?? '',
                video_title: videoData?.fileName ?? '',
                viewer_user_id: 'viewer-id',
              }}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-black text-white">
              Loading video...
            </div>
          )}*/}
        </div>

        {/* Video Info */}
        <div className="flex flex-col md:space-x-4 md:justify-around md:-mt-16 z-[9999] ">
          <div className="md:w-1/3 flex max-sm:w-full">
            <h1 className="text-4xl">{videoData?.fileName}</h1>
          </div>
          <div className="md:w-1/3 flex py-2">
            <h3 className="text-xl">{videoData?.user}</h3>
          </div>
          <div className="md:w-1/3 flex">
            <h4 className="text-lg">
              {videoData?.tags === 'user-selected-tags' ? '' : videoData?.tags}
            </h4>
          </div>
        </div>
      </div>

      {/* Friends List */}
      <div className="flex max-sm:invisible relative md:-top-[265vh] md:left-4 justify-self-end h-full md:h-1/5 md:w-1/5 md:relative md:top-12 md:col-start-6 md:row-start-1 md:row-span-2 bg-slate-300 rounded-md max-sm:row-start-3 max-sm:col-start-1 max-sm:col-span-6">
        <FriendsList />
      </div>

      {/* Footer */}
      <div className="flex md:relative md:-top-48 bg-white col-start-1 col-span-6 justify-self-center self-center md:self-start row-start-4 max-sm:mt-20">
        <Footer />
      </div>
    </div>
  )
}

export default VideoPlayer
