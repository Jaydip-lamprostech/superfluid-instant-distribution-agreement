import React from "react";
import "../styles/agreements.scss";
import Blokies from "./Blokies";

function Agreements() {
  return (
    <div className="db-main">
      <div className="db-sub">
        <h1 className="agreements-h1">Instant Distribution Agreements</h1>
        <p className="agreements-p">
          List of all the IDAs with subscribers, Units(proportion) and Index
          number.
        </p>
        {/* ****************for mapping************** */}
        <div className="agreement-box">
          {/* <h3>Subscriber Address</h3> */}

          <div className="agreement-list">
            <div className="agreement-item-head">
              <span className="agreement-number-span">
                Index #<span className="agreement-number">48986</span>
              </span>
              <span className="agreement-number-span">
                Amount -<span className="agreement-number">1000 fDAIx</span>
              </span>
            </div>
            <div className="agreement-subscribers">
              <table>
                <thead>
                  <tr>
                    <th>Subscribers</th>
                    <th>Units</th>
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
                  </tr>
                  {/* ******** table data map ********** */}
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
                  </tr>
                  {/* ******** table data map ********** */}
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
                  </tr>
                  {/* ******** table data map ********** */}
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
                  </tr>
                  {/* ******** table data map ********** */}
                </tbody>
              </table>
            </div>
            <div className="agreements-list-buttons">
              <button className="edit-agreement">Edit</button>
              <button className="distribute-agreement">Distribute</button>
            </div>
          </div>
        </div>
        {/* ****************for mapping************** */}
      </div>
    </div>
  );
}

export default Agreements;
