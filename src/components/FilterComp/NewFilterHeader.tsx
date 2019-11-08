import React, { useState } from "react";
import createFilterCtx from "./createFilterCtx";

interface IProps {
  initialValues: any;
}

interface IQParams {
  qParams: any;
  setParams: any;
}

const [useCtx, ContextProvider] = createFilterCtx<IQParams>();

const NewFilterHeader: React.FC<IProps> = ({ initialValues, children }) => {
  const [qParams, setParams] = useState(initialValues);
  return (
    <ContextProvider value={{ qParams, setParams }}>{children}</ContextProvider>
  );
};

export default NewFilterHeader;
export { useCtx };
