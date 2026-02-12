
class DuckHitPayload {
  private _roundId: string;
  private _timestamp: number;
  private _additionalProperties?: Map<string, any>;

  constructor(input: {
    roundId: string,
    timestamp: number,
    additionalProperties?: Map<string, any>,
  }) {
    this._roundId = input.roundId;
    this._timestamp = input.timestamp;
    this._additionalProperties = input.additionalProperties;
  }

  get roundId(): string { return this._roundId; }
  set roundId(roundId: string) { this._roundId = roundId; }

  get timestamp(): number { return this._timestamp; }
  set timestamp(timestamp: number) { this._timestamp = timestamp; }

  get additionalProperties(): Map<string, any> | undefined { return this._additionalProperties; }
  set additionalProperties(additionalProperties: Map<string, any> | undefined) { this._additionalProperties = additionalProperties; }
}
export { DuckHitPayload };