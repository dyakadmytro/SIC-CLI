import {rangeRandInt} from "../../functions";

export class GuessGame {
    private _needle: number

    genNeedle() {
        this._needle = rangeRandInt(1, 100)
    }

    showNeedle() {
        return this._needle
    }

}