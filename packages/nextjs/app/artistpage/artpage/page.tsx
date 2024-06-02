"use client";

import { useState } from "react";
import Image from "next/image";
import Artist from "~~/components/assets/artist.jpg";
import Pagination from "~~/components/layout/Pagination";
import { Button } from "~~/components/ui/button";

//import ProductCard1 from "~~/components/ui/product-card";

const ITEMS_PER_PAGE = 6;

export default function Home() {
  return (
    <main>
      <div className="mx-5 md:mx-32">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4 my-20">
          <div className="flex-shrink-0"></div>
          <div className="flex flex-col items-start space-y-2 md:space-y-4 mx-5">
            <div className="relative flex">
              <Image src={Artist} alt="artist profile picture" className="w-[86px] h-[83px]" />
              <div className="ml-4 ">
                <p className="text-3xl font-milonga m-0">Artist Name</p>
                <p className="text-4xl font-oswald">Title of Artwork</p>
              </div>
            </div>

            {/* transparent div for vertical margin */}
            <div className="md:h-[140px]"></div>

            {/* cost of art */}
            <div>
              <span className="text-xs ml-10">Cost</span>
              {/* <p className="ml-10 m-0">{products[0].amount}</p> */}
            </div>

            {/* button */}
            <div className="ml-10 w-[400px]">
              <Button variant="default" size={"lg"} className="w-full text-2xl">
                Buy This Artwork
              </Button>
              <Button variant="outline" size={"lg"} className="w-full text-2xl mt-5">
                Commission This Artist
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start">
          {/* more items */}
          <div className="flex-1">
            <h1 className="font-milonga text-4xl my-8">More by Artist Name</h1>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-5 gap-y-10"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
