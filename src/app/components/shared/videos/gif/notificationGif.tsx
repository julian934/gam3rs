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
          "group w-full cursor-pointer overflow-hidden relative card h-20 min-w-28 rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 transition-all duration-500"
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
          <h1 className="font-bold text-xl md:text-2xl text-gray-300">{fileName}</h1>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;