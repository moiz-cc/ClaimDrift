import React, { useEffect } from "react";
import Hamburger from "../Assets/Images/Hamburger_Icon.svg";
import Logo from "../Assets/Images/DriftLogo.svg";
import MobileLogo from "../Assets/Images/DriftLogo.svg";
import { Link, useLocation } from "react-router-dom";
import Close from "../Assets/Images/Close.svg";
import Wallet from "../Assets/Images/wallet.svg";
import { useWeb3Modal, useWeb3ModalState } from "@web3modal/ethers5/react";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { useSelector } from "react-redux";

function Header() {
  const location = useLocation();
  const { open } = useWeb3Modal();
  const { address, isConnected, chainId } = useWeb3ModalAccount();
  const { selectedNetworkId } = useWeb3ModalState();
  const { web3Inst_ETH } = useSelector((state) => state.Blockchain);

  const supportChain = [11155111];

  useEffect(() => {
    if (
      isConnected &&
      chainId &&
      !supportChain.includes(chainId) &&
      web3Inst_ETH?.currentProvider?.request
    ) {
      // (async () => await open({ view: "Networks" }))();
      (async () =>
        web3Inst_ETH.currentProvider
          .request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x1" }],
          })
          .catch((e) => console.log(e)))();
    }
  }, [selectedNetworkId, chainId, isConnected, web3Inst_ETH]);

  const ToggleSidebar = () => {
    const SideBar = document.querySelector(".SideBar");
    SideBar.classList.toggle("Show");
  };

  return (
    <header className="Header">
      <div className="container-lg">
        <div className="d-flex align-items-center py-2 justify-content-between p-0">
          <div className="HeaderLeft">
            <Link to={"/"}>
              <img src={Logo} className="HeaderLogo" alt="Logo"></img>
              <img src={MobileLogo} className=" MobileLogo " alt="Logo"></img>
            </Link>
          </div>

          <div className="HeaderMenuContainer ">
            <ul className="HeaderMenuItems m-0 list-group d-flex align-items-center flex-row">
              <li className="list-group-item border-0 bg-transparent p-0">
                <Link
                  className={`HeaderMenuContainer_Link text-uppercase ${
                    location.pathname === "/" ? "Active" : ""
                  }`}
                  to={"/"}
                >
                  Home
                </Link>
              </li>
              <li className="list-group-item border-0 bg-transparent p-0 mx-4">
                <Link
                  className={`HeaderMenuContainer_Link text-uppercase ${
                    location.pathname === "/utilities" ? "Active" : ""
                  }`}
                  to={"/utilities"}
                >
                  Utilities
                </Link>
              </li>

              <li className="list-group-item border-0 bg-transparent p-0">
                <Link
                  className={`HeaderMenuContainer_Link text-uppercase ${
                    location.pathname === "/ambassador" ? "Active" : ""
                  }`}
                  to={"/ambassador"}
                >
                  Amba$$ador
                </Link>
              </li>
              <li className="list-group-item border-0 bg-transparent p-0 ms-4">
                <Link
                  className={`HeaderMenuContainer_Link text-uppercase ${
                    location.pathname === "/staking-portal" ? "Active" : ""
                  }`}
                  to={"/staking-portal"}
                >
                  Staking Portal
                </Link>
              </li>
            </ul>
          </div>
          <div className="HeaderRight d-flex align-items-center">
            <div className="HeaderBtnContainer">
              {/* <Link
              to={"https://play.payoutpursuit.com/"}
              style={{ color: "#ff008c" }}
              target="_blank"
            >
              <button className="white BtnStyle1">Play</button>
            </Link> */}
              <button className="transparent BtnStyle1" onClick={() => open()}>
                {!isConnected ? (
                  <p className="m-0 text-white">Connect Wallet</p>
                ) : (
                  <p className="m-0 ConnectedWalletAddress text-white">
                    <span className="text-white ">{address}</span>
                  </p>
                )}
              </button>
            </div>
          </div>
          <div className="HeaderHamburger">
            <img
              src={Wallet}
              onClick={() => open()}
              className="me-3"
              style={{ width: 20, height: 20 }}
              alt="wallet"
            />

            <img
              onClick={ToggleSidebar}
              style={{ width: 20, height: 20 }}
              src={Hamburger}
              alt="Menu"
            />
          </div>
        </div>

        <div className="SideBar ">
          <div className="SideBarContainer">
            <div className="SideBarHeader py-3 px-3 d-flex align-items-center">
              <img
                src={Close}
                style={{ width: 20, height: 20 }}
                onClick={ToggleSidebar}
                alt="Close"
              />
            </div>
            <div className="SideBar_MenuContainer mt-3">
              <ul className="m-0 list-group d-flex  flex-column">
                <li
                  className={`list-group-item border-0 rounded-0 SideBarMenu_ListItem py-2 px-3 ${
                    location.pathname === "/" ? "Active" : ""
                  }`}
                >
                  <Link
                    className={`HeaderMenuContainer_Link   ${
                      location.pathname === "/" ? "Active" : ""
                    }`}
                    to={"/"}
                  >
                    Home
                  </Link>
                </li>
                <li
                  className={`list-group-item border-0 rounded-0 SideBarMenu_ListItem py-2 px-3 ${
                    location.pathname === "/utilities" ? "Active" : ""
                  }`}
                >
                  <Link
                    className={`HeaderMenuContainer_Link ${
                      location.pathname === "/utilities" ? "Active" : ""
                    }`}
                    to={"/utilities"}
                  >
                    Utilities
                  </Link>
                </li>
                <li
                  className={`list-group-item border-0 rounded-0 SideBarMenu_ListItem py-2 px-3 ${
                    location.pathname === "/ambassador" ? "Active" : ""
                  }`}
                >
                  <Link
                    className={`HeaderMenuContainer_Link ${
                      location.pathname === "/ambassador" ? "Active" : ""
                    }`}
                    to={"/ambassador"}
                  >
                    Amba$$ador
                  </Link>
                </li>
                <li
                  className={`list-group-item border-0 rounded-0 SideBarMenu_ListItem py-2 px-3 ${
                    location.pathname === "/staking-portal" ? "Active" : ""
                  }`}
                >
                  <Link
                    className={`HeaderMenuContainer_Link ${
                      location.pathname === "/staking-portal" ? "Active" : ""
                    }`}
                    to={"/staking-portal"}
                  >
                    Staking Portal
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
