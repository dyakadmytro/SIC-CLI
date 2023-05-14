import EffectInterface from "../Interfaces/EffectInterface";

enum EffectOrder {
    SELF = 'self',
    ENEMY = 'enemy',
}

class Effect implements EffectInterface {
    name: string
    descriptions: string
    type: string
    order: EffectOrder

    constructor(name: string, descriptions: string, type: string, order: EffectOrder) {
        this.name = name;
        this.descriptions = descriptions;
        this.order = order;
    }
}

export {Effect, EffectOrder}