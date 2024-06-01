import Image from "next/image";
import Artwork1 from "../assets/artwork/artwork1.png";

function Step12({ data }) {
  const {
    imageType,
    characterName,
    characterSpecies,
    characterClass,
    characterBackground,
    characterAppearance,
    characterItems,
    characterScene,
    characterStory,
    notesForArtist,
    referenceImages: { selectedOptions, description },
  } = data;

  return (
    <>
      <div>
        <h1 className="text-5xl font-milonga flex justify-center items-center">Review & Confirm</h1>
        <p className="text-base text-[#E9E8ED] mt-4 flex justify-center text-center">
          Please review the following information before we send it to the artist. After reviewing your commission
          request, they will confirm all of the details with you through email.
        </p>
        {/* grid display */}
        <div className="text-left">
          <span className="text-lg text-[#949494]">Image Type:</span>
          <p className="m-0">{imageType}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="mt-4">
            <span className="text-lg text-[#949494]">Character Name:</span>
            <div className="flex justify-between mb-4">
              <p className="text-left m-0">{characterName}</p>
              <p className="text-right text-[#F8C522] underline m-0">Edit Name</p>
            </div>
            <span className="text-lg text-[#949494]">Character Class:</span>
            <div className="flex justify-between">
              <p className="text-left m-0">{characterClass.join(", ")}</p>
              <p className="text-right text-[#F8C522] underline m-0">Edit Class</p>
            </div>
          </div>
          <div className="mt-10">
            <span className="text-lg text-[#949494]">Character Species:</span>
            <div className="flex justify-between mb-4">
              <p className="text-left m-0">{characterSpecies}</p>
              <p className="text-right text-[#F8C522] underline m-0">Edit Species</p>
            </div>
            <span className="text-lg text-[#949494]">Character Background:</span>
            <div className="flex justify-between">
              <p className="text-left m-0">{characterBackground}</p>
              <p className="text-right text-[#F8C522] underline m-0">Edit Background</p>
            </div>
          </div>
        </div>
        {/* end of grid display */}
        {/* character appearance */}
        <div>
          <div className="mt-5">
            <div className="flex justify-between items-center">
              <p className="text-lg text-[#949494] text-left">Character Appearance:</p>
              <p className="text-right text-[#F8C522] underline">Edit Appearance</p>
            </div>
            <p className="m-0">{characterAppearance}</p>
          </div>
          <div className="mt-5">
            <div className="flex justify-between items-center">
              <p className="text-lg text-[#949494] text-left">Character Weapons, Clothing, Armor, and Items:</p>
              <p className="text-right text-[#F8C522] underline">Edit Items</p>
            </div>
            <p className="m-0">{characterItems}</p>
          </div>
          <div className="mt-5">
            <div className="flex justify-between items-center">
              <p className="text-lg text-[#949494] text-left">Environment, Scenery, or Background:</p>
              <p className="text-right text-[#F8C522] underline">Edit Scenery</p>
            </div>
            <p className="m-0">{characterScene}</p>
          </div>
          <div className="mt-5">
            <div className="flex justify-between items-center">
              <p className="text-lg text-[#949494] text-left">Character Story:</p>
              <p className="text-right text-[#F8C522] underline">Edit Story</p>
            </div>
            <p className="m-0">{characterStory}</p>
          </div>
          <div className="mt-5">
            <div className="flex justify-between items-center">
              <p className="text-lg text-[#949494] text-left">Notes For the Artist:</p>
              <p className="text-right text-[#F8C522] underline">Edit Notes</p>
            </div>
            <p className="m-0">{notesForArtist}</p>
          </div>
        </div>
        {/* end character appearance */}

        {/* Reference Images */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 gap-4">
            {/* first column */}
            <div>
              <Image src={Artwork1} alt="Artwork 1" width={400} height={245} className="w-full h-auto" />
            </div>

            {/* second column */}
            <div>
              <div className="flex justify-between items-center">
                <p className="text-lg text-[#949494] text-left">Likes:</p>
                <p className="text-right text-[#F8C522] underline">Edit Reference</p>
              </div>
              <p className="m-0">{selectedOptions.join(", ")}</p>
              <div>
                <p className="text-lg text-[#949494]">Notes:</p>
                <p className="m-0">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Step12;
