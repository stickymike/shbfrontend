import React from "react";

interface Props {
  ctx: any;
}

const Test: React.FC<Props> = ({ ctx }) => {
  const myctx = ctx();
  console.log(myctx);
  return <div></div>;
};

export default Test;
