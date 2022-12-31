import {SelectPlayerView} from "./SelectPlayerView";
import {ViewFacade as View} from "../../Facades/ViewFacade";
import {GameMaster} from "../../Facades/GameMaster";

export class SelectFirstPlayerView extends SelectPlayerView{

    protected processResult(result) {
        if (result.menu && result.menu == 'back') {
            View.previous()
        } else {
            GameMaster.game.selectLeftCorner(result.menu)
            View.previous()
        }
    }
}