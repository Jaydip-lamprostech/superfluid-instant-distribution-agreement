import { ethers } from "ethers";

import stackingContract from "../artifacts/StackingContract.json";
export const CONTRACT_ADDRESS = "0xe84d2D176Ba67De42aFb8a7e63F98Df9bE456915";

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
