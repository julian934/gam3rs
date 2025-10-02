"use client"; // Ensures this runs only on the client

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/app/lib/utils";

const VideoCard = ({ playbackID, fileName }: { playbackID: string; fileName: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/videos/${playbackID}`} className="block">
      <div
        className={cn(
          "group w-full md:w-4/5 cursor-pointer overflow-hidden relative card h-72 rounded-md shadow-xl mx-auto flex flex-col justify-end  border border-transparent dark:border-neutral-800 transition-all duration-500"
        )}
        style={{
          backgroundImage: `url(https://image.mux.com/${playbackID}/${
            isHovered ? "animated.gif?width=320" : "thumbnail.png?width=214&height=121&time=2"
          })`,
          backgroundSize: "cover",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="text relative z-50">
          <h1 className="font-bold text-xl md:text-xl text-gray-300">{fileName}</h1>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;