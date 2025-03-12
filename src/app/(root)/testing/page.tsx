"use client";
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
import NavBar from '@/app/components/ui/nav/nav';
import { Navbar } from '@nextui-org/react';
import { useContext,useState,useEffect } from 'react';
import { StoreStateContext } from '@/app/lib/context/storeContext';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/app/lib/database/connections';
// By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
export default function TestSuite() {
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
    <div className='flex flex-col ' >
      <div className='flex w-full' >
      <Navbar/>
      </div>
      
    <UploadWidget testImage={dataState} /> 
    {/* <Gallery/> */}

    <ExpandableCardDemo/>
    <FileUploadDemo/>
    <CardHoverEffectDemo/>
     <Input/>
     <SignupFormDemo/>
     <CardDemo/>
    </div>
  );
}