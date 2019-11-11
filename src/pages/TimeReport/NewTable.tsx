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

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    minWidth: 500
  },
  wrapper: {
    overflowX: "auto"
  },
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
  hover: {
    backgroundColor: "unset",
    "&:hover": {
      backgroundColor: " rgba(127, 127, 127, 1)"
    }
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

interface IProps {
  header: any;
  data: any;
  totals: any;
}

const NewTable: React.FC<IProps> = ({ header, data, totals }) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [checked, setChecked] = React.useState(false);
  const [orderBy, setOrderBy] = React.useState("");

  const handleRequestSort = (event: any, property: any) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
    setChecked(!checked);
  };

  const handleClick = (event: any, name: string) => {
    console.dir(event.currentTarget);
  };

  return (
    <div className={classes.wrapper}>
      <Table className={classes.table} size={"medium"}>
        {/* <colgroup>
          <col width="25%" />
          <col width="25%" />
          <col width="25%" />
          <col width="10%" />
          <col width="15%" />
        </colgroup> */}
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          classes={classes}
          header={header}
        />
        <TableBody>
          {stableSort(data, getSorting(order, orderBy)).map(
            (row: any, index: number) => (
              <TableRow
                onClick={event => handleClick(event, row.id)}
                key={row.id}
              >
                {header.map((info: any, index: number) => (
                  <TableCell key={`${info.id}-1`} {...info.props}>
                    {row[info.id]}
                  </TableCell>
                ))}
              </TableRow>
            )
          )}
          <TotalRow totals={totals} />
        </TableBody>
      </Table>
    </div>
  );
};

interface IIProps {
  totals: any;
}

export const TotalRow: React.FC<IIProps> = ({ totals }) => {
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
            align={headCell.props && headCell.props.align}
            sortDirection={orderBy === headCell.id ? order : false}
            className={[
              header.length === i + 1 ? classes.noRightPadding : "",
              i === 0 ? classes.noLeftPadding : ""
            ].join(" ")}
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
