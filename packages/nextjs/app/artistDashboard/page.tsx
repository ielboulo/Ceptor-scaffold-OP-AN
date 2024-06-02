"use client";

import { useEffect, useState } from "react";
import { CircleCheck, CircleX, Upload } from "lucide-react";
import { Button } from "~~/components/ui/button";

// Define the type for commission data
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
  };

  // Handle decline button click
  const handleDecline = (commissionId: number) => {
    setCommissions(commissions.filter(c => c.id !== commissionId));
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
                  <Button variant="default" size="lg" className="w-full text-2xl">
                    View Commission Info
                  </Button>
                </td>
                <td className="px-4 py-2 border">
                  <div className="flex items-center justify-center space-x-6">
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
                <td className="px-4 py-2 border">{commission.clientName}</td>
                <td className="px-4 py-2 border">{commission.wallet}</td>
                <td className="px-4 py-2 border">{commission.price}</td>
                <td className="px-4 py-2 border">
                  <Button variant="default" size="lg" className="w-full text-2xl">
                    View Commission Info
                  </Button>
                </td>
                <td className="px-4 py-2 border">
                  <select className="bg-white rounded-full text-black px-2">
                    <option value="select">Status</option>
                    <option value="0">Not Started</option>
                    <option value="1">In Progress</option>
                    <option value="1">Awaiting Feedback</option>
                    <option value="1">Awaiting Payment</option>
                    <option value="1">Done</option>
                  </select>
                </td>
                <td className="px-4 py-2 border">
                  <div className="flex items-center justify-center space-x-6">
                    <Upload className="text-[#F8C522] cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default ArtistDashboard;
