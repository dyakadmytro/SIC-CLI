import {FighterFactory} from "../../../Factories/FighterFactory";
import {FightersCollection} from "../../../Collections/FightersCollection";
import {Fighter} from "../../../Models/Fighter";
import {BattleFather} from "../../BattleFather";
import {DuelBattle} from "../../Battles/DuelBattle";
import {LogFactory} from "../../../Factories/LogFactory";

export class DuelGameInit {
    protected leftCorner: Fighter | any = null
    protected rightCorner: Fighter | any = null
    protected fightersList: FightersCollection
    protected _fighterFactory: FighterFactory
    protected _logFactory: LogFactory

    constructor(fighterFactory: FighterFactory, logFactory: LogFactory) {
        this._fighterFactory = fighterFactory
        this._logFactory = logFactory
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
        const DF = new DuelBattle(this.leftCorner, this.rightCorner)
        const logger = this._logFactory.make()
        logger.meta.fighters = DF.getFighters().collection.map((fighter) => fighter.log)
        logger.meta.startDateTime = new Date()
        return new BattleFather(DF, logger)
    }
}