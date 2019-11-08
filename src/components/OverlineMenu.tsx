import React, { useState } from "react";

import { makeStyles } from "@material-ui/styles";
import { Typography, Theme } from "@material-ui/core";
import ExpandMore from "@material-ui/icons/ExpandMore";
import getWidthOfText from "../helpers/widthoftext";

const useStyles = makeStyles((theme: Theme) => ({
  flex: {
    display: "flex"
  },
  arrow: {
    transform: "translateY(3px) rotate(90deg)",
    fontSize: "16px",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  arrowopen: {
    transform: "translateY(3px) rotate(-90deg)"
  },
  list: {
    "&:hover": { cursor: "pointer" },
    position: "absolute",
    zIndex: 1,
    marginLeft: theme.spacing(1),
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    transitionProperty: "transform, letter-spacing",

    "&:before": {
      position: "absolute",
      content: "/ "
    }
  },
  over: {
    "&:hover": { cursor: "pointer" },
    position: "relative",
    background: theme.palette.background.paper,
    zIndex: 11
  },
  shrink: {
    letterSpacing: "-.4em"
  }
}));

interface IProps {
  screenPage: string;
  options?: string[];
  selectedOption?: string;
  handleChange?: Function;
}

const OverlineMenu: React.FC<IProps> = ({
  screenPage,
  options,
  selectedOption,
  handleChange
}) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleOpen = () => setOpen(!open);
  let currentlocation: number,
    lastlocation = 0,
    newlocation = 0;

  currentlocation = selectedOption
    ? getWidthOfText(
        `${screenPage.toUpperCase()} /${selectedOption.toUpperCase()}`,
        ".75rem"
      ) * 1.0833
    : 0;

  const handleclick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!e.currentTarget.textContent || !handleChange) return;
    setOpen(false);
    handleChange(e.currentTarget.textContent.split("/")[0].trim());
  };

  const nextOption = (i: number) => {
    if (!options) return;
    const isnotLast = i + 1 < options.length;
    return (isnotLast && options[i + 1] !== selectedOption) || options[i + 2];
  };

  return (
    <>
      <div className={classes.flex}>
        <Typography
          variant="overline"
          align="left"
          onClick={handleOpen}
          className={classes.over}
        >
          {screenPage} / {""}
          {selectedOption}
          <ExpandMore
            className={[classes.arrow, !open ? classes.arrowopen : null].join(
              " "
            )}
          />
        </Typography>

        <div>
          {options &&
            options.map((option, i) => {
              if (option !== selectedOption) {
                newlocation += lastlocation;
                lastlocation =
                  getWidthOfText(`${option.toUpperCase()} /`, "12px") * 1.0833 +
                  10;
                return (
                  <Typography
                    key={i}
                    variant="overline"
                    className={[
                      classes.list,
                      !open ? classes.shrink : null
                    ].join(" ")}
                    onClick={handleclick}
                    style={
                      !open
                        ? { transform: `translateX(${-currentlocation}px)` }
                        : { transform: `translateX(${newlocation}px)` }
                    }
                  >
                    {option}
                    {nextOption(i) && " /"}
                  </Typography>
                );
              } else return null;
            })}
        </div>
      </div>
    </>
  );
};

export default OverlineMenu;
