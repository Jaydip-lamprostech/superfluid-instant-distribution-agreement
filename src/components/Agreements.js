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

import { Framework } from "@superfluid-finance/sdk-core";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Skeleton } from "@mui/material";
import { createClient } from "urql";
import Web3 from "web3";

function Agreements({ setAgreement, setDistribute, setIndex }) {
  const { address, isConnected } = useAccount();
  // const [indexValue, setIndexValue] = useState(0);

  const [indexArr, setIndexArr] = useState([]);
  const [subscribersAddress, setSubscriberAddress] = useState([
    // { subscriber: [], sub_units: [] },
  ]);
  // const [dataloaded, setDataLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tokenBalance, setTokenBalance] = useState();
  const [btnContent, setBtnContent] = useState("Distribute");
  const [loadingAnim, setLoadingAnim] = useState(false);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [editSubscriberData, setEditSubscriberData] = useState({
    index: "",
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
  const [temp, setTemp] = useState([]);
  const [dataloaded, setDataLoaded] = useState(false);
  const [indexValue, setIndexValue] = useState("");

  // const getFunds = async () => {
  //   try {

  //     const tx = await connectedContract.viewAddressStake();
  //     // console.log(tx);
  //     setTokenBalance(parseFloat(tx / Math.pow(10, 18)).toFixed(5));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const getIndexes = async () => {
    const API =
      "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-goerli";

    const data_ = `
    query {
      indexes(
        where: {publisher_: {id: "${address.toLowerCase()}"}}
        
      ) {
        publisher {
          id
          publishedIndexes(orderDirection: desc, orderBy: createdAtTimestamp) {
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
    console.log(arr);
    if (arr.length > indexArr.length) {
      for (let i = 0; i < arr.length; i++) {
        indexArr.push(arr[i]);
      }
    }

    // console.log(indexArr);
    setDataLoaded(true);
  };

  useEffect(() => {
    if (address) getIndexes();
    // getIndexData();
  }, [address]);

  const deleteSubscription = async (index, subAddress) => {
    const sf = await Framework.create({
      chainId: 80001,
      provider: provider,
    });

    const daix = await sf.loadSuperToken("fDAIx");
    try {
      const subscribeOperation = daix.deleteSubscription({
        indexId: index.toString(),
        subscriber: subAddress.toString(),
        publisher: address,
      });
      const tx = await subscribeOperation.exec(signer);
      const receipt = await tx.wait();
      if (receipt) {
        console.log("SUBSCRIBER DELETED!");
      }
    } catch (err) {
      console.log(err);
    }
  };

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

          {dataloaded ? (
            indexArr.map((item, key) => {
              return (
                <div className="agreement-box" key={key}>
                  {/* <h3>Subscriber Address</h3> */}

                  <div className="agreement-list">
                    <div className="agreement-item-head">
                      <span className="agreement-number-span">
                        Index #
                        <span className="agreement-number">{item.indexId}</span>
                      </span>
                      <span className="agreement-number-span">
                        Amount -
                        <span className="agreement-number">
                          {parseFloat(
                            Web3.utils.fromWei(`${item.indexValue}`, "ether")
                          ).toFixed(4)}{" "}
                          fDAIx
                        </span>
                      </span>
                    </div>
                    <div className="agreement-subscribers">
                      <table>
                        <thead>
                          <tr>
                            <th>Subscribers</th>
                            <th>Approval</th>
                            <th>Units</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* ******** table data map ********** */}
                          {item.subscriptions.length > 0 ? (
                            item.subscriptions.map((i, subkey) => {
                              return (
                                <tr key={subkey}>
                                  <td>
                                    <div className="blokies-and-address">
                                      <Blokies />
                                      <span className="subscriber-address">
                                        {i.subscriber.id.substring(0, 8) +
                                          "..." +
                                          i.subscriber.id.substring(
                                            i.subscriber.id.length - 6,
                                            i.subscriber.id.length
                                          )}
                                      </span>
                                    </div>
                                  </td>
                                  <td>
                                    {i.approved === false
                                      ? "pending"
                                      : "Approved"}
                                  </td>
                                  <td>{i.units}</td>
                                  <td>
                                    <div className="edit-delete-buttons">
                                      <button
                                        className="edit-subscriber-button"
                                        onClick={() => {
                                          handleOpen();
                                          setEditSubscriberData({
                                            ...editSubscriberData,
                                            sub_address: i.subscriber.id,
                                            unit: i.units,
                                            index: item.indexId,
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
                                          <path
                                            d="M0 0h24v24H0V0z"
                                            fill="none"
                                          />
                                          <path d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                                        </svg>
                                      </button>
                                      <button
                                        className="delete-subscriber-button"
                                        onClick={() =>
                                          deleteSubscription(
                                            item.indexId,
                                            i.subscriber.id
                                          )
                                        }
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
                              <td colSpan={3}>
                                You don't have any subscribers in this index
                              </td>
                            </tr>
                          )}

                          {/* ******** table data map ********** */}
                        </tbody>
                      </table>
                    </div>
                    <div className="agreements-list-buttons">
                      {/* <button className="edit-agreement">Edit</button> */}
                      <button
                        className="distribute-agreement"
                        onClick={() => {
                          setIndex(item.indexId);
                          setAgreement(false);
                          setDistribute(true);
                        }}
                      >
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
