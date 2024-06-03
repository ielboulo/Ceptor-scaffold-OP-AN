"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Modal from "./modals/CommissionModal";
import Artwork1 from "~~/components/assets/artwork/artwork1.jpg"
import Artwork2 from "~~/components/assets/artwork/artwork2.jpg";
import Artwork3 from "~~/components/assets/artwork/artwork3.jpg";
import Artwork4 from "~~/components/assets/artwork/artwork4.jpg";
import SuccessImage from "~~/components/assets/successImage.png";
import { Button } from "~~/components/ui/button";

interface Commission {
  id: number;
  artistName: string;
  wallet: string;
  price: string;
  status: string;
  image: string;
}

const mockApiData: Commission[] = [
  {
    id: 1,
    artistName: "Jamiebones",
    wallet: "0x1234...abcd",
    price: "1 Token",
    status: "In Progress",
    image: Artwork1,
  },
  { id: 2, artistName: "Wright", wallet: "0x5678...efgh", price: "1 Token", status: "Pending", image: Artwork2 },
  { id: 3, artistName: "Leom", wallet: "0x9abc...def0", price: "1 Token", status: "Completed", image: Artwork3 },
  {
    id: 4,
    artistName: "ilham",
    wallet: "0x1122...3344",
    price: "1 Token",
    status: "Awaiting Feedback",
    image: Artwork4,
  },
];

