export class Adress {
  streetName?: string;
  houseNumber?: string;
  cityCode?: number;
  city?: string;
  coordinates?: string;

  constructor(adress: Adress) {
    this.streetName = adress.streetName;
    this.houseNumber = adress.houseNumber;
    this.cityCode = adress.cityCode;
    this.city = adress.city;
    this.coordinates = adress.coordinates;
  }
}
