import React, { useState } from "react";

import Abi_IDA from "../artifacts/Abi_IDA.json";
import { ethers } from "ethers";
import { Framework } from "@superfluid-finance/sdk-core";
import { useAccount, useProvider, useSigner } from "wagmi";
import { createClient } from "urql";

function SubscriberApprove() {
  const provider = useProvider();
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const [indexNumber, setIndexNumber] = useState();
  const [publisherAddress, setPublisherAddress] = useState();

  const [loadingAnim, setLoadingAnim] = useState(false);
  const [btnContent, setBtnContent] = useState("Approve");
  const [indexArr, setIndexArr] = useState([]);

  // const connectedContract = new ethers.Contract(
  //   CONTRACT_ADDRESS,
  //   Abi_IDA,
  //   signer
  // );

  // const approveSubscriber = async () => {
  //   setLoadingAnim(true);
  //   const sf = await Framework.create({
  //     chainId: 5,
  //     provider: provider,
  //   });
  //   const daix = await sf.loadSuperToken("fDAIx");

  //   const subscribeOperation = daix.approveSubscription({
  //     indexId: indexNumber,
  //     publisher: connectedContract.address,
  //   });
  //   try {
  //     const tx = await subscribeOperation.exec(signer);
  //     await tx.wait();
  //     setLoadingAnim(false);
  //     setBtnContent("Approved");
  //     setTimeout(() => {
  //       setIndexNumber("");
  //       setBtnContent("Approve");
  //     }, 3000);
  //     // if (receipt) {
  //     //   console.log("approved!");
  //     // }
  //   } catch (err) {
  //     if (
  //       err.errorObject.errorObject.error.reason ===
  //       "execution reverted: IDA: E_SUBS_APPROVED"
  //     ) {
  //       console.log("shareGainer already approved subscription. moving on ->");
  //     }
  //   }
  // };

  const approveSubscription = async () => {
    setLoadingAnim(true);
    const sf = await Framework.create({
      chainId: 5,
      provider: provider,
    });

    const daix = await sf.loadSuperToken("fDAIx");
    try {
      const subscribeOperation = daix.approveSubscription({
        indexId: `${indexNumber}`,
        publisher: publisherAddress,
      });
      const tx = await subscribeOperation.exec(signer);
      const receipt = await tx.wait();
      if (receipt) {
        setLoadingAnim(false);
        setBtnContent("Approved");
        setTimeout(() => {
          setIndexNumber("");
          setBtnContent("Approve");
        }, 3000);
        console.log("approved!");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="db-sub">
      <h1 className="subscriber-h1">Approve Subscriber</h1>
      <p className="subscriber-p">
        This should be called by the person who has been added as a subscriber
        for someone's index.
      </p>

      {/* <div className="go-back-btn">
<svg
  xmlns="http://www.w3.org/2000/svg"
  height="36px"
  viewBox="0 0 24 24"
  width="36px"
  fill="#000000"
>
  <path d="M0 0h24v24H0V0z" fill="none" />
  <path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z" />
</svg>
</div> */}

      <div className="subscriber-add-box">
        <p>
          This is required to receive token sent by Instant distribution
          agreement.
        </p>
        <div className="subscriber-input-div">
          <input
            type="number"
            className="subscriber-input-index"
            placeholder="Enter Index Number"
            onChange={(e) => setIndexNumber(e.target.value)}
          />
        </div>
        <div className="subscriber-input-div">
          <input
            type="text"
            className="subscriber-input-index"
            placeholder="Enter Publisher Address"
            onChange={(e) => setPublisherAddress(e.target.value.toLowerCase())}
          />
        </div>
        {/* <h3>Subscriber Address</h3> */}
        {/* <div className="subscriber-input-div">
          <input
            type="text"
            className="subscriber-input-index"
            placeholder="Publisher Address"
            onChange={(e) => setPublisherAddress(e.target.value)}
          />
        </div> */}
        {/* <h3>Unit</h3> */}

        <div className="subscriber-add-btn">
          <button onClick={() => approveSubscription()}>
            {loadingAnim ? <span className="loader"></span> : btnContent}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubscriberApprove;
