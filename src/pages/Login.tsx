import React from "react";
import { Formik, Form } from "formik";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { Mutation } from "react-apollo";
import { GET_ME } from "../gql/queries/userQuery";
import { SIGN_IN } from "../gql/mutations/userMut";

import PaperWrapper from "../components/PaperWrapper";
import FormikTextField from "../components/FormikTextField";
import { RouteComponentProps } from "react-router";
//TODO Any
const Login: React.FC<RouteComponentProps> = props => {
  return (
    <PaperWrapper title={"Login"}>
      <Mutation mutation={SIGN_IN} refetchQueries={[{ query: GET_ME }]}>
        {(submit: (arg: any) => Promise<any>) => (
          <Formik
            initialValues={{
              username: "",
              password: ""
            }}
            onSubmit={async (values, actions) => {
              const rtn = await submit({
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
                  <FormikTextField
                    id="username"
                    payload={payload}
                    label="Email"
                  />
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
        )}
      </Mutation>
    </PaperWrapper>
  );
};
export default Login;
