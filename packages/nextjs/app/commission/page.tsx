"use client";

import { useState } from "react";
import MultiStepForm from "./MultiStepForm";
import SuccessModal from "~~/components/steps/SuccessModal";

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openSuccessModal = () => setIsSuccessModalOpen(true);
  const closeSuccessModal = () => setIsSuccessModalOpen(false);

  return (
    <div className="flex flex-col justify-between mt-60">
      <div className="flex-grow flex flex-col justify-center items-center">
        <h1 className="text-5xl font-milonga">Commission Artist Name</h1>
        <p className="text-base mt-4 w-[840px]">
          Use the following questions to describe your character and the art that you would like Artist Name to create
          in their style. If you already have a character created with Ceptor Club, select the Import button and we will
          fill out the questions for you!
        </p>
      </div>
      <div className="flex justify-center mb-8 space-x-4 mt-44">
        <button
          onClick={openModal}
          className="bg-[#F8C522] hover:bg-[#F8C522]/90 text-black font-bold py-2 px-14 rounded-full"
        >
          Tell Us About Your Character
        </button>
        <button className="border border-[#F8C522] hover:bg-[#F8C522]/90 text-white font-bold py-2 px-10 rounded-full">
          Import Character from Ceptor Club
        </button>
      </div>
      {isModalOpen && <MultiStepForm isOpen={isModalOpen} onClose={closeModal} onSuccess={openSuccessModal} />}
      <SuccessModal isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />
    </div>
  );
};

export default LandingPage;
