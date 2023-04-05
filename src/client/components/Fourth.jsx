import {
  fourthBundleDelay,
  fourthHydrationDelay,
  fourthStreamingDelay,
} from "../../server/delays";
import { Block } from "./Block";

const Fourth = () => (
  <Block
    id="Fourth"
    streamingDelay={fourthStreamingDelay}
    bundleDelay={fourthBundleDelay}
    hydrationDelay={fourthHydrationDelay}
  />
);

export default Fourth;
