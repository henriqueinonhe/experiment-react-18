import { createContext, useContext, useMemo, useRef, useState } from "react";

export const SuspenseContext = createContext();

export const SuspenseProvider = ({ children }) => {
  const dataRef = useRef({
    promise: undefined,
    isFinished: false,
    id: undefined,
  });

  const value = useMemo(
    () => ({
      dataRef,
    }),
    []
  );

  return (
    <SuspenseContext.Provider value={value}>
      {children}
    </SuspenseContext.Provider>
  );
};

export const useSuspenseData = () => useContext(SuspenseContext);
