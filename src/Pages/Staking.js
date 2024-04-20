import React, { useEffect } from "react";

import { useState } from "react";
import { useSelector } from "react-redux";

const Staking = () => {
  const [tokens, setTokens] = useState(0);
  const [isStake, setIsStake] = useState(true);
  const { user } = useSelector((state) => state.Blockchain);
  useEffect(() => {
    setTokens(0);
  }, [isStake]);

  return (
    <div className="Staking ">
      <div className="StakingHeroSection d-flex align-items-center ">
        <div className="container-lg ">
          <div className="row m-0 w-100 Home_Hero_Section">
            <div className="col-12 col-md-6 p-0 ">
              <h1 className="Home_Hero_Section_Heading mt-2 fw-bold text-white text-uppercase">
                ETH-DRIFT Staking Pool
              </h1>

              <p className="m-0 p-0 my-4 text-white">
                The ETH rewards pool for staking DRIFT tokens will be active for
                30 days from Launch date. Unstaking before 30 day period will
                result in a penalty charge. Once the staking pool has ended,
                users are requested to unstake their tokens and fully claim
                their rewards. Secondary staking pools will be launched after
                30-day staking pool.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-5">
        <div className="container-lg">
          <h4 className="Home_Hero_Section_Heading ">
            Stake $DRIFT, Earn $DRIFT
          </h4>

          <section className="mt-5">
            <div className="row m-0 p-0 ">
              <div className="col-12 p-0 col-md-5 pe-md-2">
                <div
                  className="
              DTSC_Col rounded-4 bg-white  align-items-center p-4"
                >
                  <div className="row  m-0 p-0 pb-3 border-bottom">
                    <div
                      className="
col-12 ps-0 col-sm-6 pe-0 pe-sm-2"
                    >
                      <p
                        className="m-0 text-uppercase"
                        style={{
                          fontSize: 12,
                        }}
                      >
                        remaining claim
                      </p>
                      <p
                        className="
                      DTSC_SubHeading mb-0 text-uppercase fw-bold "
                        style={{ color: "#ff4bae" }}
                      >
                        554564
                      </p>
                    </div>
                    <div
                      className="
col-12 pe-0 col-sm-6 mt-3 mt-sm-0 ps-0 ps-sm-2"
                    >
                      <button className="BtnStyle2 bg-pink fw-bold text-uppercase">
                        Claim reward
                      </button>
                    </div>
                  </div>
                  <div className="row  m-0 p-0 pt-3 ">
                    <div
                      className="
col-12 ps-0 col-sm-6 pe-0 pe-sm-2"
                    >
                      <p
                        className="
                        m-0 text-uppercase "
                        style={{
                          fontSize: 12,
                        }}
                      >
                        Current Price
                      </p>
                      <p
                        className="
                      DTSC_SubHeading mb-0 text-uppercase fw-bold "
                        style={{ color: "#ff4bae" }}
                      >
                        $0.00087
                      </p>
                    </div>
                    <div
                      className="
col-12 col-sm-6 pe-0 ps-0 ps-sm-2 d-flex justify-content-end align-items-end "
                    >
                      <h4
                        className="m-0 p-0 me-2 fw-bold"
                        style={{ color: "#ff4bae" }}
                      >
                        $3.0
                      </h4>
                      <p className="m-0 p-0">3.8%</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 p-0 col-md-7 ps-md-2 mt-3 mt-md-0">
                <div
                  className="
              DTSC_Col rounded-4 bg-white p-4"
                >
                  <div className="row m-0 p-0 border-bottom pb-3">
                    <div
                      className="

                      col-12 ps-0 col-sm-6 pe-0 pe-sm-2"
                    >
                      <p
                        className="
                      m-0 text-uppercase"
                        style={{
                          fontSize: 12,
                        }}
                      >
                        Current Staked Amount
                      </p>
                      <p
                        className="
                      DTSC_SubHeading mb-0 text-uppercase fw-bold "
                        style={{ color: "#ff4bae" }}
                      >
                        {user?.Staked} $Drift
                      </p>
                    </div>
                    <div
                      className="

                      col-12 pe-0 col-sm-6 mt-3 mt-sm-0 ps-0 ps-sm-2"
                    >
                      <p
                        className="
                      m-0 text-uppercase"
                        style={{
                          fontSize: 12,
                        }}
                      >
                        total balance
                      </p>
                      <p
                        className="
                      DTSC_SubHeading mb-0 text-uppercase fw-bold "
                        style={{ color: "#ff4bae" }}
                      >
                        {user?.balance} $Drift
                      </p>
                    </div>
                  </div>
                  <div className="row m-0 p-0 pt-3">
                    <div
                      className="

                      col-12 ps-0 col-sm-6 pe-0 pe-sm-2"
                    >
                      <p
                        className="
                      m-0 text-uppercase"
                        style={{
                          fontSize: 12,
                        }}
                      >
                        Days Remaining
                      </p>
                      <p
                        className="
                        DTSC_SubHeading mb-0 text-uppercase fw-bold"
                        style={{ color: "#ff4bae" }}
                      >
                        5
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="mt-3">
            <div className="row m-0 p-0 ">
              <div className="col-12 p-0 col-md-5 pe-md-2">
                <div className="DTSC_Col StakeToggleContainer rounded-4 bg-white  align-items-center p-4">
                  <div className="d-flex gap-3 p-2 rounded-3 bg-sliver">
                    <button
                      className={`BtnStyle2 shadow-none
                        border-0 fw-bold ${
                          isStake ? "bg-pink " : "bg-transparent  text-dark"
                        }`}
                      onClick={() => setIsStake(true)}
                    >
                      Stake
                    </button>
                    <button
                      className={`BtnStyle2 border-0 shadow-none
                      fw-bold ${
                        !isStake ? "bg-pink" : "bg-transparent  text-dark"
                      }`}
                      onClick={() => setIsStake(false)}
                    >
                      Unstake
                    </button>
                  </div>

                  <div className="StakeToggleContentContainer">
                    {isStake ? (
                      <div className=" StakeContent">
                        <div className="mt-3">
                          <p
                            className="m-0"
                            style={{
                              fontSize: 12,
                            }}
                          >
                            The ETH rewards pool for staking DRIFT tokens will
                            be active for 30 days from Launch date. Unstaking
                            before 30 day period will result in a penalty
                            charge.
                          </p>
                        </div>
                        <div className="mt-3">
                          <div className="input align-items-center">
                            <input
                              className="input-field"
                              type="number"
                              style={{ marginRight: 15 }}
                              value={tokens}
                              onChange={(e) => setTokens(e.target.value)}
                            />
                            <button
                              className="max-btn bg-white"
                              onClick={() => setTokens(user?.Dynamic)}
                            >
                              max
                            </button>
                          </div>
                          <button className="BtnStyle2 bg-pink  fw-bold mt-3 text-uppercase">
                            Stake
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="StakeContent">
                        <div className="mt-3">
                          <p
                            className="m-0"
                            style={{
                              fontSize: 12,
                            }}
                          >
                            The ETH rewards pool for staking DRIFT tokens will
                            be active for 30 days from Launch date. Unstaking
                            before 30 day period will result in a penalty
                            charge.
                          </p>
                        </div>
                        <div className="mt-3">
                          <div className="input align-items-center">
                            <input
                              className="input-field"
                              type="number"
                              style={{ marginRight: 15 }}
                              value={tokens}
                              onChange={(e) => setTokens(e.target.value)}
                            />
                            <button
                              className="max-btn bg-white"
                              onClick={() => setTokens(user?.Staked)}
                            >
                              max
                            </button>
                          </div>
                          <button className="BtnStyle2 bg-pink  fw-bold mt-3 text-uppercase">
                            Unstake
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Staking;
