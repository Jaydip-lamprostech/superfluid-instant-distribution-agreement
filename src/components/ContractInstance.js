import { ethers } from "ethers";

import stackingContract from "../artifacts/StackingContract.json";
export const CONTRACT_ADDRESS = "0x3458b3dcd0483c07d9054d04D4Cee61B3a543931";

export const stackingContractInstance = async () => {
  const { ethereum } = window;
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    if (!provider) {
      console.log("Metamask is not installed, please install!");
    }

    const { chainId } = await provider.getNetwork();
    console.log("switch case for this case is: " + chainId);
    const con = new ethers.Contract(
      CONTRACT_ADDRESS,
      stackingContract.abi,
      signer
    );
    console.log(con);
    return con;
  } else {
    console.log("error");
  }
};
