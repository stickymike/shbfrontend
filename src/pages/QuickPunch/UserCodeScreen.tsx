import React from "react";

import { Formik, Form, FormikActions, Field, FormikProps } from "formik";
import { useMutation } from "react-apollo";

import Button from "@material-ui/core/Button";

import { CODE_TO_USER } from "../../gql/mutations/userMut";
import { codetouser, codetouserVariables } from "../../generated/codetouser";
import { MyFormInputFormField } from "./MyPinInputFormField";

interface IProps {
  setUser: (arg: any) => void;
  submitMyForm: (arg: () => void) => void;
}

type IFormValves = {
  code: string;
};

const UserCodeScreen: React.FC<IProps> = ({ setUser, submitMyForm }) => {
  const [getCode] = useMutation<codetouser, codetouserVariables>(CODE_TO_USER);

  const formSubmit = async (
    { code }: IFormValves,
    actions: FormikActions<IFormValves>
  ) => {
    await getCode({ variables: { code: parseInt(code) } }).then(
      ({ data = {} }) => {
        const user = data.clockcodetouser;
        if (user) {
          setUser(user);
          return actions.setSubmitting(false);
        }
      },
      (e: any) => {
        if (e.graphQLErrors) {
          e.graphQLErrors.map(({ code, message }: any) => {
            actions.setErrors({ [code]: message });
            return actions.setSubmitting(false);
          });
        }
      }
    );
  };

  return (
    <Formik
      initialValues={{
        code: ""
      }}
      onSubmit={formSubmit}
    >
      {({ submitForm, isSubmitting }: FormikProps<IFormValves>) => {
        submitMyForm(submitForm);
        return (
          <Form>
            <h2>Enter Pin Code</h2>
            <Field name="code" component={MyFormInputFormField} />
            <Button
              type="submit"
              disabled={isSubmitting}
              style={{ display: "none" }}
            >
              Sign In
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default UserCodeScreen;
