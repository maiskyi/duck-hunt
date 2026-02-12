
class GameStartPayload {
  private _timestamp: number;
  private _additionalProperties?: Map<string, any>;

  constructor(input: {
    timestamp: number,
    additionalProperties?: Map<string, any>,
  }) {
    this._timestamp = input.timestamp;
    this._additionalProperties = input.additionalProperties;
  }

  get timestamp(): number { return this._timestamp; }
  set timestamp(timestamp: number) { this._timestamp = timestamp; }

  get additionalProperties(): Map<string, any> | undefined { return this._additionalProperties; }
  set additionalProperties(additionalProperties: Map<string, any> | undefined) { this._additionalProperties = additionalProperties; }
}
export { GameStartPayload };