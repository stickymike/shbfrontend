import { useState, useEffect } from "react";

function useHighlightScrollandSreen(
  { state = {} }: any,
  setUserScreen: Function,
  delay: number = 1000
) {
  const { highlighted = null, screen = null } = state;
  const [node, setRef] = useState<HTMLInputElement | null>(null);
  const [id, setId] = useState(highlighted);

  useEffect(() => {
    if (screen) setUserScreen(screen);
  }, [screen, setUserScreen]);

  useEffect(() => {
    if (node) {
      node.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => setId(null), delay);
    }
  }, [delay, node]);

  return [id, setRef] as const;
}

export default useHighlightScrollandSreen;
