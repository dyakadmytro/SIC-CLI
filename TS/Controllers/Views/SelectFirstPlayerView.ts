import {SelectPlayerView} from "./SelectPlayerView";
import {ViewFacade as View} from "../../Facades/ViewFacade";
import {GameMasterFacade} from "../../Facades/GameMasterFacade";

export class SelectFirstPlayerView extends SelectPlayerView {

    protected processResult(result) {
        if (result.menu && result.menu == 'back') {
            View.previous()
        } else {
            GameMasterFacade.battle.selectLeftCorner(result.menu)
            View.previous()
        }
    }
}