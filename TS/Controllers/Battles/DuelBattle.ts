import {BattleFather} from "../BattleFather";
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

    //todo придумать инициативу
    public checkInitiative(): BattleInterface {
        const LI = this.leftCorner.initiative
        const RI = this.rightCorner.initiative
        if(LI > RI) {
            this.initiator = this.leftCorner
            this.target = this.rightCorner
        }
        if(RI > LI) {
            this.initiator = this.rightCorner
            this.target = this.leftCorner
        }
        if (RI == LI) this.checkInitiative()

        return this
    }


    getInitiator(): Fighter {
        return this.initiator
    }

    getTarget(): Fighter {
        return this.target
    }

    getFighter(uuid: string): Fighter {
        const needle = this.getFighters().find((fighter => {
            return fighter.uuid === uuid
        }) )
        // console.log(needle, needle instanceof Fighter )
        // if (needle !instanceof Fighter ) throw new Error('Can`t find Fighter!')
        return needle
    }
}