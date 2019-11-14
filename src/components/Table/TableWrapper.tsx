import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Table } from "@material-ui/core";
import { TableProps } from "@material-ui/core/Table";

const useStyles = makeStyles(() => ({
  table: {
    minWidth: 500,
    tableLayout: "fixed"
  },
  wrapper: {
    overflowX: "auto"
  }
}));

const TableWrapper: React.FC<TableProps> = ({
  children,
  size = "medium",
  ...props
}) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Table className={classes.table} size={size} {...props}>
        {children}
      </Table>
    </div>
  );
};

export default TableWrapper;
