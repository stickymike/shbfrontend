import React, { useState } from "react";

import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Chip } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import AddIcon from "@material-ui/icons/Add";
import ItemSquare from "./ItemSquare";

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
  selectedPerms?: string[];
  setSelectedPerms?: React.Dispatch<any>;
}

const PermissionsSelector: React.FC<IProps> = ({
  startedPerms = [],
  onChange,
  chipstyle,
  selectedPerms = [],
  setSelectedPerms = () => null
}) => {
  const handleclick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    console.log("clicked");
    const perm = getInnerText(e.target);
    const middlearray = [...selectedPerms];
    if (selectedPerms.includes(perm)) {
      const newarray = middlearray.filter(newperm => newperm !== perm);
      setSelectedPerms(newarray);
    } else {
      middlearray.push(perm);
      setSelectedPerms(middlearray);
    }
  };

  return (
    <Query query={GET_PERMISSIONS}>
      {({ data = {} }: any) => {
        const __type = data["__type"];
        const names = __type ? __type.enumValues.map((e: any) => e.name) : [];
        return (
          <>
            {names.map((name: string, i: number) => {
              return (
                // <Chip
                //   color={selectedPerms.includes(name) ? "primary" : "default"}
                //   avatar={
                //     selectedPerms.includes(name) ? (
                //       undefined
                //     ) : (
                //       <Avatar>
                //         <AddIcon />
                //       </Avatar>
                //     )
                //   }
                //   onDelete={
                //     selectedPerms.includes(name) ? handleclick : undefined
                //   }
                //   key={i}
                //   label={name}
                //   onClick={handleclick as any}
                //   style={chipstyle}
                // />

                <ItemSquare
                  onClick={handleclick}
                  label={name}
                  selected={selectedPerms.includes(name)}
                  key={i}
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
