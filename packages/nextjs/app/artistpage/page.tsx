"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ProductCard from "../../components/ui/product-card";
import { Heart } from "lucide-react";
import { Button } from "~~/components/ui/button";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export default function Home() {
  const idParams = useSearchParams();

  const id = idParams.get("id");

  const value = id ? BigInt(id) : BigInt(0);

  console.log(value);

  const { data: artist } = useScaffoldContractRead({
    contractName: "ArtistMarketPlace",
    functionName: "getArtist",
    args: [value],
  });

  const { data: artworks } = useScaffoldContractRead({
    contractName: "ArtistMarketPlace",
    functionName: "getArtistArtWorks",
    args: [value],
  });

  return (
    <main>
      <div className="mx-32">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4 my-20">
          <div className="flex-shrink-0"></div>
          <div className="flex flex-col items-start space-y-2 md:space-y-4">
            <h1 className="text-5xl font-bold font-milonga ml-10">{artist?.name}</h1>
            <p className="text-base text-white ml-10 w-[630px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales porta semper. Vivamus dapibus lorem
              posuere dui semper, et malesuada dui lacinia.
            </p>
            <div className="ml-10 flex">
              <Heart className="fill-white mr-2.5" />
              <span>Follow This Artist</span>
            </div>
            {/* transparent div for vertical margin */}
            <div className="h-[168px]"></div>
            {/* button */}
            <div className="ml-10 w-[400px]">
              <Link href={`/commission/?wallet=${artist?.wallet}`}>
                <Button variant="default" size={"lg"} className="w-full text-2xl">
                  Commission This Artist
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start">
          {/* Featured */}
          <div className="flex-1">
            <h1 className="font-milonga text-5xl my-8">Gallery</h1>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-5 gap-y-10">
              {artworks &&
                artworks.length &&
                artworks.map(({ url, artType, cost, creator, owner, likes }, i) => {
                  return (
                    <ProductCard
                      key={i}
                      url={url}
                      likes={likes}
                      artType={artType}
                      cost={cost}
                      creator={creator}
                      owner={owner}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
