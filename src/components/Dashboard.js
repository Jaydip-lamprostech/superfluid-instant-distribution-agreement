import { Skeleton } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useState } from "react";
import { useAccount } from "wagmi";

import "../styles/dashboard.scss";

function Dashboard() {
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState(false);
  console.log(address);
  if (isConnected) {
    return (
      <div className="db-main">
        <div className="db-sub">
          {/* <p>Connect your wallet, view any wallet, or take a look around!</p> */}
          <div className="db-box-parent">
            <h1 className="super-token">
              {loading ? (
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  sx={{ bgcolor: "grey.100" }}
                />
              ) : (
                "Super Token"
              )}
            </h1>
            <div className="db-box">
              <div className="db-header">
                <div className="connect-wallet">
                  <ConnectButton
                    accountStatus={{
                      smallScreen: "avatar",
                      largeScreen: "full",
                    }}
                    showBalance={{
                      smallScreen: false,
                      largeScreen: false,
                    }}
                  />
                </div>
              </div>
              <div className="token-details">
                <table>
                  <thead>
                    <tr>
                      <th>Asset</th>
                      <th>Balance</th>
                      <th>Net Flow</th>
                      <th>Inflow/Outflow</th>
                      <th>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          enableBackground="new 0 0 24 24"
                          height="24px"
                          viewBox="0 0 24 24"
                          width="24px"
                          fill="#000000"
                        >
                          <g>
                            <rect fill="none" height="24" width="24" />
                            <rect fill="none" height="24" width="24" />
                          </g>
                          <g>
                            <g>
                              <path d="M17.29,5.71L17.29,5.71c-0.39-0.39-1.02-0.39-1.41,0L12,9.58L8.11,5.7c-0.39-0.39-1.02-0.39-1.41,0l0,0 c-0.39,0.39-0.39,1.02,0,1.41l4.59,4.59c0.39,0.39,1.02,0.39,1.41,0l4.59-4.59C17.68,6.73,17.68,6.1,17.29,5.71z" />
                              <path d="M17.29,12.3L17.29,12.3c-0.39-0.39-1.02-0.39-1.41,0L12,16.17l-3.88-3.88c-0.39-0.39-1.02-0.39-1.41,0l0,0 c-0.39,0.39-0.39,1.02,0,1.41l4.59,4.59c0.39,0.39,1.02,0.39,1.41,0l4.59-4.59C17.68,13.32,17.68,12.69,17.29,12.3z" />
                            </g>
                          </g>
                        </svg>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="token-icon">
                          <div aria-label="" className="svg-parent">
                            <svg
                              data-cy="animation"
                              viewBox="0 0 36 36"
                              className="fdaix-token-svg"
                            >
                              <clipPath id="clip">
                                <polygon points="18,18, 30.5,0 36,10.2"></polygon>
                              </clipPath>
                              <mask id="mask">
                                <rect
                                  x="-3"
                                  y="-3"
                                  width="42"
                                  height="42"
                                  fill="white"
                                ></rect>
                                <polygon
                                  points="18,18, 30.5,0 36,10.2"
                                  fill="black"
                                ></polygon>
                              </mask>
                              <circle
                                mask="url(#mask)"
                                r="17.5px"
                                cx="18"
                                cy="18"
                                stroke="#10BB35FF"
                                stroke-width="1"
                                fill="transparent"
                              ></circle>
                              <circle
                                clipPath="url(#clip)"
                                r="17px"
                                cx="18"
                                cy="18"
                                strokeDasharray="2"
                                stroke="#10BB35FF"
                                stroke-width="2"
                                fill="transparent"
                              ></circle>
                            </svg>
                            <div
                              class="MuiAvatar-root MuiAvatar-circular token-avatar-parent"
                              data-cy="token-icon"
                            >
                              <img
                                alt="fDAIx token icon"
                                src="https://raw.githubusercontent.com/superfluid-finance/assets/master/public//tokens/dai/icon.svg"
                                class="MuiAvatar-img avatar-token"
                              ></img>
                            </div>
                          </div>
                          <h4 className="fdaix">fDAIx</h4>
                        </div>
                      </td>
                      <td>
                        <h4 className="token-balance">1000</h4>
                      </td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
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
