import React, { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";

import { FormControl, MenuItem, Select } from "@mui/material";
import Blokies from "./Blokies";

import Abi_IDA from "../artifacts/Abi_IDA.json";
import { ethers } from "ethers";
import { Framework } from "@superfluid-finance/sdk-core";
import { useAccount, useProvider, useSigner } from "wagmi";
import { CONTRACT_ADDRESS } from "../config";
import { createClient } from "urql";

function SubscriberList({ setInfo, setAdd, setList, setApprove }) {
  const { address, isConnected } = useAccount();
  const [indexValue, setIndexValue] = useState(0);

  const [indexArr, setIndexArr] = useState([]);
  const [subscribersAddress, setSubscriberAddress] = useState([]);
  const [temp, setTemp] = useState([]);
  const [dataloaded, setDataLoaded] = useState(false);
  const [subChange, setSubChange] = useState(0);
  const [subListLoading, setSubListLoading] = useState(true);
  const [subUnitsLoading, setSubUnitsLoading] = useState(false);

  const [loadingAnim, setLoadingAnim] = useState(false);
  const [showNewLoading, setNewLoading] = useState(false);
  // const [amount, setAmount] = useState();

  const handleChange = (e) => {
    setSubListLoading(true);
    setUnits(e);
    setNewLoading(false);
    setIndexValue(e);

    // getSubscriberUnits();
  };

  const setUnits = async (e) => {
    subscribersAddress.splice(0, subscribersAddress.length);
    console.log(indexValue);
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].indexId === String(e)) {
        if (temp[i].subscriptions.length > subscribersAddress.length) {
          for (let j = 0; j < temp[i].subscriptions.length; j++) {
            subscribersAddress.push(temp[i].subscriptions[j]);
          }
        }
      }
    }
    console.log(subscribersAddress);
    setSubListLoading(false);
  };
  // smart contract functions

  const provider = useProvider();
  const { data: signer } = useSigner();

  useEffect(() => {
    const getIndexes = async () => {
      const API =
        "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-goerli";

      const data_ = `
    query {
      indexes(
        where: {publisher_: {id: "0xb611e37650873e8f1e1dee69605a4fb1376dca78"},}
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
      // console.log("finalData");
      // console.log(result1.data.indexes[0].publisher.publishedIndexes);
      let arr = result1.data.indexes[0].publisher.publishedIndexes;
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
      // console.log(indexArr);
      setDataLoaded(true);
    };
    getIndexes();
  }, []);

  useEffect(() => {
    // const connectedContract = new ethers.Contract(
    //   CONTRACT_ADDRESS,
    //   Abi_IDA,
    //   signer
    // );
    // const getIndex = async () => {
    //   try {
    //     const tx = await connectedContract.viewAddressIndex(address);
    //     console.log(tx);
    //     console.log(parseInt(tx[0]));
    //     if (tx.length > indexArr.length)
    //       tx.map((item, key) => {
    //         indexArr.push(parseInt(item));
    //         setDataLoaded(true);
    //         return null;
    //       });
    //     console.log(indexArr);
    //     const receipt = await tx.wait();
    //     // console.log(receipt);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // getIndex();
  });

  // const getSubscriberUnits = async () => {
  //   setSubUnitsLoading(true);
  //   // console.log(address);
  //   // console.log(signer);
  //   // console.log(indexValue);
  //   const sf = await Framework.create({
  //     chainId: 5,
  //     provider: provider,
  //   });
  //   //daix token loading
  //   const daix = await sf.loadSuperToken("fDAIx");
  //   for (let i = 0; i < subscribersAddress.length; i++) {
  //     console.log(subscribersAddress[i]);
  //     const getSub = await daix.getSubscription({
  //       publisher: connectedContract.address,
  //       indexId: indexValue,
  //       subscriber: subscribersAddress[i],
  //       providerOrSigner: signer,
  //     });
  //     console.log(getSub);
  //     subscribersAddress[i] = {
  //       address: subscribersAddress[i],
  //       units: getSub.units,
  //     };
  //   }
  //   setSubUnitsLoading(false);
  //   // console.log(subscribersAddress);
  //   // console.log(loading);
  //   // setLoading(true);
  // };

  // useEffect(() => {
  //   getSubscriberUnits();
  // }, [indexValue]);

  return (
    <div className="db-sub">
      <h1 className="subscriber-h1">Subscribers</h1>
      <p className="subscriber-p">
        Select an index number and view all the subscribers with their
        units(proportion) regarding that index only.
      </p>
      <div className="distribute-box">
        <div className="subscribers-list-index-input">
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
              <MenuItem disabled value="0">
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
        {/* <h3>Subscriber Address</h3> */}
        {/* <div className="subscriber-input-div">
          <input
            type="text"
            className="subscriber-input-index"
            placeholder="Subscriber Address"   
          />
        </div> */}
        {/* <h3>Unit</h3> */}
        {loadingAnim ? (
          <span className="loader"></span>
        ) : (
          <div style={{ width: "80%" }}>
            <div className="distribute-subscribers-list">
              <table>
                <thead>
                  <tr>
                    <th>Subscribers</th>
                    <th>Units</th>
                    <th>Approved/Pending</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                {!showNewLoading ? (
                  <tbody>
                    {/* ******** table data map ********** */}

                    {!subListLoading ? (
                      subscribersAddress.map((item, key) => {
                        return (
                          <tr key={key}>
                            <td>
                              <div className="blokies-and-address">
                                <Blokies />
                                <span className="subscriber-address">
                                  {/* {item.approved} */}

                                  {item.subscriber.id.substring(0, 8) +
                                    "..." +
                                    item.subscriber.id.substring(
                                      item.subscriber.id.length - 6,
                                      item.subscriber.id.length
                                    )}
                                </span>
                              </div>

                              {/* <Skeleton
                              animation="wave"
                              variant="rounded"
                              sx={{ bgcolor: "grey.100" }}
                            /> */}
                            </td>
                            <td>
                              {item.units}

                              {/* <Skeleton
                              animation="wave"
                              variant="rounded"
                              sx={{ bgcolor: "grey.100" }}
                            /> */}
                            </td>
                            <td>
                              {item.approved === true ? "Approved" : "Pending"}
                            </td>
                            <td>
                              <div className="edit-delete-buttons">
                                <button className="edit-subscriber-button">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="0 0 24 24"
                                    width="24px"
                                    fill="#000000"
                                  >
                                    <path d="M0 0h24v24H0V0z" fill="none" />
                                    <path d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                                  </svg>
                                </button>
                                <button className="delete-subscriber-button">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="0 0 24 24"
                                    width="24px"
                                    fill="#000000"
                                  >
                                    <path
                                      d="M0 0h24v24H0V0z"
                                      fill="none"
                                      opacity=".87"
                                    />
                                    <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm4.3 14.3c-.39.39-1.02.39-1.41 0L12 13.41 9.11 16.3c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 7.7 9.11c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 10.59l2.89-2.89c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={4} style={{ textAlign: "center" }}>
                          {/* <Skeleton
                          animation="wave"
                          variant="rounded"
                          sx={{ bgcolor: "grey.100" }}
                        /> */}
                          {indexValue
                            ? "No Data found"
                            : "Select Index to display list of subscribers here"}
                        </td>
                        {/* <td>
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
                      </td> */}
                      </tr>
                    )}
                  </tbody>
                ) : null}
              </table>
              <div className="inside-subscriber-list"></div>
            </div>
          </div>
        )}
        {/* <div className="distribute-btn">
          <button>Distribute</button>
        </div> */}
      </div>
    </div>
  );
}

export default SubscriberList;
