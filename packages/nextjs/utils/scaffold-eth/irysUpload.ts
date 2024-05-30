import Query from "@irys/query";
import { WebIrys } from "@irys/sdk";
import { ethers } from "ethers";

const getWebIrys = async () => {
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const network = "devnet";
    const token = "ethereum";
    // Devnet RPC URLs change often, use a recent one from https://chainlist.org
    const rpcUrl = "https://arbitrum-sepolia.blockpi.network/v1/rpc/public"; // Required for devnet
    // Create a wallet object
    const wallet = { rpcUrl: rpcUrl, name: "ethersv6", provider: provider };
    // Use the wallet object
    const webIrys = new WebIrys({ network, token, wallet });
    await webIrys.ready();
    return webIrys;
  }
};

export const fundNode = async () => {
  const webIrys: WebIrys = (await getWebIrys()) as WebIrys;
  try {
    const fundTx = await webIrys.fund(webIrys.utils.toAtomic(0.05));
    console.log(`Successfully funded ${webIrys.utils.fromAtomic(fundTx.quantity)} ${webIrys.token}`);
  } catch (e) {
    console.log("Error uploading data ", e);
  }
};

export const uploadData = async (dataToUpload: object) => {
  const webIrys = (await getWebIrys()) as WebIrys;
  try {
    const jsonData = JSON.stringify(dataToUpload, null, 2);
    const receipt = await webIrys.upload(jsonData);
    console.log(`Data uploaded ==> https://gateway.irys.xyz/${receipt.id}`);
    return receipt.id;
  } catch (e) {
    console.log("Error uploading data ", e);
  }
};

export const uploadFile = async (fileToUpload: File, tags: [{ name: string; value: "" }]) => {
  const webIrys = (await getWebIrys()) as WebIrys;
  try {
    const receipt = await webIrys.uploadFile(fileToUpload, { tags: tags });
    console.log(`File uploaded ==> https://gateway.irys.xyz/${receipt.id}`);
    return receipt.id;
  } catch (e) {
    console.log("Error uploading file ", e);
  }
};

export const artistQuery = new Query({ network: "devnet" });
