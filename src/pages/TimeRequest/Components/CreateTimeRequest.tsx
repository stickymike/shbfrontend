import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useMutation } from "react-apollo";
import { CREATE_TIMEREQUEST } from "../../../gql/mutations/timeRequestMut";
import {
  CreateTimeRequest as CreateTimeRequest2,
  CreateTimeRequestVariables
} from "../../../generated/CreateTimeRequest";
import {
  Button,
  TextField,
  Typography,
  Box,
  Container
} from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {
  format,
  isValid,
  startOfDay,
  differenceInMilliseconds,
  addMilliseconds,
  endOfDay,
  formatISO
} from "date-fns/esm";
import { TimePicker } from "@material-ui/pickers";
import moment from "moment";
import FormikTimePicker from "../Fields/FormikTimePicker";
import FormikTextBox from "../Fields/FormikTextBox";
import { Me_me } from "../../../generated/Me";
import { sub } from "date-fns";

interface Props {
  dates: [Date, Date];
  formHandle: any;
  user: Me_me;
}

const SignupSchema = Yup.object().shape({
  // userId: Yup.string().required("Needs User"),
  // name: Yup.string()
  //   .min(2, "Too Short!")
  //   .max(50, "Too Long!")
  //   .required("Required"),
  reason: Yup.string()
    .min(5, "Too Short!")
    .max(500, "Too Long!")
    .required("Required"),
  startTime: Yup.date(),
  endTime: Yup.date().min(Yup.ref("startTime"), "Cannot be Before Start Time"),
  isAllDay: Yup.boolean()
});

const initValues = {
  reason: "",
  startTime: new Date(),
  endTime: new Date(),
  isAllDay: true
};

const CreateTimeRequest: React.FC<Props> = ({ dates, formHandle, user }) => {
  const [submit] = useMutation<CreateTimeRequest2, CreateTimeRequestVariables>(
    CREATE_TIMEREQUEST
  );

  const printDateLate = () => {
    return `${isValid(dates[0]) ? format(dates[0], "PPP") : ""}${
      isValid(dates[1]) ? " To " : ""
    }${isValid(dates[1]) ? format(dates[1], "PPP") : ""}`;
  };

  return (
    <Formik
      initialValues={initValues}
      validationSchema={SignupSchema}
      // validateOnChange={false}
      onSubmit={(
        { isAllDay, startTime: formStartTime, endTime: formEndTime, reason },
        helpers
      ) => {
        let startTime: Date | string;
        let endTime: Date | string;
        if (isAllDay) {
          startTime = startOfDay(dates[0]);
          if (isValid(dates[1])) endTime = endOfDay(dates[1]);
          else endTime = endOfDay(dates[0]);
        } else {
          startTime = addMilliseconds(
            dates[0],
            differenceInMilliseconds(formStartTime, startOfDay(formStartTime))
          );
          endTime = addMilliseconds(
            dates[0],
            differenceInMilliseconds(formEndTime, startOfDay(formEndTime))
          );
        }
        // startTime = formatISO(startTime);
        // endTime = formatISO(endTime);

        // console.log({
        //   variables: {
        //     startTime,
        //     endTime,
        //     userId: user.id,
        //     reason,
        //     isAllDay,
        //     approved: false
        //   }
        // });

        submit({
          variables: {
            startTime,
            endTime,
            userId: user.id,
            reason,
            isAllDay,
            approved: false
          }
        });

        // console.log(values);
      }}
    >
      {({ values: { isAllDay }, errors, submitForm }) => {
        formHandle(submitForm);
        return (
          <Form>
            <Box display="flex">
              <TextField
                label="User"
                value={`${user.firstName} ${user.lastName}`}
                style={{ flexGrow: 1 }}
                InputProps={{
                  readOnly: true
                }}
                helperText=" "
              />
            </Box>
            <Box display="flex">
              <TextField
                label={`Date${isValid(dates[1]) ? "s" : ""} Selected`}
                value={printDateLate()}
                style={{ flexGrow: 1 }}
                InputProps={{
                  readOnly: true
                }}
                helperText=" "
              />
              <FormControlLabel
                control={
                  <Field
                    name="isAllDay"
                    type="checkbox"
                    color="primary"
                    // checked={isAllDay}
                    as={Checkbox}
                  />
                }
                label="All Day"
                disabled={isValid(dates[1])}
                style={{
                  transform: "translate(0px,4px)",
                  marginLeft: "8px",
                  marginRight: "0px"
                }}
              />
            </Box>

            {!isAllDay && (
              <Box marginTop={2} marginBottom={1} display="flex">
                <FormikTimePicker
                  label="Start Time"
                  name="startTime"
                  type="date"
                />
                <FormikTimePicker label="End Time" name="endTime" type="date" />
              </Box>
            )}
            <FormikTextBox
              name="reason"
              label="Reason for Request"
              multiline
              rows={1}
              rowsMax={20}
              fullWidth
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateTimeRequest;
