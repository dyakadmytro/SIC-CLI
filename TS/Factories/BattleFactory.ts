import {colors, Config, names} from "unique-names-generator";
import {PersonFactory} from "./PersonFactory";
import {NameGenerator} from "./Generators/NameGenerator";
import {StrengthGenerator} from "./Generators/StrengthGenerator";
import {AgilityGenerator} from "./Generators/AgilityGenerator";
import {ProtectionGenerator} from "./Generators/ProtectionGenerator";
import {FighterFactory} from "./FighterFactory";
import {DuelGameInit} from "../Controllers/Games/Duel/DuelGameInit";
import {FactoryInterface} from "./Interfaces/FactoryInterface";

export class BattleFactory implements FactoryInterface{
    make() {
        const customConfig: Config = {
            dictionaries: [names, colors],
            separator: ' ',
            length: 2,
            style: 'capital'
        };

        const PF = new PersonFactory([
            new NameGenerator(customConfig),
            new StrengthGenerator({
                min: 35,
                max: 45
            }),
            new AgilityGenerator({
                min: 35,
                max: 45
            }),
            new ProtectionGenerator({
                min: 35,
                max: 45
            })
        ])
        const FF = new FighterFactory({}, PF)
        return new DuelGameInit(FF)
    }
}