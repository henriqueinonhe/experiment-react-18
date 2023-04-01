import { secondHydrationDelay } from "../server/delays";
import { Base } from "./Base";

const Second = () => <Base id="Second" hydrationDelay={secondHydrationDelay} />;

export default Second;
