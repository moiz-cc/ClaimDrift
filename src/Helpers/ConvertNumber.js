const web3Divide = (val, b) => {
  let a = val.toString();
  let chkDec = a.split(".");
  if (chkDec.length > 1) {
    a = chkDec[0];
  }
  let len = a.length;
  let i = 0;
  while (i < b) {
    len = len - 1;
    i++;
  }
  let v1 = a.substring(0, len);
  if (len <= 0) {
    let point = len * -1;
    v1 = "0.";
    i = 0;
    while (i < point) {
      v1 += "0";
      i++;
    }
  } else {
    v1 = v1 + ".";
  }
  let v2 = a.substring(len, a.length);
  v2 = v2.split("");
  while (true) {
    if (v2[v2.length - 1] !== "0") {
      break;
    }
    v2.pop();
  }
  v2 = v2.join("");
  return v1 + v2;
};

const web3Multiply = (val, b) => {
  const a = val.toString();
  let v1 = a.split(".");
  let len = v1.length > 1 ? b - v1[1].length : b;

  let i = 0;
  while (i < len) {
    v1.push("0");
    i++;
  }
  v1 = v1.join("");
  return v1;
};

const ConvertNumber = (
  number,
  isBigToSmall = false,
  isLocale = false,
  dec = 18
) => {
  if (Number(number) == 0 || !number) {
    return 0;
  }
  let num = number;
  if (typeof number == "number") {
    num = num.toString();
  }
  if (num.includes("+")) {
    num = Number(num).toLocaleString().replaceAll(",", "");
  }
  if (isBigToSmall) {
    num = web3Divide(num, dec);
  } else {
    num = web3Multiply(num, dec);
  }
  if (isLocale) {
    num = numLocale(num);
  }
  return num;
};

export const numLocale = (num) => {
  return Number(num).toLocaleString();
};

export default ConvertNumber;
