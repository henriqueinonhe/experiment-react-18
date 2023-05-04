import { RemoteControl } from "./components/RemoteControl";

export const Iframe = () => {
  return (
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
  );
};
