import React from "react";
import Popover, { PopoverOrigin } from "@material-ui/core/Popover";
import { PaperProps } from "@material-ui/core/Paper";
import { MenuItem, MenuList, ListItem } from "@material-ui/core";

interface IMenuProps {
  anchorEl: HTMLElement | null;
  handleClose: (
    arg: string | null
  ) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  menuItems: {
    Component?: any;
    functionString: string;
    componentProps?: any;
    text: string;
  }[];
}

const SimpleMenu: React.FC<IMenuProps> = ({
  anchorEl,
  handleClose,
  menuItems
}) => {
  const wrappedInternalMenu = (Menu: any) => {
    if (menuItems.length === 0)
      return (
        <MenuList>
          <ListItem>No Options Available</ListItem>
        </MenuList>
      );
    if (menuItems[0] && !menuItems[0].Component)
      return <MenuList>{Menu()}</MenuList>;
    return Menu();
  };

  const Menu = () => {
    return menuItems.map(
      ({ Component = MenuItem, functionString, componentProps, text }) => (
        <Component
          key={functionString}
          onClick={handleClose(functionString)}
          {...componentProps}
        >
          {text}
        </Component>
      )
    );
  };

  return (
    <Popover
      {...popperStaticProps}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose(null)}
    >
      {wrappedInternalMenu(Menu)}
    </Popover>
  );
};

const popperStaticProps = {
  anchorOrigin: {
    vertical: "top",
    horizontal: "right"
  } as PopoverOrigin,
  transformOrigin: {
    vertical: "top",
    horizontal: "right"
  } as PopoverOrigin,
  closeAfterTransition: true,
  getContentAnchorEl: null,
  keepMounted: false,
  disablePortal: true,
  PaperProps: {
    elevation: 2,
    style: {
      display: "flex",
      flexDirection: "column"
    }
  } as PaperProps
};

export default SimpleMenu;
