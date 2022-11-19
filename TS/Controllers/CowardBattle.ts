import {FightersCollection} from "../Collections/FightersCollection";
import {Fighter} from "../Models/Fighter";
import {BattleInterface} from "./Interfaces/BattleInterface";

export class CowardBattle implements BattleInterface{
    protected _fightersCollection: FightersCollection

    constructor(fightersCollection: FightersCollection) {
        this._fightersCollection = fightersCollection
    }

    isFightingContinue(): boolean {
        return this._fightersCollection.filter(
            (fighter => fighter.isAlive())
        ).length > 1
    }


    getFighters() {
        return this._fightersCollection
    }

    getWinner(): Fighter | null {
        if (this.isFightingContinue()) return null
        return this._fightersCollection.filter(
            (fighter => fighter.isAlive())
        )[0]
    }

    getInitiator(): Fighter {
        return this._fightersCollection.sort((fighter) => fighter.initiative)[0]
    }

    getTarget(): Fighter {
        // todo add implementation
        return this._fightersCollection.find((fighter) => fighter.uuid == 'uuid')[0]
    }
}