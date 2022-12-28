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
                    <th></th>
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
