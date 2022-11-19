import {Person} from "../../Models/Person";
import {Name} from "../../Models/Name";
import {uniqueNamesGenerator} from "unique-names-generator";
import {rangeRandInt} from "../../functions";
import {Strength} from "../../Elements/Strength";
import {Agility} from "../../Elements/Agility";
import {Protection} from "../../Elements/Protection";
import {GeneratorInterface} from "./Interfaces/GeneratorInterface";

export class AgilityGenerator implements GeneratorInterface {
    protected _config: any

    constructor(config) {
        this._config = config
    }

    get config() {
        return this._config
    }

    create() {
        return rangeRandInt(this.config.min, this.config.max)
    }
}