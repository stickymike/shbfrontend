import React, { useState, useRef } from "react";

import { makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import moment from "moment";
import ExpandMore from "@material-ui/icons/ExpandMore";

import { Chip } from "@material-ui/core";
// import { fontWeight } from "@material-ui/system";

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    minWidth: 500
  },
  wrapper: {
    overflowX: "auto"
  },
  noRightPadding: {
    paddingRight: "0px"
  },
  hover: {
    backgroundColor: "unset",
    "&:hover": {
      backgroundColor: " rgba(127, 127, 127, 1)"
    }
  },
  item: {
    overflow: "hidden",
    transition: theme.transitions.create("max-height", {
      duration: "200ms"
    })
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

interface IProps {
  header: any;
  data: any;
  totals: any;
}

const NewTable: React.FC<IProps> = ({ header, data, totals }) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [checked, setChecked] = React.useState(false);
  const [open, setOpen] = useState(false);
  const maxHeight = useRef<HTMLDivElement | null>(null);
  const [orderBy, setOrderBy] = React.useState("calories");

  const handleRequestSort = (event: any, property: any) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
    setChecked(!checked);
    setOpen(!open);
  };

  const handleClick = (event: any, name: string) => {
    console.dir(event.currentTarget);
  };

  const total = data
    ? data.reduce((total: any, num: any) => total + num.workedMS, 0)
    : null;

  return (
    <div className={classes.wrapper}>
      <Table className={classes.table} size={"medium"}>
        <colgroup>
          <col width="25%" />
          <col width="25%" />
          <col width="25%" />
          <col width="10%" />
          <col width="15%" />
        </colgroup>
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          classes={classes}
          header={header}
        />
        <TableBody>
          {stableSort(data, getSorting(order, orderBy)).map(
            (row: any, index: number) => {
              return (
                <TableRow
                  onClick={event => handleClick(event, row.id)}
                  key={row.id}
                >
                  <TableCell component="th" scope="row" padding="none">
                    {row.date}
                  </TableCell>
                  <TableCell align="right">{row.punchIn}</TableCell>
                  <TableCell align="right">{row.punchOut}</TableCell>
                  <TableCell align="right">
                    <Chip label={row.timeRole} className={classes.hover} />
                  </TableCell>
                  <TableCell
                    data-id="hi"
                    align="right"
                    className={classes.noRightPadding}
                    onClick={event => handleClick(event, row.id)}
                  >
                    {row.hours}
                  </TableCell>
                </TableRow>
              );
            }
          )}

          <TableRow>
            <TableCell
              colSpan={5}
              align="right"
              className={classes.noRightPadding}
            >
              <div
                className={classes.item}
                style={{
                  maxHeight:
                    open && maxHeight.current
                      ? `${maxHeight.current.scrollHeight}px`
                      : 0
                }}
                ref={maxHeight}
              >
                {Object.keys(totals).map(key => (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      fontWeight: "initial"
                    }}
                  >
                    {`As ${key}: ${moment
                      .duration(totals[key])
                      .format("HH:mm", { trim: false })}`}
                    <div
                      style={{ width: "20px", height: "20px", margin: "8px" }}
                    />
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
                  className={[
                    classes.icon,
                    open ? classes.iconOpen : null
                  ].join(" ")}
                  fontSize="small"
                />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

function desc(a: any, b: any, orderBy: string) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array: {}[], cmp: any): any {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a: any, b: any) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order: any, orderBy: any) {
  return order === "desc"
    ? (a: any, b: any) => desc(a, b, orderBy)
    : (a: any, b: any) => -desc(a, b, orderBy);
}

const EnhancedTableHead: React.FC<any> = props => {
  const { order, orderBy, onRequestSort, classes, header } = props;
  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property);
  };
  if (!header) return null;
  return (
    <TableHead>
      <TableRow>
        {header.map((headCell: any, i: any) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
            className={
              header.length === i + 1 ? classes.noRightPadding : undefined
            }
            style={{ paddingTop: "0px" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default NewTable;
