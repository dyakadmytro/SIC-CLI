
import {ViewFacade as View} from "../../Facades/ViewFacade";
import {GameMasterFacade} from "../../Facades/GameMasterFacade";

export class VersusView {

    render() {
        if(!GameMasterFacade.isGameStarted) GameMasterFacade.start()
        const chosen1Fighter = (GameMasterFacade.battle.leftCorner)? ` • ${GameMasterFacade.battle.leftCorner?.person.name.underline.magenta} • ` : ''
        const chosen2Fighter = (GameMasterFacade.battle.rightCorner)? ` • ${GameMasterFacade.battle.rightCorner?.person.name.underline.magenta} • ` : ''

        global.inquirer.prompt({
            type: 'list',
            name: 'menu',
            message: 'Versus',
            choices: [
                {
                    name: 'Select left corner fighter' + chosen1Fighter,
                    value: 'select1Player',
                },
                {
                    name: 'Select right corner fighter' + chosen2Fighter,
                    value: 'select2Player'
                },
                {
                    name: 'Start',
                    value: 'start'
                },
                {
                    name: 'Back to menu',
                    value: 'back'
                },
            ],
            loop: true
        }).then(function (result) {
            if (result.menu == 'back') {
                View.render('init')
            } else {
                View.render(result.menu)
            }
        })
    }
}