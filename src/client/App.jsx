import {
  Suspense,
  lazy,
  memo,
  useEffect,
  useId,
  useState,
  useTransition,
} from "react";
import { SuspenseProvider } from "./SuspenseProvider";
import { Slow } from "./Slow";

const Lazy = lazy(
  () =>
    new Promise((resolve) => setTimeout(() => resolve(import("./Lazy")), 1000))
);

const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>React 18</title>
      </head>
      <body>
        <p>Counter: {counter}</p>

        <div>
          <button onClick={() => setCounter(counter + 1)}>Increment</button>
        </div>

        {/* <Suspense fallback={<div>Data Loading...</div>}>
          <Slow />
        </Suspense> */}

        <Suspense fallback={<div>Lazy Loading...</div>}>
          <Lazy />
        </Suspense>
      </body>
    </html>
  );
};

const AppWithProviders = () => (
  <SuspenseProvider>
    <App />
  </SuspenseProvider>
);

export { AppWithProviders as App };
