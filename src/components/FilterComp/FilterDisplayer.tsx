import React from "react";
import Box, { BoxProps } from "@material-ui/core/Box";
import Chip, { ChipProps } from "@material-ui/core/Chip";

export interface FilterDisplayProps {
  filters: ChipProps[];
  boxProps?: BoxProps;
  chipProps?: ChipProps;
}

const FilterDisplayer: React.FC<FilterDisplayProps> = ({
  filters,
  boxProps,
  chipProps
}) => {
  return (
    <>
      {filters && (
        <Box display="flex" {...boxProps}>
          {filters.map((params, i) => (
            <Chip
              key={`chip-${i}`}
              style={{ marginRight: "8px" }}
              {...chipProps}
              {...params}
            />
          ))}
        </Box>
      )}
    </>
  );
};

export default FilterDisplayer;
