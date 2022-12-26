import { Avatar } from "@mui/material";
import React from "react";

function SubscriberList({ setInfo, setAdd, setList, setApprove }) {
  return (
    <div className="db-sub">
      <h1 className="subscriber-h1">Subscribers</h1>
      <p className="subscriber-p">
        List of all the subscribers with Unit(proportion) and Index number.
      </p>
      <div className="subscriber-add-box-table">
        {/* <h3>Subscriber Address</h3> */}
        <div className="subscriber-list">
          <table className="subscriber-list-table">
            <tr>
              <th>Subscriber</th>
              <th>Unit</th>
              <th>IDA index</th>
            </tr>
            <tr>
              <td>
                <span className="table-subscriber-address">
                  0xeB88DDaEdA2261298F1b740137B2ae35aA42A975
                </span>
              </td>
              <td>Germany</td>
              <td>#34567</td>
            </tr>
            <tr>
              <td>
                <span className="table-subscriber-address">
                  0xeB88DDaEdA2261298F1b740137B2ae35aA42A975
                </span>
              </td>
              <td>Mexico</td>
              <td>#34567</td>
            </tr>
          </table>
        </div>
        <div className="subscriber-add-btn">
          <button>Add Subscriber</button>
        </div>
      </div>
    </div>
  );
}

export default SubscriberList;
