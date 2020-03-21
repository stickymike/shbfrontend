import React, { useState, useEffect } from "react";
import { TextField, StandardTextFieldProps } from "@material-ui/core";

interface IProps extends StandardTextFieldProps {
  startingVal?: string;
  focus: { loc: React.ReactText[]; id: string | null };
}

const style = { display: "block", width: "fit-content" };

const TaskComp: React.FC<IProps> = ({
  startingVal,
  id,
  onFocus,
  inputRef,
  onBlur,
  focus,
  ...props
}) => {
  // const [value, setValue] = useState(startingVal);

  // const onChange = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   if (event.currentTarget.id === id) setValue(event.currentTarget.value);
  // };

  useEffect(() => {
    return () => {
      console.log("unmounted");
    };
  }, []);

  return (
    <NewField
      key={id}
      // value={value}
      // onChange={onChange}
      id={id}
      onFocus={onFocus}
      inputRef={id === focus.id ? inputRef : undefined}
      onBlur={onBlur}
      style={style}
      {...props}
    />
  );
};

// const NewField = React.memo(
//   TextField,
//   ({ value, inputRef, }, { value: value2, inputRef: inputRef2 }) => {
//     return value === value2 && inputRef === inputRef2;
//   }
// );

const NewField = TextField;

export default React.memo(TaskComp);
