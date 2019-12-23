import React, { useState, useEffect } from "react";
import makeStyles from "@material-ui/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
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

const useUpdatedLoading = () => {
  const [refresh, setRefresh] = useState(false);
  const [spinnerLoading, setSpinnerLoading] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (spinnerLoading) setRefresh(false);
  }, [spinnerLoading]);

  const loadingElement = () => (
    <IconButton
      className={[
        classes.actionButton,
        spinnerLoading ? classes.spin : null
      ].join(" ")}
      onClick={() => setRefresh(!refresh)}
    >
      <Refresh fontSize="small" />
    </IconButton>
  );

  const returnFunction = (qResults: qResults) => {
    if (refresh) qResults.refetch();
    if (qResults.networkStatus === 1) return <MyLoading />;
    if (qResults.networkStatus === 4) setSpinnerLoading(true);
    else setSpinnerLoading(false);
  };

  return [returnFunction, loadingElement] as const;
};

type qResults = {
  loading: boolean;
  networkStatus: NetworkStatus;
  refetch: any;
};

export default useUpdatedLoading;
