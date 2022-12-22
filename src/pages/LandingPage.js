import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import "../styles/landingpage.scss";
import logo from "../assets/superfluid-logo-dark.svg";
import { Link } from "@mui/material";
import Dashboard from "../components/Dashboard";
import IDAIndex from "../components/IDAIndex";
import Subscriber from "../components/Subscriber";
import Distribute from "../components/Distribute";

function LandingPage() {
  const [showDashboard, setDashboard] = useState(true);
  const [showIDA, setIDA] = useState(false);
  const [showSubscriber, setSubscriber] = useState(false);
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
              setDistribute(false);
            }}
          >
            <div className="link-icon">
              <svg
                className="icon"
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 24 24"
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
            className={showDistribute ? "left-ul-link active" : "left-ul-link"}
            onClick={() => {
              setDashboard(false);
              setIDA(false);
              setSubscriber(false);
              setDistribute(true);
            }}
          >
            <div className="link-icon">
              <svg
                className="distribute_svg"
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 24 24"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <rect fill="none" height="24" width="24" />
                <path d="M14,10.5V11h-3v-0.5C11,9.67,10.33,9,9.5,9h-1V7h1C10.33,7,11,6.33,11,5.5v-3C11,1.67,10.33,1,9.5,1h-4C4.67,1,4,1.67,4,2.5 v3C4,6.33,4.67,7,5.5,7h1v2h-1C4.67,9,4,9.67,4,10.5v3C4,14.33,4.67,15,5.5,15h1v2h-1C4.67,17,4,17.67,4,18.5v3 C4,22.33,4.67,23,5.5,23h4c0.83,0,1.5-0.67,1.5-1.5v-3c0-0.83-0.67-1.5-1.5-1.5h-1v-2h1c0.83,0,1.5-0.67,1.5-1.5V13h3v0.5 c0,0.83,0.67,1.5,1.5,1.5h4c0.83,0,1.5-0.67,1.5-1.5v-3C21,9.67,20.33,9,19.5,9h-4C14.67,9,14,9.67,14,10.5z" />
              </svg>
            </div>
            <div className="link-text">Distribute</div>
          </div>
        </ul>
      </div>
      <div className="main-right">
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
        <div className="inside-main-right">
          {showDashboard ? (
            <Dashboard />
          ) : showIDA ? (
            <IDAIndex />
          ) : showSubscriber ? (
            <Subscriber />
          ) : showDistribute ? (
            <Distribute />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
