import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BuisnessList = ({ buisnessList, title }) => {
    return (
        <div className='mt-5'>
            <h2 className='font-bold text-[22px]'>{title}</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5'>
                {buisnessList.length > 0 ? buisnessList.map((buisness, index) => (
                    <Link href={'/details/' + buisness.id}
                        key={index} className='shadow-md rounded-lg hover:shadow-lg hover:shadow-purple-600 cursor-pointer
                    hover:scale-105 transition-all ease-in-out'>
                        <Image src={buisness?.images[0].url}
                            alt={buisness.name}
                            width={500}
                            height={500}
                            className='h-[150px] md:h-[200px] object-cover rounded-lg'
                        />
                        <div className='flex flex-col items-baseline p-3 gap-1'>
                            <h2 className='p-1 bg-purple-200 text-primary rounded-full text-[]12px'>{buisness.category.name}</h2>
                            <h2 className='font-bold text-lg'>{buisness.name}</h2>
                            <h2 className='text-primary' >{buisness.contactPerson}</h2>
                            <h2 className='text-gray-500 text-small'>{buisness.address}</h2>
                            <Button className="rounded-lg">Book Now</Button>
                        </div>

                    </Link>
                )) :
                    [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                        <div className='w-full h-[300px] bg-slate-200 rounded-lg animate-pulse'></div>
                    ))
                }
            </div>
        </div>
    )
}

export default BuisnessList