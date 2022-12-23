import {BattleFactory} from "./BattleFactory";
import {DuelBattle} from "../Controllers/Battles/DuelBattle";

export class DuelFactory extends BattleFactory{
    prepareBattle(): DuelBattle {
        return new DuelBattle(this._fightersCollection.collection[0], this._fightersCollection.collection[1]);
    }
}