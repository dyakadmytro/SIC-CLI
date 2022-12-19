import {Strength} from "../Elements/Strength";
import {Agility} from "../Elements/Agility";
import {StrengthInterface} from "../Elements/Itnerfaces/StrengthInterface";
import {AgilityInterface} from "../Elements/Itnerfaces/AgilityInterface";
import {rangeRandInt} from "../functions";
import {Damage} from "../Elements/Damage";

export class Hit implements StrengthInterface, AgilityInterface{
    protected _strength: Strength
    protected _agility: Agility
    protected _damage: Damage
    protected _chance: number

    constructor(strength: Strength, agility: Agility) {
        this._strength = strength
        this._agility = agility
        this._chance = rangeRandInt(10, 30)
    }

    get strength(): Strength {
        return this._strength;
    }

    get agility(): Agility {
        return this._agility;
    }

    get damage(): Damage {
        if(this._damage) return this.damage;
        this._damage = new Damage(this.calcDamage());
        return this._damage;
    }

    public log() {
        return `Damage: ${this.damage}`
    }

    protected calcDamage(): number {
        return Math.round(((this.strength.value * this.agility.value) / this._chance) )
    }

}