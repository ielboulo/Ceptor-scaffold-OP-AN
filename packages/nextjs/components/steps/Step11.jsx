/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Image from "next/image";
import Artwork1 from "../assets/artwork/artwork1.png";
import Artwork2 from "../assets/artwork/artwork2.png";
import Artwork3 from "../assets/artwork/artwork3.png";
import Artwork4 from "../assets/artwork/artwork4.png";
import Artwork5 from "../assets/artwork/artwork5.png";
import Artwork6 from "../assets/artwork/artwork6.png";
import Artwork7 from "../assets/artwork/artwork7.png";
import Artwork8 from "../assets/artwork/artwork8.png";
import Artwork9 from "../assets/artwork/artwork9.png";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Modal from "react-modal";

const Step11 = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [description, setDescription] = useState("");

  const openModal = index => {
    setSelectedIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedIndex(null);
  };

  const goToPrevious = () => {
    setSelectedIndex(prevIndex => (prevIndex === 0 ? artworks.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setSelectedIndex(prevIndex => (prevIndex === artworks.length - 1 ? 0 : prevIndex + 1));
  };

  const handleOptionChange = event => {
    const value = event.target.value;
    setSelectedOptions(prevOptions =>
      prevOptions.includes(value) ? prevOptions.filter(option => option !== value) : [...prevOptions, value],
    );
  };

  const artworks = [Artwork1, Artwork2, Artwork3, Artwork4, Artwork5, Artwork6, Artwork7, Artwork8, Artwork9];
  return (
    <>
      <div className="flex-grow flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl font-milonga justify-center items-center">Generate Reference Images</h1>
        <p className="text-base text-[#E9E8ED] mt-4 md:w-[840px] text-left">
          We've generated the following images using AI based on the information you provided. Please select any images
          that match with your vision of your character or of the final artwork. When you select an image, you will be
          able to write a quick note about what you like about the image (the character, the pose, the background,
          etc.). These images do not represent the final image, which will be drawn by Artist Name. These images are
          references to help Artist Name create something special for you and your character.
        </p>
        <div className="block mb-2 mt-5">
          <span className="text-[#d0d0d0] flex justify-center">Select the Image that You Like</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {artworks.map((artwork, index) => (
          <div key={index} className="w-full h-auto">
            <Image
              src={artwork}
              alt={`Artwork ${index + 1}`}
              width={400}
              height={246}
              className="object-cover cursor-pointer"
              onClick={() => openModal(index)}
            />
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Selected Image"
        className="flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="bg-[#181818] p-4 rounded-lg max-w-3xl w-full mx-4 relative flex">
          {selectedIndex !== null && (
            <>
              <div className="w-1/2">
                <Image
                  src={artworks[selectedIndex]}
                  alt="Selected Artwork"
                  width={369}
                  height={553}
                  className="object-cover"
                />
              </div>
              <div className="w-5/6 pl-4 flex flex-col">
                <h2 className="text-xl font-bold">What do you like about this artwork?</h2>
                <div className="mt-4 grid grid-cols-4 gap-4 m-4">
                  <label className="block mb-2">
                    <input
                      type="checkbox"
                      value="Art Style"
                      checked={selectedOptions.includes("Art Style")}
                      onChange={handleOptionChange}
                    />
                    <span className="ml-2">Art Style</span>
                  </label>
                  <label className="block mb-2">
                    <input
                      type="checkbox"
                      value="Character"
                      checked={selectedOptions.includes("Character")}
                      onChange={handleOptionChange}
                    />
                    <span className="ml-2">Character</span>
                  </label>
                  <label className="block mb-2">
                    <input
                      type="checkbox"
                      value="Background"
                      checked={selectedOptions.includes("Background")}
                      onChange={handleOptionChange}
                    />
                    <span className="ml-2">Background</span>
                  </label>
                  <label className="block mb-2">
                    <input
                      type="checkbox"
                      value="Pose"
                      checked={selectedOptions.includes("Pose")}
                      onChange={handleOptionChange}
                    />
                    <span className="ml-2">Pose</span>
                  </label>
                  <label className="block mb-2">
                    <input
                      type="checkbox"
                      value="Weapons"
                      checked={selectedOptions.includes("Weapons")}
                      onChange={handleOptionChange}
                    />
                    <span className="ml-2">Weapons</span>
                  </label>
                  <label className="block mb-2">
                    <input
                      type="checkbox"
                      value="Armor"
                      checked={selectedOptions.includes("Armor")}
                      onChange={handleOptionChange}
                    />
                    <span className="ml-2">Armor</span>
                  </label>
                  <label className="block mb-2">
                    <input
                      type="checkbox"
                      value="Items"
                      checked={selectedOptions.includes("Items")}
                      onChange={handleOptionChange}
                    />
                    <span className="ml-2">Items</span>
                  </label>
                  <label className="block mb-2">
                    <input
                      type="checkbox"
                      value="Other"
                      checked={selectedOptions.includes("Other")}
                      onChange={handleOptionChange}
                    />
                    <span className="ml-2">Other</span>
                  </label>
                </div>
                <span className="text-[#d0d0d0] flex justify-center">
                  Is there anything else you like about this artwork that you would like to share with the artist?
                </span>
                <textarea
                  className="mt-4 p-2 border border-gray-300 rounded"
                  placeholder="Enter a description..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
                <button className="mt-4 px-4 py-2 bg-[#F8C522] text-black rounded-full">Select Artwork</button>
              </div>
              <button onClick={closeModal} className="absolute top-4 right-4 text-white hover:text-white/70">
                <X className="h-6 w-6" />
              </button>
              <button
                onClick={goToPrevious}
                className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 text-2xl text-white"
              >
                <span className="text-xs">Prev</span>
                <ChevronLeft size={46} />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 text-2xl text-white"
              >
                <span className="text-xs">Next</span>
                <ChevronRight size={46} />
              </button>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default Step11;
