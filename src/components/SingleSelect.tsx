import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";

import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import { FormikErrors, FormikHandlers } from "formik";
import { IFormOpts } from "../resources/punchcards/CreatePunchCard";

const useStyles = makeStyles((theme: Theme) => ({
  selected: {
    backgroundColor: theme.palette.action.selected,
    fontWeight: theme.typography.fontWeightMedium
  },
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

interface field {
  onChange: FormikHandlers["handleChange"];
  onBlur: FormikHandlers["handleBlur"];
  value: any;
  name: string;
}

interface IProps {
  errors: FormikErrors<IFormOpts> | string | undefined;
  options: any;
  listedItems: string[];
  label: string;
  field: field;
}

const SingleSelect: React.FC<IProps> = ({
  options = [],
  listedItems,
  label,
  field,
  errors,
  ...props
}) => {
  const classes = useStyles();
  return (
    <>
      <FormControl className={classes.formControl} error={!!errors} fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select className={classes.selectEmpty} {...field} {...props}>
          {options &&
            options.map((option: any) => {
              return (
                <MenuItem value={option.id} key={option.id}>
                  {listedItems.map(name => option[name]).join(" ")}
                </MenuItem>
              );
            })}
          {options.length === 0 ? (
            <MenuItem value={""}>Please Select User</MenuItem>
          ) : null}
        </Select>
        <FormHelperText>{errors}</FormHelperText>
      </FormControl>
    </>
  );
};

export default SingleSelect;
