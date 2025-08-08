'use client'

import React, { useState } from 'react'
import * as Motion from 'motion/react-client'
import UpArrow from '@/app/utils/images/up-arrow.png'
import DownArrow from '@/app/utils/images/down-arrow.png'
import Image from 'next/image'

type Props = {}

const AboutJulian = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Name Header */}
      <div className="flex items-center justify-center h-[6vh] w-[80vw] md:w-[30vw] bg-gradient-to-r from-red-900 via-red-500 to-red-900 shadow-xl -skew-x-12 rounded-sm">
        <h1 className="font-Gardion text-xl text-white skew-x-12">Julian Borner</h1>
      </div>

      {/* Role Header */}
      <div className="flex items-center justify-center h-[8vh] w-[82.5vw] md:w-[30vw] bg-gradient-to-r from-red-900 via-red-500 to-red-900 shadow-xl -skew-x-12 rounded-sm">
        <h2 className="text-md text-white font-Gardion p-2 skew-x-12 text-center">
          Gam3r Network Founder and Lead Engineer
        </h2>
      </div>

      {/* Modal Toggle */}
      <Motion.div className="flex flex-col items-center mt-4">
        <button
          onClick={() => setIsModalOpen((prev) => !prev)}
          aria-label="Toggle About Modal"
        >
          <Image
            className="w-8 h-8"
            src={isModalOpen ? DownArrow : UpArrow}
            alt={isModalOpen ? 'Close Modal' : 'Open Modal'}
          />
        </button>

        {/* Modal */}
        {isModalOpen && (
          <Motion.div
            className="relative mt-4 md:min-h-[20vh] md:min-w-[25vw] max-w-[90vw] bg-black text-white p-4 rounded-md shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <p className="font-Gardion">
              Julian Borner is the founder and Lead Engineer of the Gam3r Network Company and Website.
            </p>

            {/* Decorative corners (optional) */}
            <div className="absolute w-5 h-5 bg-white rotate-45 -top-2 left-4"></div>
            <div className="absolute w-5 h-5 bg-white rotate-45 -top-2 right-4"></div>
          </Motion.div>
        )}
      </Motion.div>
    </div>
  )
}

export default AboutJulian
