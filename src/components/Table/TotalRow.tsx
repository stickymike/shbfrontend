import React, { useRef, useState } from "react";

import { TableRow, TableCell, makeStyles, Theme } from "@material-ui/core";
import ExpandMore from "@material-ui/icons/ExpandMore";

import moment from "moment";

const useStyles = makeStyles((theme: Theme) => ({
  leaveSpace: {
    width: "20px",
    height: "20px",
    margin: "8px"
  },
  noRightPadding: {
    paddingRight: "0px"
  },
  noLeftPadding: {
    paddingLeft: "0px"
  },

  expand: {
    overflow: "hidden",
    transition: theme.transitions.create("max-height", {
      duration: "200ms"
    })
  },
  flexRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  icon: {
    margin: theme.spacing(1),
    verticalAlign: "middle",
    transform: " translateY(-2px) rotate(180deg)",
    transition: theme.transitions.create("transform", {
      duration: "200ms"
    })
  },
  iconOpen: {
    transform: "translateY(-2px) "
  }
}));

interface Props {
  totals: any;
}

const TotalRow: React.FC<Props> = ({ totals }) => {
  const classes = useStyles();
  const maxHeight = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  const total = totals
    ? Object.keys(totals).reduce(
        (total: any, num: any) => total + totals[num],
        0
      )
    : null;

  return (
    <TableRow>
      <TableCell colSpan={5} className={classes.noRightPadding}>
        <div className={classes.flexRight}>
          <div
            className={[classes.expand, classes.flexRight].join(" ")}
            style={{
              maxHeight:
                open && maxHeight.current
                  ? `${maxHeight.current.scrollHeight}px`
                  : 0
            }}
            ref={maxHeight}
          >
            {Object.keys(totals).map(key => (
              <div key={key} style={{ display: "flex" }}>
                <div>
                  {`As ${key}: ${moment
                    .duration(totals[key])
                    .format("HH:mm", { trim: false })}`}
                </div>
                <div className={classes.leaveSpace} />
              </div>
            ))}
          </div>
          <div
            style={{ fontWeight: 500, cursor: "pointer" }}
            onClick={() => setOpen(!open)}
          >
            {`Total Worked: ${moment
              .duration(total)
              .format("hh:mm", { trim: false })}`}
            <ExpandMore
              className={[classes.icon, open ? classes.iconOpen : null].join(
                " "
              )}
              fontSize="small"
            />
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TotalRow;
