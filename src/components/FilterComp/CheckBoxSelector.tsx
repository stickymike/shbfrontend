import React from "react";
import { makeStyles } from "@material-ui/styles";
import { DatePicker } from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";

import { Theme } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme: Theme) => ({
  smallpadding: {
    padding: "8px",
    fontSize: ".8em",
    fontStyle: "italic",
    "&:hover": {
      cursor: "pointer"
    }
  },

  bkColor: {
    "& input": {
      backgroundColor: theme.palette.primary.light,
      borderRadius: "4px"
    }
  },
  selected: {
    backgroundColor: theme.palette.action.selected,
    fontWeight: theme.typography.fontWeightMedium
  }
}));

interface IProps extends CheckboxProps {
  value: boolean;
  setValue: (arg: boolean) => void;
  label: string;
}

const CheckBoxSelector: React.FC<IProps> = ({
  value,
  label,
  setValue,
  ...props
}) => {
  const classes = useStyles();

  function dateLabel(date: any) {
    if (!date) return "No Date Selected";
    return `From: ${date.format("MM/DD")}`;
  }

  return (
    <>
      {/* <FormControlLabel
        control={
          <Checkbox
            checked={value}
            color="primary"
            onChange={(e, checked) => setValue(checked)}
            {...props}
            size="small"
          />
        }
        label={label}
      /> */}
      <TextField
        variant="outlined"
        value={label}
        className={value ? classes.bkColor : undefined}
        margin="normal"
        onClick={() => setValue(!value)}
        style={{ margin: 0 }}
        inputProps={{
          className: classes.smallpadding,
          readOnly: true
        }}
      />
    </>
  );
};

export default CheckBoxSelector;
