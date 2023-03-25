import React, { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";

import { FormControl, MenuItem, Select } from "@mui/material";
import "../styles/distribute.scss";
import Blokies from "./Blokies";

import Abi_IDA from "../artifacts/Abi_IDA.json";
import { ethers } from "ethers";
import { Framework } from "@superfluid-finance/sdk-core";
import { useAccount, useProvider, useSigner } from "wagmi";
import { CONTRACT_ADDRESS } from "../config";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { createClient } from "urql";
import Web3 from "web3";

function Distribute({ index }) {
  const { address } = useAccount();

  const [indexValue, setIndexValue] = useState(index ? index : "");
  const [amount, setAmount] = useState();
  const [dataloaded, setDataLoaded] = useState(false);
  const [subscribersAddress, setSubscriberAddress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxToken, setMaxToken] = useState();
  const [totalUnits, setTotalUnits] = useState(0);

  const [showupdateIndexValue, setUpdateIndexValue] = useState();
  // let totalUnits = 0;
  // const [totalUnitsArr, setTotalUnitsArr] = useState([]);

  const [loadingAnim, setLoadingAnim] = useState(false);
  const [btnContent, setBtnContent] = useState("Distribute");

  // let totalUnits = 0;

  const [indexArr, setIndexArr] = useState([]);
  const [temp, setTemp] = useState([]);

  const [subListLoading, setSubListLoading] = useState(true);
  const [showNewLoading, setNewLoading] = useState(false);

  const provider = useProvider();
  const { data: signer } = useSigner();

  const updateIndexValue = async () => {
    setLoadingAnim(true);

    console.log("Inside updateIndexValue() function");

    const sf = await Framework.create({
      chainId: 5,
      provider: provider,
    });
    const daix = await sf.loadSuperToken("fDAIx");
    try {
      const createIndexOperation = daix.updateIndexValue({
        indexId: indexValue.toString(),
        indexValue: showupdateIndexValue.toString(),
      });
      console.log("updateing your Index value...");

      const sign = await createIndexOperation.exec(signer);
      const receipt = await sign.wait(sign);
      if (receipt) {
        setLoadingAnim(false);
        console.log(
          `Value is Updated for the Index ID: ${showupdateIndexValue}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const distributeFunds = async () => {
    setLoadingAnim(true);
    const sf = await Framework.create({
      chainId: 5,
      provider: provider,
    });

    const daix = await sf.loadSuperToken("fDAIx");
    try {
      const subscribeOperation = daix.distribute({
        indexId: indexValue.toString(),
        amount: amount.toString(),
      });
      const tx = await subscribeOperation.exec(signer);
      const receipt = await tx.wait();
      if (receipt) {
        setLoadingAnim(false);
        setBtnContent("Token Distributed");
        setTimeout(() => {
          setBtnContent("Distribute");
        }, 3000);
        console.log("FUNDS DISTRIBUTED");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    // setSubListLoading(true);
    setUnits(e);
    setNewLoading(false);
    setIndexValue(e);

    // getSubscriberUnits();
  };

  const setUnits = async (e) => {
    // setNewLoading(true);
    subscribersAddress.splice(0, subscribersAddress.length);
    console.log(e);

    for (let i = 0; i < temp.length; i++) {
      if (temp[i].indexId === String(e)) {
        setTotalUnits(temp[i].totalUnits);
        if (temp[i].subscriptions.length > subscribersAddress.length) {
          for (let j = 0; j < temp[i].subscriptions.length; j++) {
            subscribersAddress.push(temp[i].subscriptions[j]);
          }
        }
      }
    }

    console.log(subscribersAddress);
    // setSubListLoading(false);
  };
  // smart contract functions

  useEffect(() => {
    if (address) {
      const getIndexes = async () => {
        const API =
          "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-goerli";

        const data_ = `
    query {
      indexes(
        where: {publisher_: {id: "${address.toLowerCase()}"},}
      ) {
        publisher {
          id
          publishedIndexes {
            indexValue
            indexId
            totalUnits
            totalUnitsPending
            totalUnitsApproved
            subscriptions {
              subscriber {
                id
              }
              approved
              units
            }
          }
        }
      }
    }
  `;
        const c = createClient({
          url: API,
        });
        const result1 = await c.query(data_).toPromise();
        console.log(result1);
        // console.log("finalData");
        // console.log(result1.data.indexes[0].publisher.publishedIndexes);
        let arr;
        if (result1.data.indexes.length > 0) {
          arr = result1.data.indexes[0].publisher.publishedIndexes;
        }
        // console.log(arr);
        if (arr.length > indexArr.length) {
          for (let i = 0; i < arr.length; i++) {
            indexArr.push(arr[i].indexId);
          }
        }
        if (arr.length > temp.length) {
          for (let i = 0; i < arr.length; i++) {
            temp.push(arr[i]);
          }
        }
        // console.log(temp);
        setDataLoaded(true);
      };
      getIndexes();
      if (indexValue) {
        const getIndexData = async () => {
          const sf = await Framework.create({
            chainId: 5,
            provider: provider,
          });
          const daix = await sf.loadSuperToken("fDAIx");
          try {
            let res = await daix.getIndex({
              publisher: address,
              indexId: indexValue.toString(),
              providerOrSigner: signer,
            });
            console.log(res);
            const eth = Web3.utils.fromWei(`${res.indexValue}`, "ether");
            setMaxToken(eth);
          } catch (error) {
            console.error(error);
          }
        };
        getIndexData();
      }
    }
  }, [address, indexValue]);

  // const getFunds = async () => {
  //   try {
  //     const tx = await connectedContract.viewAddressStake();
  //     console.log(tx);
  //     setMaxToken(parseFloat(tx / Math.pow(10, 18)).toFixed(2));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   // getFunds();
  //   if (index) {
  //     setUnits(index);
  //   }
  // }, []);

  if (maxToken)
    return (
      <div className="db-main">
        <div className="db-sub">
          <h1 className="distribute-h1">Distribute</h1>
          <p className="distribute-p">
            Takes the specified amount of Super Tokens from the sender's account
            and distributes them to all receivers
          </p>
          <div className="distribute-box">
            <div className="distribution-select-index">
              <FormControl required fullWidth>
                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                <Select
                  displayEmpty
                  id="demo-simple-select"
                  value={indexValue}
                  onChange={(e) => handleChange(e.target.value)}
                  sx={{
                    margin: "10px 0px",
                    color: "rgba(18, 20, 30, 0.87)",
                    fontSize: "1rem",
                    padding: "0px 5px",
                    ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
                      {
                        minHeight: "auto",
                      },
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(224, 224, 224)",
                      boxShadow: "rgba(204, 204, 204, 0.25) 0px 0px 6px 3px",
                      borderRadius: "15px",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(224, 224, 224)",
                      boxShadow: "rgba(204, 204, 204, 0.25) 0px 0px 6px 3px",
                      borderRadius: "15px",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(224, 224, 224)",
                      boxShadow: "rgba(204, 204, 204, 0.25) 0px 0px 6px 3px",
                      borderRadius: "15px",
                    },
                    ".MuiSvgIcon-root ": {
                      fill: "black",
                    },
                  }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem disabled value="">
                    <h4 className="index-placeholder">Select Index</h4>
                  </MenuItem>
                  {dataloaded
                    ? indexArr.map((item, key) => {
                        return (
                          <MenuItem value={item} key={key}>
                            {item}
                          </MenuItem>
                        );
                      })
                    : null}
                </Select>
              </FormControl>
            </div>

            <div className="subscriber-input-div">
              <input
                type="number"
                className="subscriber-input-index"
                placeholder="Enter Token in ETH"
                max={maxToken}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </div>
            <h4>Token Balance: {maxToken} ETH</h4>
            {maxToken === "0" ? (
              <>
                <div className="subscriber-input-div">
                  <input
                    type="number"
                    className="subscriber-input-index"
                    placeholder="Enter Token in Wei"
                    onChange={(e) => {
                      setUpdateIndexValue(e.target.value);
                    }}
                  />
                </div>
                <div className="distribute-btn">
                  <button onClick={() => updateIndexValue()}>
                    {loadingAnim ? (
                      <span className="loader"></span>
                    ) : (
                      "Update Index Value"
                    )}
                  </button>
                </div>
              </>
            ) : null}
            <h2 className="distribute-h2">Distribution</h2>
            <div className="distribute-subscribers-list">
              <table>
                <thead>
                  <tr>
                    <th>Subscribers</th>
                    <th>Units</th>
                    <th>Approval</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {/* ******** table data map ********** */}

                  {indexValue ? (
                    !showNewLoading ? (
                      subscribersAddress.map((item, key) => {
                        return (
                          <tr key={key}>
                            <td>
                              {item.subscriber.id ? (
                                <div className="blokies-and-address">
                                  <Blokies />
                                  <span className="subscriber-address">
                                    {item.subscriber.id.substring(0, 8) +
                                      "..." +
                                      item.subscriber.id.substring(
                                        item.subscriber.id.length - 6,
                                        item.subscriber.id.length
                                      )}
                                  </span>
                                </div>
                              ) : (
                                <Skeleton
                                  animation="wave"
                                  variant="rounded"
                                  sx={{ bgcolor: "grey.100" }}
                                />
                              )}
                            </td>
                            <td>{item.units}</td>
                            <td>
                              {item.approved === true ? "Approved" : "Pending"}
                            </td>
                            <td>
                              {/* {totalUnits} */}
                              {amount && totalUnits
                                ? parseFloat(
                                    (amount / totalUnits) * item.units
                                  ).toFixed(2)
                                : "-"}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td>
                          <Skeleton
                            animation="wave"
                            variant="rounded"
                            sx={{ bgcolor: "grey.100" }}
                          />
                        </td>
                        <td>
                          <Skeleton
                            animation="wave"
                            variant="rounded"
                            sx={{ bgcolor: "grey.100" }}
                          />
                        </td>
                        <td>
                          <Skeleton
                            animation="wave"
                            variant="rounded"
                            sx={{ bgcolor: "grey.100" }}
                          />
                        </td>
                        <td>
                          <Skeleton
                            animation="wave"
                            variant="rounded"
                            sx={{ bgcolor: "grey.100" }}
                          />
                        </td>
                      </tr>
                    )
                  ) : (
                    <tr>
                      <td colSpan={4} style={{ textAlign: "center" }}>
                        Select Index to display subscribers
                      </td>
                    </tr>
                  )}
                  {}
                  {/* ******** table data map ********** */}

                  {/* ******** table data map ********** */}
                </tbody>
              </table>
              <div className="inside-subscriber-list"></div>
            </div>
            <div className="distribute-btn">
              <button onClick={() => distributeFunds()}>
                {loadingAnim ? <span className="loader"></span> : btnContent}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  else
    return (
      <div className="db-main">
        <div className="db-sub">
          <h1 className="distribute-h1">Distribute</h1>
          <p className="distribute-p">
            Takes the specified amount of Super Tokens from the sender's account
            and distributes them to all receivers
          </p>
        </div>
        <div
          className="connect-wallet"
          style={{ margin: "10px auto", width: "max-content" }}
        >
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
    );
}

export default Distribute;
