import express from "express";
import { renderToPipeableStream } from "react-dom/server";
import { App } from "../client/App";
import { resolve } from "path";
import { bundle, streaming } from "./membrane";
import { Iframe } from "../client/Iframe";

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/client/index.js", async (req, res) => {
  // await new Promise((resolve) => {
  //   bundle.initial = resolve;
  // });
  //TODO
  res.sendFile(resolve(__dirname, "../../dist/client/index.js"));
});

app.get("/client/src_client_components_First_jsx.js", async (req, res) => {
  await new Promise((resolver) => {
    bundle.first = resolver;
  });
  res.sendFile(
    resolve(__dirname, "../../dist/client/src_client_components_First_jsx.js")
  );
});

app.get("/client/src_client_components_Second_jsx.js", async (req, res) => {
  await new Promise((resolver) => {
    bundle.second = resolver;
  });
  res.sendFile(
    resolve(__dirname, "../../dist/client/src_client_components_Second_jsx.js")
  );
});

app.get("/client/src_client_components_Third_jsx.js", async (req, res) => {
  await new Promise((resolver) => {
    bundle.third = resolver;
  });
  res.sendFile(
    resolve(__dirname, "../../dist/client/src_client_components_Third_jsx.js")
  );
});

app.get("/client/src_client_components_Fourth_jsx.js", async (req, res) => {
  await new Promise((resolver) => {
    bundle.fourth = resolver;
  });
  res.sendFile(
    resolve(__dirname, "../../dist/client/src_client_components_Fourth_jsx.js")
  );
});

app.get("/stream/:id", (req, res) => {
  const id = req.params["id"];
  const resolve = streaming[id];
  resolve();
  res.send("Ok");
});

app.get("/bundle/:id", (req, res) => {
  const id = req.params["id"];
  const resolve = bundle[id];
  resolve();
  res.send("Ok");
});

const setArrayBufferCompatibilityHeaders = (res) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
};

app.get("/", async (req, res) => {
  const { pipe } = renderToPipeableStream(<App />, {
    bootstrapScripts: ["./client/index.js"],
    onShellReady: () => {
      res.setHeader("content-type", "text/html");
      setArrayBufferCompatibilityHeaders(res);
      pipe(res);
    },
  });
});

app.get("/iframe", (req, res) => {
  const { pipe } = renderToPipeableStream(<Iframe />, {
    bootstrapScripts: ["./client/iframe.js"],
    onShellReady: () => {
      res.setHeader("content-type", "text/html");
      setArrayBufferCompatibilityHeaders(res);
      pipe(res);
    },
  });
});

app.get("/worker.js", (req, res) => {
  setArrayBufferCompatibilityHeaders(res);
  res.sendFile(resolve(__dirname, "../../dist/client/worker.js"));
});

const sseConnections = [];

app.post("/hydrate/:id", (req, res) => {
  const id = req.params.id;

  sseConnections.forEach((connection) => connection.send(id));
  res.send("Ok");
});

app.get("/sse", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const connection = {
    send: (id) => res.write(`event: message\ndata: ${id}\n\n`),
    close: () => res.end(),
  };

  req.on("close", () => {
    const index = sseConnections.indexOf(connection);
    sseConnections.splice(index, 1);
    connection.close();
  });

  sseConnections.push(connection);
});

app.use(express.static("dist"));

app.listen(3000, () => {
  console.log("Server up!");
});

//a
