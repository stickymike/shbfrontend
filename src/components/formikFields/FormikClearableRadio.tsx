import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { useField } from "formik";
import FormLabel from "@material-ui/core/FormLabel";

interface Props {
  radios: {
    label: string;
    value: any;
    color?: "primary" | "secondary";
  }[];
  name: string;
  highlighting?: boolean;
}

const FormikClearableRadio: React.FC<Props> = ({
  radios,
  name,
  highlighting
}) => {
  const [{ value }, , { setValue }] = useField(name);

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const tValue = (e.target as HTMLInputElement).value;
    if (tValue) {
      tValue === value ? setValue(null) : setValue(tValue);
    }
  };

  type Mr = (arg?: "primary" | "secondary") => JSX.Element;

  const myRadio: Mr = (arg = "primary") => <Radio size="small" color={arg} />;

  return (
    <FormControl>
      <FormLabel component="legend" className="MuiInputLabel-shrink">
        Status
      </FormLabel>
      <RadioGroup value={value} onChange={() => {}} onClick={onClick}>
        {radios.map(({ value, label, color }) => (
          <FormControlLabel
            key={`Radio-${value}`}
            value={value}
            control={myRadio(color)}
            label={label}
          />
        ))}

        {/* <FormControlLabel
          value="female"
          control={myRadio()}
          label="Pending Approval"
        />
        <FormControlLabel value="male" control={myRadio()} label="Approved" />
        <FormControlLabel
          value="other"
          control={myRadio("secondary")}
          label="Rejected"
        /> */}
      </RadioGroup>
      <FormHelperText></FormHelperText>
    </FormControl>
  );
};

export default FormikClearableRadio;
