import {Fighter} from "../../Models/Fighter";
import {FightersCollection} from "../../Collections/FightersCollection";

export interface BattleInterface{
    // checkInitiative(): BattleInterface

    isFightingContinue(): boolean

    getFighters(): FightersCollection

    getWinner(): Fighter | null

    getInitiator(): Fighter

    getTarget(): Fighter

    getFighter(uuid: string): Fighter
}