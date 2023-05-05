import { RemoteControl } from "./components/RemoteControl";

export const Iframe = () => {
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
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RemoteControl target="first" label={"First"} />
          <RemoteControl target="second" label={"Second"} />
          <RemoteControl target="third" label={"Third"} />
          <RemoteControl target="fourth" label={"Fourth"} />
        </div>
      </body>
    </html>
  );
};
