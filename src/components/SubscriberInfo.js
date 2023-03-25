import React from "react";
import "../styles/subscriber.scss";

function SubscriberInfo({ setInfo, setAdd, setList, setApprove }) {
  return (
    <div className="db-sub">
      <h1 className="subscriber-h1">Add subscribers</h1>
      <h1 className="subscriber-h1">Who is Subscriber?</h1>
      <p className="subscriber-p">
        The receivers. Accounts that are given units to an IDA index and are
        able to receive Super Tokens distributed through it.
      </p>
      <div className="db-ida-box">
        <p className="subscriber-p">
          Dictate the proportion of Super Tokens distributed through an index
          that a subscriber is to receive. They work like distribution shares.
          Receivers get Super Tokens sent through the IDA index in proportion to
          the units issued to them divided by total units issued for the index.
        </p>
        <div className="subscriber-info">
          <button
            onClick={() => {
              setInfo(false);
              setAdd(true);
              setList(false);
              setApprove(false);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubscriberInfo;
