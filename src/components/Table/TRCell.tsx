import React from "react";
import { headerCell } from "./EnhancedTableHead";
import { TRTableData } from "../../pages/TimeRequest/Components/TRTableLoader";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import { format, isSameDay, lightFormat } from "date-fns/esm";
import makeStyles from "@material-ui/styles/makeStyles";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { Typography, Theme } from "@material-ui/core";

interface Props<M> {
  headerCell: headerCell<M>;
  openFunc: (e: React.MouseEvent<HTMLElement>, rowInfo: M) => void;
  rowInfo: M;
}

const useStyles = makeStyles((theme: Theme) => ({
  marginRight: {
    marginRight: theme.spacing(0.5)
  },
  marginLeft: {
    marginLeft: theme.spacing(0.5)
  },
  wrapper: {
    display: "flex",
    alignItems: "center"
  }
}));

//Table Layout :Auto
// element.style {
//   min-width: 100%;
//   white-space: nowrap;
// }
// .MuiTableCell-alignCenter {
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
//   text-align: left;
//   width: 100%;
//   max-width: 1px;
// }

const TRCell = <M,>({
  headerCell,
  openFunc,
  rowInfo
}: React.PropsWithChildren<Props<TRTableData>>) => {
  const selfEdit = rowInfo.userUpdatedAt === rowInfo.updatedAt;
  const beenSeen = selfEdit
    ? rowInfo.userUpdatedAt !== rowInfo.updatedAt
    : rowInfo.createdAt !== rowInfo.updatedAt;
  const { wrapper, marginRight, marginLeft } = useStyles();
  const similiarProps = {
    fontSize: "small" as "inherit" | "default" | "large" | "small" | undefined,
    className: marginRight
  };

  const svgComp = () => {
    if (beenSeen) {
      if (rowInfo.approved)
        return <CheckBoxIcon color="primary" {...similiarProps} />;
      return <IndeterminateCheckBoxIcon color="secondary" {...similiarProps} />;
    }
    return <CheckBoxOutlineBlankIcon {...similiarProps} />;
  };
  const secondComp = () => {
    if (isSameDay(new Date(rowInfo.endTime), new Date(rowInfo.startTime))) {
      if (rowInfo.isAllDay)
        return <Typography variant="body2">, All Day</Typography>;
      else {
        return (
          <>
            <Typography variant="body2">
              : {lightFormat(new Date(rowInfo.startTime), "h:mm a")}
            </Typography>
            <ArrowRightAltIcon
              {...similiarProps}
              className={[marginRight, marginLeft].join(" ")}
            />
            <Typography variant="body2">
              {lightFormat(new Date(rowInfo.endTime), "h:mm a")}
            </Typography>
          </>
        );
      }
    }
    return (
      <>
        {" "}
        <ArrowRightAltIcon
          {...similiarProps}
          className={[marginRight, marginLeft].join(" ")}
        />
        <Typography variant="body2">
          {format(new Date(rowInfo.endTime), "EEEE, M/d")}
        </Typography>
      </>
    );
  };
  return (
    <div className={wrapper}>
      {svgComp()}
      <Typography variant="body2">
        {format(new Date(rowInfo.startTime), "EEEE, M/d")}
      </Typography>
      {secondComp()}
      {/* <ArrowRightAltIcon fontSize="small" /> */}
    </div>
  );
};

export default TRCell;
