import { isBefore, isAfter, isSameDay } from "date-fns/esm";

const isBetween = (betweenDate: Date, firstDate: Date, secondDate: Date) =>
  (isAfter(betweenDate, firstDate) || isSameDay(betweenDate, firstDate)) &&
  (isBefore(betweenDate, secondDate) || isSameDay(betweenDate, secondDate));

export default isBetween;
