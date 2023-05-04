import express from "express";
import { renderToPipeableStream } from "react-dom/server";
import { App } from "../client/App";
import { resolve } from "path";
import {
  firstBundleDelay,
  secondBundleDelay,
  thirdBundleDelay,
  fourthBundleDelay,
  initialBundleDelay,
} from "./delays";
import { streaming } from "./membrane";

const app = express();

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

app.get("/client/index.js", async (req, res) => {
  await wait(initialBundleDelay);
  res.sendFile(resolve(__dirname, "../../dist/client/index.js"));
});

app.get("/client/src_client_First_jsx.js", async (req, res) => {
  await wait(firstBundleDelay);
  res.sendFile(resolve(__dirname, "../../dist/client/src_client_First_jsx.js"));
});

app.get("/client/src_client_Second_jsx.js", async (req, res) => {
  await wait(secondBundleDelay);
  res.sendFile(
    resolve(__dirname, "../../dist/client/src_client_Second_jsx.js")
  );
});

app.get("/client/src_client_Third_jsx.js", async (req, res) => {
  await wait(thirdBundleDelay);
  res.sendFile(resolve(__dirname, "../../dist/client/src_client_Third_jsx.js"));
});

app.get("/client/src_client_Fourth_jsx.js", async (req, res) => {
  await wait(fourthBundleDelay);
  res.sendFile(
    resolve(__dirname, "../../dist/client/src_client_Fourth_jsx.js")
  );
});

app.get("/stream/:index", (req, res) => {
  const index = req.params["index"];
  const resolve = streaming[index];
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

app.listen(3000, () => {
  console.log("Server up!");
});

//a
