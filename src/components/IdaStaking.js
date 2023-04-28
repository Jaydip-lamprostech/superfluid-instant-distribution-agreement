import React from "react";
import coin from "../assets/coin.png";
import "../styles/idastaking.scss";
import {
  Box,
  Button,
  Modal,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

function IdaStaking() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
    <div className="home">
      <div className="first-section">
        <div className="banner">
          <div className="banner-inside-1">
            <h1>Publish Token</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto,
              sunt?
            </p>
            <button onClick={handleOpen}>Publish Token</button>
          </div>
          <div className="banner-inside-2">
            <img src={coin} alt="coin" />
          </div>
        </div>
      </div>
      <div className="second-section"></div>
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
            Publish Token
          </Typography>{" "}
          <div
            id="modal-modal-description"
            style={{ padding: "1.5rem", textAlign: "center" }}
          >
            <div className="publish-token-inputs">
              <TextField
                // error
                id="outlined-error-helper-text"
                label="Token Name"
                // defaultValue="Hello World"
                // helperText="Incorrect entry."
                fullWidth
              />
            </div>
            <div className="publish-token-inputs">
              <TextField
                // error
                id="outlined-error-helper-text"
                label="Token Address"
                // defaultValue="Hello World"
                // helperText="Incorrect entry."
                fullWidth
              />
            </div>
            <div className="publish-token-inputs">
              <TextField
                // error
                id="outlined-error-helper-text"
                label="Token Amount"
                // defaultValue="Hello World"
                // helperText="Incorrect entry."
                fullWidth
              />
            </div>
            <div className="date-inputs">
              <div className="start-date">
                <TextField
                  id="date"
                  label="Start Date"
                  type="date"
                  // defaultValue="2017-05-24"
                  // sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              </div>
              <div className="end-date">
                <TextField
                  id="date"
                  label="End Date"
                  type="date"
                  // defaultValue="2017-05-24"
                  // sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              </div>
            </div>
            <button className="publish-token">Publish</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default IdaStaking;
