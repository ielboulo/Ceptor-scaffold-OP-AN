import { useState } from "react";
import {ethers} from "ethers";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const Modal = ({ show, onClose, product }) => {
  const [paymentMethod, setPaymentMethod] = useState("usdt");
  const artCost = +product.cost.toString() / 1e18;
  const config = {
    contractName: "ArtistMarketPlace",
    functionName: "buyArtWork",
    args: [product.index],
    value: ethers.parseEther(artCost.toString()),
  };

  const { writeAsync: buyArtistArt } = useScaffoldContractWrite(config);

  if (!show) {
    return null;
  }

  const handlePaymentMethodChange = event => {
    setPaymentMethod(event.target.value);
  };

  const buyArtWork = async () => {
    try {
      await buyArtistArt();
      alert("new purchase made");
      onClose();
    } catch (error) {
      console.log("Error buying art.....", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black p-6 rounded shadow-lg">
        <h2 className="text-2xl mb-4">Buy Artwork</h2>
        <p className="mb-2">Owner: {product.owner}</p>
        <p className="mb-2">Price: {+product?.cost?.toString() / 1e18}</p>
        <div className="mb-4">
          <label htmlFor="payment-method" className="block mb-2">
            Select Payment Method:
          </label>
          <select
            id="payment-method"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            className="w-full p-2 border rounded"
          >
            <option value="usdt">USDT</option>
            <option value="avax">AVAX</option>
            <option value="art-token">Art Token</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="border border-[#F8C522] text-white px-4 py-2 rounded mr-2">
            Cancel
          </button>
          <button className="bg-[#F8C522] text-white px-4 py-2 rounded" onClick={buyArtWork}>
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
