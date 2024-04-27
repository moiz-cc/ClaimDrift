const ConvertNumber = (number, isFromBig, isLocale = false) => {
  const calc = isFromBig
    ? number / 10 ** 18
    : Number(number * 10 ** 18)
        .toLocaleString()
        .replaceAll(",", "");

  return isLocale ? Number(calc).toLocaleString() : calc;
};

export default ConvertNumber;

// export let web3Number = (number, dec = null, count = 18, isLocale = null) => {
//   let num = number;
//   if (dec !== null) {
//     if (dec) {
//       num = Number(num * 10 ** count)
//         .toLocaleString()
//         .replaceAll(",", "");
//     } else {
//       num = Number(num / 10 ** count)
//         .toLocaleString()
//         .replaceAll(",", "");
//     }
//   }
//   if (isLocale) {
//     num = numLocale(num);
//   }
//   return num;
// };
// export const numLocale = (num) => {
//   return Number(num).toLocaleString();
// };
