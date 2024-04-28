import React, { useEffect, useState } from "react";
import dot from "../Assets/Images/Dot.svg";
import eth from "../Assets/Images/Ethereum.svg";
import polygon from "../Assets/Images/Polygon.svg";
import presale_ended from "../Assets/Images/PresaleEnded.png";
import driftLogo from "../Assets/Images/Drift Logo Spin.svg";

import bnb from "../Assets/Images/BNB.svg";
// import ambassadorIcon from "../Assets/Images/AmbassadorIcon.svg";
import calendar from "../Assets/Images/calendar-icon.svg";
import gold from "../Assets/Images/gold-icon.svg";
import money from "../Assets/Images/money-icon.svg";
import josh from "../Assets/Images/josh.svg";
import linkedin from "../Assets/Images/LinkedIn_Icon.png";
import twitter from "../Assets/Images/Twitter_Icon.png";
import breakdown from "../Assets/Images/AllocationBreakdown.png";
import presaleFunds from "../Assets/Images/PresaleUseofFunds.png";
import token from "../Assets/Images/Drift_Icon.svg";

import Presale from "../Assets/Images/Presale.svg";
import Lp from "../Assets/Images/Lp.svg";
import ReserveTank from "../Assets/Images/ReserveTank.svg";
import Burn from "../Assets/Images/Burn.svg";
import Ambassador from "../Assets/Images/Ambassador.svg";
import Close from "../Assets/Images/Close.svg";
import Error from "../Assets/Images/Error.svg";
import Loading from "../Assets/Images/loading.gif";
import paul from "../Assets/Images/paul.svg";
import michael from "../Assets/Images/michael.svg";
import sophie from "../Assets/Images/sophie.svg";
import checked from "../Assets/Images/marked.png";
import unchecked from "../Assets/Images/unmarked.png";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getErrorMessage } from "../blockchainErrors";

import {
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalState,
} from "@web3modal/ethers5/react";
import ConvertNumber from "../Helpers/ConvertNumber";

import { LoadBlockchainData, LoadUser } from "../Store/blockchainSlice";

