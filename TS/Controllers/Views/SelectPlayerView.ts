import {BaseStateView} from "./BaseStateView";
import {GameMasterFacade} from "../../Facades/GameMasterFacade";

export class SelectPlayerView extends BaseStateView{

    render() {
        global.inquirer.prompt({
            type: 'list',
            name: 'menu',
            message: 'Select fighter',
            choices: [
                ...GameMasterFacade.battle.fightersList.collection.map((f, i) => {
                    const name = f.person.name.underline.magenta
                    return {
                        name: `${name} [S: ${f.person.strength.value} | A: ${f.person.agility.value} | P: ${f.person.protection.value}]`,
                        value: f.uuid,
                        disabled: (f.uuid == GameMasterFacade.battle.rightCorner?.uuid) || (f.uuid == GameMasterFacade.battle.leftCorner?.uuid)
                    }
                }),
                {
                    name: 'Back to menu',
                    value: 'back'
                },
            ],
            loop: true
        }).then(this.processResult)
    }

    protected processResult(result) {

    }
}