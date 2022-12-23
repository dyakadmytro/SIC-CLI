import {BattleFather} from "../../BattleFather";

export class DuelGameBattle {
    protected _battleHost: BattleFather

    constructor(battleHost: BattleFather) {
        this._battleHost = battleHost
    }

    selectFighter(uuid: string) {

    }

    protected selectLeftCorner(uuid: string) {
        return new Error('This method unavailable!')
    }

    protected selectRightCorner(uuid: string) {
        return new Error('This method unavailable!')
    }

    protected startBattle() {
        return new Error('This method unavailable!')
    }
}