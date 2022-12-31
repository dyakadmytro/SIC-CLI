export class GameMaster {
    private static _inst: GameMaster
    // todo add game interface
    private static _game: any = null

    private constructor() {}

    static make(): GameMaster {
        if(GameMaster._inst) {
            return this._inst
        } else {
            GameMaster._inst = new GameMaster
            return GameMaster._inst
        }
    }

    static newGame(game: any) {
        this._game = game
    }

    static get game() {
        return this._game
    }
}