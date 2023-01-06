import {Hit} from "./Hit";
import {rangeRandInt} from "../functions";
import {Defense} from "./Defense";
import {Damage} from "../Elements/Damage";

export class Attack {
    protected hit: Hit;
    protected _defence: Defense;
    protected _damage: Damage
    protected _hasCalculated: boolean
    protected _log: any

    constructor(hit: Hit) {
        this.hit = hit
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

    get log(): object {
        return this._log
    }

    public calcDamage(): Attack {
        if (this._hasCalculated) return this
        let damage = 0;
        this._damage
        const cad = this.calcAgility(this._defence.agility.value)
        const cah = this.calcAgility(this.hit.agility.value)
        if (cad < cah) {
            damage = Math.round(Math.floor(this.hit.damage.value - this._defence.protection.value))
        }
        //todo add cad === cah
        this._damage = new Damage(damage)
        this._hasCalculated = true
        this._log = {
            defenceAgility: cad,
            hitAgility: cah,
            attackDamage: this.hit.damage.value,
            protection: this._defence.protection.value,
            damage
        }
        return this
    }

    protected calcAgility(agility): number {
        return (agility / rangeRandInt(5, 10)) * 100
    }
}