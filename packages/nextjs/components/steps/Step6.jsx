/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";

const Step6 = ({ data, onDataChange }) => {
  const [appearance, setAppearance] = useState(data || "");

  useEffect(() => {
    onDataChange({ characterAppearance: appearance });
  }, [onDataChange, appearance]);

  const handleChange = event => {
    setAppearance(event.target.value);
  };

  return (
    <div className="flex-grow flex flex-col justify-center items-center">
      <h1 className="text-5xl font-milonga">What does your character look like?</h1>
      {/* Form fields for step 6 */}
      <label className="block mb-2 mt-5">
        <span className="text-[#d0d0d0] flex justify-center">
          Desribe your character's appearance and notable physical features.
        </span>
        <input
          type="text"
          value={appearance}
          onChange={handleChange}
          placeholder="Appearance and physical features"
          className="mt-1 block w-[820px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
        />
      </label>
    </div>
  );
};

export default Step6;
