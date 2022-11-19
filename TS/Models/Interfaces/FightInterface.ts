import {Attack} from "../Attack";

export interface FightInterface {

    isAlive(): boolean

    attack(attack: Attack): Attack

    takeAttack(attack: Attack): Attack

    makeAttack(): Attack
}