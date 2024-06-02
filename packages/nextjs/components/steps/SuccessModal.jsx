import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import Modal from "react-modal";
import SuccessImage from "~~/components/assets/successImage.png";

const SuccessModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Success Modal"
      className="flex items-center justify-center bg-black bg-opacity-75"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75"
    >
      <div className="bg-black p-8 rounded-lg w-1/2 h-1/2 relative flex flex-col items-center justify-center mt-40">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-800 hover:text-black">
          <X className="h-6 w-6" />
        </button>
        <Image src={SuccessImage} alt="success image" />
        <h2 className="font-milonga text-5xl font-bold mb-4">Your Request Has Been Sent.</h2>
        <p className="text-base mb-8">
          Your commission request has been sent to Artist Name. They will review the information and contact you through
          email to confirm the commission and to go over details.
        </p>
        <Link href="/">
          <button
            onClick={onClose}
            className="bg-[#F8C522] hover:bg-[#F8C522]/90 text-black font-bold py-2 px-14 rounded-full"
          >
            Back to Marketplace
          </button>
        </Link>
      </div>
    </Modal>
  );
};

export default SuccessModal;
