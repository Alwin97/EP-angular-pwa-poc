export class Address {
  streetName?: string;
  houseNumber?: string;
  cityCode?: number;
  city?: string;
  coordinates?: string;

  constructor(address: Address) {
    this.streetName = address.streetName;
    this.houseNumber = address.houseNumber;
    this.cityCode = address.cityCode;
    this.city = address.city;
    this.coordinates = address.coordinates;
  }
}
