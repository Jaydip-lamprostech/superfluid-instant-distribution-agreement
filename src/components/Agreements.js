import React from "react";
import "../styles/agreements.scss";

function Agreements() {
  return (
    <div className="db-sub">
      <h1 className="agreements-h1">Instant Distribution Agreements</h1>
      <p className="agreements-p">
        List of all the IDAs with subscribers, Units(proportion) and Index
        number.
      </p>
      <div className="subscriber-add-box-table">
        {/* <h3>Subscriber Address</h3> */}
        <div className="subscriber-list">
          <table className="subscriber-list-table">
            <thead>
              <tr>
                <th>Index</th>
                <th>Subscriber</th>
                <th>Units</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#34567</td>
                <td>
                  <span className="table-subscriber-address">
                    0xeB88DDaEdA2261298F1b740137B2ae35aA42A975
                  </span>
                </td>
                <td>10</td>
                <td>#34567</td>
              </tr>
              <tr>
                <td>#76589</td>
                <td>
                  <span className="table-subscriber-address">
                    0xeB88DDaEdA2261298F1b740137B2ae35aA42A975
                  </span>
                </td>
                <td>5</td>
                <td>#76589</td>
              </tr>
              <tr>
                <td>#69897</td>
                <td>
                  <span className="table-subscriber-address">
                    0xeB88DDaEdA2261298F1b740137B2ae35aA42A975
                  </span>
                </td>
                <td>8</td>
                <td>#69897</td>
              </tr>
              <tr>
                <td>#34567</td>
                <td>
                  <span className="table-subscriber-address">
                    0xeB88DDaEdA2261298F1b740137B2ae35aA42A975
                  </span>
                </td>
                <td>18</td>
                <td>#34567</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="subscriber-add-btn">
          <button>Add Subscriber</button>
        </div>
      </div>
    </div>
  );
}

export default Agreements;
