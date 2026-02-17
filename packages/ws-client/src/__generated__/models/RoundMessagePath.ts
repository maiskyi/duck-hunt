import {RoundMessagePathCoordinates} from './RoundMessagePathCoordinates';
import {RoundMessagePathDirection} from './RoundMessagePathDirection';
interface RoundMessagePath {
  start: RoundMessagePathCoordinates;
  end: RoundMessagePathCoordinates;
  direction: RoundMessagePathDirection;
  speed: number;
  additionalProperties?: Map<string, any>;
}
export type { RoundMessagePath };