import React, { useState, useEffect } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";

import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

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

interface IOptions {
  id: string;
  [key: string]: string | number;
}

interface IProps {
  dependent?: any;
  onChange: Function;
  options: IOptions[];
  listedItems: string[];
  label: string;
  formikName: string;
  setFieldValue?: Function;
  payload: any;
  startValue?: string;
}

const SingleSelectViaQuery: React.FC<IProps> = ({
  dependent,
  onChange,
  options = [],
  listedItems,
  label,
  formikName,
  setFieldValue,
  payload,
  startValue = ""
}) => {
  const [id, setId] = useState<string>(startValue);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  function handleChange(
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) {
    const val = event.currentTarget.value;
    if (typeof val === "string") setId(val);
    onChange(event);
  }
  function handleClose() {
    setOpen(false);
  }
  function handleOpen() {
    setOpen(true);
  }
  useEffect(() => {
    setId(startValue);
    if (setFieldValue) setFieldValue(formikName, startValue);
  }, [dependent, formikName, setFieldValue, startValue]);

  if (payload)
    return (
      <>
        <FormControl
          className={classes.formControl}
          error={payload.errors[formikName] && payload.touched[formikName]}
          fullWidth
        >
          <InputLabel htmlFor="demo-controlled-open-select">{label}</InputLabel>
          <Select
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={id}
            onChange={handleChange}
            inputProps={{
              name: formikName
            }}
            onBlur={payload.handleBlur}
            className={classes.selectEmpty}
          >
            {options &&
              options.map((option, i) => {
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
          {payload.touched[formikName] && payload.errors[formikName] && (
            <FormHelperText>{payload.errors[formikName]}</FormHelperText>
          )}
        </FormControl>
      </>
    );
  else return null;
};

export default SingleSelectViaQuery;
