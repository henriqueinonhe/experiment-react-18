import express from "express";
import { renderToPipeableStream } from "react-dom/server";
import { App } from "../client/App";

const app = express();

app.use(express.static("dist"));

app.get("/", async (req, res) => {
  const { pipe } = renderToPipeableStream(<App />, {
    bootstrapScripts: ["client.js"],
    onShellReady: () => {
      res.setHeader("content-type", "text/html");
      pipe(res);
    },
  });
});

app.listen(3000, () => {
  console.log("Server up!");
});
