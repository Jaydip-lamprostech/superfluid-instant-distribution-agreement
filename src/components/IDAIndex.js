import React from "react";
import "../styles/dashboard.scss";
import "../styles/ida.scss";

import Abi_IDA from "../artifacts/Abi_IDA.json";
import { ethers } from "ethers";
import { useAccount, useProvider, useSigner } from "wagmi";
import { CONTRACT_ADDRESS } from "../config";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function IDAIndex() {
  const { isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const connectedContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    Abi_IDA,
    signer
  );

  // host address 0x22ff293e14f1ec3a09b137e9e06084afd63addf9

  // fdaix address 0xf2d68898557ccb2cf4c10c3ef2b034b2a69dad00

  const createIndex = async () => {
    try {
      const tx = await connectedContract.createNewStream(
        "0x22ff293e14f1ec3a09b137e9e06084afd63addf9",
        "0xf2d68898557ccb2cf4c10c3ef2b034b2a69dad00"
      );
      console.log(tx);
      const receipt = await tx.wait();
      console.log(receipt);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="db-main">
      <div className="db-sub">
        <div className="db-ida-box">
          <h1 className="ida-h1">Create IDA index</h1>
          <p className="ida-p">
            A channel made by a publisher account to distribute Super Tokens to
            any amount of receivers on a proportional basis
          </p>
          <div className="ida-create-index-btn">
            {isConnected ? (
              <button onClick={() => createIndex()}>Create Index</button>
            ) : (
              <div className="connect-wallet ">
                <ConnectButton
                  accountStatus={{
                    smallScreen: "avatar",
                    largeScreen: "full",
                  }}
                  showBalance={{
                    smallScreen: false,
                    largeScreen: true,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IDAIndex;
