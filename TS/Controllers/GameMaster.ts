import {BattleFactory} from "../Factories/BattleFactory";
import {GuessGame} from "./Games/GuessGame";

export class GameMaster {
    private _battleFactory: BattleFactory
    private _game: any = null
    private _battle: any = null
    
    constructor(BF: BattleFactory) {
        this._battleFactory = BF
    }

    isStarted(): boolean {
        return Boolean(this._game)
    }

    get game() {
        return this._game
    }

    get battle() {
        return this._battle
    }

    start(){
        this._battle = this._battleFactory.make()
        this._game = new GuessGame()
    }

    startBattle() {
        this._battle = this._battle.startBattle()
    }
}