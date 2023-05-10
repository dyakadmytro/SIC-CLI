import {Loot, LootType} from "./Loot";

export default class Weapon extends Loot {
    damage: number
    ignore: number

    constructor(type: LootType, name: string, description: string, effects: [], damage: number, ignore: number) {
        super(type, name, description, effects);
        this.damage = damage;
        this.ignore = ignore;
    }
}