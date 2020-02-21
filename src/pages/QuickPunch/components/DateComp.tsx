import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";

// import TimePickerInput from "../pages/QuickPunch/TimePickerInput";
import moment from "moment";
import getWidthOfText from "../../../helpers/widthoftext";
import { Theme } from "@material-ui/core";
import number2Words from "../../../helpers/number2Words";

const styles = (theme: Theme) => ({
  test: {
    width: getWidthOfText("8 Hours"),
    "& svg": {
      display: "none"
    }
  }
});

type MyProps = {
  onChange?: Function;
  value: moment.Moment;
  time: moment.Duration;
  userTime?: any;
};
type MyState = {
  date: moment.Moment;
  open: boolean;
  workTime: moment.Moment;
};

class DateComp extends Component<MyProps, MyState> {
  state = {
    date: this.props.value,
    open: false,
    workTime: moment("8", "HH")
  };

  handlechange = (date: moment.Moment) =>
    this.setState({ workTime: moment(date) });

  handleDateChange = (date: moment.Moment) => {
    this.setState({ date });
    if (this.props.onChange) this.props.onChange(date);
  };

  createweek = (string: string) => {
    const newString = number2Words(Number(string));
    return newString.charAt(0).toUpperCase() + newString.slice(1);
  };

  render() {
    const { date } = this.state;

    return (
      <>
        <Typography variant="h4" gutterBottom>
          Work Week <b>{this.createweek(date.format("WW"))}</b>
        </Typography>
        <Typography
          variant="h6"
          style={{ marginTop: "" }}
          gutterBottom
          align="center"
        >
          {/* Work Week <b>{this.createweek(date.format("WW"))}</b> */}
          <b>
            {this.props.time.format("HH")}:
            {("0" + this.props.time.get("minutes")).slice(-2)}
          </b>{" "}
          Currently Worked
        </Typography>
      </>
    );
  }
}
export default withStyles(styles)(DateComp);
