import { useCallback, useState, useRef, useEffect } from "react";

const isKeyboardKeyAllowed = (code) => {
  return (
    code.startsWith("Key") ||
    code.startsWith("Digit") ||
    code === "Backspace" ||
    code === "Space"
  );
};

const useTypings = ({ enabled = true }) => {
  const [cursor, setCursor] = useState(0);
  const [typed, setTyped] = useState("");
  const totalTyped = useRef(0);

  const keyDownHandler = useCallback(
    (e) => {
      switch (e.key) {
        case "Backspace":
          setTyped((prev) => prev.slice(0, -1));
          setCursor((cursor) => Math.max(cursor - 1, 0));
          totalTyped.current = Math.max(totalTyped.current - 1, 0);
          break;

        default:
          setTyped((prev) => {
            return prev + e.key;
          });
          setCursor((cursor) => cursor + 1);
          totalTyped.current += 1;
      }
    },
    [enabled]
  );

  const clearTyped = useCallback(() => {
    setTyped("");
    setCursor(0);
  }, []);

  const resetTyped = useCallback(() => {
    totalTyped.current = 0;
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [keyDownHandler]);

  return {
    typed,
    cursor,
    clearTyped,
    resetTyped,
    totalTyped: totalTyped.current,
  };
};

export default useTypings;
