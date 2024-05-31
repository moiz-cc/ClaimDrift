import React from "react";
import driftLogo from "../Assets/Images/Drift Logo Spin.svg";
import dot from "../Assets/Images/Dot.svg";
import { Link } from "react-router-dom";

const Tokenomics = () => {
  return (
    <div style={{ background: "#e9e9e9" }}>
      <div className="UtilitiesHeroSection text-white  d-flex flex-column align-items-center w-100 justify-content-center">
        <div className="container-lg">
          <section className=" d-flex justify-content-between flex-column align-items-center ">
            <div className="row m-0 w-100 Home_Hero_Section">
              <div className="col-12 col-md-6 p-0 pe-md-3 d-flex flex-column p-0 justify-content-center">
                <p className="Home_Hero_Section_SubHeading fw-bold text-uppercase mb-0">
                  $DRIFT TOKEN
                </p>
                <h1 className="Home_Hero_Section_Heading mt-2 fw-bold text-white text-uppercase">
                  Tokenomics
                </h1>

                <ul className="list-group bg-transparent m-0 ">
                  <li className="list-group-item bg-transparent border-0 px-0 text-white fw-bold text-uppercase">
                    Max Total Supply:{" "}
                    <span className="text-white fw-normal">10,000,000,000</span>
                  </li>
                  <li className="list-group-item bg-transparent border-0 px-0 text-white fw-bold text-uppercase">
                    Chains:{" "}
                    <Link
                      className="HeaderMenuContainer_Link "
                      to="https://etherscan.io/address/0xb7cFfebB06621287C7850ffefB22c30252E78e6B"
                    >
                      ETH
                    </Link>
                    ,{" "}
                    <Link
                      className="HeaderMenuContainer_Link "
                      to="https://bscscan.com/address/0x5de9a1c782fd38eabbf6c99f5457e0518ab36ae4"
                    >
                      BNB
                    </Link>
                    ,{" "}
                    <Link
                      className="HeaderMenuContainer_Link "
                      to="https://polygonscan.com/address/0x3d5efbcf89ba18ac4cf7f7e5db838e554d15fead"
                    >
                      POLYGON
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-12 mt-5 sm-mt-4 p-0 col-md-6 ps-md-3 mt-md-0 d-flex align-items-center justify-content-center">
                <img alt="" src={driftLogo} className="img-fluid"></img>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="container-lg">
        <div className="py-5 ">
          <h1 className="Policy_Heading text-uppercase">Fund Raising</h1>
          <div className="Leaderboard_BoardCol_Container p-0 m-0">
            <div className="DTSC_Col rounded-4 bg-white mt-4 mt-md-0  w-100 overflowAuto">
              <table className="table Leaderboard_BoardCol_Table bg-transparent mb-0">
                <thead className="position-relative border-bottom border-top">
                  <tr className="position-sticky top-0 start-0 Leaderboard_BoardCol_Table_HeaderRow">
                    <th scope="col" className="">
                      <div className="d-flex align-items-center ">
                        <span className="Text_Secondary fw-bold"></span>
                      </div>
                    </th>
                    <th scope="col" className="">
                      <div className="d-flex align-items-center ">
                        <span className="Text_Secondary fw-bold">Supply</span>
                      </div>
                    </th>
                    <th scope="col" className="">
                      <div className="d-flex align-items-center gap-2">
                        <span className="Text_Secondary fw-bold">Tokens</span>
                      </div>
                    </th>
                    <th scope="col" className="">
                      <div className="d-flex align-items-center">
                        <span className="Text_Secondary fw-bold">Price</span>
                      </div>
                    </th>
                    <th scope="col" className="">
                      <div className="d-flex align-items-center">
                        <span className="Text_Secondary fw-bold">
                          Raise USD
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          Pre-Sale
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          17.27%
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          1,727,000,000
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex align-items-center justify-content-between gap-3 py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          0.0006
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex align-items-center justify-content-between gap-3 py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          $1,036,200.00
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          IEO
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          7.50%
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          750,000,000
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex align-items-center justify-content-between gap-3 py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          0.0008
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex align-items-center justify-content-between gap-3 py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          $600,000.00
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          Strategic KOL round
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          2.50%
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          250,000,000
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex align-items-center justify-content-between gap-3 py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          0.0004
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex align-items-center justify-content-between gap-3 py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          $100,000.00
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          Tier 1 ICO
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          3.54%
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          354,166,667
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex align-items-center justify-content-between gap-3 py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          0.0024
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex align-items-center justify-content-between gap-3 py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          $850,000.00
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bold">
                          Total
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bold">
                          30.81%
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bold">
                          3,081,166,667
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex align-items-center justify-content-between gap-3 py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          -
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex align-items-center justify-content-between gap-3 py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bold">
                          $2,586,200.00
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="pb-5 ">
          <h1 className="Policy_Heading text-uppercase">Unlocks</h1>
          <div className="Leaderboard_BoardCol_Container p-0 m-0  ">
            <div className="DTSC_Col rounded-4 bg-white mt-4 mt-md-0 w-100 overflowAuto">
              <table className="table  Leaderboard_BoardCol_Table bg-transparent mb-0">
                <thead className="position-relative border-bottom border-top">
                  <tr className="position-sticky top-0 start-0 Leaderboard_BoardCol_Table_HeaderRow">
                    <th scope="col" className="">
                      <div className="d-flex align-items-center ">
                        <span className="Text_Secondary fw-bold"></span>
                      </div>
                    </th>
                    <th scope="col" className="">
                      <div className="d-flex align-items-center ">
                        <span className="Text_Secondary fw-bold">Day 0</span>
                      </div>
                    </th>
                    <th scope="col" className="">
                      <div className="d-flex align-items-center ">
                        <span className="Text_Secondary fw-bold">Day 10</span>
                      </div>
                    </th>
                    <th scope="col" className="">
                      <div className="d-flex align-items-center ">
                        <span className="Text_Secondary fw-bold">Day 30</span>
                      </div>
                    </th>
                    <th scope="col" className="">
                      <div className="d-flex align-items-center ">
                        <span className="Text_Secondary fw-bold">Day 60</span>
                      </div>
                    </th>
                    <th scope="col" className="">
                      <div className="d-flex align-items-center ">
                        <span className="Text_Secondary fw-bold">Day 90</span>
                      </div>
                    </th>
                    <th scope="col" className="">
                      <div className="d-flex align-items-center ">
                        <span className="Text_Secondary fw-bold">Day 120</span>
                      </div>
                    </th>
                    <th scope="col" className="">
                      <div className="d-flex align-items-center ">
                        <span className="Text_Secondary fw-bold">Day 150</span>
                      </div>
                    </th>
                    <th scope="col" className="">
                      <div className="d-flex align-items-center ">
                        <span className="Text_Secondary fw-bold">Day 180</span>
                      </div>
                    </th>
                    <th scope="col" className="">
                      <div className="d-flex align-items-center ">
                        <span className="Text_Secondary fw-bold">Day 210</span>
                      </div>
                    </th>
                    <th scope="col" className="">
                      <div className="d-flex align-items-center ">
                        <span className="Text_Secondary fw-bold">Day 240</span>
                      </div>
                    </th>
                    <th scope="col" className="">
                      <div className="d-flex align-items-center ">
                        <span className="Text_Secondary fw-bold">Day 270</span>
                      </div>
                    </th>
                    <th scope="col" className="">
                      <div className="d-flex align-items-center ">
                        <span className="Text_Secondary fw-bold">Day 300</span>
                      </div>
                    </th>
                    <th scope="col" className="">
                      <div className="d-flex align-items-center ">
                        <span className="Text_Secondary fw-bold">Day 330</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          Presale
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          473,000,000
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          750,000,000
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          42,000,000
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          42,000,000
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          42,000,000
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          42,000,000
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          42,000,000
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          42,000,000
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          42,000,000
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          42,000,000
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          42,000,000
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          42,000,000
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          42,000,000
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          Strategic KOL round
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          0
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          0
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          250,000,000
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="pb-3 ">
          <h1 className="Policy_Heading text-uppercase">Token Supply</h1>
          <div className="Leaderboard_BoardCol_Container p-0 m-0 ">
            <div className="DTSC_Col rounded-4 bg-white mt-4 mt-md-0 w-100 overflowAuto">
              <table className="table  Leaderboard_BoardCol_Table bg-transparent mb-0">
                <thead className="position-relative border-bottom border-top">
                  <tr className="position-sticky top-0 start-0 Leaderboard_BoardCol_Table_HeaderRow">
                    <th scope="col" className="">
                      <div className="d-flex align-items-center ">
                        <span className="Text_Secondary fw-bold"></span>
                      </div>
                    </th>
                    <th scope="col" className="">
                      <div className="d-flex align-items-center ">
                        <span className="Text_Secondary fw-bold">Supply</span>
                      </div>
                    </th>
                    <th scope="col" className="">
                      <div className="d-flex align-items-center gap-2">
                        <span className="Text_Secondary fw-bold">Tokens</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          Expansion Reserve
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          16.44%
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          1,643,671,845
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          Marketing
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          5.36%
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          536,000,000
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          Strategic Partnerships
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          2.36%
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          236,000,000
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          Community
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          0.89%
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          88,500,000
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          Dex Liquidity
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          1.72%
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          172,413,793
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          Staffing Reseve
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          2.41%
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          240,761,476
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          Game Pool
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          1.16%
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          116,467,826
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          Ambassadors
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          0.63%
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          63,174,260
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          Burn Outs
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          38.22%
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          3,821,844,133
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          Total
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          69.19%
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          6,918,833,333
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          Grand Total
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          100.00%
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          10,000,000,000
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="pb-5 ">
          {/* <h1 className="Policy_Heading text-uppercase">Fund Raising</h1> */}
          <div className="Leaderboard_BoardCol_Container p-0 m-0 ">
            <div className="DTSC_Col rounded-4 bg-white mt-4 mt-md-0  w-100 overflowAuto ">
              <table className="table Leaderboard_BoardCol_Table bg-transparent mb-0">
                <thead className="position-relative border-bottom border-top">
                  <tr className="position-sticky top-0 start-0 Leaderboard_BoardCol_Table_HeaderRow">
                    <th scope="col" className="">
                      <div className="d-flex align-items-center ">
                        <span className="Text_Secondary fw-bold">Type</span>
                      </div>
                    </th>
                    <th scope="col" className="">
                      <div className="d-flex align-items-center ">
                        <span className="Text_Secondary fw-bold">
                          Token amount
                        </span>
                      </div>
                    </th>
                    <th scope="col" className="">
                      <div className="d-flex align-items-center gap-2">
                        <span className="Text_Secondary fw-bold">TGE</span>
                      </div>
                    </th>
                    <th scope="col" className="">
                      <div className="d-flex align-items-center">
                        <span className="Text_Secondary fw-bold">Cliff</span>
                      </div>
                    </th>
                    <th scope="col" className="">
                      <div className="d-flex align-items-center">
                        <span className="Text_Secondary fw-bold">
                          Vesting schedule
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          Pre-Sale
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          1,727,000,000
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          0%
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex align-items-center justify-content-between gap-3 py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          5 days
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex align-items-center justify-content-between gap-3 py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          800,000,000 Tokens unlock at day 5.
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          IEO
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          750,000,000
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          0%
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex align-items-center justify-content-between gap-3 py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          8 days*
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex align-items-center justify-content-between gap-3 py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          Vested
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          Strategic KOL round
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          250,000,000
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          20%
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex align-items-center justify-content-between gap-3 py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          1
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex align-items-center justify-content-between gap-3 py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          30 day cliff, 100% unlock
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          First Staking Pool
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          1,000,000,000
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          0%
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex align-items-center justify-content-between gap-3 py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          30 days
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex align-items-center justify-content-between gap-3 py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          First 30 Days face 25% dynamic sales tax, then 5%
                          sales tax after 30 days.
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          Coinstore Staking Pool 3-6-9
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          2,000,000,000
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          0%
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex align-items-center justify-content-between gap-3 py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          270 days
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex align-items-center justify-content-between gap-3 py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          100% unlock after 270 days. (3 month, 6 month, 9
                          months)
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          Total
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bold">
                          5,727,000,000
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="pb-3 ">
          <h1 className="Policy_Heading text-uppercase">Token Allocation</h1>
          <div className="Leaderboard_BoardCol_Container p-0 m-0">
            <div className="DTSC_Col rounded-4 bg-white mt-4 mt-md-0 w-100 overflowAuto  ">
              <table className="table Leaderboard_BoardCol_Table bg-transparent mb-0">
                <thead className="position-relative border-bottom border-top">
                  <tr className="position-sticky top-0 start-0 Leaderboard_BoardCol_Table_HeaderRow">
                    <th scope="col" className="">
                      <div className="d-flex align-items-center ">
                        <span className="Text_Secondary fw-bold">Type</span>
                      </div>
                    </th>
                    <th scope="col" className="">
                      <div className="d-flex align-items-center ">
                        <span className="Text_Secondary fw-bold">
                          Allocation
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          Private Rounds
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          17.27%
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          Public
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          11.04%
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          Liquidity
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          1.72%
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          Rewards and Ecosystem
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          5.04%
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          Burn Mech
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          38.22%
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          Treasury
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          18.84%
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          Marketing/KOL
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          7.86%
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          Total
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bold">
                          100.00%
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="pb-5 ">
          {/* <h1 className="Policy_Heading text-uppercase">Token Allocation</h1> */}
          <div className="Leaderboard_BoardCol_Container p-0 m-0 ">
            <div className="DTSC_Col rounded-4 bg-white mt-4 mt-md-0 w-100 overflowAuto  ">
              <table className="table Leaderboard_BoardCol_Table bg-transparent mb-0">
                <thead className="position-relative border-bottom border-top">
                  <tr className="position-sticky top-0 start-0 Leaderboard_BoardCol_Table_HeaderRow">
                    <th scope="col" className="">
                      <div className="d-flex align-items-center ">
                        <span className="Text_Secondary fw-bold">Round</span>
                      </div>
                    </th>
                    <th scope="col" className="">
                      <div className="d-flex align-items-center ">
                        <span className="Text_Secondary fw-bold">
                          Fully Diluted Valuation
                        </span>
                      </div>
                    </th>
                    <th scope="col" className="">
                      <div className="d-flex align-items-center gap-2">
                        <span className="Text_Secondary fw-bold">
                          Price per token
                        </span>
                      </div>
                    </th>
                    <th scope="col" className="">
                      <div className="d-flex align-items-center">
                        <span className="Text_Secondary fw-bold">
                          Raised/Raising
                        </span>
                      </div>
                    </th>
                    <th scope="col" className="">
                      <div className="d-flex align-items-center">
                        <span className="Text_Secondary fw-bold">Status</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          Pre-Sale
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          $6,000,000
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          $0.0006
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex align-items-center justify-content-between gap-3 py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          $1,036,200
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex align-items-center justify-content-between gap-3 py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          Complete
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          IEO
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          $8,000,000
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          $0.0008
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex align-items-center justify-content-between gap-3 py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          $600,000
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex align-items-center justify-content-between gap-3 py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          Oversubscribed
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          Strategic KOL round
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          $4,000,000
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          $0.0004
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex align-items-center justify-content-between gap-3 py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          $100,000
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex align-items-center justify-content-between gap-3 py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          Now
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          Tier 1 ICO
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          $24,000,000
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          $0.0024
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex align-items-center justify-content-between gap-3 py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          $850,000
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex align-items-center justify-content-between gap-3 py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          Planned
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          Total
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1"></span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1"></span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex align-items-center justify-content-between gap-3 py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          $2,586,200
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex align-items-center justify-content-between gap-3 py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1"></span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="pb-5 ">
          <h1 className="Policy_Heading text-uppercase">
            Permanent Buy Pressure
          </h1>
          <div className="Leaderboard_BoardCol_Container p-0 m-0">
            <div className="DTSC_Col rounded-4 bg-white mt-4 mt-md-0  w-100 overflowAuto ">
              <table className="table Leaderboard_BoardCol_Table bg-transparent mb-0">
                {/* <thead className="position-relative border-bottom border-top">
                  <tr className="position-sticky top-0 start-0 Leaderboard_BoardCol_Table_HeaderRow">
                    <th scope="col" className="">
                      <div className="d-flex align-items-center ">
                        <span className="Text_Secondary fw-bold">Round</span>
                      </div>
                    </th>
                    <th scope="col" className="">
                      <div className="d-flex align-items-center ">
                        <span className="Text_Secondary fw-bold">
                          Fully Diluted Valuation
                        </span>
                      </div>
                    </th>
                    <th scope="col" className="">
                      <div className="d-flex align-items-center gap-2">
                        <span className="Text_Secondary fw-bold">
                          Price per token
                        </span>
                      </div>
                    </th>
                    <th scope="col" className="">
                      <div className="d-flex align-items-center">
                        <span className="Text_Secondary fw-bold">
                          Raised/Raising
                        </span>
                      </div>
                    </th>
                    <th scope="col" className="">
                      <div className="d-flex align-items-center">
                        <span className="Text_Secondary fw-bold">Status</span>
                      </div>
                    </th>
                  </tr>
                </thead> */}
                <tbody>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          Burn Mech
                        </span>
                      </div>
                    </td>
                    <td className="col">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          3,821,844,133
                        </span>
                      </div>
                    </td>
                    <td className="col">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          Tokens
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          Static Sales Tax
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          5% of Buy/Sell Proceeds
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          For all DEX buys and sells. Funds additional liquidity
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="">
                    <td scope="row" className="Leaderboard_RankHash fw-normal">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1 fw-bolder">
                          Dynamic Sales Tax
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          25% of Proceeds
                        </span>
                      </div>
                    </td>
                    <td className="">
                      <div className="d-flex gap-3 align-items-center py-2">
                        <span className="text-dark FS_16 fw-normal text-capitalize lh-1">
                          for First Staking Pool
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tokenomics;
