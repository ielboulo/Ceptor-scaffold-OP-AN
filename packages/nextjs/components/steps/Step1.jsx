import { useEffect, useState } from "react";

const SelectOption = ({ options, selectedOption, handleOptionChange }) => (
  <div className="flex justify-center space-x-2 mt-4">
    {options.map((option, index) => (
      <label key={index} className="relative flex items-center cursor-pointer">
        <input
          type="radio"
          name="option"
          value={option}
          checked={selectedOption === option}
          onChange={() => handleOptionChange(option)}
          className="hidden"
        />
        <span
          className={`inline-flex items-center justify-center px-4 py-2 border-2 rounded-full border-[#F8C522] ${
            selectedOption === option ? "bg-[#F8C522] text-black" : "border-[#F8C522] text-white"
          }`}
        >
          {option}
        </span>
      </label>
    ))}
  </div>
);

const Step1 = ({ data, onDataChange }) => {
  const [selectedOption, setSelectedOption] = useState(data || "");

  useEffect(() => {
    onDataChange({ imageType: selectedOption });
  }, [onDataChange, selectedOption]);

  const options = [
    "Profile Pic, Avatar, or Bust",
    "Full Body - Simple Pose",
    "Full Body - Action Pose",
    "Action Scene",
  ];

  const handleOptionChange = option => {
    setSelectedOption(option);
  };

  return (
    <div>
      <div className="flex-grow flex flex-col justify-center items-center">
        <h1 className="text-5xl font-milonga">What kind of image would you like to commission?</h1>
        <p className="text-base mt-4">Select One:</p>

        <SelectOption options={options} selectedOption={selectedOption} handleOptionChange={handleOptionChange} />
      </div>
    </div>
  );
};

export default Step1;
