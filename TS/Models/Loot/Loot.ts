type LootType = 'helmet'| 'armour' | 'bracers' | 'amulet' | 'weapon'

class Loot {
    type: LootType
    name: string
    description: string
    effects: []

    constructor(type: LootType, name: string, description: string, effects: []) {
        this.type = type
        this.name = name
        this.description = description
        this.effects = effects
    }
}

export {Loot, LootType}