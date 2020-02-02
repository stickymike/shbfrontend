import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useMutation } from "react-apollo";
import { CREATE_TIMEREQUEST } from "../../../gql/mutations/timeRequestMut";
import {
  CreateTimeRequest as CreateTimeRequest2,
  CreateTimeRequestVariables
} from "../../../generated/CreateTimeRequest";
import { TextField, Box } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {
  format,
  isValid,
  startOfDay,
  differenceInMilliseconds,
  addMilliseconds,
  endOfDay,
  addHours
} from "date-fns/esm";

import FormikTimePicker from "../Fields/FormikTimePicker";
import FormikTextBox from "../Fields/FormikTextBox";
import { Me_me } from "../../../generated/Me";
import { CREATE_TIMEREQUEST_ID_DATES } from "../../../gql/queries/timeRequestQuery";

interface Props {
  dates: [Date, Date];
  formHandle: any;
  user: Me_me;
  qInfoTimeRequests: Record<string, any>;
  changeScreen: (a: string) => void;
}

const SignupSchema = Yup.object().shape({
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
  startTime: addHours(startOfDay(new Date()), 6),
  endTime: addHours(startOfDay(new Date()), 8),
  isAllDay: true
};

const CreateTimeRequest: React.FC<Props> = ({
  dates,
  formHandle,
  user,
  changeScreen,
  qInfoTimeRequests
}) => {
  const [submit] = useMutation<CreateTimeRequest2, CreateTimeRequestVariables>(
    CREATE_TIMEREQUEST,
    {
      refetchQueries: [
        { query: CREATE_TIMEREQUEST_ID_DATES, variables: qInfoTimeRequests }
      ]
    }
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

      onSubmit={async (
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
        const results = await submit({
          variables: {
            startTime,
            endTime,
            userId: user.id,
            reason,
            isAllDay,
            approved: false
          }
        }).catch((e: any) => {
          if (e.graphQLErrors) {
            e.graphQLErrors.map(({ code, message }: any) => {
              helpers.setErrors({ reason: message });
              return helpers.setSubmitting(false);
            });
          }
        });
        helpers.setSubmitting(false);
        if (results) changeScreen("");
      }}
    >
      {({ values: { isAllDay }, isSubmitting, submitForm }) => {
        formHandle(isSubmitting ? () => {} : submitForm);
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
