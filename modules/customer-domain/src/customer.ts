// export interface SerializedCustomer {
//   id: number;
//   name: string;
// }

// export class Customer {
//   static from(json: SerializedCustomer) {
//     return new Customer(json.id, json.name);
//   }

//   constructor(public readonly id: number, public readonly name: string) {}

//   toJSON(): SerializedCustomer {
//     return {
//       id: this.id,
//       name: this.name,
//     };
//   }
// }

export interface Customer {
  id: number;
  name: string;
}
