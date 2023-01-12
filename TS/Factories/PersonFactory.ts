import {Fighter} from "../Models/Fighter";
import {NameGenerator} from "./Generators/NameGenerator";
import {Person} from "../Models/Person";
import {Name} from "../Models/Name";
import {Strength} from "../Elements/Strength";
import {Agility} from "../Elements/Agility";
import {Protection} from "../Elements/Protection";
import {StrengthGenerator} from "./Generators/StrengthGenerator";
import {AgilityGenerator} from "./Generators/AgilityGenerator";
import {ProtectionGenerator} from "./Generators/ProtectionGenerator";
import {FactoryInterface} from "./Interfaces/FactoryInterface";

export class PersonFactory implements FactoryInterface{

    protected _generators: any

    constructor(generators: any) {
        this._generators = generators;
    }

    get generators() {
        return this._generators
    }

    getGenerator(instance: any) {
        return this._generators.find((g: any) => g instanceof instance)
    }

    make(): any {
        const name = this.getGenerator(NameGenerator).create()
        const strength = this.getGenerator(StrengthGenerator).create()
        const agility = this.getGenerator(AgilityGenerator).create()
        const protection = this.getGenerator(ProtectionGenerator).create()

        return new Person(
            new Name(name),
            new Strength(strength),
            new Agility(agility),
            new Protection(protection)
        )
    }
}