// todo make some app bootstrap
import {config} from "./config";
import {ViewFacade as View} from "../Facades/ViewFacade";
import {GameMasterFacade} from "../Facades/GameMasterFacade";
import {BattleFactory} from "../Factories/BattleFactory";
global.inquirer = require("inquirer")
require('colors');

View.make()
GameMasterFacade.make(new BattleFactory)

for (const [name, instance] of Object.entries(config.views)) {
    View.addView(name, instance)
}