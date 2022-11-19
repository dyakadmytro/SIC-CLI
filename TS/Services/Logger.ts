import {LoggerInterface} from "./Interfaces/LoggerInterface";

export class Logger implements LoggerInterface{
    protected _log: any

    constructor() {
        this._log = []
    }

    get log() {
        return this._log
    }

    push(data: any): Logger {
        this._log.push(data)
        return this
    }

}