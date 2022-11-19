export abstract class AbstractBattle {
    protected _uuid: string

    protected constructor() {
        //todo generate uuid
        this._uuid = 'test'
    }

    get uuid() {
        return this._uuid
    }
}