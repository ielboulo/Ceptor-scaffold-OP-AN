/* eslint-disable react/no-unescaped-entities */
const Step10 = () => (
  <div className="flex-grow flex flex-col justify-center items-center text-center">
    <h1 className="text-5xl font-milonga justify-center items-center">
      Is there anything else about your character you'd like to tell Artist Name?
    </h1>
    {/* Form fields for step 10 */}
    <label className="block mb-2 mt-5">
      <span className="text-[#d0d0d0] flex justify-center">Describe anything else you'd like to tell the artist.</span>
      <textarea
        placeholder="Other information for the artist..."
        className="mt-1 block w-[390px] md:w-[1000px] h-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
      ></textarea>
    </label>
  </div>
);

export default Step10;
