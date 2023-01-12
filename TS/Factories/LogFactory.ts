import {LogHistory, LogMeta} from "../Models/Log/BattleLogParts";
import {BattleLog} from "../Models/Log/BattleLog";
import {FactoryInterface} from "./Interfaces/FactoryInterface";

export class LogFactory implements FactoryInterface{

    LogHistory() {
        return new LogHistory()
    }

    LogMeta() {
        return new LogMeta()
    }

    make() {
        return new BattleLog(
            this.LogMeta(),
            this.LogHistory(),
        )
    }
}