import { thirdHydrationDelay } from "../server/delays";
import { Base } from "./Base";

const Third = () => <Base id="Third" hydrationDelay={thirdHydrationDelay} />;

export default Third;
