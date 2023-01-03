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
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Skeleton } from "@mui/material";

function Agreements() {
  const { address, isConnected } = useAccount();
  // const [indexValue, setIndexValue] = useState(0);

  const [indexArr, setIndexArr] = useState([]);
  const [subscribersAddress, setSubscriberAddress] = useState([
    // { subscriber: [], sub_units: [] },
  ]);
  // const [dataloaded, setDataLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tokenBalance, setTokenBalance] = useState();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const getIndex = async () => {
    try {
      const tx = await connectedContract.viewAddressIndex(address);
      // console.log(tx);
      // console.log(parseInt(tx[0]));
      if (tx.length > indexArr.length) {
        // tx.map((item, key) => {
        //   indexArr.push(parseInt(item));
        //   subscribersAddress.push({
        //     index: parseInt(item),
        //     subscriber: [],
        //     sub_units: [],
        //   });

        //   return null;
        // });
        var dataCount = 0;

        for (let txn = 0; txn < tx.length; txn++) {
          indexArr.push(parseInt(tx[txn]));
          subscribersAddress.push({
            index: parseInt(tx[txn]),
            subscriber: [],
            sub_units: [],
          });
          dataCount++;
        }

        if (dataCount === tx.length) {
          viewSubscribers();
        }

        console.log(indexArr);
      }
      // console.log(receipt);
    } catch (error) {
      console.log(error);
    } finally {
    }
    // setLoading(true);
  };

  const viewSubscribers = async () => {
    try {
      var dataCount = 0;

      for (let i = 0; i < indexArr.length; i++) {
        const tx = await connectedContract.viewIndexSubscribers(indexArr[i]);
        // console.log(tx);
        // let units;
        if (tx) {
          if (tx.length > subscribersAddress[i].subscriber.length) {
            for (let j = 0; j < tx.length; j++) {
              // await getSubscriberUnits(tx[j], i);
              const sf = await Framework.create({
                chainId: 5,
                provider: provider,
              });
              //daix token loading
              const daix = await sf.loadSuperToken("fDAIx");
              // console.log(indexArr);
              // console.log(subscribersAddress[i]);
              const getSub = await daix.getSubscription({
                publisher: connectedContract.address,
                indexId: indexArr[i],
                subscriber: `${tx[j]}`,
                providerOrSigner: signer,
              });
              console.log(subscribersAddress);
              console.log(getSub.units);
              // if (getSub.units) units = getSub.units;
              // if (subscribersAddress[i].subscriber.length < tx.length)
              if (
                !subscribersAddress[i].subscriber.includes({
                  address: tx[j],
                  units: getSub.units,
                })
              )
                subscribersAddress[i].subscriber.push({
                  address: tx[j],
                  units: getSub.units,
                });
            }
            // tx.map(async (item, key) => {
            //   // subscribersAddress[i].push(item);
            //   ///

            //   await getSubscriberUnits(item, i);
            //   ///
            //   return null;
            // });
          }
        }

        // console.log(indexArr);
        // tx.wait();
        // console.log(receipt);
        // console.log("subscribers");
        console.log(subscribersAddress);
        dataCount++;
        // setLoading(false);
      }
      if (dataCount === indexArr.length) {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFunds = async () => {
    try {
      const tx = await connectedContract.viewAddressStake();
      // console.log(tx);
      setTokenBalance(parseFloat(tx / Math.pow(10, 18)).toFixed(5));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // setLoading(true);

    getIndex();
    // viewSubscribers();
    getFunds();

    // return () => setLoading(true);
  }, []);

  // const getSubscriberUnits = async () => {
  //   // console.log("inside unit function");
  //   // console.log(address);
  //   // console.log(signer);
  //   // console.log(indexValue);
  //   const sf = await Framework.create({
  //     chainId: 5,
  //     provider: provider,
  //   });
  //   //daix token loading
  //   const daix = await sf.loadSuperToken("fDAIx");
  //   // console.log(indexArr);
  //   for (let i = 0; i < indexArr.length; i++) {
  //     // console.log(subscribersAddress[i]);
  //     for (let j = 0; j < subscribersAddress[i].subscriber.length; j++) {
  //       const getSub = await daix.getSubscription({
  //         publisher: connectedContract.address,
  //         indexId: indexArr[i],
  //         subscriber: subscribersAddress[i].subscriber[j],
  //         providerOrSigner: signer,
  //       });
  //       // console.log(getSub.units);
  //       if (!subscribersAddress[i].sub_units.includes(getSub.units))
  //         subscribersAddress[i].sub_units.push(getSub.units);
  //       // subscribersAddress[i][j] = {
  //       //   address: subscribersAddress[i],
  //       //   units: getSub.units,
  //       // };
  //     }
  //     // console.log(subscribersAddress);
  //   }
  //   console.log(subscribersAddress);
  //   // console.log(loading);
  //
  // };

  // useEffect(() => {
  //   // if (indexValue > 0) getSubscriberUnits();
  // }, [indexValue]);

  // }

  if (!isConnected)
    return (
      <div className="db-main">
        <div className="db-sub">
          <h1 className="agreements-h1">Instant Distribution Agreements</h1>
          <p className="agreements-p">
            List of all the IDAs with subscribers, Units(proportion) and Index
            number.
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
  if (isConnected)
    return (
      <div className="db-main">
        <div className="db-sub">
          <h1 className="agreements-h1">Instant Distribution Agreements</h1>
          <p className="agreements-p">
            List of all the IDAs with subscribers, Units(proportion) and Index
            number.
          </p>
          {/* ****************for mapping************** */}

          {!loading ? (
            subscribersAddress.map((item, key) => {
              return (
                <div className="agreement-box" key={key}>
                  {/* <h3>Subscriber Address</h3> */}

                  <div className="agreement-list">
                    <div className="agreement-item-head">
                      <span className="agreement-number-span">
                        Index #
                        <span className="agreement-number">{item.index}</span>
                      </span>
                      <span className="agreement-number-span">
                        Amount -
                        <span className="agreement-number">
                          {parseFloat(tokenBalance).toFixed(2)} Wei
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
                          {subscribersAddress[key].subscriber.length > 0
                            ? subscribersAddress[key].subscriber.map(
                                (item, subkey) => {
                                  return (
                                    <tr key={subkey}>
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
                                        <div className="edit-delete-buttons">
                                          <button
                                            className="edit-subscriber-button"
                                            onClick={() => {
                                              handleOpen();
                                              // setEditSubscriberData({
                                              //   ...editSubscriberData,
                                              //   sub_address:
                                              //     showSubScribers[key].sub_address,
                                              //   unit: showSubScribers[key].unit,
                                              // });
                                            }}
                                          >
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
                                              />
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
                                }
                              )
                            : null}

                          {/* ******** table data map ********** */}
                        </tbody>
                      </table>
                    </div>
                    <div className="agreements-list-buttons">
                      {/* <button className="edit-agreement">Edit</button> */}
                      <button className="distribute-agreement">
                        Distribute
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <div className="agreement-box">
                <div className="agreement-list">
                  <div className="agreement-item-head">
                    <span className="agreement-number-span">
                      {" "}
                      <Skeleton
                        animation="wave"
                        variant="rounded"
                        width="100px"
                        height="30px"
                        sx={{ bgcolor: "grey.100" }}
                      />
                      <span className="agreement-number"></span>
                    </span>
                    <span className="agreement-number-span">
                      {" "}
                      <Skeleton
                        animation="wave"
                        variant="rounded"
                        width="100px"
                        height="30px"
                        sx={{ bgcolor: "grey.100" }}
                      />
                      <span className="agreement-number"></span>
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
                      </tbody>
                    </table>
                  </div>
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    width="100px"
                    height="30px"
                    sx={{ bgcolor: "grey.100", margin: "0 auto" }}
                  />
                </div>
              </div>
            </>
          )}
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
