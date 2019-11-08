import React from "react";
import CircularProgress, {
  CircularProgressProps
} from "@material-ui/core/CircularProgress/CircularProgress";

interface IProps extends CircularProgressProps {
  style?: {};
}

const MyLoading: React.FC<IProps> = ({
  style = { margin: "2em" },
  size = "5em",
  ...props
}) => {
  return (
    <>
      <CircularProgress {...props} style={style} size={size} />
      <br />
    </>
  );
};

export default MyLoading;
