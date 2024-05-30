/* eslint-disable react/no-unescaped-entities */
const Step7 = () => (
  <div className="flex-grow flex flex-col justify-center items-center text-center">
    <h1 className="text-5xl font-milonga justify-center items-center">
      What weapons, armor, and items does your character have?
    </h1>
    {/* Form fields for step 6 */}
    <label className="block mb-2 mt-5">
      <span className="text-[#d0d0d0] flex justify-center">
        Describe the appearance of your character's weapons, clothing, armor, or other notable items.
      </span>
      <input
        type="text"
        placeholder="Weapons, clothing, armor, or notable items"
        className="mt-1 block w-[820px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
      />
    </label>
  </div>
);

export default Step7;
