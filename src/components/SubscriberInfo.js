import React from "react";

function SubscriberInfo({ setInfo, setAdd, setList, setApprove }) {
  return (
    <div className="db-sub">
      <h1 className="subscriber-h1">Subscriber</h1>
      <p className="subscriber-p">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur,
        rem?
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
  );
}

export default SubscriberInfo;
