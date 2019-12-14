import React, { useState } from "react";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";

interface IMenuProps {
  anchorEl: HTMLElement | null;
  handleClose: (
    arg: string | null
  ) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  options: {
    display: string;
    location: string;
    color: "primary" | "secondary";
  }[];
}

const SimpleMenu: React.FC<IMenuProps> = ({
  anchorEl,
  handleClose,
  options
}) => (
  <Popover
    id="Test"
    anchorOrigin={{
      vertical: "top",
      horizontal: "right"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right"
    }}
    closeAfterTransition={true}
    getContentAnchorEl={null}
    anchorEl={anchorEl}
    keepMounted={false}
    open={Boolean(anchorEl)}
    disablePortal={true}
    onClose={handleClose(null)}
    PaperProps={{
      elevation: 2,
      style: {
        display: "flex",
        flexDirection: "column"
      }
    }}
  >
    {options.map(option => (
      <Button
        color={option.color}
        key={option.location}
        onClick={handleClose(option.location)}
        style={{ margin: "8px" }}
      >
        {option.display}
      </Button>
    ))}
  </Popover>
);

export default SimpleMenu;
