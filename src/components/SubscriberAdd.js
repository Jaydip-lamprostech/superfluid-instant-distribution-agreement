import React, { useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";

function SubscriberAdd() {
  const [indexValue, setIndexValue] = useState("");

  const handleChange = (e) => {
    setIndexValue(e.target.value);
  };
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
            <MenuItem value={45152}>#45152</MenuItem>
            <MenuItem value={85698}>#85698</MenuItem>
            <MenuItem value={95679}>#95679</MenuItem>
          </Select>
        </FormControl>
        {/* <h3>Subscriber Address</h3> */}
        <div className="subscriber-input-div">
          <input
            type="text"
            className="subscriber-input-index"
            placeholder="Subscriber Address"
          />
        </div>
        {/* <h3>Unit</h3> */}
        <div className="subscriber-input-div">
          <input
            type="text"
            className="subscriber-input-index"
            placeholder="Unit"
          />
        </div>
        <div className="subscriber-add-btn">
          <button>Add Subscriber</button>
        </div>
      </div>
    </div>
  );
}

export default SubscriberAdd;
