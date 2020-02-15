import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useMutation, useQuery } from "react-apollo";
import { PERSONAL_UPDATE_TIMEREQUEST } from "../../../gql/mutations/timeRequestMut";

import { TextField, Box, Grid } from "@material-ui/core";
import {
  startOfDay,
  differenceInMilliseconds,
  addMilliseconds,
  endOfDay,
  isSameDay,
  isBefore,
  isAfter,
  addHours
} from "date-fns/esm";

import FormikTimePicker from "../../../components/formikFields/FormikTimePicker";
import FormikTextBox from "../../../components/formikFields/FormikTextBox";
import { GetTimeRequestsIDandDates_timeRequests } from "../../../generated/GetTimeRequestsIDandDates";
import { Me_me } from "../../../generated/Me";
import FormikDatePicker from "../../../components/formikFields/FormikDatePicker";
import FormikCheckBox from "../../../components/formikFields/FormikCheckBox";
import {
  PersonalUpdateTimeRequest,
  PersonalUpdateTimeRequestVariables
} from "../../../generated/PersonalUpdateTimeRequest";
import FormikClearableRadio from "../../../components/formikFields/FormikClearableRadio";
import { GET_USERS } from "../../../gql/queries/userQuery";
import FormikSingleSelect from "../../../components/formikFields/FormikSingleSelect";
import MyLoading from "../../../components/MyLoading";

interface Props {
  formHandle: any;
  changeScreen: (a: string) => void;
  timeRequest: GetTimeRequestsIDandDates_timeRequests;
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

const initValues = (timeRequest: GetTimeRequestsIDandDates_timeRequests) => {
  const {
    id = " ",
    startTime: firstStartTime,
    endTime: firstEndTime,
    approved: boolApproved,
    reason = "",
    isAllDay = true,
    user: { id: userId }
  } = timeRequest;

  const isMultipleDays = !isSameDay(
    new Date(firstStartTime),
    new Date(firstEndTime)
  );
  const startTime =
    isMultipleDays || isAllDay
      ? addHours(new Date(firstStartTime), 6)
      : new Date(firstStartTime);
  const endTime =
    !isMultipleDays && isAllDay
      ? addHours(startTime, 2)
      : new Date(firstEndTime);

  const approved =
    boolApproved === null
      ? boolApproved
      : boolApproved
      ? "approved"
      : "rejected";

  return {
    id,
    reason,
    approved,
    isMultipleDays,
    startTime,
    firstDate: new Date(startTime),
    secondDate: new Date(endTime),
    endTime,
    isAllDay,
    userId
  };
};

const EditTimeRequest: React.FC<Props> = ({
  formHandle,
  user,
  changeScreen,
  timeRequest,
  admin,
  refetch
}) => {
  const [submit] = useMutation<
    PersonalUpdateTimeRequest,
    PersonalUpdateTimeRequestVariables
  >(PERSONAL_UPDATE_TIMEREQUEST, {
    refetchQueries: refetch
  });

  const equal = (date: Date) => date;
  const equalPlus = (date: Date) => addHours(equal(date), 1);
  const equalMinus = (date: Date) => addHours(equal(date), -1);

  const { data, loading } = useQuery(GET_USERS, { skip: !!user });
  if (loading) return <MyLoading />;

  return (
    <Formik
      initialValues={initValues(timeRequest)}
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

export default EditTimeRequest;
