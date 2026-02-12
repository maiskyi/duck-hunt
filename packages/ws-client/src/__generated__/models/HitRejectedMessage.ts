
class HitRejectedMessage {
  private _id: string;
  private _by: string;
  private _additionalProperties?: Map<string, any>;

  constructor(input: {
    id: string,
    by: string,
    additionalProperties?: Map<string, any>,
  }) {
    this._id = input.id;
    this._by = input.by;
    this._additionalProperties = input.additionalProperties;
  }

  get id(): string { return this._id; }
  set id(id: string) { this._id = id; }

  get by(): string { return this._by; }
  set by(by: string) { this._by = by; }

  get additionalProperties(): Map<string, any> | undefined { return this._additionalProperties; }
  set additionalProperties(additionalProperties: Map<string, any> | undefined) { this._additionalProperties = additionalProperties; }
}
export { HitRejectedMessage };