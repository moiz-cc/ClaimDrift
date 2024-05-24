import React from "react";
import Close from "../Assets/Images/Close.svg";
import Error from "../Assets/Images/Error.svg";
import LoadingGif from "../Assets/Images/loading.gif";
import { useWeb3ModalState } from "@web3modal/ethers5/react";
import { Link } from "react-router-dom";

const GeneralModal = ({ state }) => {
  const { selectedNetworkId } = useWeb3ModalState();
  const {
    isOpen,
    setIsOpen,
    loading,
    setLoading,
    errors,
    setErrors,
    txHash,
    setTxHash,
    message,
    setMessage,
  } = state;

  const CloseTransactionModal = () => {
    setErrors({
      transaction: "",
    });
    setMessage("");
    setTxHash("");
    setIsOpen(false);
  };
  return (
    isOpen && (
      <div
        className="TransactionModal h-100 w-100 position-fixed top-0  d-flex justify-content-center align-items-center"
        style={{ background: "rgba(0,0,0,0.5)", zIndex: 999 }}
      >
        <div
          className="TransactionModalBox DTSC_Col bg-white rounded-4 p-4 position-relative"
          style={{ wordWrap: "break-word" }}
        >
          {loading ? (
            <>
              <img
                alt=""
                src={Close}
                className="position-sticky top-0 start-100"
                style={{ width: 16 }}
              />

              <div className="w-100 text-center">
                <img
                  alt=""
                  src={LoadingGif}
                  className=""
                  style={{ width: 50 }}
                />
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                className="btn p-0 text-center position-sticky top-0 start-100"
              >
                <img
                  alt=""
                  src={Close}
                  className="position-sticky top-0  start-100"
                  style={{ width: 16 }}
                  onClick={() => CloseTransactionModal()}
                />
              </button>
              {errors?.transaction ? (
                <div className="d-flex flex-column align-items-center">
                  <div
                    className="p-3 mb-3"
                    style={{
                      borderRadius: "100%",
                      backgroundColor: "#ff008c",
                    }}
                  >
                    <img alt="" src={Error} style={{ width: 30, height: 30 }} />
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
                  <p className="text-start text-black">{message || ""}</p>

                  {/* <p className="text-start text-black ">
                    <span className="fw-bold">Import contract :</span>{" "}
                    {selectedNetworkId === 1
                      ? process.env.REACT_APP_DRIFT_ETH
                      : selectedNetworkId === 56
                      ? process.env.REACT_APP_DRIFT_BNB
                      : selectedNetworkId === 137
                      ? process.env.REACT_APP_DRIFT_POLYGON
                      : null}{" "}
                    to view your tokens.{" "}
                  </p> */}

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
    )
  );
};

export default GeneralModal;
