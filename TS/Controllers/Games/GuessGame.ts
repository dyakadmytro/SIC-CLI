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
            isDanger: false,
            isClear: false
        }

        const k = Object.keys(guesses)
        const v = Object.values(guesses)

        if (v[0] === v[1]) {
            guess['isNichja'] = true
        }
        // @ts-ignore
        if (v[0].search('!') + v[1].search('!') >= 0) {
            guess['isDanger'] = true
        }

        // @ts-ignore
        const p1Number = Math.abs(this._needle - Number(v[0].replace('!', '')) )
        // @ts-ignore
        const p2Number = Math.abs(this._needle - Number(v[1].replace('!', '')) )

        if (p1Number < p2Number) {
            guess['winner'] = k[0]
            guess['looser'] = k[1]
        } else if (p2Number < p1Number){
            guess['winner'] = k[1]
            guess['looser'] = k[0]
        } else {
            throw new Error('not found condition!')
        }

        // @ts-ignore
        if(this._needle === Number(v[0].replace('!', '')) || this._needle === Number(v[1].replace('!', ''))) {
            this.genNeedle()
            guess['isClear'] = true
        }

        return guess
    }
}