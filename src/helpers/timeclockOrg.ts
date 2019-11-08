import moment, { Moment } from "moment";

function timeclockOrg(timeCards: any) {
  let newTimeCards: any = [];
  let testDay = moment(1);

  timeCards.sort((a: any, b: any) =>
    moment(a.punchTime).diff(moment(b.punchTime))
  );

  if (timeCards)
    timeCards.forEach((timecard: any, i: number) => {
      if (!testDay.isSame(timecard.punchTime, "day")) {
        newTimeCards.push({
          day: moment(timecard.punchTime),
          usersTimeCards: [
            {
              user: timecard.user,
              timeCards: [timecard]
            }
          ]
        });
        testDay = moment(timecard.punchTime);
      } else if (testDay.isSame(timecard.punchTime, "day")) {
        const index = newTimeCards[
          newTimeCards.length - 1
        ].usersTimeCards.findIndex((user: any) => user.user === timecard.user);
        if (index >= 0)
          newTimeCards[newTimeCards.length - 1].usersTimeCards[
            index
          ].timeCards.push(timecard);
        if (index === -1)
          newTimeCards[newTimeCards.length - 1].usersTimeCards.push({
            user: timecard.user,
            timeCards: [timecard]
          });
      }
    });

  return newTimeCards;
}

interface IOutputtimecarduserorg {
  user: any;
  daysTimeCards: Array<{ day: Moment; timeCards: any }>;
}

function timecarduserorg(timeCards: any): Array<IOutputtimecarduserorg> {
  let newTimeCards: Array<any> = [];

  if (timeCards) {
    const sortedtimeCards = timeCards.slice(0).sort((a: any, b: any) => {
      return moment(a.punchTime).diff(moment(b.punchTime));
    });

    sortedtimeCards.forEach((timecard: any, i: number) => {
      const whatUserIndex = newTimeCards.findIndex(
        data => data.user.id === timecard.user.id
      );

      if (whatUserIndex === -1) {
        newTimeCards.push({
          user: timecard.user,
          daysTimeCards: [
            {
              day: moment(timecard.punchTime),
              timeCards: [timecard]
            }
          ]
        });
      } else {
        const index = newTimeCards[whatUserIndex].daysTimeCards.findIndex(
          ({ day }: any) => day.isSame(timecard.punchTime, "day")
        );

        if (index >= 0)
          newTimeCards[whatUserIndex].daysTimeCards[index].timeCards.push(
            timecard
          );
        if (index === -1)
          newTimeCards[whatUserIndex].daysTimeCards.push({
            day: moment(timecard.punchTime),
            timeCards: [timecard]
          });
      }
    });
  }

  return newTimeCards;
}

const flattenUsersTimeCards = (
  usersTimeCards: Array<IOutputtimecarduserorg>
) => {
  let flattenData: any = [];
  if (usersTimeCards.length === 0) return null;
  usersTimeCards.forEach(oneUsersTimeCards => {
    if (oneUsersTimeCards.daysTimeCards.length === 0) return null;
    oneUsersTimeCards.daysTimeCards.forEach(oneDaysTimeCards => {
      if (oneDaysTimeCards.timeCards.length === 0) return null;
      oneDaysTimeCards.timeCards.forEach((timeCard: any) => {
        if (timeCard.punchType === "CLOCKIN") {
          const { user, ...y } = timeCard;
          flattenData.push({
            user: user,
            clockIn: { ...y }
          });
        }
        if (timeCard.punchType === "CLOCKOUT") {
          const { user, ...y } = timeCard;
          flattenData[flattenData.length - 1].clockOut = { ...y };
        }
      });
    });
  });
  return flattenData;
};

export default timeclockOrg;
export { timecarduserorg, flattenUsersTimeCards };
