import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  request: Request
){
  const currentUser = await getCurrentUser()

  if(!currentUser){
    return NextResponse.error()
  }

  const body = await request.json();
  const { 
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
    thumbnail
   } = body;

   Object.keys(body).forEach((value: any) => {
    if(!body[value]){
      NextResponse.error()
    }
   })

   const listing = await prisma.listing.create({
    data: {
      title,
      description,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      thumbnail,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id
    }
   });

   await Promise.all(
    imageSrc.map((image: string) =>
      prisma.listingImage.create({
        data: {
          imageSrc: image,
          listing: { connect: { id: listing.id } },
        },
      })
    )
  );

   return NextResponse.json(listing)
}