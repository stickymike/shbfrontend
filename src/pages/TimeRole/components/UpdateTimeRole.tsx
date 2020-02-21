import React from "react";
import { Mutation } from "react-apollo";
import { Formik, Form } from "formik";
import { GET_TIMEROLES } from "../../../gql/queries/timeRoleQuery";
import { UPDATE_TIMEROLE } from "../../../gql/mutations/timeRoleMut";

import * as Yup from "yup";
import { Grid } from "@material-ui/core";

import FormikTextField from "../../../components/FormikTextField";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  shortName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(2, "Too Short!")
    .max(500, "Too Long!"),
  payRate: Yup.number()
    .integer("Must be Number")
    .strict(true)
});

interface IProps {
  handleClose: () => void;
  formHandle: (arg: () => void) => void;
  timeRole: any;
}

const UpdateTimeRole: React.FC<IProps> = ({
  timeRole,
  formHandle,
  handleClose
}) => {
  const createTimeRole = {
    id: timeRole.id,
    name: timeRole.name,
    shortName: timeRole.shortName,
    description: timeRole.description,
    payRate: timeRole.payRate
  };

  return (
    <Mutation
      mutation={UPDATE_TIMEROLE}
      refetchQueries={[{ query: GET_TIMEROLES }]}
    >
      {(submit: (arg: any) => Promise<any>) => (
        <Formik
          initialValues={createTimeRole}
          onSubmit={async (values, actions) => {
            const rtn = await submit({
              variables: {
                ...values
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
            if (rtn) handleClose();
          }}
          validationSchema={SignupSchema}
        >
          {payload => {
            formHandle(payload.submitForm);
            return (
              <>
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <FormikTextField
                        id="name"
                        payload={payload}
                        label="Name*"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormikTextField
                        id="shortName"
                        payload={payload}
                        label="Short Name*"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormikTextField
                        id="description"
                        payload={payload}
                        label="Description"
                      />
                      <FormikTextField
                        id="payRate"
                        payload={payload}
                        label="Pay Rate"
                        type="number"
                      />
                    </Grid>
                  </Grid>
                </Form>
              </>
            );
          }}
        </Formik>
      )}
    </Mutation>
  );
};

export default UpdateTimeRole;
