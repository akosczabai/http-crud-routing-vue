export default interface Car {
  id?: number;
  brand: string;
  model: string;
  year: number;
  country: string;
  damage: number;
  color: string;
}

export enum Damage {
  Damaged,
  NotDamaged,
}
