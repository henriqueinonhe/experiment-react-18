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
  firstStreamingDelay,
  secondStreamingDelay,
  thirdStreamingDelay,
  fourthStreamingDelay,
  firstHydrationDelay,
  secondHydrationDelay,
  thirdHydrationDelay,
  fourthHydrationDelay,
} from "../server/delays";
import { Spinner } from "./Spinner";

const First = lazy(async () => {
  if (isServer) {
    await new Promise((resolve) => setTimeout(resolve, firstStreamingDelay));
  }

  return import("./First");
});

const Second = lazy(async () => {
  if (isServer) {
    await new Promise((resolve) => setTimeout(resolve, secondStreamingDelay));
  }

  return import("./Second");
});

const Third = lazy(async () => {
  if (isServer) {
    await new Promise((resolve) => setTimeout(resolve, thirdStreamingDelay));
  }

  return import("./Third");
});

const Fourth = lazy(async () => {
  if (isServer) {
    await new Promise((resolve) => setTimeout(resolve, fourthStreamingDelay));
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
            <First id="First" hydrationDelay={firstHydrationDelay} />
          </Suspense>

          <Suspense fallback={<Spinner />}>
            <Second id="Second" hydrationDelay={secondHydrationDelay} />
          </Suspense>

          <Suspense fallback={<Spinner />}>
            <Third id="Third" hydrationDelay={thirdHydrationDelay} />
          </Suspense>

          <Suspense fallback={<Spinner />}>
            <Fourth id="Fourth" hydrationDelay={fourthHydrationDelay} />
          </Suspense>
        </div>
      </body>
    </html>
  );
};

const AppWithProviders = () => <App />;

export { AppWithProviders as App };
