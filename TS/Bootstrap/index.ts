// todo make some app bootstrap
import {config} from "./config";
import {ViewFacade as View} from "../Facades/ViewFacade";
global.inquirer = require("inquirer")

View.make()

for (const [name, instance] of Object.entries(config.views)) {
    View.addView(name, instance)
}