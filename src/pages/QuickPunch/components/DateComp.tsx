import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";

// import TimePickerInput from "../pages/QuickPunch/TimePickerInput";
import moment from "moment";
import getWidthOfText from "../../../helpers/widthoftext";
import { Theme } from "@material-ui/core";

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

  render() {
    const { date } = this.state;

    return (
      <>
        <Typography
          style={{ transform: "translateY(-2px)" }}
          variant="h6"
          gutterBottom
        >
          Work Week <b> {date.format("WW")} </b>
          {"\n"}
        </Typography>
        <Typography
          variant="body1"
          style={{ marginTop: "" }}
          gutterBottom
          align="center"
        >
          Worked <b>{this.props.time.hours() + this.props.time.days() * 24}</b>{" "}
          Hours and <b>{this.props.time.minutes()} </b>
          Minutes
        </Typography>
        {/* <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            marginBottom: ".5rem",
            justifyContent: "center",
            width: "100%"
          }}
        >
          <TimePickerInput
            workedTime={this.state.workTime}
            onChange={this.handlechange}
          />

          <Typography style={{ transform: "translateY(-2px)" }} variant="body1">
            Shift ➡ <b>{displaytime.format("h:mm A")}</b>
            <br />
          </Typography>
        </div> */}
      </>
    );
  }
}
export default withStyles(styles)(DateComp);
