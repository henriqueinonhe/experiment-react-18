export const RemoteControl = ({ label, target }) => {
  const sendSsrHtml = () => {
    fetch(`http://localhost:3000/stream/${target}`);
  };

  const sendBundle = () => {
    fetch(`http://localhost:3000/bundle/${target}`);
  };

  const hydrate = () => {
    fetch(`http://localhost:3000/hydrate/${target}`, {
      method: "POST",
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <p>{label}</p>

      <button onClick={sendSsrHtml}>Send SSR Html</button>
      <button onClick={sendBundle}>Send Bundle</button>
      <button onClick={hydrate}>Hydrate</button>
    </div>
  );
};
