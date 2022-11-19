import {Fighter} from "../Models/Fighter";
import {FightersCollection} from "../Collections/FightersCollection";
import {BattleFather} from "../Controllers/BattleFather";

// make abstract
export class BattleFactory {
    protected _fightersCollection: FightersCollection

    constructor(fightersCollection: FightersCollection) {
        this._fightersCollection = fightersCollection
    }

    get fighters() {
        return this._fightersCollection.uuids()
    }

    addFighter(fighter: Fighter): BattleFactory {
        this._fightersCollection.push(fighter)
        return this
    }

    removeFighter(uuid: string): BattleFactory {
        this._fightersCollection.remove(uuid)
        return this
    }
}