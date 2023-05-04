import {
  fourthBundleDelay,
  fourthHydrationDelay,
  fourthStreamingDelay,
} from "../../server/delays";
import { Block } from "./Block";

const Fourth = () => (
  <Block
    id="Fourth"
    label="4"
    streamingDelay={fourthStreamingDelay}
    bundleDelay={fourthBundleDelay}
    hydrationDelay={fourthHydrationDelay}
  />
);

export default Fourth;
