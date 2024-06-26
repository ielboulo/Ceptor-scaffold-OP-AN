/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";

const SelectOption = ({ options, selectedOption, handleOptionChange }) => (
  <div className="flex flex-wrap justify-center space-x-4 mt-4">
    {options.map((option, index) => (
      <label key={index} className="relative flex items-center cursor-pointer m-2">
        <input
          type="radio"
          name="option"
          value={option}
          checked={selectedOption === option}
          onChange={() => handleOptionChange(option)}
          className="hidden"
        />
        <span
          className={`inline-flex items-center justify-center px-8 py-2 border-2 rounded-full border-[#F8C522] ${
            selectedOption === option ? "bg-[#F8C522] text-black" : "border-[#F8C522] text-white"
          }`}
        >
          {option}
        </span>
      </label>
    ))}
  </div>
);

const Step3 = ({ data, onDataChange }) => {
  const [selectedOption, setSelectedOption] = useState(data || "");

  useEffect(() => {
    onDataChange({ characterSpecies: selectedOption });
  }, [onDataChange, selectedOption]);

  const options = [
    "Dragonborn",
    "Dwarf",
    "Elf",
    "Githyanki",
    "Gnome",
    "Goblin",
    "Half-Elf",
    "Halfing",
    "Half-Orc",
    "Human",
    "Tabaxi",
    "Thri-Kreen",
    "Tiedling",
    "Tortle",
    "Warforged",
  ];

  const handleOptionChange = option => {
    setSelectedOption(option);
  };

  return (
    <div>
      <div className="flex-grow flex flex-col justify-center items-center">
        <h1 className="text-5xl font-milonga">What is your character's species?</h1>
        <p className="text-base mt-4">Select One:</p>
        <div>
          <SelectOption options={options} selectedOption={selectedOption} handleOptionChange={handleOptionChange} />
        </div>
      </div>
    </div>
  );
};

export default Step3;
