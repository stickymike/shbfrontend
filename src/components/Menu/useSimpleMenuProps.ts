import React, { useState } from "react";

const useSimpleMenuProps = (
  menuItems: {
    Component?: any;
    functionString: string;
    componentProps?: any;
    text: string;
  }[],
  menuFuction: (a: string) => void
) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (arg: string | null) => (
    e: React.MouseEvent<HTMLElement>
  ) => {
    if (arg) menuFuction(arg);
    setAnchorEl(null);
  };

  return [handleClick, { anchorEl, handleClose, menuItems }] as const;
};

export default useSimpleMenuProps;
