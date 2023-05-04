export const RemoteControl = ({ label, target }) => {
  const stream = () => {
    fetch(`http://localhost:3000/stream/${target}`);
  };

  const sendBundle = () => {
    //TODO
  };

  const hydrate = () => {
    //TODO
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <p>{label}</p>

      <button onClick={stream}>Stream</button>
      <button onClick={sendBundle}>Send Bundle</button>
      <button onClick={hydrate}>Hydrate</button>
    </div>
  );
};
