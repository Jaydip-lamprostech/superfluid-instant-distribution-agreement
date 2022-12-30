import React, { useEffect, useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import "../styles/distribute.scss";
import Blokies from "./Blokies";

import Abi_IDA from "../artifacts/Abi_IDA.json";
import { ethers } from "ethers";
import { Framework } from "@superfluid-finance/sdk-core";
import { useAccount, useProvider, useSigner } from "wagmi";
import { CONTRACT_ADDRESS } from "../config";

function Distribute() {
  const { address } = useAccount();

  const [indexValue, setIndexValue] = useState("");
  const [amount, setAmount] = useState();
  const [dataloaded, setDataLoaded] = useState(false);
  const [subscribersAddress, setSubscriberAddress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalUnits, setTotalUnits] = useState(0);
  // let totalUnits = 0;
  const [totalUnitsArr, setTotalUnitsArr] = useState([]);

  // let totalUnits = 0;

  const [indexArr, setIndexArr] = useState([]);

  const handleChange = (e) => {
    setIndexValue(e.target.value);
  };

  const provider = useProvider();
  const { data: signer } = useSigner();

  const connectedContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    Abi_IDA,
    signer
  );

  const distribute = async () => {
    try {
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const connectedContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      Abi_IDA,
      signer
    );
    const getIndex = async () => {
      try {
        const tx = await connectedContract.viewAddressIndex(address);
        console.log(tx);
        console.log(parseInt(tx[0]));
        if (tx.length > indexArr.length)
          tx.map((item, key) => {
            indexArr.push(parseInt(item));
            setDataLoaded(true);
            return null;
          });
        console.log(indexArr);
        const receipt = await tx.wait();
        // console.log(receipt);
      } catch (error) {
        console.log(error);
      }
    };
    getIndex();
  });

  useEffect(() => {
    const connectedContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      Abi_IDA,
      signer
    );
    const viewSubscribers = async () => {
      try {
        const tx = await connectedContract.viewIndexSubscribers(indexValue);
        console.log(tx);
        if (tx.length > subscribersAddress.length)
          tx.map((item, key) => {
            subscribersAddress.push(item);
            return null;
          });
        // console.log(indexArr);
        const receipt = await tx.wait();
        console.log(receipt);
      } catch (error) {
        console.log(error);
      }
    };
    viewSubscribers();
  }, [indexValue, signer, subscribersAddress]);

  const getSubscriberUnits = async () => {
    console.log(address);
    console.log(signer);
    console.log(indexValue);
    const sf = await Framework.create({
      chainId: 5,
      provider: provider,
    });
    //daix token loading
    const daix = await sf.loadSuperToken("fDAIx");

    for (let i = 0; i < subscribersAddress.length; i++) {
      console.log(subscribersAddress[i]);
      const getSub = await daix.getSubscription({
        publisher: connectedContract.address,
        indexId: indexValue,
        subscriber: subscribersAddress[i],
        providerOrSigner: signer,
      });
      console.log(getSub);
      // totalUnits += parseInt(getSub.units);
      // let tempUnit = parseFloat(getSub.units);
      totalUnitsArr.push(parseInt(getSub.units));
      // console.log(tempUnit);
      // setTotalUnits(totalUnits + tempUnit);
      console.log(totalUnitsArr);

      subscribersAddress[i] = {
        address: subscribersAddress[i],
        units: getSub.units,
      };
    }
    let sum = 0;
    totalUnitsArr.forEach((item) => {
      sum += item;
    });
    setTotalUnits(sum);
    console.log(totalUnits);
    console.log(subscribersAddress);
    console.log(loading);
    setLoading(false);
  };

  useEffect(() => {
    if (indexValue > 0) getSubscriberUnits();
  }, [indexValue]);

  return (
    <div className="db-main">
      <div className="db-sub">
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
          <div className="subscriber-input-div">
            <input
              type="number"
              className="subscriber-input-index"
              placeholder="Enter Token"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <h2 className="distribute-h2">Distribution</h2>
          <div className="distribute-subscribers-list">
            <table>
              <thead>
                <tr>
                  <th>Subscribers</th>
                  <th>Units</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {/* ******** table data map ********** */}
                {!loading
                  ? subscribersAddress.map((item, key) => {
                      return (
                        <tr key={key}>
                          <td>
                            <div className="blokies-and-address">
                              <Blokies />
                              <span className="subscriber-address">
                                {item.address}
                              </span>
                            </div>
                          </td>
                          <td>{item.units}</td>
                          <td>
                            {/* {totalUnits} */}
                            {amount
                              ? parseFloat(
                                  (amount / totalUnits) * item.units
                                ).toFixed(2)
                              : "-"}
                          </td>
                        </tr>
                      );
                    })
                  : null}
                {/* ******** table data map ********** */}

                {/* ******** table data map ********** */}
              </tbody>
            </table>
            <div className="inside-subscriber-list"></div>
          </div>
          <div className="distribute-btn">
            <button>Distribute</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Distribute;
