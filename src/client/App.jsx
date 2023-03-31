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

const App = () => {
  const [counter, setCounter] = useState(0);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    console.log("App Effect!");
  });

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
          <button
            onClick={() => startTransition(() => setCounter(counter + 1))}
          >
            Increment
          </button>
        </div>

        <Wrapped counter={counter} />
      </body>
    </html>
  );
};

const Wrapped = memo(({ counter }) => (
  <Suspense fallback="Loading...">
    <Slow />
  </Suspense>
));

const AppWithProviders = () => (
  <SuspenseProvider>
    <App />
  </SuspenseProvider>
);

export { AppWithProviders as App };
