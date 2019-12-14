const useSubmitPassBack = () => {
  let submitForm: (() => void) | null = null;
  const newSubmitForm = () => {
    if (submitForm) submitForm();
  };
  const formHandle = (newSubmit: () => void) => {
    submitForm = newSubmit;
  };
  return [newSubmitForm, formHandle] as const;
};

export default useSubmitPassBack;
