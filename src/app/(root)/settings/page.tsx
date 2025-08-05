'use client'
import React from 'react'
import NavBar from '@/app/components/ui/nav/nav'
import Footer from '@/app/components/shared/footer/general/page'
import { CldImage } from 'next-cloudinary';
import UploadWidget from '@/app/components/shared/uploadImage/upload';
import Gallery from '@/app/components/shared/fetchImages/fetchImages';
import { ExpandableCardDemo } from '@/app/components/ui/expandable-card-demo/expandable-card-demo';
import { FileUploadDemo } from '@/app/components/ui/file-upload-demo/file-upload-demo';
import { CardHoverEffectDemo } from '@/app/components/ui/hover-effect-demo/hover-effect-demo';
import { InfiniteMovingCards } from '@/app/components/ui/infinite-moving-cards/infinite-moving-cards';
//import { InfiniteMovingCardsDemo } from '@/app/components/ui/infinite-cards-demo/demo';
import { Input } from '@/app/components/ui/input/input';
import { SignupFormDemo } from '@/app/components/ui/signup-demo/signup-demo';
import { CardDemo } from '@/app/components/ui/background-overlay-card-demo/background-overlay-card-demo';
import { Navbar } from '@nextui-org/react';
import { useContext,useState,useEffect } from 'react';
import { StoreStateContext } from '@/app/lib/context/storeContext';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/app/lib/database/connections';
import MobileNav from '@/app/components/shared/modals/mobileNav';
type Props = {}

const Settings = (props: Props) => {

  const ctx = useContext(StoreStateContext);
  const { data: session } = useSession();
  const [dataState, setDataState] = useState<any>(null);

  // 🟢 Fetch user data using React Query
  const { data } = useQuery({
    queryKey: ["dataTest", session?.user?.name], // Ensures refetching when username changes
    queryFn: async () => {
      if (session?.user?.name) {
        return getUser(session.user.name);
      }
      throw new Error("User is not logged in or username is undefined.");
    },
    initialData: null,
    enabled: !!session?.user?.name, // Prevents query if user is not logged in
  });

  // 🟢 Effect runs only when `data` is updated
  useEffect(() => {
    if (!data) return; // Prevent unnecessary execution when data is undefined

    const currentData = data?.data;
    if (JSON.stringify(currentData) !== JSON.stringify(dataState)) {
      setDataState(currentData);
      localStorage.setItem("userdata", JSON.stringify(currentData));

      // Update context only if data changes
      if (JSON.stringify(ctx.userData) !== JSON.stringify(currentData)) {
        ctx.getUser(currentData);
      }
    }
  }, [data]); // Only runs when `data` changes

  // 🟢 Debugging Logs (Remove Later)
  useEffect(() => {
    console.log("Session:", session);
    console.log("User Data:", dataState);
    console.log("Context Data:", ctx.userData);
  }, [session, dataState, ctx.userData]);

  return (
    <div className='flex flex-col bg-white h-screen space-y-8 ' >
      <NavBar/>
      <div className=' max-sm:visible pointer-events-none fixed max max-sm:w-screen max-sm:h-screen  z-[9999] ' >
        <MobileNav/>
      </div>
      <div className='flex flex-col justify-center self-center  items-center space-y-12 z-50' >
         <h1 className='flex max-sm:w-48 max-sm:text-xl h-8 max-sm:ml-4  justify-center text-3xl w-full flex rounded-sm md:self-center bg-gradient-to-r from-red-900 via-red-500 shadow-xl  hover:scale-110 to-red-900 hover:bg-gradient-to-r hover:from-red-900 hover:via-red-300 hover:to-red-900 -skew-x-12 w-64 text-white' >Settings</h1>
         <div className='flex flex-col space-y-8 ' >
            <h1 className='text-2xl' > Change Thumbnail:  </h1>
            <UploadWidget testImage={dataState} /> 
         </div>
         
        {/*  <div className='flex flex-col space-y-8 pt-12 ' >
         <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
  Account Management
</button>
<button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
  Privacy & Security
</button>
<button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
  Notifications
</button>
<button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
  Language
</button>
<button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
  Accessibility
</button>
<button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
  Content & Personalization
</button>
<button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
  Subscription & Billing
</button>
<button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
  Social & Sharing
</button>
<button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
  Display & Layout
</button>
<button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
  Interaction Preferences
</button>
<button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
  Support & Help
</button>
         </div>*/}
      </div>
      
      <div className=' w-screen  flex justify-center ' >
      <Footer/>
      </div>
      
      
     
      </div>
  )
}

export default Settings