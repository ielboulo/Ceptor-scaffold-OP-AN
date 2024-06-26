"use client";

import Link from "next/link";
import Filter from "../components/ui/filter";
import Search from "../components/ui/search";
import { Heart } from "lucide-react";
import { Button } from "~~/components/ui/button";
import ProductCard from "~~/components/ui/product-card";
import Sort from "~~/components/ui/sort";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export default function Home() {
  const { data: artist, isLoading: artistLoading } = useScaffoldContractRead({
    contractName: "ArtistMarketPlace",
    functionName: "displayArtistOfTheDay",
  });

  const { data: artworks, isLoading: artworksLoading } = useScaffoldContractRead({
    contractName: "ArtistMarketPlace",
    functionName: "getArtistArtWorks",
    args: [artist?.artistIndex],
  });

  if (artistLoading) {
    <p>Artist Loading....................</p>;
  }

  if (artworksLoading) {
    <p>Artworks Loading.....................</p>;
  }

  return (
    <main className="min-h-screen">
      <div className="w-full mx-auto px-4 md:px-6">
        <div className="flex justify-end py-5 space-x-6">
          <Search placeholder="Search Artwork" className="w-[610px]" />
          <Sort />
        </div>
        <div className="flex flex-col md:flex-row items-start">
          {/* sidebar on desktop */}
          <div className="hidden md:block w-1/4">
            <Filter />
          </div>
          {/* Main content */}
          <div className="flex-1 md:ml-6">
            {/* Artist of the Day */}
            <div className="w-full mb-10">
              <h1 className="font-milonga text-5xl mt-8">Artist of the Day</h1>
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4 my-20">
                <div className="flex-shrink-0"></div>
                <div className="flex flex-col items-start space-y-2 md:space-y-4">
                  <h1 className="text-5xl font-bold font-milonga ml-10">{artist?.name}</h1>
                  <p className="text-base text-white ml-10 w-[630px]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales porta semper. Vivamus dapibus
                    lorem posuere dui semper, et malesuada dui lacinia.
                  </p>
                  <div className="ml-10 flex">
                    <Heart className="fill-white mr-2.5" />
                    <span>Follow This Artist</span>
                  </div>
                  {/* transparent div for vertical margin */}
                  <div className="h-[168px]"></div>
                  {/* button */}
                  <div className="ml-10 w-[400px]">
                    <Link href={`/artistpage/?id=${artist?.artistIndex}`}>
                      <Button variant="default" size={"lg"} className="w-full text-2xl">
                        Discover More From This Artist
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* Featured */}
            <div className="w-full mb-10">
              <h1 className="font-milonga text-5xl my-8">Featured</h1>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-5 gap-y-10">
                {artworks &&
                  artworks.length &&
                  artworks.map(({ url, artType, cost, creator, owner, likes, index }, i) => {
                    return (
                      <ProductCard
                        key={i}
                        url={url}
                        likes={likes}
                        artType={artType}
                        cost={cost}
                        creator={creator}
                        owner={owner}
                        index={index}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        {/* Recommended Section */}
        <div className="w-full">
          <h1 className="font-milonga text-5xl my-8">Recommended</h1>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-5 gap-y-10">
            {/* {currentProducts.map(product => (
              <ProductCard
                key={product.artName}
                href={`/${product.artName}`}
                imgSrc={product.imgSrc}
                imgAlt={product.imgAlt}
                artist={product.artistName}
                title={product.artName}
                price={product.amount}
                tags={product.tags}
                isAI={true}
                isFavourite={false}
              />
            ))} */}
          </div>
        </div>
      </div>
    </main>
  );
}
