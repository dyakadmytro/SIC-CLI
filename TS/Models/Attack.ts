import {Hit} from "./Hit";
import {rangeRandInt} from "../functions";
import {Defense} from "./Defense";

export class Attack {
    protected hit: Hit;
    protected _defence: Defense;
    protected _damage: number
    protected _hasCalculated: boolean

    constructor(hit: Hit) {
        this.hit = hit
        this._damage = 0
        this._hasCalculated = false
    }

    public defence(defence: Defense): Attack {
        if (this._defence) return this
        this._defence = defence
        return this
    }

    get damage() {
        return this._damage
    }

    public calcDamage(): Attack {
        if (this._hasCalculated) return this
        let damage = 0;
        if (this.calcAgility(this._defence.agility.value) < this.calcAgility(this.hit.agility.value)) {
            damage = Math.round(Math.floor(this.hit.damage - this._defence.protection.value))
        }
        this._damage = damage > 0? damage : 0
        this._hasCalculated = true
        return this
    }

    public calcAgility(agility): number{
        // todo add to strict to object property
        return (agility / rangeRandInt(1, 100)) * 100;
    }
}