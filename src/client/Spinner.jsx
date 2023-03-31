export const Spinner = () => {
  const style = {
    width: "calc(50% - 8px)",
    height: "300px",
    margin: "4px",
    border: "3px dashed #999",
    fontSize: "24px",
    fontFamily: "sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return <div style={style}>Loading</div>;
};
