import React, { useState } from "react";
import "../styles/dashboard.scss";
import "../styles/subscriber.scss";
import SubscriberAdd from "./SubscriberAdd";
import SubscriberApprove from "./SubscriberApprove";
import SubscriberInfo from "./SubscriberInfo";
import SubscriberList from "./SubscriberList";

function Subscriber() {
  const [showInfo, setInfo] = useState(true);
  const [showAdd, setAdd] = useState(false);
  const [showList, setList] = useState(false);
  const [showApprove, setApprove] = useState(false);

  return (
    <div className="db-main">
      <div className="subscriber-header">
        <button
          className={
            showInfo ? "subscriber-header-btn active" : "subscriber-header-btn"
          }
          onClick={() => {
            setInfo(true);
            setAdd(false);
            setList(false);
            setApprove(false);
          }}
        >
          Info
        </button>
        <button
          className={
            showAdd ? "subscriber-header-btn active" : "subscriber-header-btn"
          }
          onClick={() => {
            setInfo(false);
            setAdd(true);
            setList(false);
            setApprove(false);
          }}
        >
          Add
        </button>
        <button
          className={
            showList ? "subscriber-header-btn active" : "subscriber-header-btn"
          }
          onClick={() => {
            setInfo(false);
            setAdd(false);
            setList(true);
            setApprove(false);
          }}
        >
          List
        </button>
        <button
          className={
            showApprove
              ? "subscriber-header-btn active"
              : "subscriber-header-btn"
          }
          onClick={() => {
            setInfo(false);
            setAdd(false);
            setList(false);
            setApprove(true);
          }}
        >
          Approve
        </button>
      </div>
      {showInfo ? (
        <SubscriberInfo
          setAdd={setAdd}
          setApprove={setApprove}
          setInfo={setInfo}
          setList={setList}
        />
      ) : showAdd ? (
        <SubscriberAdd />
      ) : showList ? (
        <SubscriberList />
      ) : showApprove ? (
        <SubscriberApprove />
      ) : null}
    </div>
  );
}

export default Subscriber;
