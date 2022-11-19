import {Person} from "./Person";
import {Hit} from "./Hit";
import {rangeRandInt} from "../functions"
import {Attack} from "./Attack";
import {FightInterface} from "./Interfaces/FightInterface";
import {Defense} from "./Defense";

export class Fighter implements FightInterface{
    protected _person: Person
    protected _damaged: number

    constructor(person: Person) {
        this._person = person;
        this._damaged = 0;
    }

    get initiative() {
        return rangeRandInt(1, 100)
    }

    get person(): Person {
        return this._person;
    }

    public isAlive(): boolean {
        return (this.person.hp - this._damaged) > 0
    }

    public attack(attack: Attack = null): Attack {
        if(attack) {
            return this.takeAttack(attack)
        }
        return this.makeAttack();
    }

    public takeAttack(attack: Attack): Attack {
        return attack.defence(new Defense(this.person.protection, this.person.agility))
    }

    public makeAttack(): Attack {
        return new Attack(this.hit())
    }

    protected hit(): Hit {
        return new Hit(this.person.strength, this.person.agility)
    }

    public damage(attack: Attack): void {
        this._damaged += attack.damage
    }

    // protected calcDamage(hit: Hit): number {
    //     let damage = 0;
    //     if (this.calcAgility(this.person.agility.value) < this.calcAgility(hit.agility.value)) {
    //         damage = Math.round(Math.floor(hit.damage - this.person.protection.value))
    //     }
    //     return damage > 0? damage : 0
    // }

    // protected calcAgility(agility): number{
    //     return (agility / rangeRandInt(1, 100)) * 100;
    // }

}