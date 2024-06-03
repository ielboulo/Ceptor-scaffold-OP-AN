"use client";

import { useState } from "react";
import Link from "next/link";
import Modal from "./Modal";
import { Button } from "./button";

interface ProductProps {
  url: string;
  artType: number;
  cost: bigint;
  likes: bigint;
  creator: string;
  owner: string;
  index?: bigint;
}

const ProductCard = ({ url, artType, cost, creator, owner, index }: ProductProps) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="relative group">
      <Link href={`https://devnet.irys.xyz/${url}`} className="block w-full h-full absolute inset-0 z-10">
        <span className="sr-only">View</span>
      </Link>
      <img
        alt="Artist image"
        className="border-4 border-[#949494] object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
        src={`https://devnet.irys.xyz/${url}`}
        style={{ width: "267px", height: "163px" }}
      />
      <div className="absolute top-2 left-2 right-2 flex justify-between items-center px-2">
        <span className="text-white text-xl py-1 px-2">{artType == 0 ? "AI" : "Human"}</span>
      </div>
      <div className="flex-1 py-4">
        <div className="flex justify-between">
          <div>
            <p className="font-bold tracking-tight"></p>
            <p className="font-bold tracking-tight"></p>
          </div>
          <div>
            <p className="text-[#D0D0D0] text-sm">Cost</p>
            <h4 className="font-semibold mt-2">{+cost.toString()}</h4>
          </div>
        </div>

        <div className="mt-4 relative z-20">
          <Button variant="default" size="lg" className="w-full" onClick={openModal}>
            Buy Artwork
          </Button>
        </div>
      </div>
      {showModal && <Modal show={showModal} onClose={closeModal} product={{ cost, owner, index }} />}
    </div>
  );
};

export default ProductCard;