function Home() {
  const dispatch = useDispatch();
  const {
    publicBlockchainData: data,
    user,
    isLoading,
    web3Inst_ETH,
    contractInstICO_ETH,
    contractInstPresaleToken_ETH,
    contractInstDrift_ETH,
    contractInstClaim_ETH,

    web3Inst_BNB,
    contractInstICO_BNB,
    contractInstPresaleToken_BNB,
    contractInstDrift_BNB,
    contractInstClaim_BNB,

    web3Inst_POLYGON,
    contractInstPresaleToken_POLYGON,
    contractInstICO_POLYGON,
    contractInstDrift_POLYGON,
    contractInstClaim_POLYGON,
  } = useSelector((state) => state.Blockchain);

  const { address, isConnected, chainId } = useWeb3ModalAccount();
  const { selectedNetworkId } = useWeb3ModalState();
  const { open } = useWeb3Modal();

  const [transactionModal, setTransactionModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");

  const [errors, setErrors] = useState({
    transaction: "",
  });

  function scroll() {
    document
      .getElementById("Presale_Form")
      .scrollIntoView({ behavior: "smooth" }, true);
  }

  function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
    return x;
  }

  const allow = async (e) => {
    e.preventDefault();
    if (!address) {
      open();

      return;
    }
    setTransactionModal(true);

    setLoading(true);

    let presale_TokenAddress;
    let claim_TokenAddress;
    let token_Inst;
    let ico_Inst;
    let claim_Inst;

    if (selectedNetworkId === 1 && chainId === 1) {
      presale_TokenAddress = process.env.REACT_APP_TOKEN_CONTRACT_ETH;
      claim_TokenAddress = process.env.REACT_APP_CLAIM_ETH;
      token_Inst = contractInstPresaleToken_ETH;
      ico_Inst = contractInstICO_ETH;
      claim_Inst = contractInstClaim_ETH;
    } else if (selectedNetworkId === 56 && chainId === 56) {
      presale_TokenAddress = process.env.REACT_APP_TOKEN_CONTRACT_BNB;
      claim_TokenAddress = process.env.REACT_APP_CLAIM_BNB;
      token_Inst = contractInstPresaleToken_BNB;
      ico_Inst = contractInstICO_BNB;
      claim_Inst = contractInstClaim_BNB;
    } else if (selectedNetworkId === 137 && chainId === 137) {
      presale_TokenAddress = process.env.REACT_APP_TOKEN_CONTRACT_POLYGON;
      claim_TokenAddress = process.env.REACT_APP_CLAIM_POLYGON;
      token_Inst = contractInstPresaleToken_POLYGON;
      ico_Inst = contractInstICO_POLYGON;
      claim_Inst = contractInstClaim_POLYGON;
    } else return;

    try {
      const approve = await token_Inst.methods.approve(
        claim_TokenAddress,
        user?.balance + 0
      );

      const estimateGas = await approve.estimateGas({
        from: address,
      });

      const transaction = approve.send({
        from: address,
        to: presale_TokenAddress,
        gas: estimateGas,
        maxPriorityFeePerGas: 50000000000,
      });

      transaction
        .on("transactionHash", (txHash) => {
          console.log(txHash);
          // setTxHash(txHash);
        })
        .on("receipt", async (receipt) => {
          console.log("RECEIPT => \n", receipt);

          setErrors((state) => ({ ...state, transaction: "" }));
          dispatch(
            LoadUser({
              contractInstICO: ico_Inst,
              address,
              contractInstPresaleToken: token_Inst,
              contractInstClaim: claim_Inst,
              claimAddress: claim_TokenAddress,
            })
          );

          handleSubmit(e);
        })
        .on("error", async (error, receipt) => {
          console.log("ERROR => \n", error);

          setLoading(false);

          const errorMsg = await getErrorMessage(error, chainId);
          setErrors({ ...errors, transaction: errorMsg });
          console.log("RECEIPT ERROR => \n", receipt);

          if (receipt?.transactionHash) {
            setTxHash(receipt.transactionHash);
          }
        });
    } catch (error) {
      const errorMsg = await getErrorMessage(error, chainId);
      console.log(errorMsg);
      setErrors((state) => ({ ...state, transaction: errorMsg }));
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address) {
      open();

      return;
    }
    setTransactionModal(true);
    setLoading(true);

    let claim_Address;
    let claim_Inst;
    let token_Inst;
    let ico_Inst;

    if (selectedNetworkId === 1 && chainId === 1) {
      claim_Inst = contractInstClaim_ETH;
      claim_Address = process.env.REACT_APP_CLAIM_ETH;
      token_Inst = contractInstPresaleToken_ETH;
      ico_Inst = contractInstICO_ETH;
    } else if (selectedNetworkId === 56 && chainId === 56) {
      claim_Inst = contractInstClaim_BNB;
      claim_Address = process.env.REACT_APP_CLAIM_BNB;
      token_Inst = contractInstPresaleToken_BNB;
      ico_Inst = contractInstICO_BNB;
    } else if (selectedNetworkId === 137 && chainId === 137) {
      claim_Inst = contractInstClaim_POLYGON;
      claim_Address = process.env.REACT_APP_CLAIM_POLYGON;
      token_Inst = contractInstPresaleToken_POLYGON;
      ico_Inst = contractInstICO_POLYGON;
    }

    try {
      const claimTokens = await claim_Inst.methods.claimTokens();
      const estimateGas = await claimTokens.estimateGas({
        from: address,
      });

      const transaction = claimTokens.send({
        from: address,
        to: claim_Address,
        gas: estimateGas,
        maxPriorityFeePerGas: 50000000000,
      });

      transaction
        .on("transactionHash", (txHash) => {
          console.log(txHash);
          setTxHash(txHash);
        })
        .on("receipt", async (receipt) => {
          console.log("RECEIPT => \n", receipt);

          setErrors((state) => ({ ...state, transaction: "" }));
          dispatch(
            LoadUser({
              contractInstICO: ico_Inst,
              address,
              contractInstPresaleToken: token_Inst,
              contractInstClaim: claim_Inst,
              claimAddress: claim_Address,
            })
          );
          dispatch(
            LoadBlockchainData({
              contractInstICO_ETH,
              web3Inst_ETH,
              contractInstDrift_ETH,
              contractInstICO_BNB,
              web3Inst_BNB,
              contractInstDrift_BNB,
              contractInstICO_POLYGON,
              web3Inst_POLYGON,
              contractInstDrift_POLYGON,
            })
          );
          setLoading(false);
        })
        .on("error", async (error, receipt) => {
          console.log("ERROR => \n", error);

          setLoading(false);

          const errorMsg = await getErrorMessage(error, chainId);
          setErrors({ ...errors, transaction: errorMsg });
          console.log("RECEIPT ERROR => \n", receipt);

          if (receipt?.transactionHash) {
            setTxHash(receipt.transactionHash);
          }
        });
    } catch (error) {
      const errorMsg = await getErrorMessage(error, chainId);

      setErrors((state) => ({ ...state, transaction: errorMsg }));
      setLoading(false);
    }
  };

  const closeTransactionModal = () => {
    setTransactionModal(false);

    setErrors({
      transaction: "",
    });
    setTxHash("");
  };

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="Home">
      <div className="HomeHeroSection d-flex align-items-center position-relative overflow-hidden">
        <div className="container-lg">
          <section className=" d-flex justify-content-between flex-column align-items-center ">
            <div className="row m-0 w-100 Home_Hero_Section d-flex justify-content-center text-center ">
              <div className="col-12 col-md-6 p-0 ">
                <p className="Home_Hero_Section_SubHeading fw-bold text-uppercase mb-0">
                  A TOKEN BUILT DIFFERENTLY
                </p>
                <h1 className="Home_Hero_Section_Heading mt-2 fw-bold text-white text-uppercase">
                  A Bold New Approach
                </h1>

                <p className=" text-white m-0 p-0 my-4">
                  A Web3 project like no other
                  <span className="mx-1 " style={{ color: "#FF98D1" }}>
                    |
                  </span>
                  A token for speculators
                  <span className="mx-1 " style={{ color: "#FF98D1" }}>
                    |
                  </span>
                  A cross chain game for competitive gamers
                  <span className="mx-1 " style={{ color: "#FF98D1" }}>
                    |
                  </span>
                  A platform for influencers to earn
                  <span className="mx-1 " style={{ color: "#FF98D1" }}>
                    |
                  </span>
                  A whole new approach to tokenomics
                </p>

                <button
                  className="pinkBtn BtnStyle1"
                  onClick={() => scroll()}
                  style={{ width: "max-content" }}
                >
                  Claim $Drift Token
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {transactionModal && (
        <div
          className="TransactionModal h-100 w-100 position-fixed top-0  d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 999 }}
        >
          <div
            className="TransactionModalBox DTSC_Col bg-white rounded-4 p-4 position-relative"
            style={{ wordWrap: "break-word" }}
          >
            {loading ? (
              <div className="d-flex justify-content-center align-items-center">
                <img src={Loading} style={{ width: 50 }} alt="loading" />
              </div>
            ) : (
              <>
                <img
                  alt=""
                  src={Close}
                  className="position-sticky top-0  start-100"
                  style={{ width: 20 }}
                  onClick={closeTransactionModal}
                />
                {errors?.transaction ? (
                  <div className="d-flex flex-column align-items-center">
                    <div
                      className="p-3 mb-3"
                      style={{
                        borderRadius: "100%",
                        backgroundColor: "#ff008c",
                      }}
                    >
                      <img
                        alt=""
                        src={Error}
                        style={{ width: 30, height: 30 }}
                      />
                    </div>
                    <p> {errors?.transaction}</p>
                  </div>
                ) : (
                  <>
                    <div className="d-flex justify-content-center mb-3">
                      <p className="border p-2 rounded-4 text-center text-white bg-black m-0 px-4">
                        Transaction Successful !
                      </p>
                    </div>
                    <p className="text-start text-black">
                      You have successfully Claimed $DRIFT tokens!
                    </p>

                    <p className="text-start text-black ">
                      <span className="fw-bold">Import contract :</span>{" "}
                      {selectedNetworkId === 1
                        ? process.env.REACT_APP_DRIFT_ETH
                        : selectedNetworkId === 56
                        ? process.env.REACT_APP_DRIFT_BNB
                        : selectedNetworkId === 137
                        ? process.env.REACT_APP_DRIFT_POLYGON
                        : null}{" "}
                      to view your tokens.{" "}
                    </p>
                    <p className="text-start text-black ">
                      <span className="fw-bold">Import Stake contract :</span>{" "}
                      {selectedNetworkId === 1
                        ? process.env.REACT_APP_ST_DRIFT_ETH
                        : selectedNetworkId === 56
                        ? process.env.REACT_APP_ST_DRIFT_BNB
                        : selectedNetworkId === 137
                        ? process.env.REACT_APP_ST_DRIFT_POLYGON
                        : null}{" "}
                      to view your stake tokens.{" "}
                    </p>
                    <p className="text-start text-black mb-0 fw-bold">
                      Transaction link:
                    </p>
                    <Link
                      target="_blank"
                      to={`${
                        selectedNetworkId === 1
                          ? "https://etherscan.io"
                          : `${
                              selectedNetworkId === 56
                                ? "https://bscscan.com"
                                : `${
                                    selectedNetworkId === 137
                                      ? "https://polygonscan.com"
                                      : ""
                                  }`
                            }`
                      }/tx/${txHash}`}
                    >
                      {selectedNetworkId === 1
                        ? "https://etherscan.io"
                        : `${
                            selectedNetworkId === 56
                              ? "https://bscscan.com"
                              : `${
                                  selectedNetworkId === 137
                                    ? "https://polygonscan.com"
                                    : ""
                                }`
                          }`}
                      /tx/{txHash}
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}

      <div className="container-lg">
        <section className="DriftTokenSection pt-5">
          <div className="DriftTokenSectionContainer row m-0 w-100 align-items-stretch">
            <div className="col-12 col-md-6 p-0 pe-md-3">
              <div className="m-0 p-0">
                <video className="w-100" autoPlay muted loop>
                  <source src="/PayoutPersuit.mp4" type="video/mp4"></source>
                </video>
              </div>
            </div>
            <div className="col-12 col-md-6 p-0 ps-md-3 pt-3 pt-md-0 d-flex justify-content-center align-items-center">
              <div className="DTSC_Col Play_Game bg-transparent shadow-none py-0">
                <h2 className="DTSC_Heading text-black mb-0 text-uppercase">
                  A Ready-To-Play Game
                </h2>
                <div className="my-3">
                  <p>
                    Payout Pursuit is a groundbreaking Web3 skills-based racing
                    game that is played on browser. The V1 (Beta Version) is
                    ready-to-play, requiring no downloads and no wallet
                    connection.
                  </p>

                  <p>
                    V2 will see Web3 integration, allowing racers to race
                    against each other for crypto prizes. We will also introduce
                    cross chain connectivity to expand the player universe.
                  </p>

                  <p className="m-0">
                    Start honing your skills now to be ready to earn once
                    version 2 is unveiled!
                  </p>
                </div>
                <Link
                  className={`FooterMenuContainer_Link `}
                  to={"https://play.payoutpursuit.com/"}
                  target="_blank"
                >
                  <button className="white BtnStyle1 shadow-none">
                    Play Beta
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="DriftTokenSection pt-3 pt-md-5">
          <div className="DriftTokenSectionContainer row m-0 w-100 align-items-stretch position-relative ">
            <div
              className=" col-12 col-md-6 p-0 pe-md-3 rounded-4 position-relative"
              id="Presale_Form"
            >
              {isLoading && (
                <div
                  className="w-100 h-100 bg-white position-absolute rounded-4 d-flex justify-content-center align-items-center"
                  style={{ zIndex: 99 }}
                >
                  <img src={Loading} style={{ width: 50 }} alt="loading" />
                </div>
              )}

              <div
                className="DTSC_Col rounded-4 bg-white mt-4 mt-md-0 position-relative  "
                id="claim"
              >
                <h2 className="DTSC_Heading text-black mb-0 text-uppercase ">
                  Claim $DRIFT Token
                </h2>
                <div className="row m-0 mt-3 w-100">
                  <div className="d-flex align-items-start p-0">
                    <img alt="" src={dot} style={{ marginRight: 10 }} />
                    <p className="m-0">
                      Total Remaining Claims{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {numberWithCommas(Number(data?.tokensToClaim || 0))}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="NetworkButtons_Row row m-0 w-100">
                    <p className="p-0">Select Network</p>
                    <div className="col-12 col-xl-4 col-lg-6 col-sm-6  p-0 pe-lg-2 pe-sm-2 mb-2 mb-xl-0">
                      <button
                        onClick={() => open({ view: "Networks" })}
                        className={`BtnStyle2 ${
                          selectedNetworkId === 1 && chainId === 1
                            ? "active"
                            : ""
                        }`}
                      >
                        <img alt="" src={eth} className="me-1" />
                        ETH
                      </button>
                    </div>
                    <div className="col-12 col-xl-4 col-lg-6 col-sm-6 p-0 pe-xl-2 mb-2 mb-xl-0">
                      <button
                        onClick={() => open({ view: "Networks" })}
                        className={`BtnStyle2 ${
                          selectedNetworkId === 56 && chainId === 56
                            ? "active"
                            : ""
                        }`}
                      >
                        <img alt="" src={bnb} className="me-1" />
                        BNB
                      </button>
                    </div>
                    <div className="col-12 col-xl-4 col-lg-6 col-sm-6 p-0">
                      <button
                        onClick={() => open({ view: "Networks" })}
                        className={`BtnStyle2 ${
                          selectedNetworkId === 137 && chainId === 137
                            ? "active"
                            : ""
                        }`}
                      >
                        <img alt="" src={polygon} className="me-1" />
                        Polygon
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-5 position-relative">
                  {user?.balance != 0 ? (
                    <form className="position-relative">
                      <div className="row p-0 m-0 ">
                        <div className="col-12 p-0">
                          <label>
                            <p>PreDrift Tokens</p>
                          </label>
                          <div className="input align-items-center">
                            <input
                              readOnly
                              className="input-field"
                              type="number"
                              name="no_of_tokens"
                              id="no_of_tokens"
                              value={
                                ConvertNumber(Number(user?.balance), true) || 0
                              }
                              style={{ marginRight: 15 }}
                            />
                            <img src={token} alt="" width={32} height={32} />
                          </div>
                        </div>
                      </div>
                      <div className="row p-0 m-0 mt-3">
                        <div className="col-12 col-xl-6 ps-0 pe-0 pe-xl-2">
                          <label>
                            <p>Staked Tokens</p>
                          </label>
                          <div className="input align-items-center">
                            <input
                              readOnly
                              className="input-field"
                              type="number"
                              name="no_of_tokens"
                              id="no_of_tokens"
                              value={user?.Staked || 0}
                              style={{ marginRight: 15 }}
                            />
                            <img src={token} alt="" width={32} height={32} />
                          </div>
                        </div>
                        <div
                          className="
                      col-12 col-xl-6 mt-4 mt-xl-0 pe-0 ps-0 ps-xl-2"
                        >
                          <label>
                            <p>Dynamic Tokens</p>
                          </label>
                          <div className="input align-items-center">
                            <input
                              readOnly
                              className="input-field"
                              type="number"
                              name="no_of_tokens"
                              id="no_of_tokens"
                              value={user?.Dynamic || 0}
                              style={{ marginRight: 15 }}
                            />

                            <img src={token} alt="" width={32} height={32} />
                          </div>
                        </div>
                      </div>

                      <div className="d-flex mt-5 flex-column align-items-baseline justify-content-between flex-xxl-row align-items-xxl-center">
                        <div className="mb-3 mb-xxl-0">
                          {user?.is_allowed ? (
                            <button
                              className="pinkBtn BtnStyle1"
                              onClick={handleSubmit}
                            >
                              Claim $Drift
                            </button>
                          ) : (
                            <button
                              className="pinkBtn BtnStyle1"
                              onClick={allow}
                            >
                              Claim $Drift
                            </button>
                          )}
                        </div>
                        <Link
                          to="/utilities"
                          style={{ fontWeight: 800 }}
                          className="text-uppercase"
                        >
                          Learn About Coin Utility
                        </Link>
                      </div>
                    </form>
                  ) : (
                    <div
                      style={{ height: 264 }}
                      className="white rounded-4  p-3 d-flex align-items-center justify-content-center"
                    >
                      {user?.claimed && user?.balance == 0 ? (
                        <div className="d-flex flex-column justify-content-center align-items-center">
                          <img src={driftLogo} height={100} />
                          <p className="m-0 p-0 mt-3 text-center  align-self-center">
                            🎉{" "}
                            <span className="Home_Hero_Section_SubHeading fw-bold text-uppercase text-black">
                              Congratulations!
                            </span>
                            <br />
                            You've successfully claimed your Drift Token!{" "}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="m-0 p-0 mt-3 text-center  fw-bold">
                            No Presale DRIFT tokens found in connected wallet.
                          </p>
                          <p className="m-0 p-0 mt-3 text-center  ">
                            Unable to claim tokens at the moment.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 p-0 ps-md-3 pt-3 pt-md-0 ">
              <div className="p-0 h-100">
                <div className="DTSC_Col rounded-4 bg-white h-100 d-flex flex-column justify-content-center align-items-center">
                  <h2 className="DTSC_Heading text-black  mb-0 text-uppercase">
                    Presale Concluded!
                  </h2>
                  <p className="mt-3 text-center">
                    Claim your $DRIFT tokens now before the official launch!
                    <br />
                    Don't miss out on this opportunity to secure your stake.
                  </p>
                  <div>
                    <img src={presale_ended} className="img-fluid" />
                  </div>
                </div>
              </div>
              {/* <div className="py-3">
                <div className="DTSC_Col rounded-4 bg-white">
                  <p className="DTSC_SubHeading mb-0 text-uppercase fw-bold text-black">
                  Ambassador Payout to date
                  </p>
                  <h2 className="DTSC_Heading text-black mb-0">
                   ${(data?.ambassadors_payout * ethPrice || 0).toFixed()}
                  
              <div className="p-0">
                <div className="DTSC_Col rounded-4 bg-white">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="DTSC_SubHeading mb-0 text-uppercase fw-bold text-black">
                      Top Ambassadors
                    </p>

                    <img src={subtract} />
                  </div>

                  
                </div>
              </div> */}
            </div>
          </div>
        </section>

        <section className="TeamSection mt-5">
          <div className="TeamContainer">
            <h1 className="Home_Hero_Section_Heading text-uppercase mb-0 text-black">
              A Strong team
            </h1>
            <div className="mt-5 d-flex w-100 justify-content-between flex-column flex-lg-row">
              <div className="TeamSection_Col rounded-4 bg-white  d-flex flex-column align-items-center">
                <img alt="" src={calendar} width={41} height={50} />
                <h2 className="TeamSection_CounterNumber  mb-2 text-center text-uppercase">
                  50 Years
                </h2>
                <p className="TeamSection_CounterName mb-0 text-center">
                  Combined Web3 Experience
                </p>
              </div>
              <div className="TeamSection_Col rounded-4 bg-white  d-flex flex-column align-items-center mx-0 mx-lg-5 my-3 my-lg-0">
                <img alt="" src={money} width={41} height={50} />
                <h2 className="TeamSection_CounterNumber mb-2  text-center text-uppercase">
                  50 Million
                </h2>
                <p className="TeamSection_CounterName mb-0  text-center">
                  Dollars Raised
                </p>
              </div>
              <div className="TeamSection_Col rounded-4 bg-white  d-flex flex-column align-items-center">
                <img alt="" src={gold} width={41} height={50} />
                <h2 className="TeamSection_CounterNumber mb-2   text-center text-uppercase">
                  800 MILLION+
                </h2>
                <p className="TeamSection_CounterName mb-0   text-center">
                  Valuation of Projects Team Has Worked For
                </p>
              </div>
            </div>
            <div className="TeamMember_Row rounded-4 bg-transparent shadow-none mt-5">
              <div className="TeamMember row d-flex justify-content-around">
                <div className="TeamMember_Profile col-12 d-flex flex-column text-center align-items-center col-lg-3 col-sm-6">
                  <div className="TeamMember_Profile_Container bg-white p-3 rounded-4">
                    <img
                      alt=""
                      className="TeamMemberProfile_Picture mb-4"
                      src={josh}
                    ></img>
                    <p className="TeamMemberProfile_Name text-black text-capitalize mb-1">
                      Joshua Chand
                    </p>
                    <p className="TeamMemberProfile_Position mb-3">
                      Head of Operations / Interim CEO
                    </p>
                    <p className="TeamMemberProfile_Bio">
                      Joshua Chand is a experienced professional at the helm of
                      operations and interim leadership, leveraging a wealth of
                      experience across a diverse spectrum of Web3 projects. As
                      Head of Operations and interim CEO, he embodies a
                      strategic blend of operational expertise and visionary
                      leadership, steering organizations through the dynamic
                      landscapes of decentralized technologies.
                    </p>
                    <div className="TeamMemberProfile_Socials mt-auto">
                      <Link
                        to={"https://twitter.com/TheDriftToken"}
                        target="_blank"
                      >
                        <img alt="" src={twitter} className="SocialIcon me-2" />
                      </Link>
                      <Link
                        to={"https://www.linkedin.com/in/josh-chand"}
                        target="_blank"
                      >
                        <img alt="" src={linkedin} className="SocialIcon" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="TeamMember_Profile col-12 d-flex flex-column text-center  align-items-center col-lg-3 col-sm-6 mt-5 mt-sm-0">
                  <div className="TeamMember_Profile_Container bg-white p-3 rounded-4">
                    <img
                      alt=""
                      className="TeamMemberProfile_Picture mb-4"
                      src={paul}
                    ></img>
                    <p className="TeamMemberProfile_Name text-black mb-1">
                      Paul de Havilland
                    </p>
                    <p className="TeamMemberProfile_Position mb-3">
                      Head of Web3 Marketing
                    </p>
                    <p className="TeamMemberProfile_Bio">
                      Paul de Havilland is a experienced marketing strategist
                      with a prolific track record in the dynamic landscapes of
                      NFTs, GameFi, the metaverse, and various platforms within
                      the Web3 space. As Head of Web3 Marketing, Paul brings a
                      wealth of experience and a history of successes in
                      crafting and executing innovative marketing campaigns that
                      resonate with diverse audiences.
                    </p>
                    <div className="TeamMemberProfile_Socials mt-auto">
                      <Link
                        to={"https://twitter.com/pauliedehav"}
                        target="_blank"
                      >
                        <img
                          alt=""
                          src={twitter}
                          className="SocialIcon me-2 "
                        />
                      </Link>
                      <Link
                        to={"https://www.linkedin.com/in/pauldehavilland/"}
                        target="_blank"
                      >
                        <img alt="" src={linkedin} className="SocialIcon" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="TeamMember_Profile col-12 d-flex flex-column  text-center align-items-center col-lg-3 col-sm-6 mt-5 mt-lg-0">
                  <div className="TeamMember_Profile_Container bg-white p-3 rounded-4">
                    <img
                      alt=""
                      className="TeamMemberProfile_Picture mb-4"
                      src={michael}
                    ></img>
                    <p className="TeamMemberProfile_Name text-black text-capitalize mb-1">
                      Michael Tabone
                    </p>
                    <p className="TeamMemberProfile_Position mb-3">
                      Head of Strategy
                    </p>
                    <p className="TeamMemberProfile_Bio">
                      As a strategic visionary, Mike has played a pivotal role
                      in shaping the narrative of blockchain technology. His
                      tenure at Cointelegraph, a leading source of news and
                      insights in the crypto space, has equipped him with a deep
                      understanding of the industry's nuances and an acute
                      awareness of emerging trends.
                    </p>
                    <div className="TeamMemberProfile_Socials mt-auto">
                      <Link to={"https://twitter.com/EconDAO"} target="_blank">
                        <img
                          alt=""
                          src={twitter}
                          className="SocialIcon me-2 "
                        />
                      </Link>
                      <Link
                        to={"https://www.linkedin.com/in/michaeltabone/"}
                        target="_blank"
                      >
                        <img alt="" src={linkedin} className="SocialIcon" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="TeamMember_Profile col-12 d-flex flex-column  text-center align-items-center col-lg-3 col-sm-6 mt-5 mt-lg-0">
                  <div className="TeamMember_Profile_Container bg-white p-3 rounded-4">
                    <img
                      alt=""
                      className="TeamMemberProfile_Picture mb-4"
                      src={sophie}
                    ></img>
                    <p className="TeamMemberProfile_Name text-black text-capitalize mb-1">
                      Sophie Hendry
                    </p>
                    <p className="TeamMemberProfile_Position mb-3">
                      Head of Design
                    </p>
                    <p className="TeamMemberProfile_Bio">
                      Sophie Hendry stands at the forefront of design innovation
                      in the Web3 landscape, bringing a wealth of experience and
                      creative acumen to her role as Head of Design. With a
                      diverse background spanning various Web3 entities,
                      including DAOs, the metaverse, NFTs, and platforms, Sophie
                      is a trailblazer in crafting immersive and visually
                      compelling digital experiences.
                    </p>
                    <div className="TeamMemberProfile_Socials mt-auto">
                      <Link
                        to={"https://twitter.com/spinkick_eth"}
                        target="_blank"
                      >
                        <img
                          alt=""
                          src={twitter}
                          className="SocialIcon me-2 "
                        />
                      </Link>
                      <Link
                        to={"https://www.linkedin.com/in/sophiehendry/"}
                        target="_blank"
                      >
                        <img alt="" src={linkedin} className="SocialIcon" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="RoadmapSection mt-5 d-flex">
        <div className="container-lg" style={{ display: "block" }}>
          <h1 className="Home_Hero_Section_Heading text-uppercase mb-0 text-white">
            Road Map
          </h1>
          <div className="Roadmap_Row  rounded-4  bg-black mt-5">
            <h1 className="Roadmap_Row_Heading text-white mb-0 text-uppercase">
              Presale
            </h1>
            <div className="PresaleContainer mt-3 mt-sm-5 row m-0 w-100">
              <div className="col-12 ">
                <div
                  className="Presale_Col rounded-4 text-white h-100"
                  style={{ background: "rgba(51, 50, 50, 0.6)" }}
                >
                  <p className="Presale_Col_Heading text-white text-uppercase fw-bold">
                    Check List
                  </p>
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <ul className="list-group mb-0 p-0">
                        <li className="list-group-item p-0 border-0 mb-1 d-flex align-items-start bg-transparent">
                          <img alt="" src={checked} className="me-2" />
                          Website 2.0 Live
                        </li>
                        <li className="list-group-item p-0 border-0 mb-1 d-flex align-items-start bg-transparent">
                          <img alt="" src={checked} className="me-2" />
                          V1 Game Playable
                        </li>
                        <li className="list-group-item p-0 border-0 mb-1 d-flex align-items-start bg-transparent">
                          <img alt="" src={checked} className="me-2" />
                          First 10 Gold Ambassadors on-boarded
                        </li>

                        <li className="list-group-item p-0 border-0 mb-1 d-flex align-items-start bg-transparent">
                          <img alt="" src={checked} className="me-2" />
                          Telegram Open
                        </li>
                        <li className="list-group-item p-0 border-0 mb-1 d-flex align-items-start bg-transparent">
                          <img alt="" src={checked} className="me-2" />
                          Organize Twitter AMAs (Spaces)
                        </li>
                        <li className="list-group-item p-0 border-0 mb-1 d-flex align-items-start bg-transparent">
                          <img alt="" src={checked} className="me-2" />
                          Presale Warm Up Lap opens ($250K)
                        </li>
                        <li className="list-group-item p-0 border-0 mb-1 d-flex align-items-start bg-transparent">
                          <img alt="" src={checked} className="me-2" />
                          Ambassador Program expansion
                        </li>
                        <li className="list-group-item p-0 border-0 mb-0 d-flex align-items-start bg-transparent">
                          <img alt="" src={checked} className="me-2" />
                          Presale Warm Up Lap complete
                        </li>
                        <li className="list-group-item p-0 border-0 mb-1 d-flex align-items-start bg-transparent">
                          <img alt="" src={checked} className="me-2" />
                          Top 3 Ambassadors Presale Warmup Lap Awarded ($4.5k
                          total)
                        </li>
                        <li className="list-group-item p-0 border-0 mb-1 d-flex align-items-start bg-transparent">
                          <img alt="" src={checked} className="me-2" />
                          Presale Lap 1 opens ($500K)
                        </li>
                        <li className="list-group-item p-0 border-0 mb-1 d-flex align-items-start bg-transparent">
                          <img alt="" src={checked} className="me-2" />
                          Crypto publication press coverage (Cointelegraph,
                          additional coverage in various crypto media outlets)
                        </li>
                        <li className="list-group-item p-0 border-0 mb-0 d-flex align-items-start bg-transparent">
                          <img alt="" src={checked} className="me-2" />
                          Presale Lap 1 complete
                        </li>
                        <li className="list-group-item p-0 border-0 mb-1 d-flex align-items-start bg-transparent">
                          <img alt="" src={checked} className="me-2" />
                          Top 3 Ambassadors Presale Lap 1 Awarded ($15k total)
                        </li>
                        <li className="list-group-item p-0 border-0 mb-1 d-flex align-items-start bg-transparent">
                          <img alt="" src={checked} className="me-2" />
                          Presale Final Lap opens ($750K)
                        </li>
                        <li className="list-group-item p-0 border-0 mb-1 d-flex align-items-start bg-transparent">
                          <img alt="" src={checked} className="me-2" />
                          Begin Web3 ad campaigns (Twitter,Youtube, Twitch,
                          TikTok, Reddit)
                        </li>
                        <li className="list-group-item p-0 border-0 mb-1 d-flex align-items-start bg-transparent">
                          <img alt="" src={checked} className="me-2" />
                          Twitter, Youtube, Twitch GameFi ad campaign planning
                        </li>
                        <li className="list-group-item p-0 border-0 mb-1 d-flex align-items-start bg-transparent">
                          <img alt="" src={checked} className="me-2" />
                          Open & staff Discord
                        </li>
                      </ul>
                    </div>
                    <div className="col-12 col-lg-6 customStartBorder ">
                      <ul className="list-group mb-0 p-0">
                        <li className="list-group-item p-0 border-0 mb-1 d-flex align-items-start bg-transparent">
                          <img alt="" src={unchecked} className="me-2" />
                          Web3 campaign planning (Twitter, Youtube, TikTok,
                          Reddit)
                        </li>
                        <li className="list-group-item p-0 border-0 mb-1 d-flex align-items-start bg-transparent">
                          <img alt="" src={unchecked} className="me-2" />
                          Top 3 Ambassadors Presale Final Lap Awarded ($22.5k
                          total)
                        </li>

                        <li className="list-group-item p-0 border-0 mb-1 d-flex align-items-start bg-transparent">
                          <img alt="" src={unchecked} className="me-2" />
                          Begin GameFi Marketing (KOL-driven, Youtube, Twitter,
                          Twitch, Chinese social media KOLs)
                        </li>

                        <li className="list-group-item p-0 border-0 mb-1 d-flex align-items-start bg-transparent">
                          <img alt="" src={unchecked} className="me-2" />
                          Broad press outreach
                        </li>
                        <li className="list-group-item p-0 border-0 mb-1 d-flex align-items-start bg-transparent">
                          <img alt="" src={unchecked} className="me-2" />
                          Continued Twitter, Youtube, Twitch, TikTok, Reddit
                          Web3 and GameFi campaigns
                        </li>

                        <li className="list-group-item p-0 border-0 mb-1 d-flex align-items-start bg-transparent">
                          <img src={unchecked} className="me-2" />
                          China-market expansion in GameFi segment through
                          Chinese social media KOLs
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="Roadmap_Row  rounded-4  bg-black mt-5">
            <h1 className="Roadmap_Row_Heading text-white mb-0 text-uppercase">
              Launch
            </h1>
            <div className="PresaleContainer mt-3 mt-sm-5 row m-0 w-100">
              <div className="col-12 ">
                <div
                  className="Presale_Col rounded-4 text-white"
                  style={{ background: "rgba(51, 50, 50, 0.6)" }}
                >
                  <p className="Presale_Col_Heading text-white text-uppercase fw-bold m-0">
                    Coming Soon
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="TokenomicsSection">
        <div className="TokenomicsContainer">
          <div className="container-lg">
            <h1 className="Home_Hero_Section_Heading text-uppercase">
              Tokenomics
            </h1>
            <div>
              <div className="d-flex justify-content-between mt-5 flex-column flex-lg-row">
                <div className="Tokenomics_Col rounded-4 me-0 bg-white py-3 w-100 me-lg-5 mb-5 mb-lg-0 d-flex flex-column justify-content-between ">
                  <div className=" d-flex align-items-center justify-content-start text-center py-3 px-3 px-sm-5">
                    <h1 className="Tokenomics_Col_Heading text-black mb-0 text-start text-uppercase">
                      Token Supply Allocation Breakdown
                    </h1>
                  </div>
                  <div
                    className="d-flex  align-items-center justify-content-between
                    flex-column flex-sm-row px-3 px-sm-5 my-3
                  "
                  >
                    <img src={breakdown} alt="" />

                    <ul className="list-group mt-4 mt-sm-0">
                      <li className="list-group-item p-0 border-0 mb-1 d-flex align-items-start">
                        <img src={Presale} className="me-3" alt="Presale" />
                        <div>
                          <p className="m-0 b-0 lh-1"> Presale</p>
                          <span>57%</span>
                        </div>
                      </li>
                      <li className="list-group-item p-0 border-0 mb-1 d-flex align-items-start">
                        <img alt="LP" src={Lp} className="me-3" />
                        <div>
                          <p className="m-0 b-0 lh-1"> LP</p>
                          <span>21%</span>
                        </div>
                      </li>
                      <li className="list-group-item p-0 border-0 mb-1 d-flex align-items-start">
                        <img
                          alt="Reserve Tank"
                          src={ReserveTank}
                          className="me-3"
                        />
                        <div>
                          <p className="m-0 b-0 lh-1"> Reserve Tank</p>
                          <span>13%</span>
                        </div>
                      </li>
                      <li className="list-group-item p-0 border-0 mb-1 d-flex align-items-start">
                        <img src={Burn} className="me-3" alt="Burn" />
                        <div>
                          <p className="m-0 b-0 lh-1"> Burn</p>
                          <span>5%</span>
                        </div>
                      </li>
                      <li className="list-group-item p-0 border-0 d-flex align-items-start">
                        <img
                          src={Ambassador}
                          className="me-3"
                          alt="Ambassador"
                        />
                        <div>
                          <p className="m-0 b-0 lh-1">Ambassador</p>
                          <span>4%</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="Tokenomics_Col rounded-4 w-100 bg-white py-3 d-flex flex-column justify-content-around">
                  <div className=" d-flex align-items-center justify-content-start text-center py-3 px-3 px-sm-5">
                    <h1 className="Tokenomics_Col_Heading text-black mb-0 text-uppercase">
                      Tax Breakdown
                    </h1>
                  </div>
                  <div className="">
                    <div className="BreakdownRow  d-flex justify-content-between border-top px-3 px-sm-5">
                      <div className="Bar  w-75 me-0  bg-white d-flex justify-content-start align-items-center ">
                        <p className="Breakdowwn_Heading mb-0">
                          Liquidity Reversion
                        </p>
                      </div>
                      <div className="Bar bg-white  w-25 d-flex justify-content-end align-items-center border-start ">
                        <p className="mb-0">1%</p>
                      </div>
                    </div>
                    <div className="BreakdownRow  d-flex justify-content-between border-top px-3 px-sm-5">
                      <div className="Bar  w-75 me-0  bg-white d-flex justify-content-start align-items-center ">
                        <p className="Breakdowwn_Heading mb-0">Revenue Share</p>
                      </div>
                      <div className="Bar bg-white  w-25 d-flex justify-content-end align-items-center border-start ">
                        <p className="mb-0">1%</p>
                      </div>
                    </div>
                    <div className="BreakdownRow  d-flex justify-content-between border-top px-3 px-sm-5">
                      <div className="Bar  w-75 me-0  bg-white d-flex justify-content-start align-items-center ">
                        <p className="Breakdowwn_Heading mb-0">Game Pool</p>
                      </div>
                      <div className="Bar bg-white  w-25 d-flex justify-content-end align-items-center border-start ">
                        <p className="mb-0">3%</p>
                      </div>
                    </div>

                    <div className="BreakdownRow  d-flex justify-content-between border-top px-3 px-sm-5">
                      <div
                        className="Bar  w-75 me-0  bg-white d-flex justify-content-start align-items-center "
                        style={{
                          borderRadius: "0px 0px 0px 21px",
                        }}
                      >
                        <p className="Breakdowwn_Heading mb-0">Total</p>
                      </div>
                      <div
                        className="Bar bg-white  w-25 d-flex justify-content-end align-items-center border-start "
                        style={{
                          borderRadius: "0px 0px 21px 0px",
                        }}
                      >
                        <p className="mb-0">5%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row p-0 m-0 mt-5 d-flex justify-content-center">
                <div className=" col-12 col-xl-8  Tokenomics_Col rounded-4 me-0 py-3 bg-white  d-flex flex-column justify-content-between">
                  <div className=" d-flex align-items-center justify-content-start text-center py-3 px-3 px-sm-5">
                    <h1 className="Tokenomics_Col_Heading text-black mb-0 text-uppercase">
                      Presale Use of Funds
                    </h1>
                  </div>
                  <div
                    className="d-flex  align-items-center justify-content-between
                    flex-column flex-sm-row px-3 px-sm-5 my-3
                    
                  "
                  >
                    <img src={presaleFunds} alt="" />
                    <ul className="list-group mt-4 mt-sm-0">
                      <li className="list-group-item p-0 border-0 mb-1 d-flex align-items-start">
                        <img
                          src={Presale}
                          className="me-3"
                          alt="Initiation LP"
                        />

                        <div>
                          <p className="m-0 b-0 lh-1"> Initiation LP</p>
                          <span>44%</span>
                        </div>
                      </li>
                      <li className="list-group-item p-0 border-0 mb-1 d-flex align-items-start">
                        <img alt="Marketing" src={Lp} className="me-3" />
                        <div>
                          <p className="m-0 b-0 lh-1 "> Marketing</p>
                          <span>28%</span>
                        </div>
                      </li>
                      <li className="list-group-item p-0 border-0 mb-1 d-flex align-items-start">
                        <img
                          alt="Development"
                          src={ReserveTank}
                          className="me-3"
                        />
                        <div>
                          <p className="m-0 b-0 lh-1"> Development</p>
                          <span>17%</span>
                        </div>
                      </li>
                      <li className="list-group-item p-0 border-0 mb-1 d-flex align-items-start">
                        <img
                          src={Burn}
                          className="me-3"
                          alt="Listings/Partnerships"
                        />

                        <div>
                          <p className="m-0 b-0 lh-1">Listings/Partnerships</p>
                          <span>11%</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
