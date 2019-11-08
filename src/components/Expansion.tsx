import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/styles";
import moment from "moment";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";

import Avatar from "@material-ui/core/Avatar";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },

  noLabel: {
    marginTop: theme.spacing(3)
  },
  regAvatar: {
    color: "#f5f5f5",
    backgroundColor: theme.palette.primary.main,

    margin: theme.spacing()
  },
  avatar: {
    color: "#f5f5f5",
    backgroundColor: theme.palette.primary.main,
    height: "25px",
    width: "25px",
    fontSize: ".75rem",
    fontWeight: 500,
    margin: theme.spacing(1)
  },
  titleFlex: {
    display: "flex"
  },
  closed: {},
  open: {},
  item: {
    overflow: "hidden",
    transition: theme.transitions.create("max-height", {
      duration: "200ms"
    })
  },
  filterMenu: {
    display: "flex",
    marginTop: "-.5em",
    marginBottom: ".5em"
  },
  filterText: {},
  smallpadding: {
    padding: "8px",
    fontSize: ".8em",
    fontStyle: "italic"
  },
  stupidDates: {
    "& input": {
      padding: "8px",
      textAlign: "center",
      fontSize: ".8em",
      minWidth: "70px"
    }
  },
  icon: {
    margin: theme.spacing(0),
    fill: theme.palette.divider,
    transition: theme.transitions.create("transform", {
      duration: "200ms"
    })
  },
  iconOpen: {
    transform: "rotate(180deg)"
  },
  divider: { clear: "both", margin: "0rem 0rem 1rem 0rem" },
  flexTransition: {
    transition: theme.transitions.create("opacity", {
      duration: "200ms"
    })
  },
  sideBorder: {
    display: "flex",
    alignItems: "center",
    borderLeft: `1px solid ${theme.palette.divider}`
  },
  leftGrid: {
    display: "flex",
    alignItems: "center",
    alignSelf: "center"
  },
  chip: {
    marginTop: theme.spacing(1) / 2,
    marginBottom: theme.spacing(1) / 2
  }
}));

interface IProps {
  day: any;
  usersTimeCards: any;
  editFunc: (e: React.MouseEvent<HTMLDivElement>) => void;
  user: any;
  daysTimeCards: any;
}

const Expansion: React.FC<IProps> = ({
  day,
  usersTimeCards,
  editFunc,
  user,
  daysTimeCards
}) => {
  const [open, setOpen] = useState(false);
  const maxHeight = useRef<HTMLDivElement | null>(null);
  const classes = useStyles();
  const compTimeCards = usersTimeCards || daysTimeCards;

  function handleOpen() {
    setOpen(!open);
  }

  return (
    <>
      <div className={classes.titleFlex} onClick={handleOpen}>
        <Grid container alignItems="center">
          <Grid item xs={3} className={classes.leftGrid}>
            <Typography variant="body1" align="left" style={{ flexGrow: 1 }}>
              {day && day.format("dddd, M/DD")}
              {user && `${user.firstName} ${user.lastName}`}
            </Typography>
            <ExpandMore
              className={[classes.icon, open ? classes.iconOpen : null].join(
                " "
              )}
            />
          </Grid>
          <Grid
            item
            xs={9}
            className={[classes.flexTransition, classes.sideBorder].join(" ")}
            style={{ minHeight: "100%" }}
          >
            <div
              style={{
                flexGrow: open ? 1 : 0
              }}
            />

            {usersTimeCards &&
              usersTimeCards.map(({ user, timeCards }: any) => (
                <Avatar
                  className={classes.avatar}
                  key={user.id}
                  style={{ cursor: "pointer", opacity: open ? 0 : 1 }}
                >
                  {user.firstName[0]}
                  {user.lastName[0]}
                </Avatar>
              ))}
          </Grid>
        </Grid>
      </div>
      <div
        className={[classes.item, open ? classes.open : classes.closed].join(
          " "
        )}
        style={{
          maxHeight:
            open && maxHeight.current
              ? `${maxHeight.current.scrollHeight}px`
              : 0
        }}
        ref={maxHeight}
      >
        {compTimeCards &&
          compTimeCards.map(({ user, timeCards, day }: any, i: number) => (
            <Grid container key={user ? user.id : `${day.id}-${i}`}>
              <Grid item xs={3} className={classes.leftGrid}>
                <Typography
                  variant="body1"
                  align="right"
                  style={{ padding: 8, flexGrow: 1 }}
                >
                  {user && `${user.firstName} ${user.lastName}`}
                  {day && day.format("dddd, M/DD")}
                </Typography>
              </Grid>
              <Grid
                item
                xs={9}
                className={[classes.flexTransition, classes.sideBorder].join(
                  " "
                )}
                style={{
                  display: "flex",
                  paddingLeft: "8px",
                  flexWrap: "wrap"
                }}
              >
                {timeCards.map((timeCard: any) => (
                  <Chip
                    key={timeCard.id}
                    data-userkey={timeCard.id}
                    color={
                      timeCard.punchType === "CLOCKIN" ? "primary" : "secondary"
                    }
                    label={moment(timeCard.punchTime).format("H:mm")}
                    className={classes.chip}
                    style={{
                      marginRight:
                        timeCard.punchType === "CLOCKIN" ? undefined : "4px"
                    }}
                    onClick={editFunc}
                  />
                ))}
              </Grid>
            </Grid>
          ))}
      </div>
    </>
  );
};

export default Expansion;
