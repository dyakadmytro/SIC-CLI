import {Collection} from "../../Collections/Collection";

export class LogMeta {
    // battle started, ended, winner, looser
    fighters: any[] = []
    startDateTime: Date
    endDateTime: Date
    winner: string
    looser: string

}
export class LogHistory {
    protected _log: [any?] = []

    get length(): number {
        return this._log.length
    }

    get(key: number) {
        return this._log[key]
    }

    push(data: any) {
        this._log.push(data)
    }

    last(): any {
        if (this._log.length < 1) return null
        return this._log[this._log.length - 1]
    }
}