import React from "react";
import Me from "../components/Me";

interface First {
  includes: string;
  children: React.ReactNode;
}

interface Me {
  data: {
    me: {
      permissions: string[];
    };
  };
}

// TODO Fix any on Data

const PermHelper: React.FC<First> = ({
  includes,
  children
}: First): React.ReactNode | any => {
  return (
    <Me>
      {(data: any = {}) =>
        data.me && permhelper(data.me.permissions, includes) ? children : null
      }
    </Me>
  );
};

function permhelper(permissions: string[] | null, test: string): boolean {
  if (!permissions) return false;
  let isAllowed = false;
  permissions.forEach(element => {
    if (element === test) isAllowed = true;
  });
  return isAllowed;
}

export default permhelper;
export { PermHelper };
