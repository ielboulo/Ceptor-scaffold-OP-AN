import { useEffect, useState } from "react";

const Step8 = ({ data, onDataChange }) => {
  const [environment, setEnvironment] = useState(data || "");

  useEffect(() => {
    onDataChange({ characterScene: environment });
  }, [onDataChange, environment]);

  const handleChange = event => {
    setEnvironment(event.target.value);
  };

  return (
    <div className="flex-grow flex flex-col justify-center items-center text-center">
      <h1 className="text-5xl font-milonga justify-center items-center">Where do you want your character to be?</h1>
      <label className="block mb-2 mt-5">
        <span className="text-[#d0d0d0] flex justify-center">
          Describe the environment, background, or scenery you would like your character to appear in.
        </span>
        <input
          type="text"
          value={environment}
          onChange={handleChange}
          placeholder="Environment, background, or scenery"
          className="mt-1 block w-[820px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
        />
      </label>
    </div>
  );
};

export default Step8;
