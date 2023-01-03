import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import "../styles/landingpage.scss";
import logo from "../assets/superfluid-logo-dark.svg";
import Dashboard from "../components/Dashboard";
import IDAIndex from "../components/IDAIndex";
import Subscriber from "../components/Subscriber";
import Distribute from "../components/Distribute";
import Agreements from "../components/Agreements";

function LandingPage() {
  const [index, setIndex] = useState();
  const [showDashboard, setDashboard] = useState(true);
  const [showIDA, setIDA] = useState(false);
  const [showSubscriber, setSubscriber] = useState(false);
  const [showAgreement, setAgreement] = useState(false);
  const [showDistribute, setDistribute] = useState(false);

  return (
    <div className="main">
      <div className="main-left">
        <div className="left-logo-main">
          <div className="left-logo">
            <img className="logo" src={logo} alt="superfluid logo" />
          </div>
        </div>
        <ul className="left-ul">
          <div
            className={showDashboard ? "left-ul-link active" : "left-ul-link"}
            onClick={() => {
              setDashboard(true);
              setIDA(false);
              setSubscriber(false);
              setAgreement(false);
              setDistribute(false);
            }}
          >
            <div className="link-icon">
              <svg
                className="icon"
                xmlns="http://www.w3.org/2000/svg"
                enableBackground="new 0 0 24 24"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <rect fill="none" height="24" width="24" />
                <path d="M9,21H5c-1.1,0-2-0.9-2-2V5c0-1.1,0.9-2,2-2h4c1.1,0,2,0.9,2,2v14C11,20.1,10.1,21,9,21z M15,21h4c1.1,0,2-0.9,2-2v-5 c0-1.1-0.9-2-2-2h-4c-1.1,0-2,0.9-2,2v5C13,20.1,13.9,21,15,21z M21,8V5c0-1.1-0.9-2-2-2h-4c-1.1,0-2,0.9-2,2v3c0,1.1,0.9,2,2,2h4 C20.1,10,21,9.1,21,8z" />
              </svg>
            </div>
            <div className="link-text selected">Dashboard</div>
          </div>
          <div
            className={showIDA ? "left-ul-link active" : "left-ul-link"}
            onClick={() => {
              setDashboard(false);
              setIDA(true);
              setSubscriber(false);
              setAgreement(false);
              setDistribute(false);
            }}
          >
            <div className="link-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 11h-3v3c0 .55-.45 1-1 1s-1-.45-1-1v-3H8c-.55 0-1-.45-1-1s.45-1 1-1h3V8c0-.55.45-1 1-1s1 .45 1 1v3h3c.55 0 1 .45 1 1s-.45 1-1 1z" />
              </svg>
            </div>
            <div className="link-text">IDA Index</div>
          </div>
          <div
            className={showSubscriber ? "left-ul-link active" : "left-ul-link"}
            onClick={() => {
              setDashboard(false);
              setIDA(false);
              setSubscriber(true);
              setAgreement(false);
              setDistribute(false);
            }}
          >
            <div className="link-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05.02.01.03.03.04.04 1.14.83 1.93 1.94 1.93 3.41V18c0 .35-.07.69-.18 1H22c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
            </div>
            <div className="link-text">Subscriber</div>
          </div>
          <div
            className={showAgreement ? "left-ul-link active" : "left-ul-link"}
            onClick={() => {
              setDashboard(false);
              setIDA(false);
              setSubscriber(false);
              setAgreement(true);
              setDistribute(false);
            }}
          >
            <div className="link-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M2 21h10c.55 0 1 .45 1 1s-.45 1-1 1H2c-.55 0-1-.45-1-1s.45-1 1-1zM5.24 8.07l2.83-2.83L20.8 17.97c.78.78.78 2.05 0 2.83-.78.78-2.05.78-2.83 0L5.24 8.07zm8.49-5.66l2.83 2.83c.78.78.78 2.05 0 2.83l-1.42 1.42-5.65-5.66 1.41-1.41c.78-.79 2.05-.79 2.83-.01zm-9.9 7.07l5.66 5.66-1.41 1.41c-.78.78-2.05.78-2.83 0l-2.83-2.83c-.78-.78-.78-2.05 0-2.83l1.41-1.41z" />
              </svg>
            </div>
            <div className="link-text selected">Agreements</div>
          </div>
          <div
            className={showDistribute ? "left-ul-link active" : "left-ul-link"}
            onClick={() => {
              setDashboard(false);
              setIDA(false);
              setSubscriber(false);
              setAgreement(false);
              setDistribute(true);
            }}
          >
            <div className="link-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enableBackground="new 0 0 24 24"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <rect fill="none" height="24" width="24" />
                <path d="M17,11h3c1.11,0,2-0.9,2-2V5c0-1.11-0.9-2-2-2h-3c-1.11,0-2,0.9-2,2v1H9.01V5c0-1.11-0.9-2-2-2H4C2.9,3,2,3.9,2,5v4 c0,1.11,0.9,2,2,2h3c1.11,0,2-0.9,2-2V8H11v7.01c0,1.65,1.34,2.99,2.99,2.99H15v1c0,1.11,0.9,2,2,2h3c1.11,0,2-0.9,2-2v-4 c0-1.11-0.9-2-2-2h-3c-1.11,0-2,0.9-2,2v1h-1.01C13.45,16,13,15.55,13,15.01V8h2v1C15,10.1,15.9,11,17,11z" />
              </svg>
            </div>
            <div className="link-text">Distribute</div>
          </div>
        </ul>
      </div>
      <div className="main-right">
        <div className="right-header-parent">
          <header className="right-header">
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
          </header>
        </div>
        <div className="inside-main-right">
          {showDashboard ? (
            <Dashboard />
          ) : showIDA ? (
            <IDAIndex />
          ) : showSubscriber ? (
            <Subscriber />
          ) : showAgreement ? (
            <Agreements
              setAgreement={setAgreement}
              setDistribute={setDistribute}
              setIndex={setIndex}
            />
          ) : showDistribute ? (
            <Distribute index={index} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
