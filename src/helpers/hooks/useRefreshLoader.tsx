import React, { useState, useEffect } from "react";
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

const useRefreshLoader = () => {
  const [refresh, setRefresh] = useState(false);
  const [spinnerLoading, setSpinnerLoading] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (spinnerLoading) setRefresh(false);
  }, [spinnerLoading]);

  const outClass = spinnerLoading ? classes.spin : undefined;

  const returnFunction = (qResults: qResults) => {
    if (refresh) qResults.refetch(qResults.variables);
    if (qResults.networkStatus === 1) return <MyLoading />;
    if (qResults.networkStatus === 4 || qResults.networkStatus === 2)
      setSpinnerLoading(true);
    else setSpinnerLoading(false);
  };

  const actionIcon = {
    icon: Refresh,
    onClick: (arg: any) => setRefresh(true),
    iClass: outClass
  };

  return [returnFunction, actionIcon] as const;
};

type qResults = {
  loading: boolean;
  networkStatus: NetworkStatus;
  refetch: any;
  variables: any;
};

export default useRefreshLoader;
