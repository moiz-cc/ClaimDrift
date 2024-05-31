import React, { useEffect } from "react";
import eth from "../Assets/Images/majesticons_etherium-circle.svg";
import bnb from "../Assets/Images/BNB_White.svg";
import polygon from "../Assets/Images/Polygon_White.svg";
import copy from "../Assets/Images/ph_copy.svg";
import logo from "../Assets/Images/FooterLogo.svg";
import { Link, useLocation } from "react-router-dom";
import Check_Icon from "../Assets/Images/Check.svg";

function Footer() {
  const location = useLocation();
  useEffect(() => {}, [location]);

  const HandleCopyCode = (e, data) => {
    const CopyIcon = e.target;
    CopyIcon.src = Check_Icon;
    const TimeID = setTimeout(() => {
      CopyIcon.src = copy;
      clearTimeout(TimeID);
    }, 500);

    copyContent(data);
  };

  const copyContent = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  return (
    <footer className="Footer d-flex justify-content-center bg-black text-light">
      <div className="container-lg">
        <div className="d-flex justify-content-between mb-5 flex-wrap">
          <div className=" FooterCol_Container mt-4 mt-sm-0">
            <h3 className="FooterHeading mb-4 text-white fw-bolder text-capitalize">
              Drift
            </h3>
            <ul className="p-0 list-group">
              <li className="list-group-item bg-transparent rounded-0 border-0 p-0">
                {" "}
                <Link
                  className={`FooterMenuContainer_Link ${
                    location.pathname === "/" ? "Active" : ""
                  }`}
                  to={"/"}
                >
                  Home
                </Link>
              </li>
              <li className=" list-group-item bg-transparent rounded-0 border-0 p-0 my-2">
                {" "}
                <Link
                  className={`FooterMenuContainer_Link ${
                    location.pathname === "/utilities" ? "Active" : ""
                  }`}
                  to={"/utilities"}
                >
                  Utilities
                </Link>
              </li>

              <li className="list-group-item bg-transparent rounded-0 border-0 p-0 mb-2">
                {" "}
                <Link
                  className={`FooterMenuContainer_Link ${
                    location.pathname === "/ambassador" ? "Active" : ""
                  }`}
                  to={"/ambassador"}
                >
                  Ambassador
                </Link>
              </li>
              <li className="list-group-item bg-transparent rounded-0 border-0 p-0 mb-2">
                {" "}
                <Link
                  className={`FooterMenuContainer_Link ${
                    location.pathname === "/privacy-policy" ? "Active" : ""
                  }`}
                  to={"/privacy-policy"}
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="list-group-item bg-transparent rounded-0 border-0 p-0">
                {" "}
                <Link
                  className={`FooterMenuContainer_Link ${
                    location.pathname === "/price-risk-disclosure"
                      ? "Active"
                      : ""
                  }`}
                  to={"/price-risk-disclosure"}
                >
                  Price Risk Disclosure
                </Link>
              </li>
            </ul>
          </div>
          <div className=" FooterCol_Container mt-4 mt-sm-0">
            <h3 className="FooterHeading mb-4 text-white fw-bolder text-capitalize">
              Payout Pursuit
            </h3>
            <ul className="p-0 list-group">
              <li className="list-group-item bg-transparent rounded-0 border-0 p-0">
                {" "}
                <Link
                  className={`FooterMenuContainer_Link `}
                  to={"/Whitepaper.pdf"}
                  target="_blank"
                >
                  Whitepaper
                </Link>
              </li>
              <li className=" list-group-item bg-transparent rounded-0 border-0 p-0 my-2">
                {" "}
                <Link
                  className={`FooterMenuContainer_Link `}
                  to={"https://play.payoutpursuit.com/"}
                  target="_blank"
                >
                  Play in Browser
                </Link>
              </li>
            </ul>
          </div>
          <div className=" FooterCol_Container mt-4 mt-sm-0">
            <h3 className="FooterHeading mb-4 text-white fw-bolder text-capitalize">
              Social{" "}
            </h3>
            <ul className="p-0 list-group">
              <li className="list-group-item bg-transparent rounded-0 border-0 p-0">
                {" "}
                <Link
                  className={`FooterMenuContainer_Link `}
                  to={"https://t.me/driftportal"}
                  target="_blank"
                >
                  Telegram
                </Link>
              </li>
              <li className="list-group-item bg-transparent rounded-0 border-0 p-0 mt-2">
                {" "}
                <Link
                  className={`FooterMenuContainer_Link `}
                  to={"https://twitter.com/TheDriftToken"}
                  target="_blank"
                >
                  Twitter / X
                </Link>
              </li>
              <li className=" list-group-item bg-transparent rounded-0 border-0 p-0 mt-2">
                {" "}
                <Link
                  className={`FooterMenuContainer_Link `}
                  to={"https://www.youtube.com/@DRIFT_Labs"}
                  target="_blank"
                >
                  Youtube
                </Link>
              </li>
            </ul>
          </div>
          <div className=" FooterContract_Container mt-4 mt-lg-0">
            <h3 className="FooterHeading mb-4 text-white fw-bolder text-capitalize mb-4 text-white fw-bolder text-capitalize ">
              Drift Token Address{" "}
            </h3>
            <div
              className="d-flex justify-content-between align-items-center p-2 rounded-2"
              style={{
                backgroundColor: "#222",
                border: "1px solid #8b8b8b",
              }}
            >
              <img src={eth} className="me-3" alt="" width={24} height={24} />
              <p className="mb-0 FooterContractAddress text-white">
                {process.env.REACT_APP_DRIFT_ETH}
              </p>
              <img
                src={copy}
                className="Copy ms-3 YourCode_Copy_Icon"
                alt=""
                onClick={(e) =>
                  HandleCopyCode(e, process.env.REACT_APP_DRIFT_ETH)
                }
                width={28}
                height={28}
              />
            </div>
            <div
              className="d-flex justify-content-between align-items-center p-2 rounded-2 mt-3"
              style={{
                backgroundColor: "#222",
                border: "1px solid #8b8b8b",
              }}
            >
              <img src={bnb} className="me-3" alt="" width={24} height={24} />
              <p className="mb-0 FooterContractAddress text-white">
                {process.env.REACT_APP_DRIFT_BNB}
              </p>
              <img
                src={copy}
                className="Copy ms-3 YourCode_Copy_Icon"
                alt=""
                onClick={(e) =>
                  HandleCopyCode(e, process.env.REACT_APP_DRIFT_BNB)
                }
                width={28}
                height={28}
              />
            </div>
            <div
              className="d-flex justify-content-between align-items-center p-2 rounded-2 mt-3"
              style={{
                backgroundColor: "#222",
                border: "1px solid #8b8b8b",
              }}
            >
              <img
                src={polygon}
                className="me-3"
                alt=""
                width={24}
                height={24}
              />
              <p className="mb-0 FooterContractAddress text-white">
                {process.env.REACT_APP_DRIFT_POLYGON}
              </p>
              <img
                src={copy}
                className="Copy ms-3 YourCode_Copy_Icon"
                alt=""
                onClick={(e) =>
                  HandleCopyCode(e, process.env.REACT_APP_DRIFT_POLYGON)
                }
                width={28}
                height={28}
              />
            </div>
            <h3 className="FooterHeading my-4 text-white fw-bolder text-capitalize mb-4 text-white fw-bolder text-capitalize ">
              Stake Drift Token Address{" "}
            </h3>
            <div
              className="d-flex justify-content-between align-items-center p-2 rounded-2"
              style={{
                backgroundColor: "#222",
                border: "1px solid #8b8b8b",
              }}
            >
              <img src={eth} className="me-3" alt="" width={24} height={24} />
              <p className="mb-0 FooterContractAddress text-white">
                {process.env.REACT_APP_ST_DRIFT_ETH}
              </p>
              <img
                src={copy}
                className="Copy ms-3 YourCode_Copy_Icon"
                alt=""
                onClick={(e) =>
                  HandleCopyCode(e, process.env.REACT_APP_ST_DRIFT_ETH)
                }
                width={28}
                height={28}
              />
            </div>
            <div
              className="d-flex justify-content-between align-items-center p-2 rounded-2 mt-3"
              style={{
                backgroundColor: "#222",
                border: "1px solid #8b8b8b",
              }}
            >
              <img src={bnb} className="me-3" alt="" width={24} height={24} />
              <p className="mb-0 FooterContractAddress text-white">
                {process.env.REACT_APP_ST_DRIFT_BNB}
              </p>
              <img
                src={copy}
                className="Copy ms-3 YourCode_Copy_Icon"
                alt=""
                onClick={(e) =>
                  HandleCopyCode(e, process.env.REACT_APP_ST_DRIFT_BNB)
                }
                width={28}
                height={28}
              />
            </div>
            <div
              className="d-flex justify-content-between align-items-center p-2 rounded-2 mt-3"
              style={{
                backgroundColor: "#222",
                border: "1px solid #8b8b8b",
              }}
            >
              <img
                src={polygon}
                className="me-3"
                alt=""
                width={24}
                height={24}
              />
              <p className="mb-0 FooterContractAddress text-white">
                {process.env.REACT_APP_ST_DRIFT_POLYGON}
              </p>
              <img
                src={copy}
                className="Copy ms-3 YourCode_Copy_Icon"
                alt=""
                onClick={(e) =>
                  HandleCopyCode(e, process.env.REACT_APP_ST_DRIFT_POLYGON)
                }
                width={28}
                height={28}
              />
            </div>
          </div>
        </div>
        <Link
          className={`HeaderMenuContainer_Link text-uppercase ${
            location.pathname === "/" ? "Active" : ""
          }`}
          to={"/"}
        >
          <img src={logo} alt="" />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
