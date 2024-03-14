"use client"

import GlobalApi from '@/app/_services/GlobalApi';
import { signIn, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import BuisnessInfor from './_components/BuisnessInfor';
import BuisnessDescription from './_components/BuisnessDescription';
import SuggestedBuisnessLists from './_components/SuggestedBuisnessLists';

const BuisnessDetail = ({ params }) => {
    const { data, status } = useSession();

    const [buisness, setBuissness] = useState([]);

    useEffect(() => {
        params && getBuisnessById();
    }, [params])

    const getBuisnessById = () => {
        GlobalApi.getBuisnessById(params.buisnessId).then(resp => {
            setBuissness(resp.buisnessList);
        })
    }

    useEffect(() => {
        checkUserAuth();
    }, []);

    const checkUserAuth = () => {

        if (status == 'loading') {
            return <p>Loading.........</p>
        }

        if (status == 'unauthenticated') {
            signIn('descope');
        }
    }

    return status == 'authenticated' && buisness &&(

        <div className='py-8 md:py-20 px-10 md:px-36'>
            <BuisnessInfor buisness={buisness}/>

            <div className='grid grid-cols-3 mt-16'>
                <div className='col-span-3 md:col-span-2 order-last md:order-first'>
                    <BuisnessDescription buisness={buisness}/>
                </div>
                <div className=''>
                    <SuggestedBuisnessLists buisness={buisness}/>
                </div>
            </div>

        </div>

    )
}

export default BuisnessDetail