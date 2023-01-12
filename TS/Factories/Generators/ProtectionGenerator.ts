import {rangeRandInt} from "../../functions";
import {GeneratorInterface} from "./Interfaces/GeneratorInterface";

export class ProtectionGenerator implements GeneratorInterface {
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