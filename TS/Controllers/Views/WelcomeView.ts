import {BaseStateView} from "./BaseStateView";
import {ViewFacade as View} from "../../Facades/ViewFacade";



export class WelcomeView extends BaseStateView {

    // todo add before and after render
    render() {
        global.inquirer.prompt({
            type: 'list',
            name: 'menu',
            message: 'Choose game mode',
            choices: [
                {
                    name: 'Versus',
                    value: 'versus'
                },
                // {
                //     name: 'Single',
                //     value: 'single'
                // },
            ],
            loop: true
        }).then(function (result) {
            View.render(result.menu)
        })
    }

}