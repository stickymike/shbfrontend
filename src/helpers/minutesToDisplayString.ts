const minutesToDisplayString = (difference: number) =>
  `${("0" + ((difference / 60) | 0)).slice(-2)}:${(
    "0" +
    (difference % 60 | 0)
  ).slice(-2)}`;

export default minutesToDisplayString;
