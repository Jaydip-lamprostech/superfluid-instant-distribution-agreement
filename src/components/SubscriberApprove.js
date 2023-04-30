import React, { useEffect, useState } from "react";

import Abi_IDA from "../artifacts/Abi_IDA.json";
import { ethers } from "ethers";
import { Framework } from "@superfluid-finance/sdk-core";
import { useAccount, useProvider, useSigner } from "wagmi";
import { createClient } from "urql";
import { FormControl, MenuItem, Select } from "@mui/material";

function SubscriberApprove() {
  const provider = useProvider();
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const [indexValue, setIndexValue] = useState("");
  const [indexNumber, setIndexNumber] = useState();
  const [publisherAddress, setPublisherAddress] = useState();

  const [loadingAnim, setLoadingAnim] = useState(false);
  const [btnContent, setBtnContent] = useState("Approve");
  const [indexArr, setIndexArr] = useState([]);
  const [data, setData] = useState([]);
  const [dataloaded, setDataLoaded] = useState(false);
  const [publisher, setPublisher] = useState();

  const handleChange = (e) => {
    setIndexValue(e.target.value);
  };

  const getIndexes = async () => {
    const API =
      "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-mumbai";

    const data_ = `query MyQuery {
        indexes(
          where: {subscriptions_: {subscriber: "${address.toLowerCase()}"}}
        ) {
          subscriptions(
            where: {subscriber: "${address.toLowerCase()}"}
          ) {
            units
            index {
              publisher {
                id
              }
            }
          }
          indexId
        }
      }`;
    const c = createClient({
      url: API,
    });
    const result1 = await c.query(data_).toPromise();
    // console.log(result1.data);
    console.log("finalData");
    // console.log(result1.data.indexes[0].publisher.publishedIndexes);
    let arr;
    if (result1.data.indexes.length > 0) {
      arr = result1.data.indexes;
      console.log(arr);
      if (arr.length > indexArr.length) {
        for (let i = 0; i < arr.length; i++) {
          indexArr.push(arr[i].indexId);
        }
      }
      if (arr.length > data.length) {
        for (let i = 0; i < arr.length; i++) {
          data.push(arr[i]);
        }
      }
      console.log(indexArr);
      setDataLoaded(true);
    }
    // console.log(arr);
  };

  // const connectedContract = new ethers.Contract(
  //   CONTRACT_ADDRESS,
  //   Abi_IDA,
  //   signer
  // );

  // const approveSubscriber = async () => {
  //   setLoadingAnim(true);
  //   const sf = await Framework.create({
  //     chainId: 5,
  //     provider: provider,
  //   });
  //   const daix = await sf.loadSuperToken("fDAIx");

  //   const subscribeOperation = daix.approveSubscription({
  //     indexId: indexNumber,
  //     publisher: connectedContract.address,
  //   });
  //   try {
  //     const tx = await subscribeOperation.exec(signer);
  //     await tx.wait();
  //     setLoadingAnim(false);
  //     setBtnContent("Approved");
  //     setTimeout(() => {
  //       setIndexNumber("");
  //       setBtnContent("Approve");
  //     }, 3000);
  //     // if (receipt) {
  //     //   console.log("approved!");
  //     // }
  //   } catch (err) {
  //     if (
  //       err.errorObject.errorObject.error.reason ===
  //       "execution reverted: IDA: E_SUBS_APPROVED"
  //     ) {
  //       console.log("shareGainer already approved subscription. moving on ->");
  //     }
  //   }
  // };

  const approveSubscription = async () => {
    setLoadingAnim(true);
    const sf = await Framework.create({
      chainId: 80001,
      provider: provider,
    });

    const daix = await sf.loadSuperToken("fDAIx");
    try {
      console.log(publisher);
      const subscribeOperation = daix.approveSubscription({
        indexId: indexValue.toString(),
        publisher: publisher.toString(),
      });
      const tx = await subscribeOperation.exec(signer);
      const receipt = await tx.wait();
      if (receipt) {
        setLoadingAnim(false);
        setBtnContent("Approved");
        setTimeout(() => {
          setIndexNumber("");
          setBtnContent("Approve");
        }, 3000);
        console.log("approved!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (address) getIndexes();
  }, [address]);

  useEffect(() => {
    if (indexValue) {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        if (indexValue.toString() === data[i].indexId) {
          console.log(true);
          console.log(data[i].subscriptions);
          setPublisher(data[i].subscriptions[0].index.publisher.id);
        }
      }
    }
  }, [indexValue]);

  return (
    <div className="db-sub">
      <h1 className="subscriber-h1">Approve Subscriber</h1>
      <p className="subscriber-p">
        This should be called by the person who has been added as a subscriber
        for someone's index.
      </p>

      {/* <div className="go-back-btn">
<svg
  xmlns="http://www.w3.org/2000/svg"
  height="36px"
  viewBox="0 0 24 24"
  width="36px"
  fill="#000000"
>
  <path d="M0 0h24v24H0V0z" fill="none" />
  <path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z" />
</svg>
</div> */}

      <div className="subscriber-add-box">
        <p>
          This is required to receive token sent by Instant distribution
          agreement.
        </p>
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

        <div className="subscriber-input-div">
          <input
            disabled
            type="text"
            className="subscriber-input-index"
            placeholder={
              publisher ? publisher : "Select index for Publisher Address"
            }
          />
        </div>
        {/* <h3>Subscriber Address</h3> */}
        {/* <div className="subscriber-input-div">
          <input
            type="text"
            className="subscriber-input-index"
            placeholder="Publisher Address"
            onChange={(e) => setPublisherAddress(e.target.value)}
          />
        </div> */}
        {/* <h3>Unit</h3> */}

        <div className="subscriber-add-btn">
          <button onClick={() => approveSubscription()}>
            {loadingAnim ? <span className="loader"></span> : btnContent}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubscriberApprove;
