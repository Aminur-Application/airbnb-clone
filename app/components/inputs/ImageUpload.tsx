'use client'

import React, { useCallback } from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { TbPhotoPlus, TbTrash } from 'react-icons/tb'
import Button from '../Button'
import { BiTrash } from 'react-icons/bi'

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string[]) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value,
}) => {

  const handleUpload = useCallback((result: any) => {
    const newImageUrl = result.info.secure_url;
    const updatedValue = [...value]; // Create a copy of the existing value array
    updatedValue.push(newImageUrl); // Push the new image URL into the copied array
    onChange(updatedValue);
  }, [onChange, value]);

  return (
    <>
      <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset="gsfzfhds"
        options={{
          maxFiles: 10,
          multiple: true,
        }}
      >
        {({ open }) => {
          return (
            <div onClick={() => open?.()} className='relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600'>
              <TbPhotoPlus size={50} />
              <div className='font-semibold text-lg'>
                Click to upload
              </div>
            </div>
          )
        }}
      </CldUploadWidget>
    </>

  )
}

export default ImageUpload