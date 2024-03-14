"use client"

import BuisnessList from '@/app/_components/BuisnessList';
import GlobalApi from '@/app/_services/GlobalApi';
import React, { useEffect, useState } from 'react'


function BuisnessByCategory({ params }) {

const[buisnessList,setBuisnessList]=useState([]);

  useEffect(() => {
    console.log(params);
    params&&getBuisnessList()
  }, [params]);

  const getBuisnessList = () => {
    GlobalApi.getBuisnessBycategory(params.category)
      .then(resp => {
        setBuisnessList(resp?.buisnessLists)
      })
  }

  return (
    <div>
      <BuisnessList title={params.category}
      buisnessList={buisnessList}
      />
    </div>
  )
}

export default BuisnessByCategory