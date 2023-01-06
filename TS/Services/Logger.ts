import {LoggerInterface} from "./Interfaces/LoggerInterface";

export class Logger implements LoggerInterface{
    protected _log: [any?] = []

    get log(): [any?] {
        return this._log
    }

    last(): any {
        if (this._log.length < 1) return null
        return this._log[this._log.length - 1]
    }

    push(data: any): Logger {
        this._log.push(data)
        return this
    }

}