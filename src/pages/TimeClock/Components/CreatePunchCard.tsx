import React from "react";
import {
  Formik,
  FormikHelpers as FormikActions,
  Form,
  Field,
  FormikProps
} from "formik";
import { useMutation, useQuery } from "react-apollo";

import Grid from "@material-ui/core/Grid";

import * as Yup from "yup";
import { GET_USERS } from "../../../gql/queries/userQuery";

import moment from "moment";
import { useCtx } from "../../../components/FilterComp/NewFilterHeader";
import { paramFunc } from "../NewTimeCardFilter";
import { NEW_PUNCHCARD } from "../../../gql/mutations/punchCardMut";
import MyLoading from "../../../components/MyLoading";
import SingleSelectField from "../Fields/SingleSelectField";
import DatePickerField from "../Fields/DatePickerField";
import TimePickerField from "../Fields/TimePickerField";
import { PUNCHCARDS_WHEREQ } from "../../../gql/queries/punchCardQuery";

const SignupSchema = Yup.object().shape({
  punchDateIn: Yup.mixed().required("Required"),
  punchHoursIn: Yup.mixed().required("Required"),
  punchDateOut: Yup.mixed().required("Required"),
  punchHoursOut: Yup.mixed().required("Required"),
  userID: Yup.string().required("Required"),
  timeRoleID: Yup.string().required("Required")
});

interface IProps {
  handleClose: () => void;
  formHandle: (arg: () => void) => void;
}

export interface IFormOpts {
  punchDateIn: string | null;
  punchHoursIn: string | null;
  punchDateOut: string | null;
  punchHoursOut: string | null;
  userID: string;
  timeRoleID: string;
}

const CreatePunchCard: React.FC<IProps> = props => {
  const createPunchCard = {
    punchDateIn: null,
    punchHoursIn: null,
    punchDateOut: null,
    punchHoursOut: null,
    userID: "",
    timeRoleID: ""
  };

  const { qParams } = useCtx();
  const query = paramFunc(qParams);

  const [submit] = useMutation(NEW_PUNCHCARD, {
    refetchQueries: [{ query: PUNCHCARDS_WHEREQ, variables: { query } }]
  });

  const { data, loading } = useQuery(GET_USERS);

  const findUser = (users: any, id: string) =>
    users.find((user: any) => user.id === id);

  const formSubmit: any = async (
    {
      punchDateIn,
      punchHoursIn,
      punchDateOut,
      punchHoursOut,
      userID,
      timeRoleID
    }: IFormOpts,
    actions: FormikActions<IFormOpts>
  ) => {
    const newValues = {
      userId: userID,
      timeRoleId: timeRoleID,
      punchIn: moment(punchDateIn!)
        .add(moment(punchHoursIn!).diff(moment().startOf("day")))
        .toISOString(),
      punchOut: moment(punchDateOut!)
        .add(moment(punchHoursOut!).diff(moment().startOf("day")))
        .toISOString()
    };
    const rtn = await submit({
      variables: {
        ...newValues
      }
    }).catch(e => {
      if (e.graphQLErrors) {
        e.graphQLErrors.map(({ code, message }: any) => {
          actions.setErrors({ [code]: message });
          return actions.setSubmitting(false);
        });
      }
    });
    actions.setSubmitting(false);
    if (rtn) props.handleClose();
  };

  if (loading) return <MyLoading />;

  return (
    <Formik
      initialValues={createPunchCard}
      onSubmit={formSubmit}
      validationSchema={SignupSchema}
    >
      {(payload: FormikProps<IFormOpts>) => {
        props.formHandle(payload.submitForm);
        return (
          <Form>
            <Grid container>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Field
                    name="userID"
                    options={data.users}
                    listedItems={["firstName", "lastName"]}
                    label="User"
                    component={SingleSelectField}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    name="timeRoleID"
                    listedItems={["name"]}
                    label="Time Role"
                    options={
                      findUser(data.users, payload.values.userID)
                        ? findUser(data.users, payload.values.userID).timeRoles
                        : []
                    }
                    component={SingleSelectField}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Field
                      component={DatePickerField}
                      label="Punch-In Date"
                      name="punchDateIn"
                      format={"ddd, MMM DD"}
                      adjust={["punchDateOut"]}
                      animateYearScrolling
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      component={TimePickerField}
                      label="Punch-In Time"
                      name="punchHoursIn"
                      adjust={["punchHoursOut", 7.5]}
                      format={"hh:mm A"}
                    />
                  </Grid>
                </Grid>
                <Grid container style={{ marginTop: "1rem" }} spacing={1}>
                  <Grid item xs={6}>
                    <Field
                      component={DatePickerField}
                      label="Punch-Out Date"
                      name="punchDateOut"
                      format={"ddd, MMM DD"}
                      animateYearScrolling
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      component={TimePickerField}
                      label="Punch-Out Time"
                      name="punchHoursOut"
                      format={"hh:mm A"}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreatePunchCard;
