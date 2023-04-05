export const Base = ({
  id,
  border,
  backgroundColor,
  onMouseDown,
  onMouseUp,
  children,
  streamingDelay,
  bundleDelay,
  hydrationDelay,
}) => {
  const containerStyle = {
    width: "calc(50% - 8px)",
    height: "300px",
    margin: "4px",
    border: border,
    backgroundColor: backgroundColor,
    fontSize: "24px",
    fontFamily: "sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    userSelect: "none",
    position: "relative",
  };

  const delaysStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    display: "flex",
    flexDirection: "column",
    fontSize: "14px",
    paddingLeft: "4px",
    paddingTop: "4px",
  };

  return (
    <div
      id={id}
      style={containerStyle}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      suppressHydrationWarning
    >
      <div suppressHydrationWarning>{children}</div>

      <div style={delaysStyle}>
        <div>Delays:</div>

        <div>{`Streaming -> ${streamingDelay}`}</div>
        <div>{`Bundle -> ${bundleDelay}`}</div>
        <div>{`Hydration -> ${hydrationDelay}`}</div>
      </div>
    </div>
  );
};
