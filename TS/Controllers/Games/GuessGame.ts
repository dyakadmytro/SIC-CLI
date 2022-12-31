import {rangeRandInt} from "../../functions";

export class GuessGame {
    private _needle: number

    genNeedle() {
        this._needle = rangeRandInt(1, 100)
    }

    showNeedle() {
        return this._needle
    }

    compare(guesses) {
        const guess = {
            isNichja: false,
            clean: false
        }

        const k = Object.keys(guesses)
        const v = Object.values(guesses)

        if (v[0] === v[1]) {
            guess['isNichja'] = true
        }

        if(this._needle === v[0] || this._needle === v[1]) {
            this.genNeedle()
            guess['clean'] = true
        }

        const p1Number = Math.abs(this._needle - Number(v[0]) )
        const p2Number = Math.abs(this._needle - Number(v[1]) )

        if (p1Number < p2Number) {
            guess['winner'] = k[0]
            guess['looser'] = k[1]
        } else if (p2Number < p1Number){
            guess['winner'] = k[1]
            guess['looser'] = k[0]
        } else {
            throw new Error('not found condition!')
        }
        return guess
    }
}