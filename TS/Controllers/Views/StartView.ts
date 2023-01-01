import {BaseStateView} from "./BaseStateView";
import {GameMasterFacade} from "../../Facades/GameMasterFacade";
import {ViewFacade as View} from "../../Facades/ViewFacade";

export class StartView extends BaseStateView{
    render() {
        if (!GameMasterFacade.battle.leftCorner || !GameMasterFacade.battle.rightCorner) {
            console.log('Select players first!')
            View.previous()
        } else {
            const data = {
                player1ID: GameMasterFacade.battle.leftCorner.uuid,
                player2ID: GameMasterFacade.battle.rightCorner.uuid,
                promptOrder: [
                    {name: 'left', massage: 'Left guess', id: GameMasterFacade.battle.leftCorner.uuid,},
                    {name: 'right', massage: 'Right guess', id: GameMasterFacade.battle.rightCorner.uuid,}
                ]
            }
            GameMasterFacade.startBattle()
            GameMasterFacade.game.genNeedle()
            View.render('turn' , data)
        }
    }
}