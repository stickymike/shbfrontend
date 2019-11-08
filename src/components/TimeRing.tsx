import React from "react";
import * as d3 from "d3";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";

const width = 100;
const height = 100;

const useStyles = makeStyles((theme: Theme) => ({
  darken: {
    fill: "black"
  }
}));

function TimeRing({ dayTimeCards }: any) {
  const arcGenerator = d3.arc().cornerRadius(10);

  const classes = useStyles();

  let Rads = d3
    .scaleTime()
    .domain([
      dayTimeCards.day.startOf("day").toDate(),
      dayTimeCards.day.endOf("day").toDate()
    ])
    .range([0, 2 * Math.PI]);

  const arcString = arcGenerator({
    startAngle: Rads(new Date(dayTimeCards.timeCards[0].punchTime)),
    endAngle: Rads(new Date(dayTimeCards.timeCards[1].punchTime)),
    innerRadius: 30,
    outerRadius: 50
  });

  return (
    <svg width={"100%"} height={"height"}>
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        <path
          d={typeof arcString === "string" ? arcString : undefined}
          fill={"red"}
          onMouseEnter={e =>
            console.dir(e.currentTarget.classList.add(classes.darken))
          }
          onMouseLeave={e =>
            console.dir(e.currentTarget.classList.remove(classes.darken))
          }
        />
      </g>
    </svg>
  );
}

export default TimeRing;
