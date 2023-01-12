import {Fighter} from "../../Models/Fighter";
import {BattleInterface} from "../Interfaces/BattleInterface";
import {FightersCollection} from "../../Collections/FightersCollection";
import {AbstractBattle} from "../Interfaces/AbstractBattle";

export class DuelBattle extends AbstractBattle implements BattleInterface{
    protected leftCorner: Fighter
    protected rightCorner: Fighter
    protected initiator: Fighter
    protected target: Fighter

    constructor(leftCorner, rightCorner) {
        super()
        this.leftCorner = leftCorner
        this.rightCorner = rightCorner
    }

    getFighters() {
        return new FightersCollection([this.leftCorner, this.rightCorner])
    }

    isFightingContinue(): boolean {
        return this.leftCorner.isAlive() && this.rightCorner.isAlive()
    }

    getWinner(): Fighter | null {
        if (this.isFightingContinue()) return null

        if(this.leftCorner.isAlive()) return this.leftCorner
        if(this.rightCorner.isAlive()) return this.rightCorner
    }

    getInitiator(): Fighter {
        return this.initiator
    }

    getTarget(): Fighter {
        return this.target
    }

    getFighter(uuid: string): Fighter {
        return this.getFighters().find((fighter => {
            return fighter.uuid === uuid
        }) )
    }
}