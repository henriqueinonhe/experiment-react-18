const serverEventSource = new EventSource("http://localhost:3000/sse");

let sharedArray;

self.onmessage = (e) => {
  sharedArray = new Int8Array(e.data);
};

serverEventSource.onmessage = (e) => {
  const id = e.data;

  if (id === "first") {
    sharedArray[0] = 1;
  } else if (id === "second") {
    sharedArray[1] = 1;
  } else if (id === "third") {
    sharedArray[2] = 1;
  } else {
    sharedArray[3] = 1;
  }
};
