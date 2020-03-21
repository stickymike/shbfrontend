import { useState, useCallback } from "react";

const useMenuProps = (duration: number) => {
  const [open, setopen] = useState(false);

  const [opening, setopening] = useState<any>(undefined);
  const [anchorEl, setAnchorEl] = useState<HTMLInputElement | null>(null);

  const onMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
      const target = event.currentTarget;
      if (target.nodeName === "DIV") setopen(true);
      if (target.nodeName === "INPUT") setAnchorEl(target);
      setopening(setTimeout(() => setopen(true), duration));
    },
    [duration]
  );

  const onMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
      clearTimeout(opening);
      setopen(false);
    },
    [opening]
  );

  return [anchorEl, open, { onMouseEnter, onMouseLeave }] as const;
};

export default useMenuProps;
