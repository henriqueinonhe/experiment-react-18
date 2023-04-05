import { Base } from "./Base";

export const Spinner = ({ streamingDelay, bundleDelay, hydrationDelay }) => {
  return (
    <Base
      streamingDelay={streamingDelay}
      bundleDelay={bundleDelay}
      hydrationDelay={hydrationDelay}
      border={"3px dashed #BBB"}
    >
      Streaming
    </Base>
  );
};
