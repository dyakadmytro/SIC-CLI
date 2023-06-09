import {BattleInterface} from "./Interfaces/BattleInterface";
import {FightersCollection} from "../Collections/FightersCollection";
import {Fighter} from "../Models/Fighter";
import {Damage} from "../Elements/Damage";
import {BattleLog} from "../Models/Log/BattleLog";
require('colors');

export class BattleFather {
    protected _battle: BattleInterface
    logger: BattleLog
    private _selectedFighter: Fighter| any
    private _target: Fighter| any

    constructor(battle: BattleInterface, logger: BattleLog) {
        this._battle = battle
        this.logger = logger
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
        this._selectedFighter = this._battle.getFighter(uuid)
        return this
    }
    
    selectTarget(uuid: string): BattleFather {
        const target = this._battle.getFighter(uuid)
        if (target === this._selectedFighter ) throw new Error('Can`t Attack himself!')
        this._target = target
        return this
    }

    get initiator() : Fighter {
        if (! (this._selectedFighter instanceof Fighter)) throw new Error('The fighter is not selected!')
        return this._selectedFighter;
    }

    get target() : Fighter {
        if (! (this._target instanceof Fighter)) throw new Error('The target is not selected!')
        return this._target;
    }

    attack(): BattleFather {
        let attack = this.initiator.attack()
        attack = this.target.takeAttack(attack)
        attack.calcDamage()
        this.target.damage(attack.damage)

        this.logger.history.push({
            type: 'attack',
            initiator: this.initiator.log,
            target: this.target.log,
            attack: attack.log
        })
        return this
    }

    criticAttack(): BattleFather {
        let attack = this.initiator.criticAttack()
        attack = this.target.takeAttack(attack)
        attack.calcDamage()
        this.target.damage(attack.damage)

        this.logger.history.push({
            type: 'criticAttack',
            initiator: this.initiator.log,
            target: this.target.log,
            attack: attack.log
        })
        return this
    }

    murder(uuid) {
        const victim = this._battle.getFighter(uuid)
        victim.damage(new Damage(99999999))
        return this
    }

    takeDamage(value: number): BattleFather {
        if (! (this._selectedFighter instanceof Fighter)) throw new Error('The fighter is not selected!')
        this._selectedFighter.damage(
            new Damage(value)
        )
        return this
    }
}