const ClientDashboard = () => {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [selectedCommission, setSelectedCommission] = useState<Commission | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isRequestRevisionModalOpen, setIsRequestRevisionModalOpen] = useState(false);
  const [isSendPaymentModalOpen, setIsSendPaymentModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [revisionCount, setRevisionCount] = useState(3);
  const [successMessage, setSuccessMessage] = useState({ title: "", description: "" });

  useEffect(() => {
    const fetchCommissions = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCommissions(mockApiData);
    };
    fetchCommissions();
  }, []);

  const handleViewInfo = (commission: Commission) => {
    setSelectedCommission(commission);
    setIsModalOpen(true);
  };

  const handleImageClick = (commission: Commission) => {
    setSelectedCommission(commission);
    setIsImageModalOpen(true);
  };

  const handleRequestRevision = () => {
    setIsImageModalOpen(false);
    setIsRequestRevisionModalOpen(true);
  };

  const handleSendPayment = () => {
    setIsImageModalOpen(false);
    setIsSendPaymentModalOpen(true);
  };

  const handleSendToArtist = () => {
    setIsRequestRevisionModalOpen(false);
    setMessage("");
    setSuccessMessage({
      title: "Your Message Has Been Sent.",
      description: "Artist Name will review your feedback and get back to you with updated artwork.",
    });
    setIsSuccessModalOpen(true);
    setRevisionCount(revisionCount - 1);
  };

  const handlePaymentMade = () => {
    setIsSendPaymentModalOpen(false);
    setSuccessMessage({
      title: "Your Payment Has Been Sent.",
      description: "A high-resolution version of the artwork will be sent to you shortly!",
    });
    setIsSuccessModalOpen(true);
  };

  const handleBackToDashboard = () => {
    setIsSuccessModalOpen(false);
    setMessage("");
  };

  return (
    <main className="mx-32 py-5">
      <div className="overflow-x-auto">
        <h1 className="font-milonga text-5xl mt-8 mb-20">Client Dashboard</h1>
        <h1 className="font-milonga text-3xl mt-8 mb-5">Active Commissions</h1>
        <table className="min-w-full bg-transparent border border-[#e9e8ed] mb-10">
          <thead>
            <tr>
              <th className="px-4 py-2 border text-center">Commission Number</th>
              <th className="px-4 py-2 border text-center">Artist Name</th>
              <th className="px-4 py-2 border text-center">Wallet</th>
              <th className="px-4 py-2 border text-center">Price</th>
              <th className="px-4 py-2 border text-center">View Info</th>
              <th className="px-4 py-2 border text-center">Status</th>
              <th className="px-4 py-2 border text-center">Image for Feedback</th>
            </tr>
          </thead>
          <tbody>
            {commissions.map(commission => (
              <tr key={commission.id} className="text-center">
                <td className="px-4 py-2 border">{commission.id}</td>
                <td className="px-4 py-2 border">{commission.artistName}</td>
                <td className="px-4 py-2 border">{commission.wallet}</td>
                <td className="px-4 py-2 border">{commission.price}</td>
                <td className="px-4 py-2 border">
                  <Button
                    variant="default"
                    size="lg"
                    className="w-full text-2xl"
                    onClick={() => handleViewInfo(commission)}
                  >
                    View Commission Info
                  </Button>
                </td>
                <td className="px-4 py-2 border">
                  <div
                    className={`border rounded-lg ${
                      commission.status === "In Progress" || commission.status === "Pending"
                        ? "border-[#F8C522]"
                        : commission.status === "Completed"
                        ? "border-green-500"
                        : commission.status === "Awaiting Feedback"
                        ? "border-red-500"
                        : ""
                    }`}
                  >
                    {commission.status}
                  </div>
                </td>
                <td className="px-4 py-2 border">
                  <div className="flex justify-center">
                    <Image
                      src={commission.image}
                      alt="Artwork"
                      width={100}
                      height={50}
                      className="cursor-pointer"
                      onClick={() => handleImageClick(commission)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedCommission && (
          <div>
            <h1 className="text-3xl font-milonga">Commission Info</h1>
            <div className="text-left">
              <span className="text-lg text-[#949494]">Image Type:</span>
              <p className="m-0">Full Body - Simple Pose</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="mt-4">
                <span className="text-lg text-[#949494]">Character Name:</span>
                <div className="flex justify-between mb-4">
                  <p className="text-left m-0">Morbi Laoreet</p>
                </div>
                <span className="text-lg text-[#949494]">Character Class:</span>
                <div className="flex justify-between mb-4">
                  <p className="text-left m-0">Artificer/Wizard</p>
                </div>
              </div>
              <div className="mt-10">
                <span className="text-lg text-[#949494]">Character Species:</span>
                <div className="flex justify-between mb-4">
                  <p className="text-left m-0">Dragonborn</p>
                </div>
                <span className="text-lg text-[#949494]">Character Background:</span>
                <div className="flex justify-between mb-4">
                  <p className="text-left m-0">Guild Artisan</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-lg text-[#949494]">Character Appearance:</span>
              <div className="flex justify-between mb-4">
                <p className="text-left m-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
                </p>
              </div>
              <span className="text-lg text-[#949494]">Character Items Weapons, Clothing, Armor, and Items:</span>
              <div className="flex justify-between mb-4">
                <p className="text-left m-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
                </p>
              </div>
              <span className="text-lg text-[#949494]">Environment, Scenery, or Background:</span>
              <div className="flex justify-between mb-4">
                <p className="text-left m-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
                </p>
              </div>
              <span className="text-lg text-[#949494]">Character Story:</span>
              <div className="flex justify-between mb-4">
                <p className="text-left m-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Habitant morbi tristique senectus et. Egestas sed sed risus pretium quam
                  vulputate dignissim suspendisse in. Sed viverra tellus in hac habitasse platea dictumst vestibulum.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Fringilla ut morbi tincidunt augue. Cras semper auctor neque vitae tempus quam
                  pellentesque nec.
                </p>
              </div>
            </div>
            <div className="text-left mt-4">
              <span className="text-lg text-[#949494]">Notes for Artist:</span>
              <div className="flex justify-between mb-4">
                <p className="text-left m-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
                </p>
              </div>
            </div>
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Image
                      src={selectedCommission.image}
                      alt="SampleArtwork"
                      width={400}
                      height={245}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="w-auto md:w-[400px]">
                    <div className="mb-4">
                      <div className="flex justify-between">
                        <p className="text-lg text-[#949494] text-left m-0">Likes:</p>
                      </div>
                      <p className="m-0">Art Style/Armor</p>
                    </div>
                    <h3 className="text-lg text-[#949494]">Notes:</h3>
                    <p className="m-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Feedback Request Modal */}
      <Modal isOpen={isImageModalOpen} onClose={() => setIsImageModalOpen(false)}>
        <h2 className="font-milonga text-3xl mb-20">Artist Name has requested feedback...</h2>
        {selectedCommission && (
          <div className="text-center">
            <Image src={selectedCommission.image} alt="Artwork" width={400} height={245} className="mb-4 mx-auto" />
            <p className="text-left text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Laoreet id donec ultrices tincidunt arcu non sodales neque sodales. Sit amet justo
              donec enim diam vulputate. Velit dignissim sodales ut eu sem integer vitae justo eget. Leo urna molestie
              at elementum eu facilisis sed.
            </p>
            <p className="text-left text-base text-[#F8C522]">
              If you are satisfied with the completed artwork, please select “Send Payment”.
            </p>
            <p className="text-left text-base text-[#F8C522]">
              If you have feedback and would like to request a revision, please select “Request Revision”.
            </p>
            <p className="text-left text-base text-[#949494] -mt-2">
              You have {revisionCount} Revisions remaining. Additional Revisions will cost 1 Token each.
            </p>
            <div className="flex justify-center space-x-4 mt-4">
              <Button variant="default" size="lg" className="w-full" onClick={handleSendPayment}>
                Send Payment
              </Button>
              <Button variant="outline" size="lg" className="w-full" onClick={handleRequestRevision}>
                Request Revision: ({revisionCount} left)
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Request Revision Modal */}
      <Modal isOpen={isRequestRevisionModalOpen} onClose={() => setIsRequestRevisionModalOpen(false)}>
        <h2 className="font-milonga text-3xl mb-20">Request Revision</h2>
        {selectedCommission && (
          <div className="text-center">
            <Image src={selectedCommission.image} alt="Artwork" width={400} height={245} className="mb-4 mx-auto" />
            <p className="text-base text-left">What would you like the artist to change, adjust, or revise?</p>
            <textarea
              placeholder="Message for the artist..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="w-full mb-4 p-2 border border-gray-300"
            />
            <div className="w-full">
              <Button onClick={handleSendToArtist} className="w-full">
                Send to Artist
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Send Payment Modal */}
      <Modal isOpen={isSendPaymentModalOpen} onClose={() => setIsSendPaymentModalOpen(false)}>
        <h2 className="font-milonga text-3xl mb-20">Send Payment</h2>
        {selectedCommission && (
          <div className="text-center">
            <div className="flex justify-between items-center mb-4">
              <div className="text-left">
                <p className="text-lg text-[#949494]">Total:</p>
                <p className="text-9xl">{selectedCommission.price}</p>
              </div>
              <Image src={selectedCommission.image} alt="Artwork" width={289} height={178} className="mx-auto" />
            </div>
            <Button variant="default" size="lg" className="w-full mb-4" onClick={handlePaymentMade}>
              Connect Wallet
            </Button>
          </div>
        )}
      </Modal>

      {/* Success Modal */}
      <Modal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)}>
        <div className="text-center">
          <div className="flex items-center justify-center">
            <Image src={SuccessImage} alt="success image" />
          </div>
          <h2 className="font-milonga text-5xl font-bold mb-4">{successMessage.title}</h2>
          <p className="text-base mb-8">{successMessage.description}</p>
          <Link href="/clientDashboard">
            <button
              onClick={handleBackToDashboard}
              className="bg-[#F8C522] hover:bg-[#F8C522]/90 text-black font-bold py-2 px-14 rounded-full"
            >
              Back to Dashboard
            </button>
          </Link>
        </div>
      </Modal>
    </main>
  );
};

export default ClientDashboard;
