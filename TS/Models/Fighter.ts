import {Person} from "./Person";
import {Hit} from "./Hit";
import {rangeRandInt} from "../functions"
import {Attack} from "./Attack";
import {FightInterface} from "./Interfaces/FightInterface";
import {Defense} from "./Defense";
import {Damage} from "../Elements/Damage";
import { v1 as uuidv1 } from 'uuid';
import {CriticHit} from "./CriticHit";

export class Fighter implements FightInterface{
    protected _uuid: string
    protected _person: Person
    protected _damaged: number

    constructor(person: Person) {
        this._uuid = uuidv1()
        this._person = person;
        this._damaged = 0;
    }

    get hp() {
        return this.person.hp - this._damaged
    }

    get uuid() {
        return this._uuid
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
        return this.makeAttack(this.hit());
    }

    public criticAttack(): Attack {
        return this.makeAttack(this.criticHit())
    }

    public takeAttack(attack: Attack): Attack {
        return attack.defence(new Defense(this.person.protection, this.person.agility))
    }

    public makeAttack(hit: Hit): Attack {
        return new Attack(hit)
    }

    protected hit(): Hit {
        return new Hit(this.person.strength, this.person.agility)
    }

    protected criticHit(): Hit {
        return new CriticHit(this.person.strength, this.person.agility)
    }

    public damage(damage: Damage): void {
        this._damaged += damage.value
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