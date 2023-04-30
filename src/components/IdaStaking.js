import React from "react";
import coin from "../assets/coin.png";
import "../styles/idastaking.scss";
import { ethers } from "ethers";
import Web3 from "web3";
import {
  Box,
  Button,
  Modal,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

function IdaStaking() {
  const [open, setOpen] = useState(false);
  const [publishTokenDetails, setPublishTokenDetails] = useState({
    tokenAddress: "",
    tokenName: "",
    tokenSymbol: "",
    tokenAmount: "",
    startDate: "",
    endDate: "",
  });

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50vw",
    bgcolor: "background.paper",
    borderRadius: "20px",
    boxShadow: 24,
    p: 0,
    paddingBottom: "32px",
    maxHeight: "70vh",
    overflow: "auto",
    overflowX: "hidden",
    maxWidth: "700px",
  };

  const data = [
    {
      tokenName: "Ether",
      tokenSymbol: "ETH",
      tokenAddress: "0xB7F98F7571B953a2d6Bc2EE6417E64FC7664C865",
      publisherAddress: "0xB7F98F7571B953a2d6Bc2EE6417E64FC7664C865",
      tokenAmount: "2500",
      tokenStartDate: "20 Oct 2023",
      tokenEndDate: "25 Oct 2023",
    },
    {
      tokenName: "Ether",
      tokenSymbol: "ETH",
      publisherAddress: "0xB7F98F7571B953a2d6Bc2EE6417E64FC7664C865",
      tokenAddress: "0xB7F98F7571B953a2d6Bc2EE6417E64FC7664C865",
      tokenAmount: "2500",
      tokenStartDate: "20 Oct 2023",
      tokenEndDate: "25 Oct 2023",
    },
    {
      tokenName: "Ether",
      tokenSymbol: "ETH",
      publisherAddress: "0xB7F98F7571B953a2d6Bc2EE6417E64FC7664C865",
      tokenAddress: "0xB7F98F7571B953a2d6Bc2EE6417E64FC7664C865",
      tokenAmount: "2500",
      tokenStartDate: "20 Oct 2023",
      tokenEndDate: "25 Oct 2023",
    },
    {
      tokenName: "Ether",
      tokenSymbol: "ETH",
      publisherAddress: "0xB7F98F7571B953a2d6Bc2EE6417E64FC7664C865",
      tokenAddress: "0xB7F98F7571B953a2d6Bc2EE6417E64FC7664C865",
      tokenAmount: "2500",
      tokenStartDate: "20 Oct 2023",
      tokenEndDate: "25 Oct 2023",
    },
    {
      tokenName: "Ether",
      tokenSymbol: "ETH",
      publisherAddress: "0xB7F98F7571B953a2d6Bc2EE6417E64FC7664C865",
      tokenAddress: "0xB7F98F7571B953a2d6Bc2EE6417E64FC7664C865",
      tokenAmount: "2500",
      tokenStartDate: "20 Oct 2023",
      tokenEndDate: "25 Oct 2023",
    },
    {
      tokenName: "Ether",
      tokenSymbol: "ETH",
      publisherAddress: "0xB7F98F7571B953a2d6Bc2EE6417E64FC7664C865",
      tokenAddress: "0xB7F98F7571B953a2d6Bc2EE6417E64FC7664C865",
      tokenAmount: "2500",
      tokenStartDate: "20 Oct 2023",
      tokenEndDate: "25 Oct 2023",
    },
    {
      tokenName: "Ether",
      tokenSymbol: "ETH",
      publisherAddress: "0xB7F98F7571B953a2d6Bc2EE6417E64FC7664C865",
      tokenAddress: "0xB7F98F7571B953a2d6Bc2EE6417E64FC7664C865",
      tokenAmount: "2500",
      tokenStartDate: "20 Oct 2023",
      tokenEndDate: "25 Oct 2023",
    },
    {
      tokenName: "Ether",
      tokenSymbol: "ETH",
      publisherAddress: "0xB7F98F7571B953a2d6Bc2EE6417E64FC7664C865",
      tokenAddress: "0xB7F98F7571B953a2d6Bc2EE6417E64FC7664C865",
      tokenAmount: "2500",
      tokenStartDate: "20 Oct 2023",
      tokenEndDate: "25 Oct 2023",
    },
  ];

  const convertFromEthtoWei = (number) => {
    if (number) {
      const weiValue = Web3.utils.toWei(number, "ether");
      return weiValue;
    } else {
      return null;
    }
  };
  return (
    <div className="home">
      <div className="first-section">
        <div className="banner">
          <div className="banner-inside-1">
            <h1>Publish Token</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto,
              sunt?
            </p>
            <button onClick={handleOpen}>Publish Token</button>
          </div>
          <div className="banner-inside-2">
            <img src={coin} alt="coin" />
          </div>
        </div>
      </div>
      <div className="second-section">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Token</th>
              <th>Token Address</th>
              <th>Publisher Address</th>
              <th>Amount</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, key) => {
              return (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>
                    {item.tokenName}{" "}
                    <span className="token-symbol">{item.tokenSymbol}</span>
                  </td>
                  <td>
                    {item.tokenAddress.slice(0, 4) +
                      "..." +
                      item.tokenAddress.slice(
                        item.tokenAddress.length - 4,
                        item.tokenAddress.length
                      )}
                  </td>
                  <td>
                    {item.publisherAddress.slice(0, 4) +
                      "..." +
                      item.publisherAddress.slice(
                        item.publisherAddress.length - 4,
                        item.publisherAddress.length
                      )}
                  </td>
                  <td>{item.tokenAmount}</td>
                  <td>{item.tokenStartDate}</td>
                  <td>{item.tokenEndDate}</td>
                  <td>
                    <button className="stake">Stake</button>
                    <button className="claim">Claim</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{
              position: "sticky",
              top: "0",
              backgroundColor: "#f3f4f6",
              padding: "20px 20px",
              margin: "0px",
              fontWeight: 600,
            }}
          >
            Publish Token
          </Typography>{" "}
          <div
            id="modal-modal-description"
            style={{ padding: "1.5rem", textAlign: "center" }}
          >
            <div className="publish-token-inputs">
              <TextField
                // error
                id="outlined-error-helper-text"
                label="Token Name"
                // defaultValue="Hello World"
                // helperText="Incorrect entry."
                onChange={(e) =>
                  setPublishTokenDetails({
                    ...publishTokenDetails,
                    tokenName: e.target.value,
                  })
                }
                fullWidth
              />
            </div>
            <div className="publish-token-inputs">
              <TextField
                // error
                id="outlined-error-helper-text"
                label="Token Address"
                onChange={(e) =>
                  setPublishTokenDetails({
                    ...publishTokenDetails,
                    tokenAddress: e.target.value,
                  })
                }
                // defaultValue="Hello World"
                // helperText="Incorrect entry."
                fullWidth
              />
            </div>
            <div className="publish-token-inputs">
              <TextField
                // error
                id="outlined-error-helper-text"
                label="Token Symbol"
                onChange={(e) =>
                  setPublishTokenDetails({
                    ...publishTokenDetails,
                    tokenSymbol: e.target.value,
                  })
                }
                // defaultValue="Hello World"
                // helperText="Incorrect entry."
                fullWidth
              />
            </div>
            <div className="publish-token-inputs">
              <TextField
                // error
                id="outlined-error-helper-text"
                label="Token Amount"
                onChange={(e) => {
                  setPublishTokenDetails({
                    ...publishTokenDetails,
                    tokenAmount: convertFromEthtoWei(e.target.value),
                  });
                }}
                // defaultValue="Hello World"
                // helperText="Incorrect entry."
                fullWidth
              />
            </div>
            <div className="date-inputs">
              <div className="start-date">
                <TextField
                  id="date"
                  label="Start Date"
                  type="date"
                  onChange={(e) =>
                    setPublishTokenDetails({
                      ...publishTokenDetails,
                      startDate: e.target.value,
                    })
                  }
                  // defaultValue="2017-05-24"
                  // sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              </div>
              <div className="end-date">
                <TextField
                  id="date"
                  label="End Date"
                  type="date"
                  onChange={(e) =>
                    setPublishTokenDetails({
                      ...publishTokenDetails,
                      endDate: e.target.value,
                    })
                  }
                  // defaultValue="2017-05-24"
                  // sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              </div>
            </div>
            <button
              className="publish-token"
              onClick={() => console.log(publishTokenDetails)}
            >
              Publish
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default IdaStaking;
