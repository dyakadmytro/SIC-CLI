import {BattleInterface} from "./Interfaces/BattleInterface";
import {LoggerInterface} from "../Services/Interfaces/LoggerInterface";
import {FightersCollection} from "../Collections/FightersCollection";
import {Fighter} from "../Models/Fighter";
import {Damage} from "../Elements/Damage";
import {randomInt} from "crypto";
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
        let selectedHpStr = `(${this.__selectedFighter.hp}%)`.green
        if(this.__selectedFighter.hp <= 0) {
            // @ts-ignore
            selectedHpStr = `(${this.__selectedFighter.hp}%)`.grey
        }else if(this.__selectedFighter.hp <= 25) {
            // @ts-ignore
            selectedHpStr = `(${this.__selectedFighter.hp}%)`.red
        } else if(this.__selectedFighter.hp <= 65) {
            // @ts-ignore
            selectedHpStr = `(${this.__selectedFighter.hp}%)`.yellow
        }
        // @ts-ignore
        let targetHpStr = `(${target.hp}%)`.green
        if(target.hp <= 0) {
            // @ts-ignore
            targetHpStr = `(${target.hp}%)`.grey
        }else if(target.hp <= 25) {
            // @ts-ignore
            targetHpStr = `(${target.hp}%)`.red
        } else if(target.hp <= 65) {
            // @ts-ignore
            targetHpStr = `(${target.hp}%)`.yellow
        }

        // @ts-ignore
        let dmgStr = ` ${attack.damage.value} `.gray
        if(attack.damage.value >= 40) {
            // @ts-ignore
            dmgStr = ` ${attack.damage.value} `.red
        } else if(attack.damage.value >= 25) {
            // @ts-ignore
            dmgStr = ` ${attack.damage.value} `.yellow
        } else if(attack.damage.value >= 1) {
            // @ts-ignore
            dmgStr = ` ${attack.damage.value} `.white
        }

        let playerFace = '🙂'

        if(attack.damage.value === 0) {
            const dogeFaces = ['😀', '🤨', '🙃', '😶', '😲', '😨', '🤡', '🥴', '🛡']
            playerFace = dogeFaces[randomInt(0, --dogeFaces.length)]
        } else if(attack.damage.value > 70) {
            playerFace = '🥵'
        } else if(attack.damage.value > 40) {
            playerFace = '😡'
        } else if(attack.damage.value > 20) {
            playerFace = '😖'
        } else if(attack.damage.value > 10) {
            playerFace = '😬'
        } else if(attack.damage.value > 0) {
            playerFace = '😠'
        }
        if (target.hp <= 0) {
            playerFace = '💀'
        }

        // @ts-ignore
        console.log(selectedHpStr + ` ${this.__selectedFighter.person.name.underline.magenta} 🗡 • ${dmgStr} • ${playerFace} ${target.person.name.underline.magenta} ` + targetHpStr)

        // console.log(this._battle.getFighter(uuid).person.name + ` ${playerFace
        // } damaged with` + dmgStr + hpStr)
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
        // @ts-ignore
        const hpStr = `    (${target.hp}%)`.bgRed

        //@ts-ignore
        console.log(this._battle.getFighter(uuid).person.name.underline.magenta + ' damaged with ' + ` ${attack.damage.value} `.bgWhite.black + hpStr)
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