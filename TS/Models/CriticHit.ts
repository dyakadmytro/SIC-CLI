import {Strength} from "../Elements/Strength";
import {Agility} from "../Elements/Agility";
import {StrengthInterface} from "../Elements/Itnerfaces/StrengthInterface";
import {AgilityInterface} from "../Elements/Itnerfaces/AgilityInterface";
import {rangeRandInt} from "../functions";
import {Damage} from "../Elements/Damage";
import {Hit} from "./Hit";

export class CriticHit extends Hit{

    public criticRand: number

    constructor(strength: Strength, agility: Agility) {
        super(strength, agility)
        this.criticRand = rangeRandInt(10, 20)
    }

    public log() {
        return `Damage: ${this.damage}`
    }

    protected calcDamage(): number {
        return Math.round(((this.strength.value * this.agility.value) / this._chance) ) + this.criticRand
    }

}