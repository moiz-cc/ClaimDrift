import tool from "../Assets/Images/tool.png";
import money from "../Assets/Images/money.png";
import report from "../Assets/Images/report_box.png";
import content from "../Assets/Images/fluent_contentr.png";
import community from "../Assets/Images/community.png";
import dashboard from "../Assets/Images/Dashboard_image.png";

// import required modules

import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Ambassador = () => {
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="Ambassador ">
      <div className="AmbassadorHeroSection d-flex align-items-center ">
        <div className="container-lg ">
          <section>
            <div className="row m-0 w-100 Home_Hero_Section">
              <div className="col-12 col-md-6 p-0 ">
                <p
                  className="Home_Hero_Section_SubHeading fw-bold text-uppercase mb-0 "
                  style={{ color: "#c7c7c7" }}
                >
                  Leverage your influence
                </p>
                <h1 className="Home_Hero_Section_Heading mt-2 fw-bold text-white text-uppercase">
                  Become an AMBA$$ADOR
                </h1>

                <p className="m-0 p-0 my-4 text-white">
                  AMBA$$ADOR allows everyday Web3 enthusiasts, influencers, and
                  Key Opinion Leaders (KOLs) to profit from presales and token
                  raises of projects they help amplify. Payouts are built into
                  the contract and are earned immediately.
                </p>
                <Link to={"https://influ3nce.me/"} target="_blank">
                  <button
                    className="pinkBtn BtnStyle1"
                    // onClick={() => scroll()}
                    style={{ width: "max-content" }}
                  >
                    Join Now
                  </button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="py-5">
        <div className="container-lg">
          <h2 className="DTSC_Heading text-black text-center text-uppercase">
            The AMBA$$ADOR Program
          </h2>
          <div className="mt-5 row m-0 p-0">
            <div className="col-12 col-md-4 col-sm-6 ">
              <div className="Ambassador_Col rounded-4 bg-white">
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <img src={tool} className="mb-2" />
                  <p className="text-center mb-0">
                    Gives small to large influencers a tool to earn immediately
                    for their reach and performance.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 col-sm-6 mt-4 mt-sm-0">
              <div className="Ambassador_Col rounded-4 bg-white">
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <img src={community} className="mb-2" />
                  <p className="text-center mb-0">
                    Incentivizes community growth with instant profit sharing
                    per new investor, deposited directly to the ambassador.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 mt-4 mt-md-0 ">
              <div className="Ambassador_Col rounded-4 bg-white">
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <img src={money} className="mb-2" />
                  <p className="text-center mb-0">
                    Provides continuous revenue streams for the lifecycle of the
                    product.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 row m-0 p-0">
            <div className="col-0 col-md-2 "></div>
            <div className="col-12 col-md-4 col-sm-6 ">
              <div className="Ambassador_Col rounded-4 bg-white">
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <img src={content} className="mb-2" />
                  <p className="text-center mb-0">
                    Provides Gold Tier ambassadors fully customized media packs
                    for X posts, Telegram posts, Short videos, etc.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 col-sm-6 mt-3 mt-sm-0">
              <div className="Ambassador_Col rounded-4 bg-white">
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <img src={report} className="mb-2" />
                  <p className="text-center mb-0">
                    Provides Gold Tier ambassadors a report at the end of the
                    raise that maps their network.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-0 col-md-2 "></div>
          </div>
        </div>
      </div>
      <div className="Ambassador_Section ">
        <div className="container-lg">
          <div className="row m-0 p-0">
            <div className="col-12 col-md-6">
              <img src={dashboard} className="img-fluid" />
            </div>
            <div className="col-12 col-md-6 mt-4 mt-md-0">
              <h2 className="DTSC_Heading text-white text-uppercase">
                Your Custom Dashboard Gives You the Power To:
              </h2>
              <ul className=" text-white m-0 p-0 my-4">
                <li className="text-white">View Live Investment stats</li>
                <li className="text-white">View Bonuses, rankings</li>
                <li className="text-white">Interact with other AMBA$$ADORS</li>
                <li className="text-white">Manage your profile</li>
                <li className="text-white">
                  View user engagement by event or post
                </li>
                <li className="text-white">Receive tips in ETH</li>
                <li className="text-white">Track other AMBA$$ADORS</li>
              </ul>
              <Link to={"https://influ3nce.me/ambassador"} target="_blank">
                <button
                  className="pinkBtn BtnStyle1"
                  style={{ width: "max-content" }}
                >
                  Join Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ambassador;
