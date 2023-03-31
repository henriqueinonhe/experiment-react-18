import { useEffect, useState } from "react";

export const isServer = typeof window === "undefined";
export const isClient = !isServer;

export const sleep = (ms) => {
  const start = performance.now();
  while (performance.now() - start < ms);
};

export const DelayHydration = ({ ms }) => {
  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {
    setIsHydrating(false);
  }, []);

  if (isServer || !isHydrating) {
    return;
  }

  const entriesLength = Math.floor(ms / 5);

  return Array.from({ length: entriesLength }).map((_, index) => (
    <DelayHydrationHelper key={index} />
  ));
};

const DelayHydrationHelper = () => {
  sleep(5);

  return <></>;
};
