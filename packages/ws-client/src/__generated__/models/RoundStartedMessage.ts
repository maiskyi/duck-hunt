import {RoundStartedMessagePath} from './RoundStartedMessagePath';
interface RoundStartedMessage {
  roundId: string;
  startedAt: number;
  endsAt: number;
  ended: boolean;
  path: RoundStartedMessagePath;
  additionalProperties?: Map<string, any>;
}
export type { RoundStartedMessage };