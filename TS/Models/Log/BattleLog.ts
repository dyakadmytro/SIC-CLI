import {LogHistory, LogMeta} from "./BattleLogParts";

export class BattleLog {
    meta: LogMeta
    history: LogHistory

    constructor(meta: LogMeta, history: LogHistory) {
        this.meta = meta
        this.history = history
    }

    last() {
        return this.history.last()
    }
}



