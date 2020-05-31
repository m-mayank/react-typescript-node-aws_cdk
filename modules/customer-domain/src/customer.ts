export type JSONPrimitive = string | number | boolean | null;
export interface JSONObject {
  [_: string]: JSONPrimitive | JSONObject;
}

export interface SerializedCustomer extends JSONObject {
  id: number;
  name: string;
}

export class Customer {
  static fromJSON(json: SerializedCustomer) {
    return new Customer(json.id, json.name);
  }

  constructor(public readonly id: number, public readonly name: string) {}

  toJSON(): SerializedCustomer {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
