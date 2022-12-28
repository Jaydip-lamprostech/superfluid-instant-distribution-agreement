import React, { useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import Blokies from "./Blokies";

function SubscriberList({ setInfo, setAdd, setList, setApprove }) {
  const [indexValue, setIndexValue] = useState("");
  // const [amount, setAmount] = useState();

  const handleChange = (e) => {
    setIndexValue(e.target.value);
  };

  return (
    <div className="db-sub">
      <h1 className="subscriber-h1">Subscribers</h1>
      <p className="subscriber-p">
        List of all the subscribers with Unit(proportion) and Index number.
      </p>
      <div className="distribute-box">
        <div className="subscribers-list-index-input">
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
              <MenuItem value={45152}>#45152</MenuItem>
              <MenuItem value={85698}>#85698</MenuItem>
              <MenuItem value={95679}>#95679</MenuItem>
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
        <div className="distribute-subscribers-list">
          <table>
            <thead>
              <tr>
                <th>Subscribers</th>
                <th>Units</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {/* ******** table data map ********** */}
              <tr>
                <td>
                  <div className="blokies-and-address">
                    <Blokies />
                    <span className="subscriber-address">
                      0xeB88DDaEdA2261298F1b740137B2ae35aA42A975
                    </span>
                  </div>
                </td>
                <td>10</td>
                <td>
                  <div className="edit-delete-buttons">
                    <button className="edit-subscriber-button">
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
                        <path d="M0 0h24v24H0V0z" fill="none" opacity=".87" />
                        <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm4.3 14.3c-.39.39-1.02.39-1.41 0L12 13.41 9.11 16.3c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 7.7 9.11c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 10.59l2.89-2.89c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              {/* ******** table data map ********** */}
              <tr>
                <td>
                  <div className="blokies-and-address">
                    <Blokies />
                    <span className="subscriber-address">
                      0xeB88DDaEdA2261298F1b740137B2ae35aA42A975
                    </span>
                  </div>
                </td>
                <td>5</td>
                <td>
                  <div className="edit-delete-buttons">
                    <button className="edit-subscriber-button">
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
                        <path d="M0 0h24v24H0V0z" fill="none" opacity=".87" />
                        <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm4.3 14.3c-.39.39-1.02.39-1.41 0L12 13.41 9.11 16.3c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 7.7 9.11c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 10.59l2.89-2.89c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              {/* ******** table data map ********** */}
            </tbody>
          </table>
          <div className="inside-subscriber-list"></div>
        </div>
        {/* <div className="distribute-btn">
          <button>Distribute</button>
        </div> */}
      </div>
    </div>
  );
}

export default SubscriberList;
