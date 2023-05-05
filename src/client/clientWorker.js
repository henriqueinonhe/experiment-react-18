import { isClient } from "./utils";

const sharedBuffer = new SharedArrayBuffer(4);
export const sharedArray = new Int8Array(sharedBuffer);

if (isClient) {
  const worker = new Worker("/worker.js");
  worker.postMessage(sharedBuffer);
}
