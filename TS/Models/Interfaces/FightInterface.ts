import {Attack} from "../Attack";
import {Hit} from "../Hit";

export interface FightInterface {

    isAlive(): boolean

    attack(attack: Attack): Attack

    takeAttack(attack: Attack): Attack

    makeAttack(hit: Hit): Attack
}