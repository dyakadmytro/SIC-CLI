import {Person} from "../../Models/Person";

export default interface RequirementInterface {
    description: string

    check(unit: Person): boolean;
}