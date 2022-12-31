import {FighterFactory} from "../../../Factories/FighterFactory";
import {FightersCollection} from "../../../Collections/FightersCollection";
import {Fighter} from "../../../Models/Fighter";
import {DuelGameBattle} from "./DuelGameBattle";
import {DuelFactory} from "../../../Factories/DuelFactory";
import {BattleFather} from "../../BattleFather";
import {Logger} from "../../../Services/Logger";

export class DuelGameInit {
    protected leftCorner: Fighter| any = null
    protected rightCorner: Fighter| any = null
    protected fightersList: FightersCollection
    protected _fighterFactory: FighterFactory

    constructor(fighterFactory: FighterFactory) {
        this._fighterFactory = fighterFactory
        this.fightersList = new FightersCollection([
            fighterFactory.make(),
            fighterFactory.make(),
            fighterFactory.make(),
            fighterFactory.make(),
            fighterFactory.make(),
            fighterFactory.make(),
        ])
    }

    selectLeftCorner(uuid: string) {
        this.leftCorner = this.fightersList.find((fighter) => fighter.uuid == uuid)
    }

    selectRightCorner(uuid: string) {
        this.rightCorner = this.fightersList.find((fighter) => fighter.uuid == uuid)
    }

    startBattle() {
        const DF = new DuelFactory(new FightersCollection([
            this.leftCorner,
            this.rightCorner
        ]))
        // const battleHost = new BattleFather(DF.prepareBattle(), new Logger())
        // return new DuelGameBattle(battleHost)
        return new BattleFather(DF.prepareBattle(), new Logger())
    }
}