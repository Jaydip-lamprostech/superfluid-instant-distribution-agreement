import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import "../styles/landingpage.scss";
import logo from "../assets/superfluid-logo-dark.svg";

function LandingPage() {
  return (
    <div className="main">
      <div className="main-left">
        <div className="left-logo-main">
          <div className="left-logo">
            <img className="logo" src={logo} alt="superfluid logo" />
          </div>
        </div>
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
      </div>
    </div>
  );
}

export default LandingPage;
