import {GeneratorInterface} from "./Interfaces/GeneratorInterface";
import {uniqueNamesGenerator} from "unique-names-generator";

export class NameGenerator implements GeneratorInterface {
    protected _config: any

    constructor(config) {
        this._config = config
    }

    get config() {
        return this._config
    }

    create() {
        return uniqueNamesGenerator(this.config)
    }
}