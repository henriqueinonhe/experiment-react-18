import {
  firstBundleDelay,
  firstHydrationDelay,
  firstStreamingDelay,
} from "../../server/delays";
import { Block } from "./Block";

const First = () => (
  <Block
    id="First"
    streamingDelay={firstStreamingDelay}
    bundleDelay={firstBundleDelay}
    hydrationDelay={firstHydrationDelay}
  />
);

export default First;
