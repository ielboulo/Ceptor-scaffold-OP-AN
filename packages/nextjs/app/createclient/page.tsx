"use client";

import React, { useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const CreateClientUser = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const { address } = useAccount();

  const client = {
    wallet: address,
    email: formData.email,
    favoriteArts: [] as bigint[],
    commisions: [] as bigint[],
  };

  const config = {
    contractName: "ArtistMarketPlace",
    functionName: "createClientUser",
    args: [client],
    value: 0,
  } as any;

  const { writeAsync: createClient, isError, isLoading } = useScaffoldContractWrite(config);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const createNewClient = async () => {
    if (formData.email !== "" && address !== null) {
      try {
        await createClient();
        alert("new client created");
      } catch (error) {
        console.log("Error creating client.....", error);
      }
    }
  };

  if (isLoading) {
    return <p>Creating a new client......</p>;
  }

  if (isError) {
    return <p>Have an error....</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Register Artist</h2>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Client Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="shadow appearance-none border border-[#F8C522] bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={createNewClient}
          className="bg-[#F8C522] hover:[#F8C522]/60 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateClientUser;
