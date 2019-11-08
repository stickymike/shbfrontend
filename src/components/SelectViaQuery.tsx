import React, { useState } from "react";
import { Query } from "react-apollo";
import { Chip, Theme } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  selected: {
    backgroundColor: theme.palette.action.selected,
    fontWeight: theme.typography.fontWeightMedium
  }
}));

interface IProps {
  startSelected: Selected[];
  onChange: any;
  chipstyle?: {};
  query: any;
  name: string;
  selectedName: string;
  pusher: any;
  target: string;
}

interface Selected {
  id: string;
  payRate: number;
  [key: string]: string | number;
}

const SelectViaQuery: React.FC<IProps> = ({
  startSelected = [],
  onChange,
  chipstyle,
  query = null,
  name,
  selectedName,
  pusher,
  target
}) => {
  const [selected, setSelected] = useState<Selected[]>(startSelected);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  const handleoption = (option: Selected) => {
    const middlearray = selected;
    if (selected.includes(option)) {
      const newarray = middlearray.filter(newperm => newperm !== option);
      setSelected(newarray);
      onChange(newarray);
    } else {
      middlearray.push(option);
      setSelected(middlearray);
      onChange(middlearray);
    }
  };

  const handleDelete = (option: Selected) => {
    const middlearray = selected;
    const newarray = middlearray.filter(newperm => newperm !== option);
    setSelected(newarray);
    onChange(newarray);
  };

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (event.currentTarget) setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const ITEM_HEIGHT = 48;

  return (
    <Query query={query}>
      {({ data = {} }: any) => {
        let counter = 0;

        return (
          <>
            {selected.map(perm => (
              <Chip
                key={perm.id}
                label={perm[selectedName]}
                onDelete={() => handleDelete(perm)}
                onClick={() => pusher(target, { highlighted: perm.id })}
              />
            ))}
            <IconButton
              aria-label="More"
              aria-owns={open ? "long-menu" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
              // variant="outline"
            >
              <AddIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: 200
                }
              }}
            >
              {data[name] &&
                data[name].map((option: Selected, i: number) => {
                  if (!selected.some(selected => selected.id === option.id)) {
                    return (
                      <MenuItem
                        key={option.id}
                        onClick={() => handleoption(option)}
                        className={
                          selected.includes(option)
                            ? classes.selected
                            : undefined
                        }
                      >
                        {option[selectedName]} -{" "}
                        {option.payRate && option.payRate / 100}
                      </MenuItem>
                    );
                  } else counter += 1;

                  if (counter === data[name].length)
                    return (
                      <MenuItem key={option.id} onClick={handleClose}>
                        All Options Selected
                      </MenuItem>
                    );
                  return null;
                })}
            </Menu>
          </>
        );
      }}
    </Query>
  );
};

export default SelectViaQuery;
