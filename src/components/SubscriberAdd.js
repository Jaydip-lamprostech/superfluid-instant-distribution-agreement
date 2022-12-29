import React, { useEffect, useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";

import Abi_IDA from "../artifacts/Abi_IDA.json";
import { ethers } from "ethers";
import { useAccount, useProvider, useSigner } from "wagmi";
import { CONTRACT_ADDRESS } from "../config";

function SubscriberAdd() {
  const [indexValue, setIndexValue] = useState("");
  const { address } = useAccount();
  const [indexArr, setIndexArr] = useState([]);
  const [dataloaded, setDataLoaded] = useState(false);
  const [subscriberDetails, setSubscriberDetails] = useState({
    address: "",
    units: 0,
  });

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
      console.log(receipt);
    } catch (error) {
      console.log(error);
    }
  };

  const addSubscriber = async () => {
    console.log(subscriberDetails.address);
    console.log(subscriberDetails);
    console.log(indexValue);
    try {
      const tx = await connectedContract.gainShare(
        subscriberDetails.address,
        subscriberDetails.units,
        indexValue
      );
      console.log(tx);
      console.log(parseInt(tx[0]));

      console.log(indexArr);
      const receipt = await tx.wait();
      console.log(receipt);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getIndex();
  });

  return (
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
      <h1 className="subscriber-h1">Subscriber</h1>
      <p className="subscriber-p">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur,
        rem?
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
          <button onClick={() => addSubscriber()}>Add Subscriber</button>
        </div>
      </div>
    </div>
  );
}

export default SubscriberAdd;
