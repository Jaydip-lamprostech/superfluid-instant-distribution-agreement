import React, { useState } from "react";
import "../styles/dashboard.scss";
import "../styles/ida.scss";
// import Abi_IDA from "../artifacts/Abi_IDA.json";
// import { ethers } from "ethers";
import { useAccount, useProvider, useSigner } from "wagmi";
// import { CONTRACT_ADDRESS } from "../config";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { Framework } from "@superfluid-finance/sdk-core";

function IDAIndex() {
  const { isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();
  // const [id, setId] = useState();

  const [loadingAnim, setLoadingAnim] = useState(false);
  const [btnContent, setBtnContent] = useState("Create Index");

  // host address 0x22ff293e14f1ec3a09b137e9e06084afd63addf9

  // fdaix address 0xf2d68898557ccb2cf4c10c3ef2b034b2a69dad00

  // const createIndex = async () => {
  //   setLoadingAnim(true);
  //   try {
  //     const tx = await connectedContract.createNewStream(
  //       "0x22ff293e14f1ec3a09b137e9e06084afd63addf9",
  //       "0xf2d68898557ccb2cf4c10c3ef2b034b2a69dad00"
  //     );
  //     // console.log(tx);
  //     await tx.wait();
  //     setLoadingAnim(false);
  //     setBtnContent("Index Created");
  //     setTimeout(() => {
  //       setBtnContent("Create Index");
  //     }, 3000);
  //   } catch (error) {
  //     console.log(error);
  //     setLoadingAnim(false);
  //   }
  // };

  const createIndex = async () => {
    setLoadingAnim(true);
    const id = Math.floor(Math.random() * 1000 + 1);
    console.log("Inside createIndex() function");
    const sf = await Framework.create({
      chainId: 5,
      provider: provider,
    });
    const daix = await sf.loadSuperToken("fDAIx");
    try {
      const createIndexOperation = daix.createIndex({
        indexId: id.toString(),
      });
      console.log(`Creating index ID:${id}...`);

      const sign = await createIndexOperation.exec(signer);
      const receipt = await sign.wait(sign);
      if (receipt) {
        setLoadingAnim(false);
        setBtnContent(`Index No. ${id} Created`);
        setTimeout(() => {
          setBtnContent("Create Index");
        }, 4000);
        console.log(
          `Congrats - you've just created a new Index!
             Network: Goerli
             Super Token: fDAIx
             Index ID: ${id}
          `
        );
      }
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

          <div className="ida-create-index-btn" style={{ minWidth: "50px" }}>
            {isConnected ? (
              <button onClick={() => createIndex()}>
                {" "}
                {loadingAnim ? <span className="loader"></span> : btnContent}
              </button>
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
