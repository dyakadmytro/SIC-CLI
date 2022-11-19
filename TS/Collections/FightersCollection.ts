import {Collection} from "./Collection";

export class FightersCollection extends Collection {

    uuids(): [] {
        return this.pluck('uuid')
    }
}