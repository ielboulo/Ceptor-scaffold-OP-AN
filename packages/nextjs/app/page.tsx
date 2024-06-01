"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Filter from "../components/ui/filter";
import ProductCard from "../components/ui/product-card";
import Search from "../components/ui/search";
import { Heart } from "lucide-react";
import Artist from "~~/components/assets/artist.jpg";
import Pagination from "~~/components/layout/Pagination";
import { Button } from "~~/components/ui/button";
import Sort from "~~/components/ui/sort";

const products = [
  {
    artistName: "Takashi Murakami",
    artName: "Flowers Blooming",
    amount: "1 Token",
    tags: ["Open for Commissions", "AI Generated", "Fantasy", "Wizard", "Dungeons & Dragons"],
    imgSrc: "/ceptor.png",
    imgAlt: "A vibrant floral artwork by Takashi Murakami",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem cumque autem mollitia qui, commodi libero.",
  },
  {
    artistName: "Beeple",
    artName: "Everydays: The First 5000 Days",
    amount: "1 Token",
    tags: ["Open for Commissions", "AI Generated", "Fantasy", "Wizard", "Dungeons & Dragons"],
    imgSrc: "/ceptor.png",
    imgAlt: "A digital collage artwork by Beeple",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem cumque autem mollitia qui, commodi libero.",
  },
  {
    artistName: "Banksy",
    artName: "Girl with Balloon",
    amount: "1 Token",
    tags: ["Open for Commissions", "AI Generated", "Fantasy", "Wizard", "Dungeons & Dragons"],
    imgSrc: "/ceptor.png",
    imgAlt: "A street art piece of a girl releasing a heart-shaped balloon by Banksy",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem cumque autem mollitia qui, commodi libero.",
  },
  {
    artistName: "Yayoi Kusama",
    artName: "Infinity Nets",
    amount: "1 Token",
    tags: ["Open for Commissions", "AI Generated", "Fantasy", "Wizard", "Dungeons & Dragons"],
    imgSrc: "/ceptor.png",
    imgAlt: "An abstract artwork with polka dots by Yayoi Kusama",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem cumque autem mollitia qui, commodi libero.",
  },
  {
    artistName: "Andy Warhol",
    artName: "Marilyn Diptych",
    amount: "1 Token",
    tags: ["Open for Commissions", "AI Generated", "Fantasy", "Wizard", "Dungeons & Dragons"],
    imgSrc: "/ceptor.png",
    imgAlt: "A pop art portrait of Marilyn Monroe by Andy Warhol",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem cumque autem mollitia qui, commodi libero.",
  },
  {
    artistName: "Andy Warhol",
    artName: "Marilyn Diptych",
    amount: "1 Token",
    tags: ["Open for Commissions", "AI Generated", "Fantasy", "Wizard", "Dungeons & Dragons"],
    imgSrc: "/ceptor.png",
    imgAlt: "A pop art portrait of Marilyn Monroe by Andy Warhol",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem cumque autem mollitia qui, commodi libero.",
  },
  {
    artistName: "Yayoi Kusama",
    artName: "Infinity Nets",
    amount: "1 Token",
    tags: ["Open for Commissions", "AI Generated", "Fantasy", "Wizard", "Dungeons & Dragons"],
    imgSrc: "/ceptor.png",
    imgAlt: "An abstract artwork with polka dots by Yayoi Kusama",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem cumque autem mollitia qui, commodi libero.",
  },
  {
    artistName: "Andy Warhol",
    artName: "Marilyn Diptych",
    amount: "1 Token",
    tags: ["Open for Commissions", "AI Generated", "Fantasy", "Wizard", "Dungeons & Dragons"],
    imgSrc: "/ceptor.png",
    imgAlt: "A pop art portrait of Marilyn Monroe by Andy Warhol",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem cumque autem mollitia qui, commodi libero.",
  },
  {
    artistName: "Andy Warhol",
    artName: "Marilyn Diptych",
    amount: "1 Token",
    tags: ["Open for Commissions", "AI Generated", "Fantasy", "Wizard", "Dungeons & Dragons"],
    imgSrc: "/ceptor.png",
    imgAlt: "A pop art portrait of Marilyn Monroe by Andy Warhol",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem cumque autem mollitia qui, commodi libero.",
  },
];

const FEATURED_ITEMS = 3;
const RECOMMENDED_ITEMS = 6;

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * RECOMMENDED_ITEMS;
  const indexOfFirstItem = indexOfLastItem - RECOMMENDED_ITEMS;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(products.length / RECOMMENDED_ITEMS);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <main className="min-h-screen">
      <div className="w-full mx-auto px-4 md:px-6">
        <div className="flex justify-end py-5 md:py-5 space-x-6">
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
                <div className="flex-shrink-0">
                  <Image
                    alt="artist image"
                    className="object-cover h-full w-full md:w-auto md:h-[400px] group-hover:opacity-50 transition-opacity"
                    src={Artist}
                    width={400}
                    height={400}
                  />
                </div>
                <div className="flex flex-col items-start space-y-2 md:space-y-4">
                  <h1 className="text-5xl font-bold font-milonga ml-10">Artist Name</h1>
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
                    <Link href="/artistPage">
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
                {products.slice(0, FEATURED_ITEMS).map(product => (
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
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Recommended Section */}
        <div className="w-full">
          <h1 className="font-milonga text-5xl my-8">Recommended</h1>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-5 gap-y-10">
            {currentProducts.map(product => (
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
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </div>
    </main>
  );
}
