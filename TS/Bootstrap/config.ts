import {WelcomeView} from "../Controllers/Views/WelcomeView";
import {VersusView} from "../Controllers/Views/VersusView";
import {SelectPlayerView} from "../Controllers/Views/SelectPlayerView";
import {SelectFirstPlayerView} from "../Controllers/Views/SelectFirstPlayerView";
import {SelectSecondPlayerView} from "../Controllers/Views/SelectSecondPlayerView";
import {StartView} from "../Controllers/Views/StartView";
import {TurnView} from "../Controllers/Views/TurnView";

export const config = {
    app: {
        name: 'Forever Arena'
    },
    // add config update by game settings
    views: {
        init: WelcomeView,
        versus: VersusView,
        select1Player: SelectFirstPlayerView,
        select2Player: SelectSecondPlayerView,
        start: StartView,
        turn: TurnView,
    }
}

// todo check how to make Singleton on Typescript
export class Conf {
    private static _inst: Conf

    private constructor() {
        throw new Error('Can`t be initialised')
    }

    static make(): Conf {
        if(this._inst) {
            return this._inst
        } else {
            this._inst = new Conf
            return this._inst
        }
    }

    get(config: string): any {
        return 'some'
    }

    set(config: string, data: any): Conf {
        return this
    }

}