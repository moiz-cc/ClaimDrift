import React, { useEffect, useState } from "react";
import {
  useSwitchNetwork,
  useWeb3ModalAccount,
} from "@web3modal/ethers5/react";
import chainlinkCCIPSmall from "../Assets/Images/chainlinkCCIPSmall.png";
import TokenModal from "../Component/TokenModal";
import GetTokenByChain from "../Helpers/GetTokenChain";
import SupportTokens from "../config/SupportTokens";
const steps = [
  { title: "Starting Swap", content: "Content for Step 1" },
  { title: "Crossing Bridge" },
  { title: "Approving Transfer" },
  { title: "Complete" },
];

const CrossSwap = () => {
  const { switchNetwork } = useSwitchNetwork();
  const { chainId } = useWeb3ModalAccount();
  const [activeStep, setActiveStep] = useState(0);
  const [isFirstModal, setIsFirstModal] = useState(true);
  const [selectedChain, setSelectedChain] = useState(null);
  const [convSelectedChain, setConvSelectedChain] = useState(null);
  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };
  const CalculateValue = (e) => {
    // This is Temporary
    const conValue = e.target.value * 2;
    setSelectedChain({
      ...selectedChain,
      value: e.target.value,
    });
    setConvSelectedChain({ ...convSelectedChain, value: conValue });
    switch (selectedChain?.chainId) {
      case 1:
        // ETH
        console.log("Calc ETH");
        break;
      case 137:
        // POLYGON
        console.log("Calc POLYGON");
        break;
      case 56:
        // BNB
        console.log("Calc BNB");
        break;

      default:
        break;
    }
  };
  const SwitchChain = async () => {
    const oldSelectedChain = { ...selectedChain };
    const oldConvSelectedChain = { ...convSelectedChain };
    await switchNetwork(oldConvSelectedChain?.chainId);
    setSelectedChain(oldConvSelectedChain);
    setConvSelectedChain(oldSelectedChain);
  };

  useEffect(() => {
    if (chainId) {
      const token = GetTokenByChain(chainId);
      setSelectedChain(token);
      const filterTokenChains = SupportTokens?.filter(
        (stoken) => stoken?.chainId !== token?.chainId
      )[0];

      setConvSelectedChain(filterTokenChains);
    }
  }, [chainId]);

  return (
    <div className="CrossSwap">
      <div className="CrossSwapSection ">
        <div className="CrossSwapSection_Container m-auto container-lg">
          <div className="row m-0 w-100 Home_Hero_Section">
            <div className="col-12 col-md-6 p-0 ">
              <h1 className="Home_Hero_Section_Heading mt-2 fw-bold text-white text-uppercase">
                DRIFT Staking Pool
              </h1>

              <p className="m-0 p-0 my-4 text-white">
                The rewards pool for staking DRIFT tokens will be active for 30
                days from Launch date. Unstaking before 30 day period will
                result in a penalty charge. Once the staking pool has ended,
                users are requested to unstake their tokens and fully claim
                their rewards. Secondary staking pools will be launched after
                30-day staking pool.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center gap-3 justify-content-center my-5">
        <div className="d-flex flex-column gap-2">
          <div className="card bg-light border-0 rounded-3">
            <h1 className="fs-4 fw-bold mb-0 text-start pt-3 ps-3">Bridge</h1>
            <div className="card-body text-center pt-2">
              <form action="">
                <div
                  className="InputContainer border bg-white rounded-3 py-3 py-md-2 px-3"
                  style={{ marginBottom: "-0.8rem" }}
                >
                  <div className="d-flex align-items-start">
                    <div className="w-100">
                      <label
                        htmlFor="fromBNBChainMainnet"
                        className="text-start d-block w-100 FS_14 mb-1"
                      >
                        From:{" "}
                        <strong>
                          {selectedChain?.secondaryName || ""} Chain
                        </strong>
                      </label>
                      <input
                        className="input-field pe-2 fs-2 fw-bold"
                        type="number"
                        name="fromBNBChainMainnet"
                        id="fromBNBChainMainnet"
                        value={selectedChain?.value || 0}
                        onChange={CalculateValue}
                      />
                    </div>
                    <div className="d-flex flex-column align-items-end gap-1">
                      <button
                        type="button"
                        className="btn btn-sm d-flex align-items-center gap-1 border rounded-4 justify-content-center px-3 FS_14 removeBtnTransform"
                        style={{ minWidth: "110px" }}
                        data-bs-toggle="modal"
                        data-bs-target="#tokenModal"
                        onClick={() => setIsFirstModal(true)}
                      >
                        <img
                          src={selectedChain?.icon || ""}
                          alt={selectedChain?.secondaryName || ""}
                          width={"18px"}
                        />
                        <span className="me-2">
                          {selectedChain?.secondaryName || ""}
                        </span>
                        <svg
                          width="8"
                          height="8"
                          viewBox="0 0 6 4"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.00008 3.76921L0.064209 0.833344H5.93594L3.00008 3.76921Z"
                            fill="black"
                            fillOpacity="0.3"
                          ></path>
                        </svg>
                      </button>

                      <div className="d-flex w-100 gap-1 justify-content-end">
                        <span className="FS_12 mb-0 text-nowrap">
                          Balance: 0.79
                        </span>
                        <button
                          type="button"
                          className="btn max-btn FS_12 border-0 fw-semibold p-0"
                        >
                          Max
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown">
                    <button
                      className="btn btn-sm d-flex align-items-center border rounded-4 px-3 FS_12 ms-auto removeBtnTransform mt-4 gap-1 dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src="./FavIcon.png" alt="BNB" width={"15px"} />
                      <span>DRIFT</span>
                    </button>
                    <ul className="dropdown-menu ">
                      <li>
                        <button
                          type="button"
                          className="dropdown-item btn btn-sm d-flex align-items-center px-3 FS_12 ms-auto removeBtnTransform gap-1"
                        >
                          <img src="./FavIcon.png" alt="BNB" width={"15px"} />
                          <span>DRIFT</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn px-2 py-1 border bg-light"
                  onClick={() => SwitchChain()}
                >
                  <svg
                    width="14"
                    height="18"
                    viewBox="0 0 14 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.66665 9.83335V3.85419L1.52081 6.00002L0.333313 4.83335L4.49998 0.666687L8.66665 4.83335L7.47915 6.00002L5.33331 3.85419V9.83335H3.66665ZM9.49998 17.3334L5.33331 13.1667L6.52081 12L8.66665 14.1459V8.16669H10.3333V14.1459L12.4791 12L13.6666 13.1667L9.49998 17.3334Z"
                      fill="black"
                    ></path>
                  </svg>
                </button>

                <div
                  className="InputContainer border bg-white rounded-3 py-3 py-md-2 px-3"
                  style={{ marginTop: "-0.8rem" }}
                >
                  <div className="d-flex align-items-start">
                    <div className="w-100">
                      <label
                        htmlFor="fromBNBChainMainnet"
                        className="text-start d-block w-100 FS_14 mb-1"
                      >
                        To:{" "}
                        <strong>
                          {convSelectedChain?.secondaryName || ""} Chain
                        </strong>
                      </label>
                      <input
                        readOnly
                        className="input-field pe-2 fs-2 fw-bold"
                        type="number"
                        name="fromBNBChainMainnet"
                        id="fromBNBChainMainnet"
                        value={convSelectedChain?.value || 0}
                      />
                    </div>
                    <div className="d-flex flex-column align-items-end gap-1">
                      <button
                        type="button"
                        className="btn btn-sm d-flex align-items-center gap-1 border rounded-4 justify-content-center px-3 FS_14 removeBtnTransform"
                        style={{ minWidth: "110px" }}
                        data-bs-toggle="modal"
                        data-bs-target="#tokenModal"
                        onClick={() => setIsFirstModal(false)}
                      >
                        <img
                          src={convSelectedChain?.icon || ""}
                          alt={convSelectedChain?.secondaryName || ""}
                          width={"18px"}
                        />
                        <span className="me-2">
                          {convSelectedChain?.secondaryName}
                        </span>
                        <svg
                          width="8"
                          height="8"
                          viewBox="0 0 6 4"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.00008 3.76921L0.064209 0.833344H5.93594L3.00008 3.76921Z"
                            fill="black"
                            fillOpacity="0.3"
                          ></path>
                        </svg>
                      </button>
                      <div className="d-flex w-100 gap-1 justify-content-end">
                        <span className="FS_12 mb-0 text-nowrap">
                          Balance: 0.79
                        </span>
                        <button
                          type="button"
                          className="btn max-btn FS_12 border-0 fw-semibold p-0"
                        >
                          Max
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown">
                    <button
                      className="btn btn-sm d-flex align-items-center border rounded-4 px-3 FS_12 ms-auto removeBtnTransform mt-4 gap-1 dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src="./FavIcon.png" alt="BNB" width={"15px"} />
                      <span>DRIFT</span>
                    </button>
                    <ul className="dropdown-menu ">
                      <li>
                        <button
                          type="button"
                          className="dropdown-item btn btn-sm d-flex align-items-center px-3 FS_12 ms-auto removeBtnTransform gap-1"
                        >
                          <img src="./FavIcon.png" alt="BNB" width={"15px"} />
                          <span>DRIFT</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                <button
                  type="button"
                  className="BtnStyle1 bg-pink fw-bold text-uppercase shadow-none text-white rounded-2 mt-4 w-100 FS_14 removeBtnTransform"
                  onClick={() => handleNext()}
                >
                  Insufficient balance on sending chain
                </button>
              </form>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2 justify-content-center">
            <span className="fw-bold text-light-emphasis">Powered by</span>{" "}
            <img src={chainlinkCCIPSmall || ""} alt="Powered By" />
          </div>
        </div>
        {/* <div className="StepperContainer ">
          <div className="stepper-vertical">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`step w-100 pb-2 pt-1 ${
                  index === activeStep || index <= activeStep ? "active" : ""
                }`}
              >
                <div className="step-circle">{index + 1}</div>
                <div className="step-title">{step?.title}</div>
                <div className={`step-content`}>
                  {index === 0 && (
                    <ul>
                      <li className="step-content">
                        Minimum Crosschain Amount is 0.08 BNB
                      </li>

                      <li className="step-content">
                        Maximum Crosschain Amount is 12,000 BNB
                      </li>
                      <li className="step-content">
                        Estimated Time of Crosschain Arrival is 10-30 min
                      </li>
                      <li className="step-content">
                        Crosschain amount larger than 2,100 BNB could take up to
                        12 hours
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
      <TokenModal
        state={{
          selectedChain,
          setSelectedChain,
          convSelectedChain,
          setConvSelectedChain,
          isFirstModal,
          setIsFirstModal,
          chain: "Eth",
        }}
      />
    </div>
  );
};

export default CrossSwap;
