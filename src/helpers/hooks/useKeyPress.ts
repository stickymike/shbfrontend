import { useState, useEffect } from "react";

function useKeyPress(targetKey: string, func: () => void) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // Add event listeners
  useEffect(() => {
    // If released key is our target key then set to false
    const upHandler = ({ key }: any) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };

    // If pressed key is our target key then set to true
    function downHandler({ key }: any) {
      // console.log(key);
      if (key === targetKey) {
        setKeyPressed(true);
        func();
      }
    }

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [func, targetKey]); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}

export default useKeyPress;
