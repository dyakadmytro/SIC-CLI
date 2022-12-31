import {WelcomeView} from "./WelcomeView";
import {BaseStateView} from "./BaseStateView";
import {ViewFacade as View} from "../../Facades/ViewFacade";

export class InitView extends BaseStateView{

    constructor() {
        super();
    }

    render() {
        View.render('init')
    }
}