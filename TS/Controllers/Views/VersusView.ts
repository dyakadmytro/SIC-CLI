import {SelectPlayerView} from "./SelectPlayerView";
import {DuelGame} from "../Games/DuelGame";
import {ViewFacade as View} from "../../Facades/ViewFacade";
import {GameMaster} from "../../Facades/GameMaster";
import {colors, Config, names} from "unique-names-generator";
import {PersonFactory} from "../../Factories/PersonFactory";
import {NameGenerator} from "../../Factories/Generators/NameGenerator";
import {StrengthGenerator} from "../../Factories/Generators/StrengthGenerator";
import {AgilityGenerator} from "../../Factories/Generators/AgilityGenerator";
import {ProtectionGenerator} from "../../Factories/Generators/ProtectionGenerator";
import {FighterFactory} from "../../Factories/FighterFactory";

export class VersusView {

    render() {
        // remove game setup
        const customConfig: Config = {
            dictionaries: [names, colors],
            separator: ' ',
            length: 2,
            style: 'capital'
        };

        const PF = new PersonFactory([
            new NameGenerator(customConfig),
            new StrengthGenerator({
                min: 20,
                max: 50
            }),
            new AgilityGenerator({
                min: 20,
                max: 50
            }),
            new ProtectionGenerator({
                min: 20,
                max: 50
            })
        ])
        const FF = new FighterFactory({}, PF)
        if(!GameMaster.currentGame()) GameMaster.newGame(DuelGame.init(FF))

        let lf = ''
        let rf = ''
        // if (global.game.leftCorner) lf = ` (${global.game.leftCorner?.person.name})`
        // if (global.game.rightCorner) rf = ` (${global.game.rightCorner?.person.name})`
        global.inquirer.prompt({
            type: 'list',
            name: 'menu',
            message: 'Versus',
            choices: [
                {
                    name: 'Select left corner fighter' + lf,
                    value: 'select1Player',
                },
                {
                    name: 'Select right corner fighter' + rf,
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
            } else if (result.menu == 'start') {
                //todo validate
            } else {
                View.render(result.menu)
            }
        })
    }
}