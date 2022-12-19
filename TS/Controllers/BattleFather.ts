import {BattleInterface} from "./Interfaces/BattleInterface";
import {LoggerInterface} from "../Services/Interfaces/LoggerInterface";

export class BattleFather {
    protected _battle: BattleInterface
    protected _logger: LoggerInterface


    constructor(battle: BattleInterface, logger: LoggerInterface) {
        this._battle = battle
        this._logger = logger
    }

    fight() {
        // todo add only one fight
        const title = this._battle.getFighters().pluck('person.name.fullName').join(' VS ')

        this._logger.push(title)
        while (this._battle.isFightingContinue()) {
            this._battle.checkInitiative()
            const initiator = this._battle.getInitiator()
            const target = this._battle.getTarget()
            let attack = initiator.attack()
            attack = target.takeAttack(attack)
            attack.calcDamage()
            target.damage(attack)

            const attackLog = `${initiator.person.name} hit ${target.person.name} with damage: ${attack.damage.value}`

            this._logger.push(attackLog)
        }
        this._logger.push(`and the winner is: ${this._battle.getWinner().person.name}`)
    }

    public getLog() {
        return this._logger.log
    }

}