'use client';
import React, { useEffect } from 'react';
import NavBar from '@/app/components/ui/nav/nav';
import Footer from '@/app/components/shared/footer/general/page';
import Image from 'next/image';
import Link from 'next/link';

import Instagram from '../../utils/images/socials/icons8-instagram-96.png';
import Twitter from '../../utils/images/socials/icons8-twitterx-100.png';
import Twitch from '../../utils/images/socials/icons8-twitch-100.png';

import About_Modal from '@/app/components/shared/modals/about';
import MobileNav from '@/app/components/shared/modals/mobileNav';
import AboutJulian from '@/app/components/ui/about/aboutJulianRedux';
import JB_Profile_Pic from '@/app/utils/images/JB_Professional_Pic.jpg';

type Props = {};

const AboutRedux = (props: Props) => {
  useEffect(() => {
    // Any setup logic can go here
  }, []);

  return (
    <div className="grid grid-cols-6 grid-rows-4 min-h-screen bg-white max-sm:flex max-sm:flex-col">
      {/* Navigation */}
      <div className="col-span-6 row-start-1 z-[9999] max-sm:z-40  ">
        <NavBar />
      </div>

      {/* Mobile Nav */}
      <div className="pointer-events-none fixed max-sm:w-screen max-sm:h-screen z-[9999] max-sm:visible">
        <MobileNav />
      </div>

      {/* Main About Section */}
      <div className="grid border-2 border-white grid-cols-4 grid-rows-4 row-span-2 col-span-6 md:row-start-2 md:justify-self-center md:p-4 md:space-x-2 max-sm:mt-12 max-sm:top-0 max-sm:flex max-sm:flex-col z-0">
        
        {/* Left: About Modal */}
        <div className="flex max-sm:h-[35vh] max-sm:justify-center max-sm:col-span-6 md:col-span-2 md:self-center md:-top-48 relative max-w-[800px] max-h-[800px]">
          <About_Modal />
        </div>

        {/* Right: Description */}
        <div className="flex flex-col justify-center col-span-2 max-sm:col-span-6 max-sm:mt-14 md:relative md:-top-48">
          <h1 className="self-center p-2 text-5xl 2xl:text-8xl font-Gardion md:top-4 relative">
            What We Do
          </h1>
          <p className="p-4 2xl:text-lg max-sm:px-6">
            The Gam3rs Network is your place for unfiltered, unedited content that is by Gamers, for Gamers.
            On our YouTube Channel, we make videos about games and gaming-related subjects, as well as host
            livestreams where we go in-depth about these topics and interact with our viewers to get your opinions.
            Over here on The Gam3r Network website, we continue the conversation with forums, videos and
            livestreams that we can&apos;t host on YouTube. Jump down the rabbit hole and join the network! Be
            sure to join us on social media where we post every day!
          </p>

          {/* Meet The Team */}
          <div className="flex flex-col bg-white max-sm:space-y-4">
            <h1 className="font-Gardion relative max-sm:left-6">Meet The Team</h1>
            <div className="flex max-sm:flex-col max-sm:space-y-4">
              <Image
                src={JB_Profile_Pic}
                alt="Julian Borner Profile Pic"
                quality={100}
                width={100}
                height={100}
                className="rounded-md md:w-[15vw] lg:h-[20vh] lg:w-[10vw] md:max-w-[15vw] md:h-[30vh] md:max-h-[30vh] max-sm:w-[90vw] max-sm:h-[60vh]"
              />
              <div className="md:right-44 relative max-sm:right-0">
                <AboutJulian />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Icons */}
      <div className="flex justify-around bg-white row-start-4 col-span-4 relative md:top-4 max-sm:top-0 max-sm:w-full">
        <Link href="/" className="self-center">
          <Image src={Instagram} alt="Instagram" className="w-12 h-12" />
        </Link>
        <Link href="/" className="self-center">
          <Image src={Twitter} alt="X/Twitter" className="w-12 h-12 rounded-lg" />
        </Link>
        <Link href="/" className="self-center">
          <Image src={Twitch} alt="Twitch" className="w-12 h-12" />
        </Link>
      </div>

      {/* Footer */}
      <div className="flex justify-around col-span-6 row-start-4 bg-white relative top-10 max-sm:top-36">
        <Footer />
      </div>
    </div>
  );
};

export default AboutRedux;
