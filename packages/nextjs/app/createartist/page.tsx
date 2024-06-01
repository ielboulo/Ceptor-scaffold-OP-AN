"use client";

import React, { useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const CreateArtistUser = () => {
  const [formData, setFormData] = useState({
    artistName: "",
    style: "", //0 or 1
    email: "",
  });

  const { address } = useAccount();

  const artist = {
    wallet: address,
    name: formData.artistName,
    style: +formData.style,
    numberoFArts: BigInt(0),
    numberFeaturedTimes: BigInt(0),
    artworks: [],
    commisions: [] as bigint[],
  };

  const config = {
    contractName: "ArtistMarketPlace",
    functionName: "createArtistUser",
    args: [artist],
    value: 0,
  } as any;

  const { writeAsync: createArtist, isError, isLoading } = useScaffoldContractWrite(config);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const createNewArtist = async () => {
    if (formData.artistName !== "" && formData.style !== "select" && address !== null) {
      try {
        await createArtist();
        alert("new artist created");
      } catch (error) {
        console.log("Error creating artist.....", error);
      }
    }
  };

  if (isLoading) {
    return <p>Creating a new artist......</p>;
  }

  if (isError) {
    return <p>Have an error....</p>;
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Register Artist</h2>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="artistName">
          Artist Name
        </label>
        <input
          type="text"
          id="artistName"
          name="artistName"
          value={formData.artistName}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="artistEmail">
          Email
        </label>
        <input
          type="text"
          id="artistEmail"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="artistName">
          Artist Style
        </label>
        <select onChange={handleChange}>
          <option value="select">select style</option>
          <option value="0">AI</option>
          <option value="1">Hand Drawn</option>
        </select>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={createNewArtist}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateArtistUser;
