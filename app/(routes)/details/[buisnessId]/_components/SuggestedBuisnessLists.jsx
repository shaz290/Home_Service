import GlobalApi from '@/app/_services/GlobalApi';
import { Button } from '@/components/ui/button'
import { Link2, NotebookPenIcon } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import BookingSection from './BookingSection';


const SuggestedBuisnessLists = ({ buisness }) => {

  const [buisnessList, setBuisnessList] = useState([]);

  useEffect(() => {
    console.log();
    buisness && getBuisnessList()
  }, [buisness]);

  const getBuisnessList = () => {
    GlobalApi.getBuisnessBycategory(buisness?.category?.name)
      .then(resp => {
        setBuisnessList(resp?.buisnessLists)
      })
  }
  return (
    <div className='md:pl-10'>
      <BookingSection buisness={buisness}>
      <Button className="flex gap-2 w-full ">
        <NotebookPenIcon />
        Book Appointment
      </Button>
      </BookingSection>
      <div className='hidden md:block'>
        <h2 className='font-bold text-lg mt-3 '>Similar Buisness</h2>
        <div className=''>
          {buisnessList && buisnessList.map((buisness, index) => (
            <Link href={'/details/' + buisness.id} className='flex gap-2 mb-4 mt-4 hover:border border-primary
          rounded-lg p-2 cursor-pointer hover:shadow-md'key={index}>
              <Image
                src={buisness?.images[0].url}
                alt={buisness.name}
                width={80}
                height={80}
                className='rounded-lg object-cover'
              />
              <div className=''>
                <h2 className='font-bold'>{buisness.name}</h2>
                <h2 className='text-primary'>{buisness.contactPerson}</h2>
                <h2 className='text-gray-300'>{buisness.address}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )

}

export default SuggestedBuisnessLists