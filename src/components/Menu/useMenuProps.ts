import React, { useState } from "react";

const useMenuProps = (
  options: {
    display: string;
    location: string;
    color: "primary" | "secondary";
  }[],
  changeScreen: (a: string) => void
) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (arg: string | null) => (
    e: React.MouseEvent<HTMLElement>
  ) => {
    if (arg) changeScreen(arg);
    setAnchorEl(null);
  };

  return [handleClick, { anchorEl, handleClose, options }] as const;
};

export default useMenuProps;
