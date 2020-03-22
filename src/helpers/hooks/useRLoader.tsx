import React, { useState, useEffect, useRef } from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import Refresh from "@material-ui/icons/Refresh";
import { NetworkStatus } from "apollo-client";
import MyLoading from "../../components/MyLoading";

const useStyles = makeStyles(() => ({
  "@keyframes myspin": {
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" }
  },
  actionButton: {
    float: "right",
    padding: "8px",
    fontSize: ".75rem",
    "& svg": {
      height: ".75em",
      width: ".75em"
    }
  },
  spin: {
    animationName: "$myspin",
    animationDuration: "1000ms",
    animationIterationCount: "infinite",
    animationTimingFunction: "linear"
  }
}));

const useRLoader = () => {
  const [spinnerLoading, setSpinnerLoading] = useState(false);
  const ref = useRef<any>(undefined);

  const classes = useStyles();

  const outClass = spinnerLoading ? classes.spin : undefined;

  const resultsFunction = (qResults: qResults) => {
    ref.current = qResults;
  };

  const onCompleted = () => {
    setSpinnerLoading(false);
  };

  const actionIcon = {
    icon: Refresh,
    onClick: (arg: any) => {
      ref.current.refetch();
      setSpinnerLoading(true);
    },
    iClass: outClass
  };

  return [resultsFunction, onCompleted, actionIcon] as const;
};

type qResults = {
  loading: boolean;
  networkStatus: NetworkStatus;
  refetch: any;
  variables: any;
};

export default useRLoader;
