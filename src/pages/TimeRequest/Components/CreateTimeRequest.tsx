import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useMutation, useQuery } from "react-apollo";
import { CREATE_TIMEREQUEST } from "../../../gql/mutations/timeRequestMut";
import {
  CreateTimeRequest as CreateTimeRequest2,
  CreateTimeRequestVariables
} from "../../../generated/CreateTimeRequest";
import { TextField, Box, Grid } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {
  format,
  isValid,
  startOfDay,
  differenceInMilliseconds,
  addMilliseconds,
  endOfDay,
  addHours,
  isAfter,
  isBefore,
  isSameDay
} from "date-fns/esm";

import FormikTimePicker from "../../../components/formikFields/FormikTimePicker";
import FormikTextBox from "../../../components/formikFields/FormikTextBox";
import { Me_me } from "../../../generated/Me";
import FormikSingleSelect from "../../../components/formikFields/FormikSingleSelect";
import { GET_USERS } from "../../../gql/queries/userQuery";
import MyLoading from "../../../components/MyLoading";
import FormikDatePicker from "../../../components/formikFields/FormikDatePicker";
import FormikCheckBox from "../../../components/formikFields/FormikCheckBox";
import FormikClearableRadio from "../../../components/formikFields/FormikClearableRadio";

interface Props {
  formHandle: any;
  changeScreen: (a: string) => void;
  dates?: [Date, Date];
  user?: Me_me;
  admin?: boolean;
  refetch?: { query: any; variables: any }[];
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

// const initValues = (id: string) => {
//   return {
//     reason: "",
//     startTime: addHours(startOfDay(new Date()), 6),
//     endTime: addHours(startOfDay(new Date()), 8),
//     isAllDay: true,
//     userId: id,
//     approved: "",
//     isMultipleDays: false
//   };
// };

const newinitValues = (id: string, dates?: [Date, Date]) => {
  // const {
  //   id = " ",
  //   startTime: firstStartTime,
  //   endTime: firstEndTime,
  //   approved: boolApproved,
  //   reason = "",
  //   isAllDay = true,
  //   user: { id: userId }
  // } = timeRequest;

  let isMultipleDays = false;
  let isAllDay = true;
  let firstDate = new Date();
  let secondDate = new Date();

  if (dates) {
    firstDate = dates[0];
    if (dates.length > 1) {
      isMultipleDays = !isSameDay(dates[0], dates[1]);
      secondDate = dates[1];
    }
  }
  return {
    reason: "",
    approved: null,
    firstDate,
    secondDate,
    startTime: addHours(startOfDay(new Date()), 6),
    endTime: addHours(startOfDay(new Date()), 8),
    isMultipleDays,
    isAllDay,
    userId: id
  };
};

const CreateTimeRequest: React.FC<Props> = ({
  dates,
  formHandle,
  user,
  changeScreen,
  admin,
  refetch
}) => {
  const [submit] = useMutation<CreateTimeRequest2, CreateTimeRequestVariables>(
    CREATE_TIMEREQUEST,
    {
      refetchQueries: refetch
    }
  );

  const printDateLate = () => {
    return `${isValid(dates![0]) ? format(dates![0], "PPP") : ""}${
      isValid(dates![1]) ? " To " : ""
    }${isValid(dates![1]) ? format(dates![1], "PPP") : ""}`;
  };

  const { data, loading } = useQuery(GET_USERS, { skip: !!user });
  if (loading) return <MyLoading />;
  const equal = (date: Date) => date;
  const equalPlus = (date: Date) => addHours(equal(date), 1);
  const equalMinus = (date: Date) => addHours(equal(date), -1);

  const displayWithDates = (isAllDay: boolean) => (
    <>
      <Box display="flex">
        <TextField
          label={`Date${isValid(dates![1]) ? "s" : ""} Selected`}
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
          disabled={isValid(dates![1])}
          style={{
            transform: "translate(0px,4px)",
            marginLeft: "8px",
            marginRight: "0px"
          }}
        />
      </Box>
      {!isAllDay && (
        <Box marginTop={2} marginBottom={1} display="flex">
          <FormikTimePicker label="Start Time" name="startTime" type="date" />
          <FormikTimePicker label="End Time" name="endTime" type="date" />
        </Box>
      )}
    </>
  );

  const displayNoDates = (isAllDay: boolean, isMultipleDays: boolean) => (
    <>
      <Box display="flex">
        <FormikDatePicker
          label="Start Date"
          name="firstDate"
          style={{ flexGrow: 1 }}
          tiedValues={[
            { name: "secondDate", compare: isBefore, correction: equal }
          ]}
          fullWidth
        />
      </Box>
      <Grid container style={{ alignItems: "center" }}>
        <Grid item xs={8}>
          <FormikDatePicker
            label="End Date"
            name="secondDate"
            style={{ flexGrow: 1 }}
            fullWidth
            tiedValues={[
              {
                name: "firstDate",
                compare: isAfter,
                correction: equalPlus
              }
            ]}
            disabled={!isMultipleDays}
          />
        </Grid>
        <Grid item xs={4}>
          <FormikCheckBox
            label="Multiple Days"
            name="isMultipleDays"
            type="checkbox"
          />
        </Grid>
        <Grid item xs={8}>
          <FormikTimePicker
            label="Start Time"
            name="startTime"
            type="date"
            disabled={isAllDay || isMultipleDays}
            tiedValues={[
              {
                name: "endTime",
                compare: isBefore,
                correction: equalPlus
              }
            ]}
          />
          <FormikTimePicker
            label="End Time"
            name="endTime"
            type="date"
            disabled={isAllDay || isMultipleDays}
            tiedValues={[
              {
                name: "startTime",
                compare: isAfter,
                correction: equalMinus
              }
            ]}
          />
        </Grid>
        <Grid item xs={4}>
          <FormikCheckBox
            label="All Day"
            name="isAllDay"
            disabled={isMultipleDays}
          />
        </Grid>
      </Grid>
    </>
  );

  return (
    <Formik
      initialValues={newinitValues(user?.id || "", dates)}
      validationSchema={SignupSchema}
      onSubmit={async (
        {
          isAllDay,
          firstDate,
          secondDate,
          startTime: formStartTime,
          endTime: formEndTime,
          isMultipleDays,
          approved: boolApproved,
          ...rest
        },
        helpers
      ) => {
        let startTime: Date | string;
        let endTime: Date | string;

        const approved =
          boolApproved === null
            ? boolApproved
            : boolApproved === "approved"
            ? true
            : false;

        if (isAllDay) {
          startTime = startOfDay(firstDate);
          if (isMultipleDays) endTime = endOfDay(secondDate);
          else endTime = endOfDay(firstDate);
        } else {
          startTime = addMilliseconds(
            firstDate,
            differenceInMilliseconds(formStartTime, startOfDay(formStartTime))
          );
          endTime = addMilliseconds(
            firstDate,
            differenceInMilliseconds(formEndTime, startOfDay(formEndTime))
          );
        }
        const results = await submit({
          variables: {
            startTime,
            endTime,
            isAllDay,
            approved,
            ...rest
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
      {({ values, isSubmitting, submitForm }) => {
        const { isAllDay, isMultipleDays } = values;

        formHandle(isSubmitting ? () => {} : submitForm);
        return (
          <Form>
            <Box display="flex">
              {!user ? (
                <FormikSingleSelect
                  options={data.users}
                  listedItems={["firstName", "lastName"]}
                  name="userId"
                  label="User"
                />
              ) : (
                <TextField
                  label="User"
                  value={`${user.firstName} ${user.lastName}`}
                  style={{ flexGrow: 1 }}
                  InputProps={{
                    readOnly: true
                  }}
                  helperText=" "
                />
              )}
            </Box>
            {dates
              ? displayWithDates(isAllDay)
              : displayNoDates(isAllDay, isMultipleDays)}

            <FormikTextBox
              name="reason"
              label="Reason for Request"
              multiline
              rows={1}
              rowsMax={20}
              fullWidth
            />
            {admin && (
              <FormikClearableRadio
                radios={[
                  {
                    label: "Approved",
                    value: "approved"
                  },
                  {
                    label: "Rejected",
                    value: "rejected",
                    color: "secondary"
                  }
                ]}
                name="approved"
              />
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateTimeRequest;
