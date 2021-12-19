export class Equipment {
  name?: string;
  description?: string;
  amount?: number;

  constructor(equipment: Equipment) {
    this.name = equipment.name;
    this.description = equipment.description;
    this.amount = equipment.amount;
  }
}
