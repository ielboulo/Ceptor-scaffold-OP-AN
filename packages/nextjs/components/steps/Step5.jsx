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

const Step5 = ({ data, onDataChange }) => {
  const [selectedOption, setSelectedOption] = useState(data || "");

  useEffect(() => {
    onDataChange({ characterBackground: selectedOption });
  }, [onDataChange, selectedOption]);

  const options = [
    "Acolyte",
    "Charlatan",
    "Criminal",
    "Entertainer",
    "Folk Hero",
    "Gladiator",
    "Guild Artisan",
    "Haunted One",
    "Hermit",
    "Knight",
    "Noble",
    "Outlander",
    "Pirate",
    "Sage",
    "Sailor",
    "Soldier",
    "Urchin",
  ];

  const handleOptionChange = option => {
    setSelectedOption(option);
  };

  return (
    <div>
      <div className="flex-grow flex flex-col justify-center items-center">
        <h1 className="text-5xl font-milonga">What is your character's background?</h1>
        <p className="text-base mt-4">Select One:</p>
        <div>
          <SelectOption options={options} selectedOption={selectedOption} handleOptionChange={handleOptionChange} />
        </div>
      </div>
    </div>
  );
};

export default Step5;
