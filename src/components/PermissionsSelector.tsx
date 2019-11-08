import React, { useState } from "react";

import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Chip } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import AddIcon from "@material-ui/icons/Add";

const GET_PERMISSIONS = gql`
  query All_Permissions {
    __type(name: "Permissions") {
      enumValues {
        name
      }
    }
  }
`;

//TODO fix Any
function getInnerText(e: any): string {
  if (!e.innerText) return getInnerText(e.parentElement);
  return e.innerText;
}

interface IProps {
  startedPerms: string[];
  onChange: Function;
  chipstyle: {};
}

const PermissionsSelector: React.FC<IProps> = ({
  startedPerms = [],
  onChange,
  chipstyle
}) => {
  const [selectedPerms, setSelectedPerms] = useState(startedPerms);

  const handleclick = (e: React.MouseEvent<HTMLDivElement>): void => {
    const perm = getInnerText(e.target);
    const middlearray = selectedPerms;
    if (selectedPerms.includes(perm)) {
      const newarray = middlearray.filter(newperm => newperm !== perm);
      setSelectedPerms(newarray);
      onChange(newarray);
    } else {
      middlearray.push(perm);
      setSelectedPerms(middlearray);
      onChange(middlearray);
    }
  };

  // TODO Fix Any

  return (
    <Query query={GET_PERMISSIONS}>
      {({ data = {} }: any) => {
        const __type = data["__type"];
        const names = __type ? __type.enumValues.map((e: any) => e.name) : [];
        return (
          <>
            {names.map((name: string, i: number) => {
              return (
                <Chip
                  color={selectedPerms.includes(name) ? "primary" : "default"}
                  avatar={
                    selectedPerms.includes(name) ? (
                      undefined
                    ) : (
                      <Avatar>
                        <AddIcon />
                      </Avatar>
                    )
                  }
                  onDelete={
                    selectedPerms.includes(name) ? handleclick : undefined
                  }
                  key={i}
                  label={name}
                  onClick={
                    selectedPerms.includes(name) ? undefined : handleclick
                  }
                  style={chipstyle}
                />
              );
            })}
          </>
        );
      }}
    </Query>
  );
};

export default PermissionsSelector;
