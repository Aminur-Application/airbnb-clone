'use client';

import React, { useCallback, useEffect } from 'react'
import { BiTrash } from 'react-icons/bi';
import Image from 'next/image'

interface ThumbnailProps {
  images: string[],
  row?: boolean,
  onRemoval: (value: string[]) => void;
  onClick: (value: string) => void;
  value: string;
}

const Thumbnail: React.FC<ThumbnailProps> = ({images, row, onRemoval, onClick, value}) => {

  const handleRemoval = (url: string) => {
    const updatedValue = images.filter((imageUrl) => imageUrl !== url);
    onRemoval(updatedValue);
  }
  
  useEffect(() => {
    if (!value && images.length > 0){
      onClick(images[0])
    }
  }, [value, images])
  
  return (
    <div className={`flex gap-4 ${row ? "flex-row" : "flex-col"}`}>
      {images.map((url) => (
        <div key={url} className={`relative w-[100px] h-[100px] rounded-md overflow-hidden `}>
          <div className="z-10 absolute top-2 right-2">
            <button type="button" onClick={() => handleRemoval(url)} className='p-2 bg-rose-500 hover:opacity-100 opacity-70 rounded-full text-white'>
              <BiTrash size={18} />
            </button>
          </div>
          <Image
            fill
            className={`object-cover border-2 hover:opacity-100 ${value === url ? 'opacity-100 border-rose-500': 'opacity-80'}`}
            alt="Image"
            src={url}
            onClick={() => onClick(url)}
          />
        </div>
      ))}
    </div>
  )
}

export default Thumbnail