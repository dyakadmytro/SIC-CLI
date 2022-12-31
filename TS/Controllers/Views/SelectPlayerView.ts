import {BaseStateView} from "./BaseStateView";
import {ViewFacade as View} from "../../Facades/ViewFacade";
import {GameMaster} from "../../Facades/GameMaster";

export class SelectPlayerView extends BaseStateView{

    render() {
        const game = GameMaster.currentGame()
        global.inquirer.prompt({
            type: 'list',
            name: 'menu',
            message: 'Select Left corner fighter',
            choices: [
                ...game.fightersList.collection.map((f, i) => {
                    return {
                        name: `${f.person.name} [S: ${f.person.strength.value} | A: ${f.person.agility.value} | P: ${f.person.protection.value}]`,
                        value: f.uuid,
                        disabled: (f.uuid == game.rightCorner?.uuid)
                    }
                }),
                {
                    name: 'Back to menu',
                    value: 'back'
                },
            ],
            loop: true
        }).then(function (result) {
            if (result.menu && result.menu == 'back') {
                View.previous()
            } else {
                game.selectLeftCorner(result.menu)
                View.previous()
            }
        })
    }
}