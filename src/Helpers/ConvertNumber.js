const ConvertNumber = (number, isFromBig, isLocale = false) => {
  const calc = (
    isFromBig ? Number(number) / 10 ** 18 : Number(number) * 10 ** 18
  ).toLocaleString();
  return isLocale ? calc : calc.replaceAll(",", "");
};

export default ConvertNumber;
