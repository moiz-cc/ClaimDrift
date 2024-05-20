import React from "react";

const CrossSwap = () => {
  return (
    <div className="CrossSwap">
      <div className="CrossSwapSection">
        <div className="CrossSwapSection_Container m-auto container-lg">
          <div className="d-flex align-items-center justify-content-between gap-2">
            <h1>Cross Swap</h1>
            <p>Recent Transactions</p>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                Card subtitle
              </h6>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="card-link">
                Card link
              </a>
              <a href="#" className="card-link">
                Another link
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrossSwap;
