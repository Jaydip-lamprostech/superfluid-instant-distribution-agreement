import React, { useEffect, useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";

import Abi_IDA from "../artifacts/Abi_IDA.json";
import { ethers } from "ethers";
import { createClient } from "urql";
import { useAccount, useProvider, useSigner } from "wagmi";
import { CONTRACT_ADDRESS } from "../config";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import * as PushAPI from "@pushprotocol/restapi";

import { Framework } from "@superfluid-finance/sdk-core";

function SubscriberAdd() {
  const [indexValue, setIndexValue] = useState("");
  const { address, isConnected } = useAccount();
  const [indexArr, setIndexArr] = useState([]);
  const [dataloaded, setDataLoaded] = useState(false);

  const [subscriberDetails, setSubscriberDetails] = useState({
    address: "",
    units: 0,
  });

  const [loadingAnim, setLoadingAnim] = useState(false);
  const [btnContent, setBtnContent] = useState("Add Subscriber");

  const handleChange = (e) => {
    setIndexValue(e.target.value);
  };

  const getIndexes = async () => {
    const API =
      "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-mumbai";

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
              id
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
    const result1 = await c
      .query(data_, {
        fetchOptionsOverrides: {
          mode: "no-cors",
        },
      })
      .toPromise();
    console.log("finalData");
    // console.log(result1.data.indexes[0].publisher.publishedIndexes);
    let arr;
    if (result1.data.indexes.length > 0) {
      arr = result1.data.indexes[0].publisher.publishedIndexes;
      if (arr.length > indexArr.length) {
        for (let i = 0; i < arr.length; i++) {
          indexArr.push(arr[i].indexId);
        }
      }
      console.log(indexArr);
      setDataLoaded(true);
    }
    // console.log(arr);
  };

  const provider = useProvider();
  const { data: signernew } = useSigner();

  // const connectedContract = new ethers.Contract(
  //   CONTRACT_ADDRESS,
  //   Abi_IDA,
  //   signer
  // );

  const addSubscriber = async () => {
    setLoadingAnim(true);
    console.log("Inside addSubscriber() function");

    const sf = await Framework.create({
      chainId: 80001,
      provider: provider,
    });
    const daix = await sf.loadSuperToken("fDAIx");
    try {
      const createIndexOperation = daix.updateSubscriptionUnits({
        indexId: indexValue,
        subscriber: subscriberDetails.address,
        units: subscriberDetails.units,
      });
      console.log(`Adding ${subscriberDetails.address} as subscriber...`);

      const sign = await createIndexOperation.exec(signernew);
      const receipt = await sign.wait(sign);
      if (receipt) {
        sendMessage(indexValue);
        setLoadingAnim(false);
        setBtnContent("Subscriber Added");
        setTimeout(() => {
          setBtnContent("Add Subscriber");
        }, 3000);
        console.log(
          `subscriber added : ${subscriberDetails.address} with ${subscriberDetails.units} uints at Index ID: ${indexValue}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // push notification

  const PK = `${process.env.REACT_APP_PUSH_CHANNEL_PKEY}`;
  const Pkey = `0x${PK}`;
  const signer = new ethers.Wallet(Pkey);
  console.log(signer);

  // apiResponse?.status === 204, if sent successfully!
  const sendMessage = async (index) => {
    const receiver = document.getElementById("subscriberAdd").value;
    // console.log(receiver);
    // const flow = document.getElementById("flow").value;

    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 3, // target
      identityType: 2, // direct payload
      notification: {
        title: "Superfluid IDA",
        body: "Stream started from contract to your account",
      },
      payload: {
        title: "Superfluid IDA",
        body: `You have been added as a subscriber by ${address}
        on index id -> ${index}  `,
        cta: "",
        img: "",
      },
      recipients: `eip155:5:${receiver}`, // recipient address
      channel: "eip155:5:0x070F992829575477A0E91D9D3e49dCFcd06d3C22", // your channel address
      env: "staging",
    });
    if (apiResponse?.status === 204) {
      console.log("Message sent successfully");
    }
  };

  useEffect(() => {
    // getIndex();
    if (address) getIndexes();
  }, [address]);

  return (
    <div className="db-sub">
      <h1 className="subscriber-h1">Subscriber</h1>
      <p className="subscriber-p">
        Select index number which you have already created and enter recievers
        address and their units.
      </p>
      <div className="subscriber-add-box">
        <FormControl required fullWidth>
          {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
          <Select
            displayEmpty
            id="demo-simple-select"
            value={indexValue}
            onChange={handleChange}
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
        {/* <h3>Subscriber Address</h3> */}
        <div className="subscriber-input-div">
          <input
            type="text"
            className="subscriber-input-index"
            placeholder="Subscriber Address"
            id="subscriberAdd"
            onChange={(e) =>
              setSubscriberDetails({
                ...subscriberDetails,
                address: e.target.value,
              })
            }
          />
        </div>
        {/* <h3>Unit</h3> */}
        <div className="subscriber-input-div">
          <input
            type="number"
            className="subscriber-input-index"
            placeholder="Unit"
            onChange={(e) =>
              setSubscriberDetails({
                ...subscriberDetails,
                units: e.target.value,
              })
            }
          />
        </div>
        <div className="subscriber-add-btn">
          {isConnected ? (
            <button onClick={() => addSubscriber()}>
              {loadingAnim ? <span className="loader"></span> : btnContent}
            </button>
          ) : (
            <div className="connect-wallet ">
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
          )}
        </div>
      </div>
    </div>
  );
}

export default SubscriberAdd;
