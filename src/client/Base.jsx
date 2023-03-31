import { useEffect, useState } from "react";

export const Base = () => {
  const [state, setState] = useState("Html");
  const [clicking, setClicking] = useState(false);

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
    <div
      style={style}
      onMouseDown={() => setClicking(true)}
      onMouseUp={() => setClicking(false)}
    >
      {state}
    </div>
  );
};
