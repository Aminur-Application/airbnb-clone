'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";

import Heading from "../Heading";
import HeartButton from "../HeartButton";
import { useState } from "react";
import Thumbnail from "../inputs/Thumbnail";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  images: string[];
  id: string;
  currentUser?: SafeUser | null
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  images,
  id,
  currentUser
}) => {
  const { getByValue } = useCountries();
  const [thumbnail, setThumbnail] = useState('')

  const location = getByValue(locationValue);

  return ( 
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="
          w-full
          h-[60vh]
          rounded-xl
          relative
        "
      >
        <Thumbnail height="60vh" images={images} value={thumbnail} bigPicture onClick={(value) => setThumbnail(value)} />
        <div
          className="
            absolute
            top-5
            right-5
          "
        >
          <HeartButton 
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
   );
}
 
export default ListingHead;