import { useState } from "react";
import { MoveLeft, X } from "lucide-react";
import Modal from "react-modal";
import Step1 from "~~/components/steps/Step1";
import Step2 from "~~/components/steps/Step2";
import Step3 from "~~/components/steps/Step3";
import Step4 from "~~/components/steps/Step4";
import Step5 from "~~/components/steps/Step5";
import Step6 from "~~/components/steps/Step6";
import Step7 from "~~/components/steps/Step7";
import Step8 from "~~/components/steps/Step8";
import Step9 from "~~/components/steps/Step9";
import Step10 from "~~/components/steps/Step10";
import Step11 from "~~/components/steps/Step11";
import Step12 from "~~/components/steps/Step12";

const MultiStepForm = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    imageType: "",
    characterName: "",
    characterSpecies: "",
    characterClass: [],
    characterBackground: "",
    characterAppearance: "",
    characterItems: "",
    characterScene: "",
    characterStory: "",
    notesForArtist: "",
    referenceImages: { selectedOptions: [], description: "" },
  });

  const totalSteps = 12;
  const titles = [
    "Image Type",
    "Character's Name",
    "Character's Species",
    "Character's Class",
    "Character's Background",
    "Character's Appearance",
    "Character Items",
    "Character Scene",
    "Character Story",
    "Notes for the Artist",
    "Reference Images",
    "Review",
  ];

  const handleDataChange = stepData => {
    setFormData(prevData => ({ ...prevData, ...stepData }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleStepChange = event => {
    const selectedStep = parseInt(event.target.value, 10);
    setStep(selectedStep);
  };

  const handleSubmit = () => {
    const metadata = {
      data: formData,
      timestamp: new Date().toISOString(),
      author: "formSubmissionApp",
      tags: ["userData", "formSubmission"],
    };
    sendMetadataToIrys(metadata);
    onClose();
    onSuccess(); // Trigger the onSuccess callback
  };

  const sendMetadataToIrys = metadata => {
    fetch("https://...", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(metadata),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Success:", data);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Multi Step Form"
      className="flex items-center justify-center bg-black bg-opacity-75"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75"
    >
      <div className="bg-black p-8 rounded-lg w-5/6 h-5/6 relative overflow-y-auto max-h-[80vh] mt-20">
        <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-800">
          <X className="h-6 w-6" />
        </button>
        <div className="absolute top-4 left-4">
          {step > 1 && (
            <button onClick={prevStep} className="flex items-center text-white">
              <MoveLeft className="h-5 w-5 mr-2" />
              Back
            </button>
          )}
        </div>
        <div className="mb-4 text-center">
          <div className="flex justify-center space-x-2 mb-4">
            {Array.from({ length: totalSteps }, (_, index) => (
              <label key={index} className="relative flex items-center">
                <input
                  type="radio"
                  name="step"
                  value={index + 1}
                  checked={step === index + 1}
                  onChange={handleStepChange}
                  className="hidden"
                />
                <span
                  className={`relative inline-flex items-center justify-center w-4 h-4 rounded-full border-2 mr-1 ${
                    step > index + 1 ? "bg-[#F8C522] border-[#F8C522]" : "border-[#F8C522]"
                  }`}
                >
                  {step === index + 1 && <span className="inline-block w-2 h-2 rounded-full bg-[#F8C522]"></span>}
                </span>
                {index < totalSteps - 1 && (
                  <span
                    className={`inline-block w-6 h-1 rounded-full ${step > index + 1 ? "bg-[#F8C522]" : "bg-gray-200"}`}
                  ></span>
                )}
              </label>
            ))}
          </div>
          <div className="text-sm text-white mb-4">
            Step {step} of {totalSteps}: {titles[step - 1]}
          </div>
        </div>
        <div className="overflow-auto h-5/6">
          <div className="mb-4">
            {step === 1 && <Step1 data={formData.imageType} onDataChange={handleDataChange} />}
            {step === 2 && <Step2 data={formData.characterName} onDataChange={handleDataChange} />}
            {step === 3 && <Step3 data={formData.characterSpecies} onDataChange={handleDataChange} />}
            {step === 4 && <Step4 data={formData.characterClass} onDataChange={handleDataChange} />}
            {step === 5 && <Step5 data={formData.characterBackground} onDataChange={handleDataChange} />}
            {step === 6 && <Step6 data={formData.characterAppearance} onDataChange={handleDataChange} />}
            {step === 7 && <Step7 data={formData.characterItems} onDataChange={handleDataChange} />}
            {step === 8 && <Step8 data={formData.characterScene} onDataChange={handleDataChange} />}
            {step === 9 && <Step9 data={formData.characterStory} onDataChange={handleDataChange} />}
            {step === 10 && <Step10 data={formData.notesForArtist} onDataChange={handleDataChange} />}
            {step === 11 && <Step11 data={formData.referenceImages} onDataChange={handleDataChange} />}
            {step === 12 && <Step12 data={formData} />}
          </div>
        </div>
        <div className="flex gap-4 items-center justify-center mt-4">
          {step < totalSteps && (
            <button
              onClick={nextStep}
              className="border border-[#F8C522] hover:bg-[#F8C522]/90 text-white font-bold py-2 px-28 rounded-full"
            >
              Skip
            </button>
          )}
          {step === totalSteps ? (
            <button
              onClick={handleSubmit}
              className="bg-[#F8C522] hover:bg-[#F8C522]/90 text-black font-bold py-2 px-14 rounded-full"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="bg-[#F8C522] hover:bg-[#F8C522]/90 text-black font-bold py-2 px-14 rounded-full"
            >
              Next: {titles[step] || "Send to Artist"}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default MultiStepForm;
