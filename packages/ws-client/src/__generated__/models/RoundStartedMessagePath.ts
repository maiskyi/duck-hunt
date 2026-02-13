import {RoundStartedMessagePathCoordinates} from './RoundStartedMessagePathCoordinates';
import {RoundStartedMessagePathDirection} from './RoundStartedMessagePathDirection';
interface RoundStartedMessagePath {
  start: RoundStartedMessagePathCoordinates;
  end: RoundStartedMessagePathCoordinates;
  direction: RoundStartedMessagePathDirection;
  speed: number;
  additionalProperties?: Map<string, any>;
}
export type { RoundStartedMessagePath };