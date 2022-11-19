import {ValueInterface} from "./Itnerfaces/ValueInterface";

export class Agility implements ValueInterface{
    protected _value: number

    constructor(value: number) {
        this._value = value
    }

    get value(): number {
        return this._value
    }
}