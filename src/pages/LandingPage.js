import React, { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import "../styles/landingpage.scss";
import logo from "../assets/superfluid-logo-dark.svg";
import Dashboard from "../components/Dashboard";
import IDAIndex from "../components/IDAIndex";
import Subscriber from "../components/Subscriber";
import Distribute from "../components/Distribute";
import Agreements from "../components/Agreements";
import { Box, Button, Modal, Skeleton, Typography } from "@mui/material";
import { useAccount, useSigner } from "wagmi";
import Cookies from "universal-cookie";
import * as PushAPI from "@pushprotocol/restapi";

function LandingPage() {
  const cookies = new Cookies();

  const [index, setIndex] = useState();
  const [showDashboard, setDashboard] = useState(true);
  const [showIDA, setIDA] = useState(false);
  const [showSubscriber, setSubscriber] = useState(false);
  const [showAgreement, setAgreement] = useState(false);
  const [showDistribute, setDistribute] = useState(false);
  const { data: signer } = useSigner();
  const [open, setOpen] = useState(false);
  const [showOpted, setOpted] = useState(false);
  const { address, isConnected } = useAccount();
  const [showPushNotifications, setPushNotifications] = useState([]);
  const [showNewNotification, setNewNotification] = useState(false);
  const [notificationNumber, setnotificationNumber] = useState(0);
  const [showDisplayNotification, setDisplayNotification] = useState(false);

  const handleOpen = () => {
    setDisplayNotification(true);
    setnotificationNumber(0);
    cookies.set("notificationCount", 0);
    setNewNotification(false);
    setOpen(true);
    // notifi();
  };
  const handleClose = () => {
    setOpen(false);
    setnotificationNumber(0);
    cookies.set("notificationCount", 0);
    setNewNotification(false);
    setDisplayNotification(false);
  };

  const optIn = async () => {
    await PushAPI.channels.subscribe({
      signer: signer,
      channelAddress: "eip155:5:0x070F992829575477A0E91D9D3e49dCFcd06d3C22", // channel address in CAIP
      userAddress: `eip155:5:${address}`, // user address in CAIP
      onSuccess: () => {
        console.log("opt in success");
      },
      onError: () => {
        console.error("opt in error");
      },
      env: "staging",
    });
  };

  const optOut = async () => {
    await PushAPI.channels.unsubscribe({
      signer: signer,
      channelAddress: "eip155:5:0x070F992829575477A0E91D9D3e49dCFcd06d3C22", // channel address in CAIP
      userAddress: `eip155:5:${address}`, // user address in CAIP
      onSuccess: () => {
        console.log("opt out success");
      },
      onError: () => {
        console.error("opt out error");
      },
      env: "staging",
    });
  };

  useEffect(() => {
    console.log(cookies.get("notificationCount"));
    if (address) {
      const timeInterval = setInterval(async () => {
        console.log("timer");
        const subscriptions = await PushAPI.user.getSubscriptions({
          user: `eip155:5:${address}`, // user address in CAIP
          env: "staging",
        });
        if (subscriptions.length === 0) {
          setOpted(false);
        }
        for (let i = 0; i < subscriptions.length; i++) {
          if (
            subscriptions[i].channel ===
            "0x070F992829575477A0E91D9D3e49dCFcd06d3C22"
          ) {
            console.log("subscribed");
            setOpted(true);
          }
        }
        console.log(subscriptions);
        const notifications = await PushAPI.user.getFeeds({
          user: `eip155:5:${address}`, // user address in CAIP
          env: "staging",
          limit: 100,
        });
        console.log(notifications);
        // for (let i = 0; i < notifications.length; i++) {
        //   if(notifications[i].app !== "")
        // }
        // if (
        //   cookies.get("notificationCount") !==
        //   notifications.length - showPushNotifications.length
        // ) {
        //   cookies.set(
        //     "notificationCount",
        //     notifications.length - showPushNotifications.length
        //   );
        // }

        if (notifications.length > showPushNotifications.length) {
          setNewNotification(true);
          cookies.set(
            "notificationCount",
            notifications.length - showPushNotifications.length
          );
          showPushNotifications.splice(0, showPushNotifications.length);
          for (let i = 0; i < notifications.length; i++) {
            // if (notifications[i].app === "Money-Router")
            showPushNotifications.push(notifications[i]);
          }
          // if (showPushNotifications.length === notifications.length) {
          //   setDisplayNotification(true);
          // }

          setnotificationNumber(cookies.get("notificationCount"));
        }

        // console.log(showPushNotifications);
        // setPushNotifications(showPushNotifications);
      }, 5000);
      return () => clearInterval(timeInterval);
    }
  }, [address]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50vw",
    bgcolor: "background.paper",
    borderRadius: "20px",
    boxShadow: 24,
    p: 0,
    paddingBottom: "32px",
    maxHeight: "70vh",
    overflow: "auto",
    overflowX: "hidden",
    maxWidth: "700px",
  };

  return (
    <div className="main">
      <div className="main-left">
        <div className="left-logo-main">
          <div className="left-logo">
            <img className="logo" src={logo} alt="superfluid logo" />
            {/* <h1>SUPER PAY</h1> */}
          </div>
        </div>
        <ul className="left-ul">
          <div
            className={showDashboard ? "left-ul-link active" : "left-ul-link"}
            onClick={() => {
              setDashboard(true);
              setIDA(false);
              setSubscriber(false);
              setAgreement(false);
              setDistribute(false);
            }}
          >
            <div className="link-icon">
              <svg
                className="icon"
                xmlns="http://www.w3.org/2000/svg"
                enableBackground="new 0 0 24 24"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <rect fill="none" height="24" width="24" />
                <path d="M9,21H5c-1.1,0-2-0.9-2-2V5c0-1.1,0.9-2,2-2h4c1.1,0,2,0.9,2,2v14C11,20.1,10.1,21,9,21z M15,21h4c1.1,0,2-0.9,2-2v-5 c0-1.1-0.9-2-2-2h-4c-1.1,0-2,0.9-2,2v5C13,20.1,13.9,21,15,21z M21,8V5c0-1.1-0.9-2-2-2h-4c-1.1,0-2,0.9-2,2v3c0,1.1,0.9,2,2,2h4 C20.1,10,21,9.1,21,8z" />
              </svg>
            </div>
            <div className="link-text selected">Dashboard</div>
          </div>
          <div
            className={showIDA ? "left-ul-link active" : "left-ul-link"}
            onClick={() => {
              setDashboard(false);
              setIDA(true);
              setSubscriber(false);
              setAgreement(false);
              setDistribute(false);
            }}
          >
            <div className="link-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 11h-3v3c0 .55-.45 1-1 1s-1-.45-1-1v-3H8c-.55 0-1-.45-1-1s.45-1 1-1h3V8c0-.55.45-1 1-1s1 .45 1 1v3h3c.55 0 1 .45 1 1s-.45 1-1 1z" />
              </svg>
            </div>
            <div className="link-text">IDA Index</div>
          </div>
          <div
            className={showSubscriber ? "left-ul-link active" : "left-ul-link"}
            onClick={() => {
              setDashboard(false);
              setIDA(false);
              setSubscriber(true);
              setAgreement(false);
              setDistribute(false);
            }}
          >
            <div className="link-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05.02.01.03.03.04.04 1.14.83 1.93 1.94 1.93 3.41V18c0 .35-.07.69-.18 1H22c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
            </div>
            <div className="link-text">Subscriber</div>
          </div>
          <div
            className={showAgreement ? "left-ul-link active" : "left-ul-link"}
            onClick={() => {
              setDashboard(false);
              setIDA(false);
              setSubscriber(false);
              setAgreement(true);
              setDistribute(false);
            }}
          >
            <div className="link-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M2 21h10c.55 0 1 .45 1 1s-.45 1-1 1H2c-.55 0-1-.45-1-1s.45-1 1-1zM5.24 8.07l2.83-2.83L20.8 17.97c.78.78.78 2.05 0 2.83-.78.78-2.05.78-2.83 0L5.24 8.07zm8.49-5.66l2.83 2.83c.78.78.78 2.05 0 2.83l-1.42 1.42-5.65-5.66 1.41-1.41c.78-.79 2.05-.79 2.83-.01zm-9.9 7.07l5.66 5.66-1.41 1.41c-.78.78-2.05.78-2.83 0l-2.83-2.83c-.78-.78-.78-2.05 0-2.83l1.41-1.41z" />
              </svg>
            </div>
            <div className="link-text selected">Agreements</div>
          </div>
          <div
            className={showDistribute ? "left-ul-link active" : "left-ul-link"}
            onClick={() => {
              setDashboard(false);
              setIDA(false);
              setSubscriber(false);
              setAgreement(false);
              setDistribute(true);
            }}
          >
            <div className="link-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enableBackground="new 0 0 24 24"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <rect fill="none" height="24" width="24" />
                <path d="M17,11h3c1.11,0,2-0.9,2-2V5c0-1.11-0.9-2-2-2h-3c-1.11,0-2,0.9-2,2v1H9.01V5c0-1.11-0.9-2-2-2H4C2.9,3,2,3.9,2,5v4 c0,1.11,0.9,2,2,2h3c1.11,0,2-0.9,2-2V8H11v7.01c0,1.65,1.34,2.99,2.99,2.99H15v1c0,1.11,0.9,2,2,2h3c1.11,0,2-0.9,2-2v-4 c0-1.11-0.9-2-2-2h-3c-1.11,0-2,0.9-2,2v1h-1.01C13.45,16,13,15.55,13,15.01V8h2v1C15,10.1,15.9,11,17,11z" />
              </svg>
            </div>
            <div className="link-text">Distribute</div>
          </div>
        </ul>
      </div>
      <div className="main-right">
        <div className="right-header-parent">
          <header className="right-header">
            {isConnected ? (
              <Button onClick={handleOpen} className="notification-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-1.29 1.29c-.63.63-.19 1.71.7 1.71h13.17c.89 0 1.34-1.08.71-1.71L18 16z" />
                </svg>
                {showNewNotification ? (
                  <span className="red-dot">
                    {notificationNumber > 0 ? notificationNumber : null}
                  </span>
                ) : null}
              </Button>
            ) : null}

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
          </header>
        </div>
        <div className="inside-main-right">
          {showDashboard ? (
            <Dashboard />
          ) : showIDA ? (
            <IDAIndex setIDA={setIDA} setSubscriber={setSubscriber} />
          ) : showSubscriber ? (
            <Subscriber />
          ) : showAgreement ? (
            <Agreements
              setAgreement={setAgreement}
              setDistribute={setDistribute}
              setIndex={setIndex}
            />
          ) : showDistribute ? (
            <Distribute index={index} />
          ) : null}
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{
              position: "sticky",
              top: "0",
              backgroundColor: "#f3f4f6",
              padding: "20px 20px",
              margin: "0px",
              fontWeight: 600,
            }}
          >
            Notifications
            {showOpted === true ? (
              <button onClick={() => optOut()} className="push-btns">
                Opt Out
              </button>
            ) : showOpted === false ? (
              <button onClick={() => optIn()} className="push-btns">
                Opt IN
              </button>
            ) : (
              <Skeleton
                animation="wave"
                variant="rounded"
                sx={{ bgcolor: "grey.100" }}
              />
            )}
          </Typography>{" "}
          <div
            id="modal-modal-description"
            style={{ marginTop: "20px", padding: "10px" }}
          >
            {showDisplayNotification &&
              showPushNotifications.length > 0 &&
              showOpted === true &&
              showPushNotifications.map((item, key) => {
                return (
                  <div
                    style={{
                      border: "1px solid #10bb35aa",
                      margin: "10px 0px",
                      padding: "10px",
                      borderRadius: "10px",
                    }}
                    key={key}
                  >
                    <h4>{item.title} </h4>
                    <p>{item.message}</p>
                  </div>
                );
              })}
            {!showOpted ? (
              <div
                style={{
                  border: "1px solid #10bb35aa",
                  margin: "10px 0px",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <h4>Opt In Superfluid IDA channel to get notifications </h4>
                <p>
                  Channel address - 0x070F992829575477A0E91D9D3e49dCFcd06d3C22{" "}
                </p>
              </div>
            ) : null}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default LandingPage;
