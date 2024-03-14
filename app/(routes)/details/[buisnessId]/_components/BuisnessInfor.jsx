import { Button } from '@/components/ui/button'
import { Clock, Mail, MapPin, Share, User } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const BuisnessInfor = ({ buisness }) => {
    return buisness?.name &&(
        <div className='md:flex gap-4 items-center'>
            <Image src={buisness?.images[0]?.url}
                alt={buisness?.name}
                width={150}
                height={200}
                className='rounded-full h-[150] object-cover'
            />
            <div className='flex justify-between items-center w-full'>
            <div className='flex flex-col mt-4 md:mt-0 items-baseline gap-3'>
                <h2 className='text-primary bg-purple-100 rounded-full p-1 px-3 text-lg'>{buisness?.category?.name}</h2>
                <h2 className='text-[40px] font-bold'>{buisness?.name}</h2>
                <h2 className='flex gap-2 text-lg text-gray-400'><MapPin/>{buisness?.address}</h2>
                <h2 className='flex gap-2 text-lg text-gray-400'><Mail/>{buisness?.email}</h2>
            </div>
            <div className='flex flex-col gap-5 items-end'>
                <Button><Share/></Button>
                <h2 className='flex gap-2 text-xl text-primary'><User/>{buisness.contactPerson}</h2>
                <h2 className='flex gap-2 text-xl text-gray-500'><Clock/>Available 8.00 AM to 10:00 PM</h2>

            </div>
            </div>
        </div>
    )
}

export default BuisnessInfor