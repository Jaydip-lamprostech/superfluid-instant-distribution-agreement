import { Framework } from "@superfluid-finance/sdk-core";
import React, { useState } from "react";
import { useProvider, useSigner } from "wagmi";
import "../styles/editsubscriber.scss";

function EditSubscriber({ editSubscriberData }) {
  const provider = useProvider();
  const { data: signer } = useSigner();
  const [showUnit, setUnit] = useState();
  const addSubscriber = async () => {
    console.log("Inside addSubscriber() function");

    const sf = await Framework.create({
      chainId: 5,
      provider: provider,
    });
    const daix = await sf.loadSuperToken("fDAIx");
    try {
      const createIndexOperation = daix.updateSubscriptionUnits({
        indexId: editSubscriberData.index,
        subscriber: editSubscriberData.sub_address,
        units: showUnit,
      });
      console.log(`Adding ${editSubscriberData.sub_address} as subscriber...`);

      const sign = await createIndexOperation.exec(signer);
      const receipt = await sign.wait(sign);
      if (receipt) {
        console.log(
          `subscriber updated : ${editSubscriberData.sub_address} with ${
            editSubscriberData.unit
          } uints at Index ID: ${editSubscriberData.index.toString()}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit-subscriber-main">
      <button className="edit-subscriber-title">Edit Subscriber</button>
      <h3>Index #</h3>
      <span>{editSubscriberData.index}</span>
      <h3>Subscriber Address</h3>
      <span>{editSubscriberData.sub_address}</span>
      <h3>Subscriber Unit</h3>
      <input
        type="number"
        placeholder={editSubscriberData.unit}
        onChange={(e) => setUnit(e.target.value)}
      />
      <button className="edit-button" onClick={() => addSubscriber()}>
        Submit
      </button>
    </div>
  );
}

export default EditSubscriber;
