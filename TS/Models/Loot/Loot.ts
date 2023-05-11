import RequirementInterface from "../../Elements/Interfaces/RequirementInterface";
import {Person} from "../Person";

type LootType = 'helmet'| 'armour' | 'bracers' | 'amulet' | 'weapon'

class Loot {
    type: LootType
    name: string
    description: string
    effects: []
    requirements: RequirementInterface[]

    constructor(type: LootType, name: string, description: string, effects: [], requirements: RequirementInterface[]) {
        this.type = type
        this.name = name
        this.description = description
        this.effects = effects
        this.requirements = requirements
    }

    canEquip(unit: Person): boolean {
        return this.requirements.every((req) => req.check(unit));
    }
}

export {Loot, LootType}