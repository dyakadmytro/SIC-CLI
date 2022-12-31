import {ViewStateInterface} from "./Interfaces/ViewStateInterface";

export abstract class BaseStateView implements ViewStateInterface {
    protected _data: any

    protected constructor(data: any = null) {
        this._data = data
    }

    render() {

    }
}