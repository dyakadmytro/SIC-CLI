import { Name } from "./Name";
import {Strength} from "../Elements/Strength";
import {Agility} from "../Elements/Agility";
import {StrengthInterface} from "../Elements/Itnerfaces/StrengthInterface";
import {AgilityInterface} from "../Elements/Itnerfaces/AgilityInterface";
import {Protection} from "../Elements/Protection";
import {ProtectionInterface} from "../Elements/Itnerfaces/ProtectionInterface";


export class Person implements StrengthInterface, AgilityInterface, ProtectionInterface {
    protected _name: Name
    protected _hp: number
    protected _strength: Strength
    protected _agility: Agility
    protected _protection: Protection

    constructor(name: Name , strength: Strength, agility: Agility, protection: Protection) {
        this._hp = 100
        this._name = name
        this._strength = strength
        this._agility = agility
        this._protection = protection
    }

    get hp(): number {
        return this._hp
    }

    get name(): string {
        return this._name.getName()
    }

    get strength(): Strength {
        return this._strength;
    }

    get agility(): Agility {
        return this._agility;
    }

    get protection(): Protection {
        return this._protection;
    }

    get log() {
        return {
            hp: this.hp,
            name: this.name,
            strength: this.strength,
            agility: this.agility,
            protection: this.protection,
        }
    }

}