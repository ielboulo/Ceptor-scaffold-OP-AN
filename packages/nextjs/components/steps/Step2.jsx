/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";

const Step2 = ({ data, onDataChange }) => {
  const [characterName, setCharacterName] = useState(data || "");

  useEffect(() => {
    onDataChange({ characterName });
  }, [onDataChange, characterName]);

  const handleChange = event => {
    setCharacterName(event.target.value);
  };

  return (
    <div className="flex-grow flex flex-col justify-center items-center">
      <h1 className="text-5xl font-milonga">What is your character's name?</h1>
      {/* Form fields for step 2 */}
      <label className="block mb-2 mt-5">
        <span className="text-white">Character Name</span>
        <input
          type="text"
          placeholder="Character Name"
          onChange={handleChange}
          className="mt-1 block w-[820px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
        />
      </label>
    </div>
  );
};

export default Step2;
