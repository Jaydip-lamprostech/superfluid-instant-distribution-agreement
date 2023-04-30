import React from "react";
import coin from "../assets/coin.png";
import "../styles/idastaking.scss";
import { ethers } from "ethers";
import Web3 from "web3";
import stackingContract from "../artifacts/StackingContract.json";
import {
  Box,
  Button,
  Modal,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { CONTRACT_ADDRESS, stackingContractInstance } from "./ContractInstance";
import { Framework } from "@superfluid-finance/sdk-core";
const contractAddress = "0xe84d2D176Ba67De42aFb8a7e63F98Df9bE456915";

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

  // contract functions

  const approve = async () => {
    console.log("approve");
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const sf = await Framework.create({
          chainId: 80001,
          provider: provider,
        });
        const daix = await sf.loadSuperToken(publishTokenDetails.tokenAddress); // add the token address from user entered datta

        // checking allowance rate
        // const allowence = await daix.allowance({
        //   owner: "0x9D6d094B29A421168F5B16bCfb41a15eA3A23950",
        //   spender: "0x4d66055Fa02bd890498AEbeB415c4F2007053c6e",
        //   providerOrSigner: signer,
        // });
        // console.log(allowence);
        // condition for approval
        const moneyRouterApproval = daix.approve({
          receiver: CONTRACT_ADDRESS,
          amount: ethers.utils.parseEther(String(10)),
        });
        await moneyRouterApproval.exec(signer).then(async function (tx) {
          await tx.wait();

          console.log(`
                  Congrats! You've just successfully approved the money router contract.
                  Tx Hash: ${tx.hash}
              `);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const publishTokenNew = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const sf = await Framework.create({
          chainId: 80001,
          provider: provider,
        });
        const daix = await sf.loadSuperToken("fDAIx");

        // approve
        const moneyRouterApproval = daix.approve({
          receiver: contractAddress,
          amount: ethers.utils.parseEther(
            String(publishTokenDetails.tokenAmount)
          ),
        });
        await moneyRouterApproval.exec(signer).then(async function (tx) {
          await tx.wait();

          console.log(`
                  Congrats! You've just successfully approved the money router contract.
                  Tx Hash: ${tx.hash}
              `);
        });

        // user data
        const epoch1 = publishTokenDetails.startDate; // May 3, 2021 00:00:00 UTC
        const epoch2 = publishTokenDetails.endDate; // January 1, 2022 00:00:00 UTC

        const date1 = new Date(epoch1 * 1000);
        const date2 = new Date(epoch2 * 1000);

        const days = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));

        console.log(days); // output: 242
        console.log(
          publishTokenDetails.tokenAddress,
          publishTokenDetails.tokenAmount,
          publishTokenDetails.startDate,
          days,
          publishTokenDetails.tokenName,
          publishTokenDetails.tokenSymbol
        );

        // contract function call
        const contract = new ethers.Contract(
          contractAddress,
          stackingContract.abi,
          signer
        );
        const tx = await contract.publishTokens(
          "0xEB796bdb90fFA0f28255275e16936D25d3418603", // host address, fixed
          publishTokenDetails.tokenAddress, // token address
          ethers.utils.parseEther(String(publishTokenDetails.tokenAmount)), // amount
          publishTokenDetails.startDate,
          days, // days
          publishTokenDetails.tokenName,
          publishTokenDetails.tokenSymbol
        );
        tx.wait();
        console.log("Done");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const publishToken = async () => {
    try {
      const stackingContract = await stackingContractInstance();
      // const provider = new ethers.providers.Web3Provider(ethereum);
      // const signer = provider.getSigner();
      // if (!provider) {
      //   console.log("Metamask is not installed, please install!");
      // }

      // const { chainId } = await provider.getNetwork();
      // console.log("switch case for this case is: " + chainId);
      // const con = new ethers.Contract(
      //   CONTRACT_ADDRESS,
      //   stackingContract.abi,
      //   signer
      // );

      // get days for the token

      console.log(stackingContract);
      const epoch1 = publishTokenDetails.startDate; // May 3, 2021 00:00:00 UTC
      const epoch2 = publishTokenDetails.endDate; // January 1, 2022 00:00:00 UTC

      const date1 = new Date(epoch1 * 1000);
      const date2 = new Date(epoch2 * 1000);

      const days = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));

      console.log(days); // output: 242
      console.log(
        publishTokenDetails.tokenAddress,
        publishTokenDetails.tokenAmount,
        publishTokenDetails.startDate,
        days,
        publishTokenDetails.tokenName,
        publishTokenDetails.tokenSymbol
      );

      // contract function to publish the token
      const tx = await stackingContract.publishTokens(
        "0xEB796bdb90fFA0f28255275e16936D25d3418603", // host address, fixed
        "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f", // token address
        ethers.utils.parseEther(String(10)), // amount
        1685445170,
        3, // days
        "fDAIx",
        "fDAIx"
      );

      await tx.wait();
      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  };

  const convertFromEthtoWei = (number) => {
    if (number) {
      const weiValue = Web3.utils.toWei(number, "ether");
      return parseInt(weiValue);
    } else {
      return null;
    }
  };

  const epochDate = (date) => {
    if (date) {
      var myDate = new Date(date);
      var myEpoch = myDate.getTime() / 1000.0;
      return myEpoch;
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
                    tokenAmount: e.target.value,
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
                  onChange={(e) => {
                    setPublishTokenDetails({
                      ...publishTokenDetails,
                      startDate: epochDate(e.target.value),
                    });
                  }}
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
                      endDate: epochDate(e.target.value),
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
            <button className="publish-token" onClick={() => publishTokenNew()}>
              Publish
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default IdaStaking;
