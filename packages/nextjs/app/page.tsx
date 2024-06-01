"use client";

import { useState } from "react";
import Filter from "../components/ui/filter";
//import ProductCard from "../components/ui/product-card";
import Search from "../components/ui/search";
import Sort from "../components/ui/sort";
import Pagination from "~~/components/layout/Pagination";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const products = [
  // {
  //   artistName: "Takashi Murakami",
  //   artName: "Flowers Blooming",
  //   amount: "1 Token",
  //   tags: ["Open for Commissions", "AI Generated", "Fantasy", "Wizard", "Dungeons & Dragons"],
  //   imgSrc: "/ceptor.png",
  //   imgAlt: "A vibrant floral artwork by Takashi Murakami",
  //   description:
  //     "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem cumque autem mollitia qui, commodi libero.",
  // },
  // {
  //   artistName: "Beeple",
  //   artName: "Everydays: The First 5000 Days",
  //   amount: "1 Token",
  //   tags: ["Open for Commissions", "AI Generated", "Fantasy", "Wizard", "Dungeons & Dragons"],
  //   imgSrc: "/ceptor.png",
  //   imgAlt: "A digital collage artwork by Beeple",
  //   description:
  //     "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem cumque autem mollitia qui, commodi libero.",
  // },
  // {
  //   artistName: "Banksy",
  //   artName: "Girl with Balloon",
  //   amount: "1 Token",
  //   tags: ["Open for Commissions", "AI Generated", "Fantasy", "Wizard", "Dungeons & Dragons"],
  //   imgSrc: "/ceptor.png",
  //   imgAlt: "A street art piece of a girl releasing a heart-shaped balloon by Banksy",
  //   description:
  //     "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem cumque autem mollitia qui, commodi libero.",
  // },
  // {
  //   artistName: "Yayoi Kusama",
  //   artName: "Infinity Nets",
  //   amount: "1 Token",
  //   tags: ["Open for Commissions", "AI Generated", "Fantasy", "Wizard", "Dungeons & Dragons"],
  //   imgSrc: "/ceptor.png",
  //   imgAlt: "An abstract artwork with polka dots by Yayoi Kusama",
  //   description:
  //     "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem cumque autem mollitia qui, commodi libero.",
  // },
  // {
  //   artistName: "Andy Warhol",
  //   artName: "Marilyn Diptych",
  //   amount: "1 Token",
  //   tags: ["Open for Commissions", "AI Generated", "Fantasy", "Wizard", "Dungeons & Dragons"],
  //   imgSrc: "/ceptor.png",
  //   imgAlt: "A pop art portrait of Marilyn Monroe by Andy Warhol",
  //   description:
  //     "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem cumque autem mollitia qui, commodi libero.",
  // },
  // {
  //   artistName: "Andy Warhol",
  //   artName: "Marilyn Diptych",
  //   amount: "1 Token",
  //   tags: ["Open for Commissions", "AI Generated", "Fantasy", "Wizard", "Dungeons & Dragons"],
  //   imgSrc: "/ceptor.png",
  //   imgAlt: "A pop art portrait of Marilyn Monroe by Andy Warhol",
  //   description:
  //     "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem cumque autem mollitia qui, commodi libero.",
  // },
  // {
  //   artistName: "Yayoi Kusama",
  //   artName: "Infinity Nets",
  //   amount: "1 Token",
  //   tags: ["Open for Commissions", "AI Generated", "Fantasy", "Wizard", "Dungeons & Dragons"],
  //   imgSrc: "/ceptor.png",
  //   imgAlt: "An abstract artwork with polka dots by Yayoi Kusama",
  //   description:
  //     "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem cumque autem mollitia qui, commodi libero.",
  // },
  // {
  //   artistName: "Andy Warhol",
  //   artName: "Marilyn Diptych",
  //   amount: "1 Token",
  //   tags: ["Open for Commissions", "AI Generated", "Fantasy", "Wizard", "Dungeons & Dragons"],
  //   imgSrc: "/ceptor.png",
  //   imgAlt: "A pop art portrait of Marilyn Monroe by Andy Warhol",
  //   description:
  //     "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem cumque autem mollitia qui, commodi libero.",
  // },
  // {
  //   artistName: "Andy Warhol",
  //   artName: "Marilyn Diptych",
  //   amount: "1 Token",
  //   tags: ["Open for Commissions", "AI Generated", "Fantasy", "Wizard", "Dungeons & Dragons"],
  //   imgSrc: "/ceptor.png",
  //   imgAlt: "A pop art portrait of Marilyn Monroe by Andy Warhol",
  //   description:
  //     "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem cumque autem mollitia qui, commodi libero.",
  // },
];

const ITEMS_PER_PAGE = 6;

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  // const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  // const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  // const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  //reading artist of the day data from contract
  const { data: artist } = useScaffoldContractRead({
    contractName: "ArtistMarketPlace",
    functionName: "displayArtistOfTheDay",
  });

  //retrieve artist artswork
  const { data: artworks } = useScaffoldContractRead({
    contractName: "ArtistMarketPlace",
    functionName: "getArtistArtWorks",
    args: [artist?.wallet],
  });

  console.log("artist wallet ", artist);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  console.log("artworks => >", artworks);

  return (
    <main className="min-h-screen">
      <div className="w-full mx-auto px-4 md:px-6">
        <div className="flex justify-end py-5 md:py-5 space-x-6">
          <Search placeholder="Search Artwork" className="w-[610px]" />
          <Sort />
        </div>
        <div className="flex flex-col md:flex-row items-start">
          {/* sidebar on desktop */}
          <div className="hidden md:block">
            <Filter />
          </div>
          {/* Featured */}
          <div className="flex-1">
            <h1 className="font-milonga text-5xl my-8">Featured</h1>
            {/* Artist of the day */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-5 gap-y-10">
              {artist && artist.name != "" && (
                <div>
                  {/* //The artist of the day will be declared here */}

                  <p>Artist Name: {artist.name}</p>

                  <p>Wallet: {artist.wallet}</p>

                  <p>Number of arts: {+artist.numberoFArts.toString()}</p>

                  <p>Number of times featured: {+artist.numberFeaturedTimes.toString()}</p>
                </div>
              )}

              {/* The artist artworks will be displayed here */}

              {artworks && artworks?.length > 0 && (
                //artwork is an array so we loop
                <div>
                  {artworks?.map(({ url, cost, artType }, i) => {
                    return (
                      <div key={i}>
                        <img src={`https://devnet.irys.xyz/${url}`} alt="artist image" />

                        <p>Cost: {cost}</p>

                        <p>{artType == 0 ? "AI ART" : "Hand Drawn"}</p>
                      </div>
                    );
                  })}
                </div>
              )}

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
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </div>
        {/* Recommended Section */}
        <div>
          <div className="flex-1 md:ml-52">
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
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </div>
      </div>
    </main>
  );
}
