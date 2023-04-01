import {
  Suspense,
  lazy,
  memo,
  useDeferredValue,
  useEffect,
  useId,
  useRef,
  useState,
  useTransition,
} from "react";
import { isClient, isServer } from "./utils";
import {
  firstStreamingDelay,
  secondStreamingDelay,
  thirdStreamingDelay,
  fourthStreamingDelay,
} from "../server/delays";
import { Spinner } from "./Spinner";
import { Data } from "./Data";

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
  const [state, set] = useState();
  const deferredState = useDeferredValue(state);

  const ref = useRef({
    promise: undefined,
    isFinished: false,
  });

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
          <button onClick={() => set({})}>Update</button>

          {/* <WrappedFirst state={deferredState} />
          <WrappedSecond state={deferredState} />
          <WrappedThird state={deferredState} />
          <WrappedFourth state={deferredState} /> */}

          <Suspense fallback="Loading">
            <Data context={ref} />
          </Suspense>
        </div>
      </body>
    </html>
  );
};

const WrappedFirst = memo(({ state }) => {
  return (
    <Suspense fallback={<Spinner />}>
      <First />
    </Suspense>
  );
});

const WrappedSecond = memo(({ state }) => {
  return (
    <Suspense fallback={<Spinner />}>
      <Second />
    </Suspense>
  );
});

const WrappedThird = memo(({ state }) => {
  return (
    <Suspense fallback={<Spinner />}>
      <Third />
    </Suspense>
  );
});

const WrappedFourth = memo(({ state }) => {
  return (
    <Suspense fallback={<Spinner />}>
      <Fourth />
    </Suspense>
  );
});

const AppWithProviders = () => <App />;

export { AppWithProviders as App };

//a
