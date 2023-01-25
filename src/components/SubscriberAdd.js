import React, { useEffect, useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";

import Abi_IDA from "../artifacts/Abi_IDA.json";
import { ethers } from "ethers";
import { createClient } from "urql";
import { useAccount, useProvider, useSigner } from "wagmi";
import { CONTRACT_ADDRESS } from "../config";
import { ConnectButton } from "@rainbow-me/rainbowkit";

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
    const result1 = await c.query(data_).toPromise();
    console.log("finalData");
    // console.log(result1.data.indexes[0].publisher.publishedIndexes);
    let arr = result1.data.indexes[0].publisher.publishedIndexes;
    // console.log(arr);
    if (arr.length > indexArr.length) {
      for (let i = 0; i < arr.length; i++) {
        indexArr.push(arr[i].indexId);
      }
    }
    console.log(indexArr);
    setDataLoaded(true);
  };

  const provider = useProvider();
  const { data: signer } = useSigner();

  const connectedContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    Abi_IDA,
    signer
  );

  // const getIndex = async () => {
  //   try {
  //     const tx = await connectedContract.viewAddressIndex(address);
  //     // console.log(tx);
  //     // console.log(parseInt(tx[0]));
  //     if (tx.length > indexArr.length)
  //       tx.map((item, key) => {
  //         indexArr.push(parseInt(item));
  //         setDataLoaded(true);
  //         return null;
  //       });
  //     // console.log(indexArr);
  //     await tx.wait();
  //     // console.log(receipt);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const addSubscriber = async () => {
  //   // console.log(subscriberDetails.address);
  //   // console.log(subscriberDetails);
  //   // console.log(indexValue);
  //   setLoadingAnim(true);
  //   try {
  //     const tx = await connectedContract.gainShare(
  //       subscriberDetails.address,
  //       subscriberDetails.units,
  //       indexValue
  //     );
  //     await tx.wait();
  //     setLoadingAnim(false);
  //     setBtnContent("Subscriber Added");
  //     setTimeout(() => {
  //       setBtnContent("Add Subscriber");
  //     }, 3000);
  //   } catch (error) {
  //     console.log(error);
  //     setLoadingAnim(false);
  //   }
  // };

  const addSubscriber = async () => {
    setLoadingAnim(true);
    console.log("Inside addSubscriber() function");

    const sf = await Framework.create({
      chainId: 5,
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

      const sign = await createIndexOperation.exec(signer);
      const receipt = await sign.wait(sign);
      if (receipt) {
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

  useEffect(() => {
    // getIndex();
    getIndexes();
  }, []);

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
