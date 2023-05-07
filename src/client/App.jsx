import { Suspense, lazy, useDeferredValue, useRef, useState } from "react";
import { isClient, isServer } from "./utils";
import { Spinner } from "./components/Spinner";
import { streaming } from "../server/membrane";

const First = lazy(async () => import("./components/First"));
const Second = lazy(async () => import("./components/Second"));
const Third = lazy(async () => import("./components/Third"));
const Fourth = lazy(async () => import("./components/Fourth"));

const App = () => {
  const [state, set] = useState();
  const deferredState = useDeferredValue(state);

  const uniqueIdRef = useRef(Math.random());
  const dataRecordsRef = useRef({});

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
              flexGrow: 1,
            }}
          >
            <Suspense fallback={<Spinner label="1" />}>
              <First />
            </Suspense>

            <Suspense fallback={<Spinner label="2" />}>
              <Second />
            </Suspense>

            <Suspense fallback={<Spinner label="3" />}>
              <Third />
            </Suspense>

            <Suspense fallback={<Spinner label="4" />}>
              <Fourth />
            </Suspense>

            {/* <button onClick={() => set({})}>Update</button> */}

            {/* <Suspense fallback="Loading">
            <Data context={ref} />
          </Suspense> */}
          </div>

          <iframe src="http://a.localhost:3000/iframe" />
        </div>
      </body>
    </html>
  );
};

const AppWithProviders = () => <App />;

export { AppWithProviders as App };

//a
