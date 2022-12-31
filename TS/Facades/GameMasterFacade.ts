import {GameMaster} from "../Controllers/GameMaster";

export class GameMasterFacade {
    private static _inst: GameMaster

    private constructor() {}

    static make(BF): GameMasterFacade {
        if(GameMasterFacade._inst) {
            return this._inst
        } else {
            GameMasterFacade._inst = new GameMaster(BF)
            return GameMasterFacade._inst
        }
    }

    static get game() {
        return this._inst.game
    }

    static get battle() {
        return this._inst.battle
    }

    static get isGameStarted() {
        return this._inst.isStarted()
    }

    static start() {
        this._inst.start()
    }

    static startBattle() {
        this._inst.startBattle()
    }
}