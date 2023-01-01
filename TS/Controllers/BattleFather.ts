import {BattleInterface} from "./Interfaces/BattleInterface";
import {LoggerInterface} from "../Services/Interfaces/LoggerInterface";
import {FightersCollection} from "../Collections/FightersCollection";
import {Fighter} from "../Models/Fighter";
import {Damage} from "../Elements/Damage";
require('colors');

export class BattleFather {
    protected _battle: BattleInterface
    protected _logger: LoggerInterface
    private __selectedFighter: Fighter| any

    constructor(battle: BattleInterface, logger: LoggerInterface) {
        this._battle = battle
        this._logger = logger
    }

    get fighters(): FightersCollection {
        return this._battle.getFighters()
    }

    get isFightingContinue() {
        return this._battle.isFightingContinue()
    }

    get winner() {
        return this._battle.getWinner()
    }

    selectFighter(uuid: string): BattleFather {
        this.__selectedFighter = this._battle.getFighter(uuid)
        return this
    }

    attack(uuid: string): BattleFather {
        // if (this.__selectedFighter !instanceof Fighter) throw new Error('The fighter is not selected!')
        const target = this._battle.getFighter(uuid)
        if (target === this.__selectedFighter ) throw new Error('Can`t Attack himself!')
        let attack = this.__selectedFighter.attack()
        attack = target.takeAttack(attack)
        attack.calcDamage()
        target.damage(attack.damage)

        // @ts-ignore
        let hpStr = `    (${target.hp}%)`.green
        if(target.hp <= 25) {
            // @ts-ignore
            hpStr = `(${target.hp}%)`.red
        } else if(target.hp < 65) {
            // @ts-ignore
            hpStr = `(${target.hp}%)`.yellow
        } else {
            // @ts-ignore
            hpStr.green
        }
        console.log(this._battle.getFighter(uuid).person.name + ' damaged with ' + attack.damage.value + hpStr)
        return this

    }

    criticAttack(uuid: string): BattleFather {
        // if (this.__selectedFighter !instanceof Fighter) throw new Error('The fighter is not selected!')
        const target = this._battle.getFighter(uuid)
        if (target === this.__selectedFighter ) throw new Error('Can`t Attack himself!')
        let attack = this.__selectedFighter.criticAttack()
        attack = target.takeAttack(attack)
        attack.calcDamage()
        target.damage(attack.damage)
        const hpStr = global.colors.green(`    (${target.hp}%)`)
        console.log(this._battle.getFighter(uuid).person.name + ' damaged with ' + attack.damage.value + hpStr)
        return this
    }

    murder(uuid) {
        const victim = this._battle.getFighter(uuid)
        victim.damage(new Damage(99999999))
        return this
    }

    takeDamage(value: number): BattleFather {
        if (this.__selectedFighter !instanceof Fighter) throw new Error('The fighter is not selected!')
        this.__selectedFighter.damage(
            new Damage(value)
        )
        return this
    }

    // move to autogame
    // fight() {
    //     // todo add only one fight
    //     const title = this._battle.getFighters().pluck('person.name.fullName').join(' VS ')
    //
    //     this._logger.push(title)
    //     while (this._battle.isFightingContinue()) {
    //         this._battle.checkInitiative()
    //         const initiator = this._battle.getInitiator()
    //         const target = this._battle.getTarget()
    //         let attack = initiator.attack()
    //         attack = target.takeAttack(attack)
    //         attack.calcDamage()
    //         target.damage(attack)
    //
    //         const attackLog = `${initiator.person.name} hit ${target.person.name} with damage: ${attack.damage.value}`
    //
    //         this._logger.push(attackLog)
    //     }
    //     this._logger.push(`and the winner is: ${this._battle.getWinner().person.name}`)
    // }

    public getLog() {
        return this._logger.log
    }

}