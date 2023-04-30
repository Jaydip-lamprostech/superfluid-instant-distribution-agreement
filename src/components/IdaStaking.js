import React, { useEffect } from "react";
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
import { useAccount } from "wagmi";
const contractAddress = "0x3458b3dcd0483c07d9054d04D4Cee61B3a543931";

function IdaStaking() {
  const { address } = useAccount();
  const [loading, setLoading] = useState(true);
  const [transLoading, setTransLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
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
  if (!loading)
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          enableBackground="new 0 0 24 24"
                          height="18px"
                          viewBox="0 0 24 24"
                          width="18px"
                          fill="#73777b"
                          onClick={() =>
                            navigator.clipboard.writeText(item.tokenAdd)
                          }
                        >
                          <g>
                            <rect fill="none" height="24" width="24" />
                          </g>
                          <g>
                            <path d="M15,20H5V7c0-0.55-0.45-1-1-1h0C3.45,6,3,6.45,3,7v13c0,1.1,0.9,2,2,2h10c0.55,0,1-0.45,1-1v0C16,20.45,15.55,20,15,20z M20,16V4c0-1.1-0.9-2-2-2H9C7.9,2,7,2.9,7,4v12c0,1.1,0.9,2,2,2h9C19.1,18,20,17.1,20,16z M18,16H9V4h9V16z" />
                          </g>
                        </svg>
                      </td>
                      <td>
                        {item.publisherAdd.slice(0, 4) +
                          "..." +
                          item.publisherAdd.slice(
                            item.publisherAdd?.length - 4,
                            item.publisherAdd?.length
                          )}{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          enableBackground="new 0 0 24 24"
                          height="18px"
                          viewBox="0 0 24 24"
                          width="18px"
                          fill="#73777b"
                          onClick={() =>
                            navigator.clipboard.writeText(item.publisherAdd)
                          }
                        >
                          <g>
                            <rect fill="none" height="24" width="24" />
                          </g>
                          <g>
                            <path d="M15,20H5V7c0-0.55-0.45-1-1-1h0C3.45,6,3,6.45,3,7v13c0,1.1,0.9,2,2,2h10c0.55,0,1-0.45,1-1v0C16,20.45,15.55,20,15,20z M20,16V4c0-1.1-0.9-2-2-2H9C7.9,2,7,2.9,7,4v12c0,1.1,0.9,2,2,2h9C19.1,18,20,17.1,20,16z M18,16H9V4h9V16z" />
                          </g>
                        </svg>
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
                            Claim
                          </button>
                        ) : (
                          <button className="claim disable">Claim</button>
                        )}
                        {item.isUnstakable && item.stakedStatus ? (
                          <button
                            className="unstake"
                            onClick={() => unStake(item.id)}
                          >
                            Unstake
                          </button>
                        ) : (
                          <button className="unstake disable">Unstake</button>
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
              <button
                className="publish-token"
                onClick={() => publishTokenNew()}
              >
                {transLoading ? (
                  <svg
                    className="animate-spin button-spin-svg-pic"
                    version="1.1"
                    id="L9"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 100 100"
                  >
                    <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"></path>
                  </svg>
                ) : (
                  "Stake"
                )}
              </button>
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
                {transLoading ? (
                  <div class="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  "Stake"
                )}
              </button>
            </div>
          </Box>
        </Modal>
      </div>
    );
}

export default IdaStaking;
