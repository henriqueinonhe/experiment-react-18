import { memo, useEffect } from "react";
import { useSuspenseData } from "./SuspenseProvider";

export const Slow = () => {
  const { dataRef } = useSuspenseData();
  console.log("Slow Rendered!");

  if (!dataRef.current.isFinished) {
    dataRef.current.isFinished = false;
    dataRef.current.promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        dataRef.current.isFinished = true;
      }, 5000);
    });
  }

  if (!dataRef.current.isFinished) {
    throw dataRef.current.promise;
  }

  return <>Slow</>;
};

export default Slow;
