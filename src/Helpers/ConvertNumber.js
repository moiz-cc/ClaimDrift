const ConvertNumber = (number, isFromBig, isLocale = false) => {
  const calc = isFromBig
    ? number / 10 ** 18
    : Number(number * 10 ** 18)
        .toLocaleString()
        .replaceAll(",", "");

  return isLocale ? Number(calc).toLocaleString() : calc;
};

export default ConvertNumber;
