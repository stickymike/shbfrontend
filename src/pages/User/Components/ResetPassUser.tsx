import React from "react";
import { Mutation } from "react-apollo";
import { Formik, Form } from "formik";
import { GET_USERS } from "../../../gql/queries/userQuery";
import { RESET_PASSWORD } from "../../../gql/mutations/userMut";

import * as Yup from "yup";
import FormikTextField from "../../../components/FormikTextField";

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  confirmpassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  )
});

interface IProps {
  handleClose: Function;
  formHandle: Function;
  user: {
    id: number;
  };
}

const ResetPassUser: React.FC<IProps> = ({ user, handleClose, formHandle }) => {
  const password = {
    id: user.id,
    password: "",
    confirmpassword: ""
  };

  return (
    <Mutation mutation={RESET_PASSWORD} refetchQueries={[{ query: GET_USERS }]}>
      {(submit: (a: {}) => Promise<any>) => (
        <Formik
          initialValues={password}
          onSubmit={async ({ id, password }, actions) => {
            const rtn = await submit({
              variables: {
                id,
                password
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
                  <FormikTextField
                    id="password"
                    payload={payload}
                    label="Password"
                    type="password"
                  />
                  <FormikTextField
                    id="confirmpassword"
                    payload={payload}
                    label="Confirm Password"
                    type="password"
                  />
                </Form>
              </>
            );
          }}
        </Formik>
      )}
    </Mutation>
  );
};

export default ResetPassUser;
