import express from "express";
import { renderToPipeableStream } from "react-dom/server";
import { App } from "../client/App";
import { resolve } from "path";

const app = express();

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// app.get("/*.js", async (req, res) => {
//   await wait(1000);
//   res.sendFile(resolve(__dirname, `../../dist/${req.path}`));
// });

// app.get("/dist/client/src_client_lazy_jsx.js", (req, res) => {
//   res.sendFile("dist/client/src_client_lazy_jsx.js", { root: __dirname });
// });

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
