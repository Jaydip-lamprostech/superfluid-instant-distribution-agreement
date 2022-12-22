import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { useAccount } from "wagmi";

import "../styles/dashboard.scss";

function Dashboard() {
  const { address, isConnected } = useAccount();

  if (isConnected) {
    return (
      <div>
        <h1>connected</h1>
      </div>
    );
  }
  return (
    <div className="db-main">
      <div className="db-sub">
        <h1>Connect to Superfluid</h1>
        <p>Connect your wallet, view any wallet, or take a look around!</p>
        <div className="db-grid-sub">
          <div className="grid-sub"></div>
          <div className="grid-sub"></div>
          <div className="grid-sub"></div>
          <div className="grid-sub"></div>
        </div>
        <div className="connect-wallet">
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
      </div>
    </div>
  );
}

export default Dashboard;
