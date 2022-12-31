import React, { useState } from "react";

import Abi_IDA from "../artifacts/Abi_IDA.json";
import { ethers } from "ethers";
import { Framework } from "@superfluid-finance/sdk-core";
import { useAccount, useProvider, useSigner } from "wagmi";
import { CONTRACT_ADDRESS } from "../config";

function SubscriberApprove() {
  const provider = useProvider();
  const { data: signer } = useSigner();
  const [indexNumber, setIndexNumber] = useState();

  const connectedContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    Abi_IDA,
    signer
  );

  const approveSubscriber = async () => {
    const sf = await Framework.create({
      chainId: 5,
      provider: provider,
    });
    const daix = await sf.loadSuperToken("fDAIx");

    const subscribeOperation = daix.approveSubscription({
      indexId: indexNumber,
      publisher: connectedContract.address,
    });
    try {
      const tx = await subscribeOperation.exec(signer);
      const receipt = await tx.wait();
      if (receipt) {
        console.log("approved!");
      }
    } catch (err) {
      if (
        err.errorObject.errorObject.error.reason ===
        "execution reverted: IDA: E_SUBS_APPROVED"
      ) {
        console.log("shareGainer already approved subscription. moving on ->");
      }
    }
  };
  return (
    <div className="db-sub">
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
      <h1 className="subscriber-h1">Approve Subscriber</h1>
      <p className="subscriber-p">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur,
        rem?
      </p>
      <div className="subscriber-add-box">
        <div className="subscriber-input-div">
          <input
            type="number"
            className="subscriber-input-index"
            placeholder="Index"
            onChange={(e) => setIndexNumber(e.target.value)}
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
          <button onClick={() => approveSubscriber()}>Approve</button>
        </div>
      </div>
    </div>
  );
}

export default SubscriberApprove;
