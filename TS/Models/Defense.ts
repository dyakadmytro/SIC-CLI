import {Protection} from "../Elements/Protection";
import {Agility} from "../Elements/Agility";
import {AgilityInterface} from "../Elements/Interfaces/AgilityInterface";
import {ProtectionInterface} from "../Elements/Interfaces/ProtectionInterface";

export class Defense implements AgilityInterface, ProtectionInterface{
    protected _protection: Protection
    protected _agility: Agility

    constructor(protection: Protection, agility: Agility) {
        this._protection = protection
        this._agility = agility
    }

    get agility(): Agility {
        return this._agility;
    }

    get protection(): Protection {
        return this._protection;
    }
}