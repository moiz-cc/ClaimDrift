const getReward = (number, isFromBig, isLocale = false) => {
  const calc = isFromBig ? number / 10 ** 18 : number * 10 ** 18;
  return isLocale ? Number(calc).toLocaleString() : calc;
};

export default getReward;
