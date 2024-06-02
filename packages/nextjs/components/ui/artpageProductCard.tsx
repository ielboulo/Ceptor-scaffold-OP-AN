"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Modal from "./Modal";
import { Heart } from "lucide-react";

interface ProductProps {
  href: string;
  imgSrc: string;
  imgAlt: string;
  artist?: string;
  title?: string;
  price?: string;
  description?: string;
  tags: string[];
  isAI: boolean;
  isFavourite: boolean;
}

const ArtPageProductCard = ({
  href,
  imgSrc,
  imgAlt,
  description,
  tags,
  isAI,
  isFavourite: initialFavourite,
  artist,
  title,
  price,
}: ProductProps) => {
  const [isFavourite, setIsFavourite] = useState(initialFavourite);
  const [showModal, setShowModal] = useState(false);

  const toggleFavourite = () => {
    setIsFavourite(!isFavourite);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="relative group">
      <Link className="absolute inset-0 z-10" href={href}>
        <span className="sr-only">View</span>
      </Link>
      <Image
        alt={imgAlt}
        className="border-4 border-[#949494] object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
        height={163}
        src={imgSrc}
        width={267}
      />
      <div className="absolute top-2 left-2 right-2 flex justify-between items-center px-2">
        <span className="text-white text-xl py-1 px-2">{isAI ? "AI" : "Human"}</span>
        <button
          onClick={toggleFavourite}
          className={`p-1 ${isFavourite ? "text-red-500" : "text-gray-500"} transition-colors`}
          aria-label="Add to favourite"
        >
          <Heart className={`w-5 h-5 ${isFavourite ? "fill-white text-white" : "fill-none"}`} />
        </button>
      </div>
      <div className="flex-1 py-4">
        <div className="flex justify-between">
          <div className="w-[400px]">
            <p className="font-bold tracking-tight">{description}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-2">
          {tags.map((tag, index) => (
            <span key={index} className="bg-[#F6EA94] text-black text-xs px-2 py-1 rounded-md">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 relative z-20">
          <button className="bg-[#F8C522] text-white px-4 py-2 rounded w-full" onClick={openModal}>
            Buy Artwork
          </button>
        </div>
      </div>
      {showModal && <Modal show={showModal} onClose={closeModal} product={{ price, title, artist }} />}
    </div>
  );
};

export default ArtPageProductCard;
