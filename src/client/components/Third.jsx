import {
  thirdBundleDelay,
  thirdHydrationDelay,
  thirdStreamingDelay,
} from "../../server/delays";
import { Block } from "./Block";

const Third = () => (
  <Block
    id="Third"
    streamingDelay={thirdStreamingDelay}
    bundleDelay={thirdBundleDelay}
    hydrationDelay={thirdHydrationDelay}
  />
);

export default Third;
