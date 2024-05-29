import Web3 from "web3";

const METAMASK_POSSIBLE_ERRORS = {
  "-32700": {
    standard: "JSON RPC 2.0",
    message:
      "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.",
  },
  "-32600": {
    standard: "JSON RPC 2.0",
    message: "The JSON sent is not a valid Request object.",
  },
  "-32601": {
    standard: "JSON RPC 2.0",
    message: "The method does not exist / is not available.",
  },
  "-32602": {
    standard: "JSON RPC 2.0",
    message: "Invalid method parameter(s).",
  },
  "-32603": {
    standard: "JSON RPC 2.0",
    message: "Internal JSON-RPC error.",
  },
  "-32000": {
    standard: "EIP-1474",
    message: "Insufficient funds.",
  },
  "-32001": {
    standard: "EIP-1474",
    message: "Resource not found.",
  },
  "-32002": {
    standard: "EIP-1474",
    message: "Resource unavailable.",
  },
  "-32003": {
    standard: "EIP-1474",
    message: "Transaction rejected.",
  },
  "-32004": {
    standard: "EIP-1474",
    message: "Method not supported.",
  },
  "-32005": {
    standard: "EIP-1474",
    message: "Request limit exceeded.",
  },
  4001: {
    standard: "EIP-1193",
    message: "User rejected the request.",
  },
  4100: {
    standard: "EIP-1193",
    message:
      "The requested account and/or method has not been authorized by the user.",
  },
  4200: {
    standard: "EIP-1193",
    message: "The requested method is not supported by this Ethereum provider.",
  },
  4900: {
    standard: "EIP-1193",
    message: "The provider is disconnected from all chains.",
  },
  4901: {
    standard: "EIP-1193",
    message: "The provider is disconnected from the specified chain.",
  },
  4902: {
    standard: "EIP-1193",
    message: "Unrecognized Chain ID / Chain not found.",
  },
};

export const getErrorMessage = async (err, chainId) => {
  const defaultErrMsg = "Something went wrong. Please try again later.";
  if (err?.message && err.message?.includes("Internal JSON-RPC error.")) {
    let errMsg = err.message;
    if (typeof err.message !== "string") {
      errMsg = err.message.toString();
    }
    var errObj = errMsg.slice(errMsg.indexOf("{"), errMsg.length);
    if (errObj.indexOf("{") !== -1 && errObj.lastIndexOf("}")) {
      errObj = JSON.parse(errObj);
      const _errFromWeb3 = await getErrFromWeb3(errObj, chainId);
      return _errFromWeb3;
    }
  } else if (
    err?.message &&
    err.message?.includes("execution reverted:") &&
    err.message?.indexOf("{") !== -1
  ) {
    let jsonObj = JSON.parse(
      err.message.slice(
        err.message.indexOf("{"),
        err.message.lastIndexOf("}") + 1
      )
    );
    if (jsonObj?.originalError) {
      return jsonObj.originalError.message;
    }
    return jsonObj;
  } else if (err?.message && err.message?.includes("execution reverted:")) {
    return err.message.slice(
      err.message.indexOf("execution reverted:"),
      err.message.length
    );
  }

  const errFromWeb3 = getErrFromWeb3(err, chainId);

  if (errFromWeb3) {
    return errFromWeb3;
  }

  return defaultErrMsg;
};

const getErrFromWeb3 = async (err, chainId) => {
  const defaultErrMsg = "Something went wrong. Please try again later.";
  const web3 = new Web3(
    chainId === 1
      ? process.env.REACT_APP_RPC_ETH
      : chainId === 56
      ? process.env.REACT_APP_RPC_BNB
      : chainId === 137
      ? process.env.REACT_APP_RPC_POLYGON
      : ""
  );

  if (err && err?.code) {
    if (METAMASK_POSSIBLE_ERRORS[err.code]) {
      return METAMASK_POSSIBLE_ERRORS[err.code].message;
    } else if (err.code === "ACTION_REJECTED") {
      return "User rejected signing";
    } else {
      return err.message;
    }
  }
  let chkErr = err?.toString();
  if (
    chkErr &&
    chkErr?.startsWith("Error: Transaction has been reverted by the EVM:")
  ) {
    const errorObjectStr = err.message.slice(42);
    const errorObject = JSON.parse(errorObjectStr);
    let txHash = errorObject.transactionHash;
    try {
      const tx = await web3.eth.getTransaction(txHash);
      var result = await web3.eth.call(tx);

      result = result.startsWith("0x") ? result : `0x${result}`;
      if (result && result.substring(138)) {
        const reason = web3.utils.toAscii(result.substring(138));
        console.log("Revert reason:", reason);
        return reason;
      } else {
        console.log("Cannot get reason");
      }
    } catch (e) {
      var errMsg2 = e.toString();
      if (errMsg2) {
        if (errMsg2.startsWith("Error")) {
          var errObj2 = errMsg2.slice(errMsg2.indexOf("{"), errMsg2.length);
          if (errObj2.indexOf("{") !== -1 && errObj2.lastIndexOf("}")) {
            errObj2 = JSON.parse(errObj2);
            return errObj2.message;
          }
        }
        console.log(errMsg2);
      }
      console.log(err);
      return defaultErrMsg;
    }
  } else {
    console.log(err.message);
    return defaultErrMsg;
  }
};
