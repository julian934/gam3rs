import { CldImage } from "next-cloudinary";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Gallery() {
  const images = [
    "sample", // Example Cloudinary public ID (replace with your images), otherwise it doesn't work. 
    "another-image",
  ];
   const getData=useQuery({
    queryKey:['currGallery'],
    queryFn:()=>{}
   })
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {images.map((image, index) => (
        <CldImage
          key={index}
          width="400"
          height="300"
          src={image}
          alt={`Cloudinary Image ${index}`}
          className="rounded-lg shadow-md"
        />
      ))}
    </div>
  );
}
