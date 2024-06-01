import { useEffect, useState } from "react";

const Step9 = ({ data, onDataChange }) => {
  const [story, setStory] = useState(data || "");

  useEffect(() => {
    onDataChange({ characterStory: story });
  }, [onDataChange, story]);

  const handleChange = event => {
    setStory(event.target.value);
  };

  return (
    <div className="flex-grow flex flex-col justify-center items-center text-center">
      <h1 className="text-5xl font-milonga justify-center items-center">
        What is your favorite story about your character?
      </h1>
      <label className="block mb-2 mt-5">
        <span className="text-[#d0d0d0] flex justify-center">
          Describe a story or notable event that defines your character.
        </span>
        <textarea
          value={story}
          onChange={handleChange}
          placeholder="Story or notable event..."
          className="mt-1 block w-[390px] md:w-[1000px] h-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
        ></textarea>
      </label>
    </div>
  );
};

export default Step9;
