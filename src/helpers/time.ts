import moment, { Duration } from "moment";

interface timeCard {
  punchType: string;
  punchTime: string;
}
type cardsinout = {
  punchTime: string;
};

const workedtime = (timeCards: timeCard[] | null): Duration => {
  if (!timeCards) return moment.duration(1);
  const cardsin: cardsinout[] = [],
    cardsout: cardsinout[] = [];
  const firstday = moment(1900);
  timeCards.forEach(card => {
    if (card.punchType === "CLOCKIN") cardsin.push(card);
    else cardsout.push(card);
  });
  if (cardsin.length !== cardsout.length)
    cardsout.push({ punchTime: moment().toISOString() });

  let totalin = 0,
    totalout = 0;
  cardsin.forEach(card => {
    totalin += firstday.diff(moment(card.punchTime));
  });
  cardsout.forEach(card => {
    totalout += firstday.diff(moment(card.punchTime));
  });
  return moment.duration(totalin - totalout);
};

export default workedtime;
