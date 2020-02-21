export const formatMoney = (weirdMoney: number) => {
  const remainder = weirdMoney % 100;
  if (remainder === 0) return `$${Math.ceil(weirdMoney / 100)}.00`;
  return `$${Math.ceil(weirdMoney / 100)}.${weirdMoney % 100}`;
};
