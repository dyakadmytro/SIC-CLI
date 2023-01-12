import {LogHistory, LogMeta, LogResult} from "./BattleLogParts";

export class BattleLog {
    meta: LogMeta
    history: LogHistory
    result: LogResult

    constructor(meta: LogMeta, history: LogHistory, result: LogResult) {
        this.meta = meta
        this.history = history
        this.result = result
    }
}