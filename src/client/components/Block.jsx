import { useEffect, useState } from "react";
import { DelayHydration, isClient } from "../utils";
import { Base } from "./Base";

export const Block = ({ id, streamingDelay, bundleDelay, hydrationDelay }) => {
  const [state, setState] = useState("Html");
  const [clicking, setClicking] = useState(false);

  if (isClient && state !== "Ready") {
    const element = document.querySelector(`#${id}`);

    if (!element) return;

    element.style.border = "3px solid #4CFFCC";
    element.children[0].textContent = "Hydrating";
  }

  useEffect(() => {
    setState("Ready");
  }, []);

  const borderMatrix = {
    Html: "3px solid black",
    Ready: "3px solid #5281FF",
  };

  return (
    <>
      <Base
        id={id}
        border={borderMatrix[state]}
        backgroundColor={clicking ? "#5281FF" : "#fff"}
        onMouseDown={() => setClicking(true)}
        onMouseUp={() => setClicking(false)}
        streamingDelay={streamingDelay}
        bundleDelay={bundleDelay}
        hydrationDelay={hydrationDelay}
      >
        {state}
      </Base>

      {hydrationDelay !== undefined && <DelayHydration ms={hydrationDelay} />}
    </>
  );
};
