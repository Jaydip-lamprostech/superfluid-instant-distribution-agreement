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

function Distribute() {
  const { address, isConnected } = useAccount();

  const [indexValue, setIndexValue] = useState("");
  const [amount, setAmount] = useState();
  const [dataloaded, setDataLoaded] = useState(false);
  const [subscribersAddress, setSubscriberAddress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxToken, setMaxToken] = useState();
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
    const amtToUpgrade = ethers.utils.parseEther(amount.toString());
    console.log(amtToUpgrade);
    try {
      const tx = await connectedContract.distribute(indexValue, amtToUpgrade);
      console.log(tx);
    } catch (err) {
      console.log(err);
    }
  };
  const getFunds = async () => {
    try {
      const tx = await connectedContract.viewAddressStake();
      console.log(tx);
      setMaxToken(parseFloat(tx / Math.pow(10, 18)).toFixed(2));
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
        // const receipt = await tx.wait();
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
      setLoading(true);
      subscribersAddress.splice(0, subscribersAddress.length);
      try {
        const tx = await connectedContract.viewIndexSubscribers(indexValue);
        console.log(tx);
        if (tx.length > subscribersAddress.length)
          tx.map((item, key) => {
            subscribersAddress.push(item);
            return null;
          });
        // console.log(indexArr);
        // await tx.wait();

        // console.log(receipt);
      } catch (error) {
        console.log(error);
      }
    };
    viewSubscribers();
    // setLoading(false);

    getSubscriberUnits();
  }, [indexValue]);

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
    totalUnitsArr.splice(0, totalUnitsArr.length);
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
      if (totalUnitsArr.length < subscribersAddress.length)
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
    setLoading(false);
    console.log(totalUnits);
    console.log(subscribersAddress);
    console.log(loading);
  };

  // useEffect(() => {
  //   if (indexValue > 0) getSubscriberUnits();
  // }, [indexValue]);

  useEffect(() => {
    getFunds();
  });

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
            <h4>Token Balance: {maxToken} Wei</h4>
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

                  {indexValue ? (
                    !loading ? (
                      subscribersAddress.map((item, key) => {
                        return (
                          <tr key={key}>
                            <td>
                              {item.address ? (
                                <div className="blokies-and-address">
                                  <Blokies />
                                  <span className="subscriber-address">
                                    {item.address}
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
                      </tr>
                    )
                  ) : (
                    <tr>
                      <td colSpan={3} style={{ textAlign: "center" }}>
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
              <button onClick={() => distribute()}>Distribute</button>
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
