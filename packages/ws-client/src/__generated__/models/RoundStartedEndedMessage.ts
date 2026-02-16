import { RoundMessagePath } from "./RoundMessagePath";
interface RoundStartedEndedMessage {
  roundId: string;
  startedAt: number;
  endsAt: number;
  ended: boolean;
  path: RoundMessagePath;
  additionalProperties?: Map<string, any>;
}
export type { RoundStartedEndedMessage };
