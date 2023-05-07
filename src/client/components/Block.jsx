import { useEffect, useState } from "react";
import { isClient, isServer, sleep, useData } from "../utils";
import { Base } from "./Base";
import { sharedArray } from "../clientWorker";

export const Block = ({ id, index, label }) => {
  const [state, setState] = useState("Html");
  const [clicking, setClicking] = useState(false);

  useData(id);

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
        label={label}
      >
        {state}
      </Base>

      <BlockHydration index={index} />
    </>
  );
};

const BlockHydration = ({ index }) => {
  if (isServer || sharedArray[index]) {
    return null;
  }

  sleep(20);

  return <BlockHydration index={index} />;
};
