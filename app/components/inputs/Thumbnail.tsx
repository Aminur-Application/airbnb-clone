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
  bigPicture?: boolean
}

const Thumbnail: React.FC<ThumbnailProps> = ({ images, row, onRemoval, onClick, value, bigPicture }) => {

  const handleRemoval = (url: string) => {
    const updatedValue = images.filter((imageUrl) => imageUrl !== url);
    onRemoval(updatedValue);
  }

  useEffect(() => {
    if (!value && images.length > 0) {
      onClick(images[0])
    }

    if (!images.includes(value)) {
      onClick(images[0])
    }
  }, [value, images])

  return (
    <>
      <div className={`flex w-auto flex-nowrap gap-2 ${row ? "flex-row" : "flex-col"} overflow-y-auto`}>
        {images.map((url) => (
          <div key={url} className={`flex flex-shrink-0 relative w-[100px] h-[100px] rounded-md`}>
            <div className="z-10 absolute top-2 right-2">
              <button type="button" onClick={() => handleRemoval(url)} className='p-2 bg-rose-500 hover:opacity-100 opacity-70 rounded-full text-white'>
                <BiTrash size={18} />
              </button>
            </div>
            <Image
              fill
              className={`object-cover border-2 hover:opacity-100 ${value === url ? 'opacity-100 border-rose-500' : 'opacity-80'}`}
              alt="Image"
              src={url}
              onClick={() => onClick(url)}
            />
          </div>
        ))}
      </div>
      {bigPicture && (
        <div className={`flex w-auto h-[400px] relative rounded-md`}>
          <Image
            fill
            className="object-cover border-2 hover:opacity-100"
            alt="Image"
            src={value}
          />
        </div>
      )}

    </>
  )
}

export default Thumbnail