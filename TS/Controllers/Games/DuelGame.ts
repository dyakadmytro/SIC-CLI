import {Fighter} from "../../Models/Fighter";
import {FighterFactory} from "../../Factories/FighterFactory";
import {DuelGameInit} from "./Duel/DuelGameInit";

export class DuelGame {
    static init(fighterFactory: FighterFactory): DuelGameInit {
        return new DuelGameInit(fighterFactory)
    }
}