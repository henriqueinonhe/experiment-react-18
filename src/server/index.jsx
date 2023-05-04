import express from "express";
import { renderToPipeableStream } from "react-dom/server";
import { App } from "../client/App";
import { resolve } from "path";
import { bundle, streaming } from "./membrane";
import { Iframe } from "../client/Iframe";

const app = express();

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

app.use(express.static("dist"));

app.get("/", async (req, res) => {
  const { pipe } = renderToPipeableStream(<App />, {
    bootstrapScripts: ["./client/index.js"],
    onShellReady: () => {
      res.setHeader("content-type", "text/html");
      pipe(res);
    },
  });
});

app.get("/iframe", (req, res) => {
  const { pipe } = renderToPipeableStream(<Iframe />, {
    bootstrapScripts: ["./client/index.js"],
    onShellReady: () => {
      res.setHeader("content-type", "text/html");
      pipe(res);
    },
  });
});

app.listen(3000, () => {
  console.log("Server up!");
});

//a
