import React from "react";
import { Formik, Form } from "formik";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { GET_ME } from "../gql/queries/userQuery";
import { SIGN_IN } from "../gql/mutations/userMut";

import FormikTextField from "../components/formikFields/FormikTextField";
import { RouteComponentProps } from "react-router";
import NewPaper from "../components/NewPaper";
import { useMutation } from "@apollo/client";
//TODO Any
const Login: React.FC<RouteComponentProps> = props => {
  const [fire] = useMutation(SIGN_IN, { refetchQueries: [{ query: GET_ME }] });

  return (
    <NewPaper title="Login">
      <Formik
        initialValues={{
          username: "",
          password: ""
        }}
        onSubmit={async (values, actions) => {
          const rtn = await fire({
            variables: {
              email: values.username,
              password: values.password
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
          if (rtn) props.history.push("/");
        }}
      >
        {payload => {
          return (
            <Form>
              <Typography variant="h6">Team Swamp Head Brewery</Typography>
              <FormikTextField id="username" payload={payload} label="Email" />
              <FormikTextField
                id="password"
                payload={payload}
                label="Password"
                type="password"
              />

              <Button
                style={{ marginTop: "1rem" }}
                type="submit"
                fullWidth
                disabled={payload.isSubmitting && true}
              >
                Sign In
              </Button>
            </Form>
          );
        }}
      </Formik>
    </NewPaper>
  );
};
export default Login;
