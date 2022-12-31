import {BaseStateView} from "./BaseStateView";
import {GameMaster} from "../../Facades/GameMaster";
import {ViewFacade as View} from "../../Facades/ViewFacade";

export class StartView extends BaseStateView{
    render() {
        const data = {
            leftID: global.game.leftCorner.uuid,
            rightID: global.game.rightCorner.uuid,
            sort: [
                {name: 'left', massage: 'Left guess'},
                {name: 'right', massage: 'Right guess'}
            ]
        }
        GameMaster.game.startBattle()
        // global.guessGame.genNeedle()
        View.render('turn' , data)
    }
}