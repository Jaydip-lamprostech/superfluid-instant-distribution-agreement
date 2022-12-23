import { Skeleton } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useState } from "react";
import { useAccount } from "wagmi";

import "../styles/dashboard.scss";

function Dashboard() {
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState(false);

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
        <h1>
          {loading ? (
            <Skeleton
              animation="wave"
              variant="rounded"
              sx={{ bgcolor: "grey.100" }}
            />
          ) : (
            "Connect to Superfluid"
          )}
        </h1>
        <p>Connect your wallet, view any wallet, or take a look around!</p>
        <div className="db-grid-sub">
          {loading ? (
            <Skeleton animation="wave" variant="rounded" height={"100%"} />
          ) : (
            <div className="grid-sub">
              <span className="grid-sub-title">Get Super Tokens</span>
              <span className="grid-sub-info">
                Wrap any token in your wallet
              </span>
            </div>
          )}
          <div className="grid-sub">
            <span className="grid-sub-title">Get Super Tokens</span>
            <span className="grid-sub-info">Wrap any token in your wallet</span>
          </div>
          <div className="grid-sub">
            <span className="grid-sub-title">Get Super Tokens</span>
            <span className="grid-sub-info">Wrap any token in your wallet</span>
          </div>
          <div className="grid-sub">
            <span className="grid-sub-title">Get Super Tokens</span>
            <span className="grid-sub-info">Wrap any token in your wallet</span>
          </div>
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
