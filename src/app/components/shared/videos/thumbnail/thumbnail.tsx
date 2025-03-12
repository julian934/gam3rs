import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

type ThumbnailProps = {
    playbackId: string;
};

const Thumbnail = ({ playbackId }: ThumbnailProps) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['thumbnail', playbackId],
        queryFn: async () => {
            const res = await fetch(`/api/videos/thumbnail?playbackId=${playbackId}`);
            if (!res.ok) throw new Error('Failed to fetch thumbnail');
            return res.json();
        },
    });
     if(data){
        console.log(data)
     }
    if (isLoading) return <p>Loading thumbnail...</p>;
    if (isError) return <p>Error loading thumbnail.</p>;
       
    return (
        <div className="flex justify-center items-center w-full md:w-auto h-auto">
            <Image
                src={data.thumbnailUrl}
                alt="Video Thumbnail"
                width={100}
                height={100}
                className="w-full h-auto object-cover rounded-md "
            />
        </div>
    );
};

export default Thumbnail;
