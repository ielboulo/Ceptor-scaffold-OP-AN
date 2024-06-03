import Image from "next/image";
import Artwork1 from "../assets/artwork/artwork1.jpg";
import Artwork2 from "../assets/artwork/artwork2.jpg";
import Artwork3 from "../assets/artwork/artwork3.jpg";
import Artwork4 from "../assets/artwork/artwork4.jpg";
import Artwork5 from "../assets/artwork/artwork5.jpg";
import Artwork6 from "../assets/artwork/artwork6.jpg";
import Artwork7 from "../assets/artwork/artwork7.jpg";
import Artwork8 from "../assets/artwork/artwork8.jpg";
import Artwork9 from "../assets/artwork/artwork9.jpg";

const artworks = [Artwork1, Artwork2, Artwork3, Artwork4, Artwork5, Artwork6, Artwork7, Artwork8, Artwork9];

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
    selectedImages = [], // Provide a default empty array
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
          {/* First Column */}
          <div className="mt-4">
            <span className="text-lg text-[#949494]">Character Name:</span>
            <div className="flex justify-between mb-4">
              <p className="text-left m-0">{characterName}</p>
              <p className="text-right text-[#F8C522] underline m-0">Edit Name</p>
            </div>
            <span className="text-lg text-[#949494]">Character Class:</span>
            <div className="flex justify-between mb-4">
              <p className="text-left m-0">{characterClass.join("/ ")}</p>
              <p className="text-right text-[#F8C522] underline m-0">Edit Class</p>
            </div>
          </div>

          {/* Second Column */}
          <div className="mt-10">
            <span className="text-lg text-[#949494]">Character Species:</span>
            <div className="flex justify-between mb-4">
              <p className="text-left m-0">{characterSpecies}</p>
              <p className="text-right text-[#F8C522] underline m-0">Edit Species</p>
            </div>
            <span className="text-lg text-[#949494]">Character Background:</span>
            <div className="flex justify-between mb-4">
              <p className="text-left m-0">{characterBackground}</p>
              <p className="text-right text-[#F8C522] underline m-0">Edit Background</p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <span className="text-lg text-[#949494]">Character Appearance:</span>
          <div className="flex justify-between mb-4">
            <p className="text-left m-0">{characterAppearance}</p>
            <p className="text-right text-[#F8C522] underline m-0">Edit Appearance</p>
          </div>
          <span className="text-lg text-[#949494]">Character Items:</span>
          <div className="flex justify-between mb-4">
            <p className="text-left m-0">{characterItems}</p>
            <p className="text-right text-[#F8C522] underline m-0">Edit Items</p>
          </div>
          <span className="text-lg text-[#949494]">Character Scene:</span>
          <div className="flex justify-between mb-4">
            <p className="text-left m-0">{characterScene}</p>
            <p className="text-right text-[#F8C522] underline m-0">Edit Scene</p>
          </div>
          <span className="text-lg text-[#949494]">Character Story:</span>
          <div className="flex justify-between mb-4">
            <p className="text-left m-0">{characterStory}</p>
            <p className="text-right text-[#F8C522] underline m-0">Edit Story</p>
          </div>
        </div>
        <div className="text-left mt-4">
          <span className="text-lg text-[#949494]">Notes for Artist:</span>
          <div className="flex justify-between mb-4">
            <p className="text-left m-0">{notesForArtist}</p>
            <p className="text-right text-[#F8C522] underline m-0">Edit Notes</p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selectedImages.map((image, index) => (
              <div key={index} className="w-full h-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Image Column */}
                <div>
                  <Image
                    src={artworks[image.index]}
                    alt={`Selected Artwork ${index + 1}`}
                    width={400}
                    height={245}
                    className="w-full h-auto"
                    id="selected-image"
                  />
                </div>

                {/* Text Column */}
                <div>
                  <div className="mb-4">
                    <div className="flex justify-between">
                      <p className="text-lg text-[#949494] text-left m-0">Likes:</p>
                      <p className="text-right text-[#F8C522] underline m-0">Edit Reference</p>
                    </div>
                    {/* this will show the selected likes by the user */}
                    <p className="m-0">{image.options.join("/ ")}</p>
                  </div>
                  <h3 className="text-lg text-[#949494]">Notes:</h3>
                  <p className="m-0">{image.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Step12;
