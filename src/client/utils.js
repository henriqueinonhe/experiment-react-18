import { streaming } from "../server/membrane";

export const isServer = typeof window === "undefined";
export const isClient = !isServer;

export const sleep = (ms) => {
  const start = performance.now();
  while (performance.now() - start < ms);
};

const dataRecords = {};

export const useData = (id) => {
  if (!dataRecords[id]) {
    dataRecords[id] = {
      promise: undefined,
      isFulfilled: false,
    };

    const record = dataRecords[id];

    record.promise = new Promise((resolve) => {
      const wrappedResolver = () => {
        record.isFulfilled = true;
        resolve();
      };

      //FIXME!
      streaming[id.toLowerCase()] = wrappedResolver;
    });
  }

  const record = dataRecords[id];

  if (!record.isFulfilled) {
    throw record.promise;
  }

  return;
};
