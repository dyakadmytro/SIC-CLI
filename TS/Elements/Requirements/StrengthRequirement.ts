import RequirementInterface from "../Interfaces/RequirementInterface";
import {Person} from "../../Models/Person";

export default class StrengthRequirement implements RequirementInterface {
    protected value: number
    description: string

    constructor(description: string, value: number) {
        this.value = value
        this.description = description
    }

    check(unit: Person): boolean {
        return unit.strength.value >= this.value
    }

}