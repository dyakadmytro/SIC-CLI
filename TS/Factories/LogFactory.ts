import {LogFighters, LogHistory, LogMeta, LogPlayers, LogResult} from "../Models/Log/BattleLogParts";
import {BattleLog} from "../Models/Log/BattleLog";
import {FactoryInterface} from "./Interfaces/FactoryInterface";

export class LogFactory implements FactoryInterface{

    LogHistory() {
        return new LogHistory()
    }

    LogMeta() {
        const logPlayers = new LogPlayers()
        const logFighters = new LogFighters()
        return new LogMeta(logPlayers, logFighters)
    }

    LogResult() {
        return new LogResult()
    }

    make() {
        return new BattleLog(
            this.LogMeta(),
            this.LogHistory(),
            this.LogResult()
        )
    }
}