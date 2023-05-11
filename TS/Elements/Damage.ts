import {ValueInterface} from "./Interfaces/ValueInterface";

export class Damage implements ValueInterface{
    protected _value: number

    constructor(value: number = 0) {
        this._value = value > 0?  value : 0;
    }

    get value(): number {
        return this._value
    }
}