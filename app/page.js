"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from './_components/Hero'
import CategoryList from "./_components/CategoryList";
import { useEffect, useState } from "react";
import GlobalApi from './_services/GlobalApi'
import BuisnessList from "./_components/BuisnessList";

export default function Home() {

  const [categoryList, setCategoryList] = useState([]);
  const [buisnessList, setBuisnessList] = useState([]);

  useEffect(() => {
    getCategoryList();
    getAllBuisnessLsit();
  }, [])


  const getCategoryList = () => {
    GlobalApi.getCategory().then(resp => {
      setCategoryList(resp.categories)
    })
  }

  const getAllBuisnessLsit = () => {
    GlobalApi.getAllBuisnessList().then(resp => {
      setBuisnessList(resp.buisnessLists)
    })
  }
  return (
    <div>
      <Hero />
      <CategoryList categoryList={categoryList} />
      <BuisnessList buisnessList={buisnessList} title={'Popular Buisness'} />
    </div>
  );
}
