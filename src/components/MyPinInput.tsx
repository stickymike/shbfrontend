import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";

type MyProps = {
  value: string;
  onChange: Function;
  onTouch: Function;
  name: string;
  error: boolean;
  id?: string;
};
type MyState = {
  input: string[];
  value: string;
  focused: boolean;
  error: boolean;
};

function isRefArray(arg: any): arg is React.RefObject<HTMLDivElement>[] {
  return arg[0].current !== undefined;
}
function isRef(arg: any): arg is React.RefObject<HTMLDivElement> {
  return arg.current !== undefined;
}

class MyPinInput extends Component<MyProps, MyState> {
  public textInput: {}[] | React.RefObject<HTMLDivElement>[];
  constructor(props: Readonly<MyProps>) {
    super(props);
    const { value } = props;
    this.textInput = [{}, {}, {}, {}];
    this.textInput.map(e => React.createRef<HTMLDivElement>());
    const input = [];

    for (let i = 0; i < Number(4); i += 1) {
      if (value[i]) input.push(value[i]);
      else input.push("");
    }

    this.state = {
      input,
      value,
      focused: false,
      error: true
    };
  }

  componentDidMount() {
    if (isRefArray(this.textInput)) {
      if (this.textInput[0].current) this.textInput[0].current.focus();
    }
  }

  componentDidUpdate() {
    if (isRefArray(this.textInput)) {
      if (this.textInput[0].current && this.props.value === "")
        this.textInput[0].current.focus();
    }
    if (isRefArray(this.textInput)) {
      if (this.textInput[0].current && this.props.error && this.state.error) {
        this.textInput[0].current.focus();
      }
    }
  }

  handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let inputvalue = String(e.currentTarget.value);

    if (this.props.error) this.setState({ error: false });
    else this.setState({ error: true });

    if (inputvalue !== "") {
      const input = this.state.input.slice();
      input[
        Number(e.currentTarget.id.replace("PinInput-", ""))
      ] = inputvalue.split("")[inputvalue.length - 1];
      const newTarget = this.textInput[
        Number(e.currentTarget.id.replace("PinInput-", "")) + 1
      ];
      if (newTarget && isRef(newTarget) && newTarget.current) {
        newTarget.current.focus();
      } else {
        window.focus();
      }
      this.props.onChange("code", input.join(""));
      this.props.onTouch("code", true);
      this.setState({ value: input.join(""), input });
    }
  };

  render() {
    const { input } = this.state;

    return (
      <div
        id={this.props.name}
        onBlur={_ => this.setState({ focused: false })}
        onFocus={_ => this.setState({ focused: true })}
      >
        {input.map((value, i) => {
          return (
            <TextField
              id={`PinInput-${i}`}
              inputProps={{
                ref: this.textInput[i],
                style: {
                  textAlign: "center",
                  verticalAlign: "middle",
                  fontSize: "3rem",
                  fontWeight: "bold"
                }
              }}
              placeholder={"•"}
              value={value}
              key={`input_${i}`}
              type="password"
              error={
                (i !== 0 && this.props.error) ||
                (this.props.error && !this.state.focused)
              }
              autoComplete="off"
              onChange={this.handleChange}
              style={{
                caretColor: "transparent",
                width: "3rem",
                height: "3rem",
                textAlign: "center",
                marginLeft: ".25rem",
                marginRight: ".25rem"
              }}
            />
          );
        })}
      </div>
    );
  }
}

export default MyPinInput;
