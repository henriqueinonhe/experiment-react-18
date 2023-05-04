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
  firstBundleDelay,
  firstHydrationDelay,
  secondStreamingDelay,
  secondBundleDelay,
  secondHydrationDelay,
  thirdStreamingDelay,
  thirdBundleDelay,
  thirdHydrationDelay,
  fourthStreamingDelay,
  fourthBundleDelay,
  fourthHydrationDelay,
} from "../server/delays";
import { Data } from "./components/Data";
import { Spinner } from "./components/Spinner";
import { RemoteControl } from "./components/RemoteControl";
import { streaming } from "../server/membrane";

const First = lazy(async () => {
  if (isServer) {
    await new Promise((resolve) => {
      streaming.first = resolve;
    });
  }

  return import("./components/First");
});

const Second = lazy(async () => {
  if (isServer) {
    await new Promise((resolve) => {
      streaming.second = resolve;
    });
  }

  return import("./components/Second");
});

const Third = lazy(async () => {
  if (isServer) {
    await new Promise((resolve) => {
      streaming.third = resolve;
    });
  }

  return import("./components/Third");
});

const Fourth = lazy(async () => {
  if (isServer) {
    await new Promise((resolve) => {
      streaming.fourth = resolve;
    });
  }

  return import("./components/Fourth");
});

if (isClient) {
  import("./components/First");
  import("./components/Second");
  import("./components/Third");
  import("./components/Fourth");
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
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              maxWidth: "800px",
              justifyContent: "center",
              margin: "auto",
            }}
          >
            <Suspense
              fallback={
                <Spinner
                  streamingDelay={firstStreamingDelay}
                  bundleDelay={firstBundleDelay}
                  hydrationDelay={firstHydrationDelay}
                />
              }
            >
              <First />
            </Suspense>

            <Suspense
              fallback={
                <Spinner
                  streamingDelay={secondStreamingDelay}
                  bundleDelay={secondBundleDelay}
                  hydrationDelay={secondHydrationDelay}
                />
              }
            >
              <Second />
            </Suspense>

            <Suspense
              fallback={
                <Spinner
                  streamingDelay={thirdStreamingDelay}
                  bundleDelay={thirdBundleDelay}
                  hydrationDelay={thirdHydrationDelay}
                />
              }
            >
              <Third />
            </Suspense>

            <Suspense
              fallback={
                <Spinner
                  streamingDelay={fourthStreamingDelay}
                  bundleDelay={fourthBundleDelay}
                  hydrationDelay={fourthHydrationDelay}
                />
              }
            >
              <Fourth />
            </Suspense>

            {/* <button onClick={() => set({})}>Update</button> */}

            {/* <Suspense fallback="Loading">
            <Data context={ref} />
          </Suspense> */}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItms: "center",
            }}
          >
            <RemoteControl target="first" label={"First"} />
            <RemoteControl target="second" label={"Second"} />
            <RemoteControl target="third" label={"Third"} />
            <RemoteControl target="fourth" label={"Fourth"} />
          </div>
        </div>
      </body>
    </html>
  );
};

const AppWithProviders = () => <App />;

export { AppWithProviders as App };

//a
