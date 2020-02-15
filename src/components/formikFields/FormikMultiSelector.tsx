import React from "react";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme
} from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import { useField } from "formik";
import FormHelperText from "@material-ui/core/FormHelperText";

interface Props {
  label: string;
  name: string;
  selectFrom: any;
  // selected: string[];
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const FormikMultiSelector: React.FC<Props> = ({
  label,
  selectFrom,

  name
}) => {
  const [personName, setPersonName] = React.useState<string[]>([]);
  const [field] = useField(name);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPersonName(event.target.value as string[]);
  };

  const indexArray = selectFrom.map(({ id }: any) => id);
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        displayEmpty
        placeholder="All Users"
        // value={selected}
        // onChange={handleChange}
        {...field}
        input={<Input />}
        renderValue={selected => {
          if (
            (selected as string[])[0] === "All" &&
            (selected as string[]).length === 1
          ) {
            return "All Users";
          }
          return (selected as string[]).join(" , ");
        }}
        MenuProps={MenuProps}
      >
        {selectFrom.map((name: any) => (
          <MenuItem
            key={name.id}
            value={name.id}
            // style={getStyles(name, personName, theme)}
          >
            {name.firstName}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText> </FormHelperText>
    </FormControl>
  );
};

export default FormikMultiSelector;
