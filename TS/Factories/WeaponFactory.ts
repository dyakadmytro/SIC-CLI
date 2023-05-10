import {FactoryInterface} from "./Interfaces/FactoryInterface";
import Weapon from "../Models/Loot/Weapon";

type WFData = {
    name: string,
    description: string,
    effects: [],
    damage: number,
    ignore: number
}

export default class WeaponFactory implements FactoryInterface {
    private data: WFData | null


    constructor() {
    }

    setData(data) {
        return this
    }

    make() {
        return new Weapon (
            'weapon',
            this.data.name,
            this.data.description,
            [],
            10,
            10
        )
    }
}