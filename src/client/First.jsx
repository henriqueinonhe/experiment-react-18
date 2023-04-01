import { firstHydrationDelay } from "../server/delays";
import { Base } from "./Base";

const First = () => <Base id="First" hydrationDelay={firstHydrationDelay} />;

export default First;
