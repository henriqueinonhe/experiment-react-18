import { useEffect, useId, useState } from "react";
import { DelayHydration, isClient } from "./utils";

export const Base = ({ id, hydrationDelay }) => {
  const [state, setState] = useState("Html");
  const [clicking, setClicking] = useState(false);

  if (isClient && state !== "Ready") {
    const element = document.querySelector(`#${id}`);

    if (!element) return;

    element.style.border = "3px solid #4CFFCC";
    element.textContent = "Hydrating";
  }

  useEffect(() => {
    setState("Ready");
  }, []);

  const borderMatrix = {
    Html: "3px solid black",
    Ready: "3px solid #5281FF",
  };

  const style = {
    width: "calc(50% - 8px)",
    height: "300px",
    margin: "4px",
    border: borderMatrix[state],
    backgroundColor: clicking ? "#5281FF" : "#fff",
    fontSize: "24px",
    fontFamily: "sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <>
      <div
        id={id}
        style={style}
        onMouseDown={() => setClicking(true)}
        onMouseUp={() => setClicking(false)}
        suppressHydrationWarning
      >
        {state}
      </div>

      {hydrationDelay !== undefined && <DelayHydration ms={hydrationDelay} />}
    </>
  );
};
