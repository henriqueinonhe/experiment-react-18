import {
  Suspense,
  lazy,
  memo,
  useEffect,
  useId,
  useState,
  useTransition,
} from "react";
import { isClient, isServer } from "./utils";
import {
  firstDelayOnServer,
  secondDelayOnServer,
  thirdDelayOnServer,
  fourthDelayOnServer,
} from "../server/delays";
import { Spinner } from "./Spinner";

const First = lazy(async () => {
  if (isServer) {
    await new Promise((resolve) => setTimeout(resolve, firstDelayOnServer));
  }

  return import("./First");
});

const Second = lazy(async () => {
  if (isServer) {
    await new Promise((resolve) => setTimeout(resolve, secondDelayOnServer));
  }

  return import("./Second");
});

const Third = lazy(async () => {
  if (isServer) {
    await new Promise((resolve) => setTimeout(resolve, thirdDelayOnServer));
  }

  return import("./Third");
});

const Fourth = lazy(async () => {
  if (isServer) {
    await new Promise((resolve) => setTimeout(resolve, fourthDelayOnServer));
  }

  return import("./Fourth");
});

if (isClient) {
  import("./First");
  import("./Second");
  import("./Third");
  import("./Fourth");
}

const App = () => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>React 18</title>

        <style
          dangerouslySetInnerHTML={{
            __html: `* {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            position: relative;
          }`,
          }}
        />
      </head>

      <body>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            maxWidth: "800px",
            justifyContent: "center",
            margin: "auto",
          }}
        >
          <Suspense fallback={<Spinner />}>
            <First />
          </Suspense>

          <Suspense fallback={<Spinner />}>
            <Second />
          </Suspense>

          <Suspense fallback={<Spinner />}>
            <Third />
          </Suspense>

          <Suspense fallback={<Spinner />}>
            <Fourth />
          </Suspense>
        </div>
      </body>
    </html>
  );
};

const AppWithProviders = () => <App />;

export { AppWithProviders as App };
