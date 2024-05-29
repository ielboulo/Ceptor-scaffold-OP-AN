/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";

const SelectOption = ({ options, selectedOptions, handleOptionChange }) => (
  <div className="flex flex-wrap justify-center space-x-4 mt-4">
    {options.map((option, index) => (
      <label key={index} className="relative flex items-center cursor-pointer m-2">
        <input
          type="checkbox"
          name="option"
          value={option}
          checked={selectedOptions.includes(option)}
          onChange={() => handleOptionChange(option)}
          className="hidden"
        />
        <span
          className={`inline-flex items-center justify-center px-8 py-2 border-2 rounded-full border-[#F8C522] ${
            selectedOptions.includes(option) ? "bg-[#F8C522] text-black" : "border-[#F8C522] text-white"
          }`}
        >
          {option}
        </span>
      </label>
    ))}
  </div>
);

const Step4 = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = [
    "Artificer",
    "Barbarian",
    "Bard",
    "Cleric",
    "Druid",
    "Fighter",
    "Monk",
    "Paladin",
    "Rougue",
    "Sorcerer",
    "Warlock",
    "Wizard",
  ];

  const handleOptionChange = option => {
    setSelectedOptions(prev =>
      prev.includes(option) ? prev.filter(selected => selected !== option) : [...prev, option],
    );
  };

  return (
    <div>
      <div className="flex-grow flex flex-col justify-center items-center">
        <h1 className="text-5xl font-milonga">What is your character's class?</h1>
        <p className="text-base mt-4">Select All That Apply. We Allow Multiclassing</p>
        <div>
          <SelectOption options={options} selectedOptions={selectedOptions} handleOptionChange={handleOptionChange} />
        </div>
      </div>
    </div>
  );
};

export default Step4;
