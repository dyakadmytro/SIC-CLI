import {Fighter} from "../Models/Fighter";
import {Person} from "../Models/Person";
import {PersonFactory} from "./PersonFactory";

export class FighterFactory {

    protected _generators: any
    protected _personFactory: PersonFactory

    constructor(generators: any, personFactory: PersonFactory) {
        this._generators = generators;
        this._personFactory = personFactory
    }

    getGenerator(instance: any) {
        return this._generators.find((g: any) => g instanceof instance)
    }

    make(): Fighter {
        const person = this._personFactory.make()
        return this.makeFrom(person)
    }

    makeFrom(person: Person): Fighter {
        return new Fighter( person)
    }


}