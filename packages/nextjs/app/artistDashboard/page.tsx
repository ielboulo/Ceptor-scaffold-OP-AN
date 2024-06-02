"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "./modals/CommissionModal";
import { CircleCheck, CircleX } from "lucide-react";
import SampleArtwork from "~~/components/assets/artist.jpg";
import { Button } from "~~/components/ui/button";

interface Commission {
  id: number;
  clientName: string;
  wallet: string;
  price: string;
}

const mockApiData: Commission[] = [
  {
    id: 1,
    clientName: "Jamiebones",
    wallet: "0x1234...abcd",
    price: "1 Token",
  },
  {
    id: 2,
    clientName: "Wright",
    wallet: "0x5678...efgh",
    price: "1 Token",
  },
  {
    id: 3,
    clientName: "Leom",
    wallet: "0x9abc...def0",
    price: "1 Token",
  },
  {
    id: 4,
    clientName: "ilham",
    wallet: "0x1122...3344",
    price: "1 Token",
  },
];

const ArtistDashboard = () => {
  // State for commission requests and active commissions
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [activeCommissions, setActiveCommissions] = useState<Commission[]>([]);
  const [selectedCommission, setSelectedCommission] = useState<Commission | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Simulate API call
    const fetchCommissions = async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCommissions(mockApiData);
    };

    fetchCommissions();
  }, []);

  // Handle accept button click
  const handleAccept = (commission: Commission) => {
    setActiveCommissions([...activeCommissions, commission]);
    setCommissions(commissions.filter(c => c.id !== commission.id));
    setIsModalOpen(false);
  };

  // Handle decline button click
  const handleDecline = (commissionId: number) => {
    setCommissions(commissions.filter(c => c.id !== commissionId));
    setIsModalOpen(false);
  };

  // Handle view commission info click
  const handleViewInfo = (commission: Commission) => {
    setSelectedCommission(commission);
    setIsModalOpen(true);
  };

  return (
    <main className="mx-32 py-5">
      <div className="overflow-x-auto">
        <h1 className="font-milonga text-5xl mt-8 mb-20">Artist Dashboard</h1>
        <h1 className="font-milonga text-3xl mt-8 mb-5">Commission Request</h1>
        <table className="min-w-full bg-transparent border border-[#e9e8ed] mb-10">
          <thead>
            <tr>
              <th className="px-4 py-2 border text-center">Commission Number</th>
              <th className="px-4 py-2 border text-center">Client Name</th>
              <th className="px-4 py-2 border text-center">Wallet</th>
              <th className="px-4 py-2 border text-center">Price</th>
              <th className="px-4 py-2 border text-center">View Info</th>
              <th className="px-4 py-2 border text-center">Accept/Decline</th>
            </tr>
          </thead>
          <tbody>
            {commissions.map(commission => (
              <tr key={commission.id} className="text-center">
                <td className="px-4 py-2 border">{commission.id}</td>
                <td className="px-4 py-2 border">{commission.clientName}</td>
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
                  <div className="flex items-center justify-center space-x-2">
                    <CircleCheck className="text-green-500 cursor-pointer" onClick={() => handleAccept(commission)} />
                    <CircleX className="text-red-500 cursor-pointer" onClick={() => handleDecline(commission.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h1 className="font-milonga text-3xl mt-8 mb-5">Active Commissions</h1>
        <table className="min-w-full bg-transparent border border-[#e9e8ed]">
          <thead>
            <tr>
              <th className="px-4 py-2 border text-center">Commission Number</th>
              <th className="px-4 py-2 border text-center">Client Name</th>
              <th className="px-4 py-2 border text-center">Wallet</th>
              <th className="px-4 py-2 border text-center">Price</th>
              <th className="px-4 py-2 border text-center">View Info</th>
              <th className="px-4 py-2 border text-center">Status</th>
              <th className="px-4 py-2 border text-center">Upload Artwork</th>
            </tr>
          </thead>
          <tbody>
            {activeCommissions.map(commission => (
              <tr key={commission.id} className="text-center">
                <td className="px-4 py-2 border">{commission.id}</td>
                <td className="px-4py-2 border">{commission.clientName}</td>
                <td className="px-4py-2 border">{commission.wallet}</td>
                <td className="px-4py-2 border">{commission.price}</td>
                <td className="px-4 py-2 border">
                  <Button variant="default" size="lg" className="w-full text-2xl">
                    View Commission Info
                  </Button>
                </td>
                <td className="px-4 py-2 border">Active</td>
                <td className="px-4 py-2 border">
                  <Button variant="default" size="lg" className="w-full text-2xl">
                    Upload Artwork
                  </Button>
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
              {/* First Column */}
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

              {/* Second Column */}
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
                  {/* Image Column */}
                  <div>
                    <Image src={SampleArtwork} alt="SampleArtwork" width={400} height={245} className="w-full h-auto" />
                  </div>

                  {/* Text Column */}
                  <div className="w-auto md:w-[400px]">
                    <div className="mb-4">
                      <div className="flex justify-between">
                        <p className="text-lg text-[#949494] text-left m-0">Likes:</p>
                      </div>
                      {/* this will show the selected likes by the user */}
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
            <div className="flex justify-end mt-4 space-x-2">
              <Button
                variant="green"
                size="lg"
                className="text-2xl w-full"
                onClick={() => handleAccept(selectedCommission)}
              >
                Accept Commission
              </Button>
              <Button
                variant="red"
                size="lg"
                className="text-2xl w-full"
                onClick={() => handleDecline(selectedCommission.id)}
              >
                Decline Commission
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
};

export default ArtistDashboard;
