import {
  useSwitchNetwork,
  useWeb3ModalAccount,
} from "@web3modal/ethers5/react";
import React, { useEffect, useState } from "react";
import { SupportedToken } from "../config";
import { useDebounce } from "use-debounce";

const TokenModal = ({ state }) => {
  const { isFirstModal, setIsFirstModal, selectedToken, setSelectedToken } =
    state;
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 1000);
  const [tokens, setTokens] = useState(SupportedToken);
  const onTokenChange = async (token) => {
    console.log("Change Token");
  };
  useEffect(() => {
    if (debouncedQuery) {
      const filterRes = SupportedToken.filter(
        (token) =>
          token?.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          token?.currency.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      setTokens(filterRes);
    } else {
      setTokens(SupportedToken);
    }
  }, [debouncedQuery, query]);

  return (
    <div
      className="modal fade"
      id="tokenModal"
      tabIndex="-1"
      aria-labelledby="tokenModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content bodyBgColor">
          <div className="modal-body">
            <div className="d-flex align-items-center justify-content-between">
              <h1 className="modal-title fs-5 fw-semibold" id="tokenModal">
                Select a token
              </h1>
              <button
                type="button"
                className="btn-close btn-sm shadow-none"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="d-flex align-items-center mb-3 bg-light px-3 rounded-5 my-3">
              <label htmlFor="TokenSearchInput">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </label>
              <input
                type="text"
                name="TokenSearchInput"
                className="form-control bg-light border-0 shadow-none FS_14"
                id="TokenSearchInput"
                placeholder="Search"
                aria-label="Search"
                value={query || ""}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="list-group d-flex flex-column gap-2 rounded-0">
              {tokens.map((token, index) => {
                return (
                  <button
                    type="button"
                    className={`${
                      // token?.chainId === selectedToken?.chainId &&
                      // "btn bg-white fst-italic"
                      ""
                    } list-group-item-action d-flex align-items-center gap-2 removeBtnTransform border-0 p-3 rounded-3`}
                    key={index}
                    // disabled={token?.chainId === selectedChain?.chainId}
                    onClick={() => onTokenChange(token)}
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <img
                      src={token?.icon || ""}
                      alt={token?.name || ""}
                      width={"40px"}
                    />
                    <span className="mb-0 fw-semibold lh-1">
                      {token?.name || ""}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenModal;