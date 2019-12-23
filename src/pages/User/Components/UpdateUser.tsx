import React from "react";
import { Mutation } from "react-apollo";
import { Formik, Form } from "formik";
import { GET_USERS } from "../../../gql/queries/userQuery";
import { UPDATE_USER } from "../../../gql/mutations/userMut";

import * as Yup from "yup";

import Grid from "@material-ui/core/Grid";
import FormikTextField from "../../../components/FormikTextField";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required")
});

interface IProps {
  handleClose: Function;
  formHandle: Function;
  user: any;
}

const CreateUser: React.FC<IProps> = props => {
  const { user } = props;

  const updateuser = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    code: user.code ? user.code : "",
    id: user.id,
    title: user.title ? user.title : undefined
  };

  return (
    <Mutation mutation={UPDATE_USER} refetchQueries={[{ query: GET_USERS }]}>
      {(submit: (a: {}) => Promise<any>) => (
        <Formik
          initialValues={updateuser}
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
            if (rtn) props.handleClose();
          }}
          validationSchema={SignupSchema}
        >
          {payload => {
            props.formHandle(payload.submitForm);
            return (
              <>
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FormikTextField
                        id="firstName"
                        payload={payload}
                        label="First Name*"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormikTextField
                        id="lastName"
                        payload={payload}
                        label="Last Name*"
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <FormikTextField
                        id="email"
                        payload={payload}
                        label="Email*"
                      />
                      <FormikTextField
                        id="title"
                        payload={payload}
                        label="Job Title"
                      />
                    </Grid>

                    <Grid item xs={3}>
                      <FormikTextField
                        id="code"
                        payload={payload}
                        label="PIN Code*"
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

export default CreateUser;
