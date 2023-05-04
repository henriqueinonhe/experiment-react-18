import { Base } from "./Base";

export const Spinner = ({
  streamingDelay,
  bundleDelay,
  hydrationDelay,
  label,
}) => {
  return (
    <Base
      streamingDelay={streamingDelay}
      bundleDelay={bundleDelay}
      hydrationDelay={hydrationDelay}
      border={"3px dashed #BBB"}
      label={label}
    >
      Streaming
    </Base>
  );
};
