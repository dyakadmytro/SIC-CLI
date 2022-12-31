import {SelectPlayerView} from "./SelectPlayerView";
import {GameMaster} from "../../Facades/GameMaster";
import {ViewFacade as View} from "../../Facades/ViewFacade";

export class SelectSecondPlayerView extends SelectPlayerView{

    protected processResult(result) {
        if (result.menu && result.menu == 'back') {
            View.previous()
        } else {
            GameMaster.game.selectRightCorner(result.menu)
            View.previous()
        }
    }
}