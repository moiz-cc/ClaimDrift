import React, { useEffect } from "react";

import upperFrame from "../Assets/Images/Vector 3.svg";
import bottomFrame from "../Assets/Images/Vector 4.svg";
import union from "../Assets/Images/Union.svg";
import line from "../Assets/Images/Vector 4 (2).svg";
import phase1 from "../Assets/Images/Group 9 (2).svg";
import phase2 from "../Assets/Images/Group 10 (2).svg";
import plus from "../Assets/Images/Group 61.svg";
import driftLogo from "../Assets/Images/Drift Logo Spin.svg";
import { Link } from "react-router-dom";

function Utilities() {
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="Utilities">
      <div className="UtilitiesHeroSection text-white  d-flex flex-column align-items-center w-100 justify-content-center">
        <div className="container-lg">
          <section className=" d-flex justify-content-between flex-column align-items-center ">
            <div className="row m-0 w-100 Home_Hero_Section">
              <div className="col-12 col-md-6 p-0 pe-md-3 d-flex flex-column p-0 justify-content-center">
                <p className="Home_Hero_Section_SubHeading fw-bold text-uppercase mb-0">
                  A STUDIO TOKEN
                </p>
                <h1 className="Home_Hero_Section_Heading mt-2 fw-bold text-white">
                  WITH FRINGE BENEFITS
                </h1>

                <p className="m-0 p-0 my-4 text-white">
                  Game Volume Strengthens token LP, token volume increases game
                  payout potential. Speculation isn’t punished, because we
                  insulate the token price action from any in-game value, and we
                  don’t directly incorporate the studio token into the game.
                </p>

                <Link to={"/"}>
                  <button
                    className="pinkBtn BtnStyle1"
                    // onClick={() => scroll()}
                    style={{ width: "max-content" }}
                  >
                    Stake Drift
                  </button>
                </Link>
              </div>
              <div className="col-12 mt-5 sm-mt-4 p-0 col-md-6 ps-md-3 mt-md-0 d-flex align-items-center justify-content-center">
                <img alt="" src={driftLogo} className="img-fluid"></img>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="container-lg">
        <div className="Utilities_Hero_Container">
          <div className="mt-5 d-flex flex-column flex-lg-row">
            <div className=" Utilities_Col bg-white w-100 rounded-4 me-0 me-lg-5">
              <div className="d-flex flex-column flex-sm-row  align-items-center justify-content-center text-center text-sm-start">
                <div className="mt-3 mt-sm-0">
                  <p className="DTSC_Heading Policy_Heading mb-0  fw-bolder text-uppercase text-center">
                    Hodl
                  </p>
                  <div className="d-flex mt-3 flex-column flex-sm-row">
                    <p className="Utilities_Col_Heading p-0 py-1 px-3 m-0 me-0 mb-2 rounded-1 text-center me-sm-3 mb-sm-0">
                      Buy
                    </p>

                    <p className="Utilities_Col_Heading p-0 py-1 px-3 m-0 me-0 mb-2 rounded-1 text-center me-sm-3 mb-sm-0">
                      Stake for ETH
                    </p>

                    <p className="Utilities_Col_Heading p-0 py-1 px-3 m-0 rounded-1 text-center">
                      In-Game Perks
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="  Utilities_Col bg-white w-100 rounded-4 mt-3 mt-lg-0">
              <div className="d-flex flex-column flex-sm-row  align-items-center justify-content-center text-center text-sm-start">
                <div className="mt-3 mt-sm-0">
                  <p className="DTSC_Heading Policy_Heading mb-0  fw-bolder text-uppercase text-center">
                    Speculate
                  </p>
                  <div className="d-flex mt-3 flex-column flex-sm-row">
                    <p className="Utilities_Col_Heading p-0 py-1 px-3 m-0 me-0 mb-2 rounded-1 text-center me-sm-3 mb-sm-0">
                      Bring Tax Money
                    </p>

                    <p className="Utilities_Col_Heading p-0 py-1 px-3 m-0 me-0 mb-2 rounded-1 text-center me-sm-3 mb-sm-0">
                      Earn From Potential Token Growth
                    </p>

                    <p className="Utilities_Col_Heading p-0 py-1 px-3 m-0 rounded-1 text-center">
                      Market Make
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Revenue_Container mt-5 d-flex flex-column align-items-center pb-5">
          <h2 className="DTSC_Heading text-uppercase text-center mb-0">
            revenue
          </h2>
          <img alt="" className="Breakdown_image mt-2" src={upperFrame} />
          <div className="Revenue_Section_Row d-flex justify-content-between flex-column flex-md-row my-3 my-md-0">
            <div className="Revenue_Col bg-white rounded-4 position-relative  mb-3 mb-md-0  text-center">
              <img
                alt=""
                src={plus}
                style={{ position: "absolute", top: -10, right: -10 }}
              />
              <p className="Revenue_Col_Heading mb-0 fw-bold">Speculators</p>
            </div>
            <div className="Revenue_Col bg-white rounded-4 position-relative mb-3 mb-md-0 text-center">
              <img
                alt=""
                src={plus}
                style={{ position: "absolute", top: -10, right: -10 }}
              />
              <p className="Revenue_Col_Heading mb-0 fw-bold">Tournaments</p>
            </div>
            <div className="Revenue_Col bg-white rounded-4 position-relative mb-3 mb-md-0 text-center">
              <img
                alt=""
                src={plus}
                style={{ position: "absolute", top: -10, right: -10 }}
              />
              <p className="Revenue_Col_Heading mb-0 fw-bold">Advertising</p>
            </div>
            <div className="Revenue_Col bg-white rounded-4 position-relative text-center">
              <img
                alt=""
                src={plus}
                style={{ position: "absolute", top: -10, right: -10 }}
              />
              <p className="Revenue_Col_Heading mb-0 fw-bold">Partnerships</p>
            </div>
          </div>
          <img alt="" src={bottomFrame} className="Breakdown_image mb-2" />

          <div className="position-relative">
            <img alt="" src={union} className="Revenue_Section_Image" />
            <p className="text-white position-absolute mb-0 top-0 start-0 end-0 text-center pt-2">
              Fuels The Engine
            </p>
          </div>
          <img alt="" src={line} />
          <div className="bg-white rounded-4 px-3  py-3 py-sm-3 px-sm-5">
            <p className="Revenue_Col_Heading fw-bold mb-0">
              Operations, Staking, ETH Payout Rewards, Marketing
            </p>
          </div>
        </div>
      </div>

      <div className="Marketing_Section d-flex justify-content-center ">
        <div className="container-lg">
          <h2 className="DTSC_Heading text-white text-center text-uppercase">
            Marketing Strategy
          </h2>
          <div className="mt-5 d-flex flex-column flex-xl-row">
            <div className="Marketing_Col bg-white rounded-4 w-100 me-0 me-xl-5 mb-5 mb-xl-0">
              <p className="Marketing_Col_Heading fw-bold text-uppercase mb-0">
                built on a strong foundation
              </p>
              <p className="my-3">
                A token and a game built around a grassroots community and not a
                community built around a game. The foundation matters. In our
                view, the majority of crypto projects start on the wrong foot.
                The typical approach of building an ecosystem around a product
                limits enthusiasm to the niche appeal among the product users
                and nobody else. That ties the value of a token to use in a game
                or single product, creating sell pressure and risking sentiment
                swings as the crypto market is buffeted by wild and
                unpredictable winds.
              </p>
              <a className="text-decoration-none text-capitalize" href="/">
                More+
              </a>
            </div>
            <div className="Marketing_Col bg-white rounded-4 w-100">
              <div className="d-flex  flex-column flex-sm-row align-items-start ">
                <img alt="" src={phase1} className="me-0 me-sm-3 " />
                <div className="mt-3 mt-sm-0">
                  <p className="Marketing_Col_Heading fw-bold text-uppercase mb-0 ">
                    FOUNDATION BUILDING
                  </p>
                  <p className="my-3">
                    Target existing grassroots crypto micro to macro cap
                    investors and their inner circles (family, etc.)
                  </p>
                  <a className="text-decoration-none text-capitalize " href="/">
                    More+
                  </a>
                </div>
              </div>
              <div className="d-flex align-items-start  mt-3 flex-column flex-sm-row">
                <img alt="" src={phase2} className="me-0 me-sm-3 " />
                <div className="mt-3 mt-sm-0">
                  <p className="Marketing_Col_Heading fw-bold text-uppercase mb-0">
                    EXPLODE THE BASE
                  </p>
                  <p className="my-3">
                    Target the enthused GameFi community, with a focus shifting
                    to gameplay-centric messaging while still supporting and
                    building interest in the studio token
                  </p>
                  <a className="text-decoration-none text-capitalize" href="/">
                    More+
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="Staking_Section">
        <div className="container-lg d-flex flex-column align-items-center">
          {/* <h2 className="Staking_Section_Heading text-center mb-0">
            ETH RETURN STAKING POOL
          </h2> */}
          <div className="Staking_Col bg-white rounded-4">
            <p className="DTSC_Heading m-0 text-center">
              ETH RETURN STAKING POOL
            </p>
            <p className="mb-0 text-center">
              Stake $DRIFT and withdraw rewards in ETH Starting at launch.
            </p>

            <div className="Staking_Col_Gray_Box rounded-4 mt-5 text-center text-sm-start">
              <div className="d-flex justify-content-between flex-column flex-md-row">
                <div>
                  <p className=" SCGB_Heading mb-0 ">2-6 Months</p>
                  <p className="mb-0">Staking Return Period</p>
                </div>
                <div className="my-3 my-md-0">
                  <p className=" SCGB_Heading mb-0">10%</p>
                  <p className="mb-0">Starting Guaranteed Return</p>
                </div>
                <div>
                  <p className=" SCGB_Heading mb-0">0</p>
                  <p className="mb-0">Limit to Claim Rate</p>
                </div>
              </div>
            </div>
            <div className="Staking_Col_Gray_Box rounded-4 mt-5">
              <div className="d-flex justify-content-between flex-column flex-sm-row">
                <div className="text-center text-sm-start">
                  <p className=" SCGB_Heading mb-0 ">$150,000</p>
                  <p>Currently Staked</p>
                </div>
                <div className="text-center text-sm-end">
                  <p className=" SCGB_Heading mb-0 ">$150,000</p>
                  <p>Starting reward value</p>
                </div>
              </div>
              <div className="Staking_Bar">
                <div className="Staking_Done"></div>
              </div>
            </div>
            <h3 className="Staking_Col_Heading mt-5 mb-0">RETURN</h3>
            <p className="mb-0">120% APR</p>

            <div className="mt-3 mb-5 d-flex flex-column flex-sm-row">
              <div className="Staking_Col_Gray_Box w-100 rounded-4 me-0 me-sm-5 mb-3 mb-sm-0">
                <p className="SCGB_Heading mb-0  text-center">24%</p>
                <p className="mb-0 text-center">At 20 Mill. Net Volume</p>
              </div>
              <div className="Staking_Col_Gray_Box rounded-4 w-100">
                <p className="SCGB_Heading mb-0 text-center">79%</p>
                <p className="mb-0 text-center">At 100 Mill. Net Volume</p>
              </div>
            </div>

            <Link to={"/"}>
              <button
                className="pinkBtn BtnStyle1"
                // onClick={() => scroll()}
                style={{ width: "max-content" }}
              >
                Stake Drift
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Utilities;
