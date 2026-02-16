import { HitConfirmedRejectedMessageReason } from "./HitConfirmedRejectedMessageReason";
interface HitConfirmedRejectedMessage {
  roundId: string;
  reason: HitConfirmedRejectedMessageReason;
  additionalProperties?: Map<string, any>;
}
export type { HitConfirmedRejectedMessage };
