
class DuckShootPayload {
  private _id: string;
  private _x: number;
  private _y: number;
  private _at: number;
  private _additionalProperties?: Map<string, any>;

  constructor(input: {
    id: string,
    x: number,
    y: number,
    at: number,
    additionalProperties?: Map<string, any>,
  }) {
    this._id = input.id;
    this._x = input.x;
    this._y = input.y;
    this._at = input.at;
    this._additionalProperties = input.additionalProperties;
  }

  get id(): string { return this._id; }
  set id(id: string) { this._id = id; }

  get x(): number { return this._x; }
  set x(x: number) { this._x = x; }

  get y(): number { return this._y; }
  set y(y: number) { this._y = y; }

  get at(): number { return this._at; }
  set at(at: number) { this._at = at; }

  get additionalProperties(): Map<string, any> | undefined { return this._additionalProperties; }
  set additionalProperties(additionalProperties: Map<string, any> | undefined) { this._additionalProperties = additionalProperties; }
}
export { DuckShootPayload };