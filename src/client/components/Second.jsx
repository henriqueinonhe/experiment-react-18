import {
  secondBundleDelay,
  secondHydrationDelay,
  secondStreamingDelay,
} from "../../server/delays";
import { Block } from "./Block";

const Second = () => (
  <Block
    id="Second"
    label="2"
    streamingDelay={secondStreamingDelay}
    bundleDelay={secondBundleDelay}
    hydrationDelay={secondHydrationDelay}
  />
);

export default Second;
