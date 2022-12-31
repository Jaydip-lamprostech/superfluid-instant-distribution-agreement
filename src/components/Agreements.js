import React, { useEffect, useState } from "react";
import "../styles/agreements.scss";
import Backdrop from "@mui/material/Backdrop";
import Blokies from "./Blokies";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import EditSubscriber from "./EditSubscriber";
import { useAccount, useProvider, useSigner } from "wagmi";
import { ethers } from "ethers";

import Abi_IDA from "../artifacts/Abi_IDA.json";
import { Framework } from "@superfluid-finance/sdk-core";
import { CONTRACT_ADDRESS } from "../config";

function Agreements() {
  const { address } = useAccount();
  const [indexValue, setIndexValue] = useState(0);

  const [indexArr, setIndexArr] = useState([]);
  const [subscribersAddress, setSubscriberAddress] = useState([
    { subscriber: [], sub_units: [] },
  ]);
  const [dataloaded, setDataLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tokenBalance, setTokenBalance] = useState();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [showSubScribers, setSubscribers] = useState([
    { sub_address: "0xeb88ddaeda2261298f1b740137b2ae35aa42a975", unit: 10 },
    { sub_address: "0xeb88ddaeda2261298f1b740137b2ae35aa42a975", unit: 5 },
    { sub_address: "0xeb88ddaeda2261298f1b740137b2ae35aa42a975", unit: 5 },
    { sub_address: "0xeb88ddaeda2261298f1b740137b2ae35aa42a975", unit: 10 },
    { sub_address: "0xeb88ddaeda2261298f1b740137b2ae35aa42a975", unit: 5 },
  ]);

  const [editSubscriberData, setEditSubscriberData] = useState({
    index: 48986,
    sub_address: "",
    unit: 0,
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    height: "auto",
    bgcolor: "background.paper",
    boxShadow: "rgba(204, 204, 204, 0.25) 0px 0px 6px 3px",
    borderRadius: "20px",
    p: 4,
  };

  const provider = useProvider();
  const { data: signer } = useSigner();

  const connectedContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    Abi_IDA,
    signer
  );

  const viewSubscribers = async () => {
    try {
      for (let i = 0; i < indexArr.length; i++) {
        const tx = await connectedContract.viewIndexSubscribers(indexArr[i]);
        // console.log(tx);

        if (tx.length > subscribersAddress[i].subscriber.length) {
          if (subscribersAddress.length > 1)
            subscribersAddress.push({ subscriber: [], sub_units: [] });
          tx.map((item, key) => {
            // subscribersAddress[i].push(item);
            subscribersAddress[i].subscriber.push(item);
            return null;
          });
        }
        // console.log(indexArr);
        // tx.wait();
        // console.log(receipt);
        // console.log("subscribers");
        // console.log(subscribersAddress);
      }
      getSubscriberUnits();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // viewSubscribers();
  }, [indexValue, signer]);

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
        viewSubscribers();
        // console.log(receipt);
      } catch (error) {
        console.log(error);
      }
    };
    getIndex();
    getFunds();
  });

  const getSubscriberUnits = async () => {
    console.log("inside unit function");
    // console.log(address);
    // console.log(signer);
    // console.log(indexValue);
    const sf = await Framework.create({
      chainId: 5,
      provider: provider,
    });
    //daix token loading
    const daix = await sf.loadSuperToken("fDAIx");
    console.log(indexArr);
    for (let i = 0; i < indexArr.length; i++) {
      console.log(subscribersAddress[i]);
      for (let j = 0; j < subscribersAddress[i].subscriber.length; j++) {
        const getSub = await daix.getSubscription({
          publisher: connectedContract.address,
          indexId: indexArr[i],
          subscriber: subscribersAddress[i].subscriber[j],
          providerOrSigner: signer,
        });
        // console.log(getSub.units);
        if (!subscribersAddress[i].sub_units.includes(getSub.units))
          subscribersAddress[i].sub_units.push(getSub.units);
        // subscribersAddress[i][j] = {
        //   address: subscribersAddress[i],
        //   units: getSub.units,
        // };
      }
      console.log(subscribersAddress);
    }
    // console.log(subscribersAddress);
    // console.log(loading);
    setLoading(true);
  };

  useEffect(() => {
    // if (indexValue > 0) getSubscriberUnits();
  }, [indexValue]);

  const getFunds = async () => {
    try {
      const tx = await connectedContract.viewAddressStake();
      console.log(tx);
      setTokenBalance(parseFloat(tx / Math.pow(10, 18)).toFixed(5));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="db-main">
      <div className="db-sub">
        <h1 className="agreements-h1">Instant Distribution Agreements</h1>
        <p className="agreements-p">
          List of all the IDAs with subscribers, Units(proportion) and Index
          number.
        </p>
        {/* ****************for mapping************** */}
        {indexArr.length === subscribersAddress.length
          ? indexArr.map((item, key) => {
              return (
                <div className="agreement-box" key={key}>
                  {/* <h3>Subscriber Address</h3> */}

                  <div className="agreement-list">
                    <div className="agreement-item-head">
                      <span className="agreement-number-span">
                        Index #<span className="agreement-number">{item}</span>
                      </span>
                      <span className="agreement-number-span">
                        Amount -
                        <span className="agreement-number">
                          {tokenBalance} Wei
                        </span>
                      </span>
                    </div>
                    <div className="agreement-subscribers">
                      <table>
                        <thead>
                          <tr>
                            <th>Subscribers</th>
                            <th>Units</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* ******** table data map ********** */}
                          {subscribersAddress.map((item, key) => {
                            return (
                              <tr key={key}>
                                <td>
                                  <div className="blokies-and-address">
                                    <Blokies />
                                    <span className="subscriber-address">
                                      {item.subscriber[key]}
                                    </span>
                                  </div>
                                </td>
                                <td>{item.sub_units[key]}</td>
                                <td>
                                  <div className="edit-delete-buttons">
                                    <button
                                      className="edit-subscriber-button"
                                      onClick={() => {
                                        handleOpen();
                                        setEditSubscriberData({
                                          ...editSubscriberData,
                                          sub_address:
                                            showSubScribers[key].sub_address,
                                          unit: showSubScribers[key].unit,
                                        });
                                      }}
                                    >
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
                          })}

                          {/* ******** table data map ********** */}
                        </tbody>
                      </table>
                    </div>
                    <div className="agreements-list-buttons">
                      <button className="edit-agreement">Edit</button>
                      <button className="distribute-agreement">
                        Distribute
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
        {/* ****************for mapping************** */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <EditSubscriber editSubscriberData={editSubscriberData} />
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}

export default Agreements;
