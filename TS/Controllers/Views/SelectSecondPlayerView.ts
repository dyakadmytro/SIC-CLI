import {SelectPlayerView} from "./SelectPlayerView";
import {GameMasterFacade} from "../../Facades/GameMasterFacade";
import {ViewFacade as View} from "../../Facades/ViewFacade";

export class SelectSecondPlayerView extends SelectPlayerView{

    protected processResult(result) {
        if (result.menu && result.menu == 'back') {
            View.previous()
        } else {
            GameMasterFacade.battle.selectRightCorner(result.menu)
            View.previous()
        }
    }
}