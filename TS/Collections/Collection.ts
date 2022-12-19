import {dotStringToNestedObj} from "../functions";

export class Collection {
    protected _collection: Array<any>

    constructor(items = []) {
        this._collection = []
        this.load(items)
    }

    get collection() {
        return this._collection
    }

    load(items: any[]) {
        items.forEach((item) => this.push(item))
        return this
    }

    push(item) {
        this._collection.push(item)
        return this
    }

    pluck(params: string) {
        const nested = (needle, arr) => {
            if(typeof arr == 'undefined') return;
            if(typeof needle == 'string'){
                return  arr
            }
            if (typeof needle == 'object'){
                const k = Object.keys(needle)[0]
                const v = needle[k]
                if(k && v) {
                    return nested(v, arr[k])
                } else {
                    return needle[0]
                }
            }
            throw new Error('Pluck problem! not found type')
        }

        const pluck = (arr, key) => arr.map(i => nested(key, i))
        return pluck(this._collection, dotStringToNestedObj(params))
    }

    find(action: any) {
        return this._collection.find(action)
    }

    sort(action: any) {
        this._collection = this._collection.sort(action)
        return this
    }

    filter(action: any) {
        return this._collection.filter(action)
    }

    remove(key) {
        this._collection.splice(key, 1)
        return this
    }
}