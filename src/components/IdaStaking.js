import React, { useEffect } from "react";
import coin from "../assets/coin.png";
import "../styles/idastaking.scss";
import { ethers } from "ethers";
import Web3 from "web3";
import stackingContract from "../artifacts/StackingContract.json";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
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
import { useAccount } from "wagmi";
const contractAddress = "0x3458b3dcd0483c07d9054d04D4Cee61B3a543931";

function IdaStaking() {
  const { address } = useAccount();
  const [loading, setLoading] = useState(true);
  const [transLoading, setTransLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedKey, setCopiedKey] = useState({ key: -1, add: "" });
  const [count, setCount] = useState(1);
  const [enteredStakeValues, setEnteredStakeValues] = useState({
    publishId: "",
    amount: "",
  });

  const [tokenData, setTokenData] = useState();

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
    setPublishTokenDetails({
      tokenAddress: "",
      tokenName: "",
      tokenSymbol: "",
      tokenAmount: "",
      startDate: "",
      endDate: "",
    });
  };
  const handleOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
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
  // contract functions

  const publishTokenNew = async () => {
    setTransLoading(true);
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const sf = await Framework.create({
          chainId: 80001,
          provider: provider,
        });
        const daix = await sf.loadSuperToken(publishTokenDetails.tokenAddress);

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
          ethers.utils.parseEther(String(publishTokenDetails.tokenAmount)),
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
        await tx.wait();
        setCount((prev) => prev + 1);
        console.log("Done");
        setTransLoading(false);
        handleClose();
      }
    } catch (error) {
      console.log(error);
      setTransLoading(false);
    }
  };

  const getPublisherData = async () => {
    try {
      const stackingContract = await stackingContractInstance();
      console.log(stackingContract);

      const data = await stackingContract.getAllPublisherData();
      console.log(data);
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        const epoch = parseInt(data[i].startTime); // May 4, 2021 00:00:00 UTC
        const now = Date.now(); // current epoch time in milliseconds
        let clamable;
        let unstakable;
        const timeDiff = now - epoch * 1000; // difference in milliseconds
        console.log("timeDiff", timeDiff);
        const timeDiffInHours = timeDiff / 3600000;
        if (timeDiffInHours >= 24) {
          clamable = 1;
        } else {
          clamable = 0;
        }

        let endDate = parseInt(data[i].startTime) + 86400 * data[i].no_day;
        arr.push({
          stakedStatus: await checkStake(data[i].id),
          stakedAmount: await getUserStakedamount(data[i].id),
          isClamable: clamable ? true : false,
          isUnstakable: timeDiff < 0 ? false : true,
          tokenName: data[i].tokenName,
          tokenSymbol: data[i].tokenSymbol,
          tokenAdd: data[i].token,
          publisherAdd: data[i].publisher,
          amount: data[i].amount / Math.pow(10, 18),
          sDate: new Date(
            parseInt(data[i].startTime) * 1000
          ).toLocaleDateString(),
          endDate: new Date(endDate * 1000).toLocaleDateString(),
          id: data[i].id,
          index_id: data[i].index_id,
        });
        // arr.push();
      }
      console.log(arr);
      // setStakeStatus(arr);
      setTokenData(arr);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (address && count) {
      getPublisherData();
    }
  }, [count, address]);

  const checkStake = async (id) => {
    console.log("inside the checkStake function");
    try {
      const stackingContract = await stackingContractInstance();
      const data = await stackingContract.hasUserStaked(address, id);
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const getUserStakedamount = async (id) => {
    try {
      const stackingContract = await stackingContractInstance();
      const data = await stackingContract.userCampaignStakedamount(address, id);
      console.log(data);
      return parseInt(data);
    } catch (err) {
      console.log(err);
    }
  };
  const stake = async () => {
    setTransLoading(true);
    try {
      const stackingContract = await stackingContractInstance();
      const tx = await stackingContract.stakeTokens(
        ethers.utils.parseEther(String(enteredStakeValues.amount)),
        enteredStakeValues.publishId,
        {
          value: ethers.utils.parseEther(String(enteredStakeValues.amount)),
        }
      );
      await tx.wait();
      console.log(tx);
      setTransLoading(false);
      handleClose2();
      setCount((prev) => prev + 1);
    } catch (err) {
      console.log(err);
      setTransLoading(false);
    }
  };

  const unStake = async (id) => {
    setTransLoading(true);
    try {
      const stackingContract = await stackingContractInstance();
      console.log(stackingContract);
      const tx = await stackingContract.unStakeSubscription(id);
      await tx.wait();
      console.log(tx);
      setTransLoading(false);
      setCount((prev) => prev + 1);
    } catch (err) {
      console.log(err);
      setTransLoading(false);
    }
  };

  const claimFunds = async (id, tokenAddress) => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const sf = await Framework.create({
          chainId: 80001,
          provider: provider,
        });

        const daix = await sf.loadSuperToken(tokenAddress);

        console.log("claiming funds");
        const subscribeOperation = daix.claim({
          indexId: parseInt(id), // index id
          subscriber: address, // user address
          publisher: contractAddress,
          // userData: "0x",
        });
        const tx = await subscribeOperation.exec(signer);
        const receipt = await tx.wait();
        if (receipt) {
          console.log("FUNDS DISTRIBUTED");
          setCount((prev) => prev + 1);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const publishToken = async () => {
  //   try {
  //     console.log(ethers.utils.parseEther(String(10)));
  //     const stackingContract = await stackingContractInstance();
  //     // const provider = new ethers.providers.Web3Provider(ethereum);
  //     // const signer = provider.getSigner();
  //     // if (!provider) {
  //     //   console.log("Metamask is not installed, please install!");
  //     // }

  //     // const { chainId } = await provider.getNetwork();
  //     // console.log("switch case for this case is: " + chainId);
  //     // const con = new ethers.Contract(
  //     //   CONTRACT_ADDRESS,
  //     //   stackingContract.abi,
  //     //   signer
  //     // );

  //     // get days for the token

  //     console.log(stackingContract);
  //     const epoch1 = publishTokenDetails.startDate; // May 3, 2021 00:00:00 UTC
  //     const epoch2 = publishTokenDetails.endDate; // January 1, 2022 00:00:00 UTC

  //     const date1 = new Date(epoch1 * 1000);
  //     const date2 = new Date(epoch2 * 1000);

  //     const days = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));

  //     console.log(days); // output: 242
  //     console.log(
  //       publishTokenDetails.tokenAddress,
  //       publishTokenDetails.tokenAmount,
  //       publishTokenDetails.startDate,
  //       days,
  //       publishTokenDetails.tokenName,
  //       publishTokenDetails.tokenSymbol
  //     );

  //     // contract function to publish the token
  //     const tx = await stackingContract.publishTokens(
  //       "0xEB796bdb90fFA0f28255275e16936D25d34186030xEB796bdb90fFA0f28255275e16936D25d3418603",
  //       publishTokenDetails.tokenAddress,
  //       publishTokenDetails.tokenAmount,
  //       publishTokenDetails.startDate,
  //       days,
  //       publishTokenDetails.tokenName,
  //       publishTokenDetails.tokenSymbol
  //     );

  //     await tx.wait();
  //     console.log(tx);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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

  const copyFunction = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setCopiedKey({ key: key, add: text });
    setTimeout(() => {
      setCopied(false);
      setCopiedKey({ key: -1, add: "" });
    }, 1000);
  };
  if (!loading && address)
    return (
      <div className="home">
        <div className="first-section">
          <div className="banner">
            <div className="banner-inside-1">
              <h1>Publish Token</h1>
              <p>
                Publish your token with the reward amount, and let others stake
                it and earn some rewards.
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {count &&
                tokenData.map((item, key) => {
                  return (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>
                        {item.tokenName}{" "}
                        <span className="token-symbol">{item.tokenSymbol}</span>
                      </td>
                      <td>
                        {item.tokenAdd.slice(0, 4) +
                          "..." +
                          item.tokenAdd.slice(
                            item.tokenAdd?.length - 4,
                            item.tokenAdd?.length
                          )}
                        {copied &&
                        copiedKey.key === key &&
                        copiedKey.add === item.tokenAdd ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            enable-background="new 0 0 20 20"
                            height="18px"
                            viewBox="0 0 20 20"
                            width="18px"
                            fill="#ffaa00"
                          >
                            <g>
                              <rect fill="none" height="20" width="20" />
                            </g>
                            <g>
                              <path d="M18,10l-1.77-2.03l0.25-2.69l-2.63-0.6l-1.37-2.32L10,3.43L7.53,2.36L6.15,4.68L3.53,5.28l0.25,2.69L2,10l1.77,2.03 l-0.25,2.69l2.63,0.6l1.37,2.32L10,16.56l2.47,1.07l1.37-2.32l2.63-0.6l-0.25-2.69L18,10z M13.18,8.47l-4.24,4.24 c-0.2,0.2-0.51,0.2-0.71,0L6.82,11.3c-0.2-0.2-0.2-0.51,0-0.71s0.51-0.2,0.71,0l1.06,1.06l3.89-3.89c0.2-0.2,0.51-0.2,0.71,0 S13.38,8.28,13.18,8.47z" />
                            </g>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            enableBackground="new 0 0 24 24"
                            height="18px"
                            viewBox="0 0 24 24"
                            width="18px"
                            fill="#73777b"
                            onClick={() => copyFunction(item.tokenAdd, key)}
                          >
                            <g>
                              <rect fill="none" height="24" width="24" />
                            </g>
                            <g>
                              <path d="M15,20H5V7c0-0.55-0.45-1-1-1h0C3.45,6,3,6.45,3,7v13c0,1.1,0.9,2,2,2h10c0.55,0,1-0.45,1-1v0C16,20.45,15.55,20,15,20z M20,16V4c0-1.1-0.9-2-2-2H9C7.9,2,7,2.9,7,4v12c0,1.1,0.9,2,2,2h9C19.1,18,20,17.1,20,16z M18,16H9V4h9V16z" />
                            </g>
                          </svg>
                        )}
                      </td>
                      <td>
                        {item.publisherAdd.slice(0, 4) +
                          "..." +
                          item.publisherAdd.slice(
                            item.publisherAdd?.length - 4,
                            item.publisherAdd?.length
                          )}{" "}
                        {copied &&
                        copiedKey.key === key &&
                        copiedKey.add === item.publisherAdd ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            enable-background="new 0 0 20 20"
                            height="18px"
                            viewBox="0 0 20 20"
                            width="18px"
                            fill="#ffaa00"
                          >
                            <g>
                              <rect fill="none" height="20" width="20" />
                            </g>
                            <g>
                              <path d="M18,10l-1.77-2.03l0.25-2.69l-2.63-0.6l-1.37-2.32L10,3.43L7.53,2.36L6.15,4.68L3.53,5.28l0.25,2.69L2,10l1.77,2.03 l-0.25,2.69l2.63,0.6l1.37,2.32L10,16.56l2.47,1.07l1.37-2.32l2.63-0.6l-0.25-2.69L18,10z M13.18,8.47l-4.24,4.24 c-0.2,0.2-0.51,0.2-0.71,0L6.82,11.3c-0.2-0.2-0.2-0.51,0-0.71s0.51-0.2,0.71,0l1.06,1.06l3.89-3.89c0.2-0.2,0.51-0.2,0.71,0 S13.38,8.28,13.18,8.47z" />
                            </g>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            enableBackground="new 0 0 24 24"
                            height="18px"
                            viewBox="0 0 24 24"
                            width="18px"
                            fill="#73777b"
                            onClick={() => copyFunction(item.publisherAdd, key)}
                          >
                            <g>
                              <rect fill="none" height="24" width="24" />
                            </g>
                            <g>
                              <path d="M15,20H5V7c0-0.55-0.45-1-1-1h0C3.45,6,3,6.45,3,7v13c0,1.1,0.9,2,2,2h10c0.55,0,1-0.45,1-1v0C16,20.45,15.55,20,15,20z M20,16V4c0-1.1-0.9-2-2-2H9C7.9,2,7,2.9,7,4v12c0,1.1,0.9,2,2,2h9C19.1,18,20,17.1,20,16z M18,16H9V4h9V16z" />
                            </g>
                          </svg>
                        )}
                      </td>
                      <td>{item.amount}</td>
                      <td>{item.sDate}</td>
                      <td>{item.endDate}</td>
                      <td>
                        {item.stakedAmount > 0 ? (
                          <button className="stake disable">Staked</button>
                        ) : (
                          <button
                            className="stake"
                            onClick={() => {
                              setEnteredStakeValues({
                                ...enteredStakeValues,
                                publishId: item.id,
                              });
                              handleOpen2();
                            }}
                          >
                            Stake
                          </button>
                        )}
                        {item.stakedStatus && item.isClamable ? (
                          <button
                            className="claim"
                            onClick={() => claimFunds(item.id, item.tokenAdd)}
                          >
                            {transLoading ? (
                              <span className="loader"></span>
                            ) : (
                              "Claim"
                            )}
                          </button>
                        ) : (
                          <button className="claim disable" id="claim-button">
                            Claim
                          </button>
                        )}
                        {item.isUnstakable && item.stakedStatus ? (
                          <button
                            className="unstake"
                            onClick={() => unStake(item.id)}
                          >
                            {transLoading ? (
                              <span className="loader"></span>
                            ) : (
                              "Unstake"
                            )}
                          </button>
                        ) : (
                          <button
                            className="unstake disable"
                            id="unstake-button"
                          >
                            Unstake
                          </button>
                        )}
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
                zIndex: 50,
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
                  helperText="The token amount is the total amount that you want to distribute for the number of days."
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
              {publishTokenDetails.tokenAmount &&
              publishTokenDetails.tokenName &&
              publishTokenDetails.tokenSymbol &&
              publishTokenDetails.startDate &&
              publishTokenDetails.endDate ? (
                <>
                  <p className="publish-info">
                    Your token {publishTokenDetails.tokenName} will be available
                    for stake on
                    <b style={{ margin: "0px 5px" }}>
                      {publishTokenDetails.startDate
                        ? new Date(
                            parseInt(publishTokenDetails.startDate) * 1000
                          ).toLocaleDateString()
                        : ""}
                    </b>
                    day and will not be available for stake after
                    <b style={{ margin: "0px 5px" }}>
                      {publishTokenDetails.startDate
                        ? new Date(
                            parseInt(publishTokenDetails.endDate) * 1000
                          ).toLocaleDateString() + "."
                        : ""}
                    </b>
                    Your total reward amount
                    <b style={{ margin: "0px 5px" }}>
                      {publishTokenDetails.tokenAmount +
                        " " +
                        publishTokenDetails.tokenSymbol}
                    </b>
                    will be equally distributed per day so your token reward per
                    day will be
                    <b style={{ margin: "0px 5px" }}>
                      {(
                        publishTokenDetails.tokenAmount /
                        ((publishTokenDetails.endDate -
                          publishTokenDetails.startDate) /
                          86400)
                      ).toFixed(4) +
                        " " +
                        publishTokenDetails.tokenSymbol +
                        "."}
                    </b>
                  </p>
                  <button
                    className="publish-token"
                    onClick={() => publishTokenNew()}
                  >
                    {transLoading ? (
                      <span className="loader"></span>
                    ) : (
                      "Publish"
                    )}
                  </button>
                </>
              ) : (
                <>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "red",
                      textAlign: "left",
                      margin: "10px 0px",
                    }}
                  >
                    * All the fields are required
                  </p>
                  <button
                    className="publish-token"
                    disabled
                    // onClick={() => publishTokenNew()}
                  >
                    Publish
                  </button>
                </>
              )}
            </div>
          </Box>
        </Modal>
        <Modal
          open={open2}
          onClose={handleClose2}
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
                zIndex: 50,
              }}
            >
              Stake
            </Typography>{" "}
            <div
              id="modal-modal-description"
              style={{ padding: "1.5rem", textAlign: "center" }}
            >
              <div className="publish-token-inputs">
                <TextField
                  // error
                  id="outlined-error-helper-text"
                  label="Stake Amount"
                  // defaultValue="Hello World"
                  // helperText="Incorrect entry."
                  onChange={(e) =>
                    setEnteredStakeValues({
                      ...enteredStakeValues,
                      amount: e.target.value,
                    })
                  }
                  fullWidth
                />
              </div>

              <button className="stake-popup" onClick={() => stake()}>
                {transLoading ? <span className="loader"></span> : "Stake"}
              </button>
            </div>
          </Box>
        </Modal>
        <ReactTooltip
          anchorSelect="#claim-button"
          place="top"
          style={{
            maxWidth: "250px",
            wordBreak: "break-all",
            backgroundColor: "#15133c",
          }}
          content="You have to stake first in order to claim. If you have staked already, you must wait 24 hours to claim the rewards."
        />
        <ReactTooltip
          anchorSelect="#unstake-button"
          place="top"
          style={{
            maxWidth: "250px",
            wordBreak: "break-all",
            backgroundColor: "#15133c",
          }}
          content="You have to stake first in order to unstake your amount."
        />
      </div>
    );
  else
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    );
}

export default IdaStaking;
