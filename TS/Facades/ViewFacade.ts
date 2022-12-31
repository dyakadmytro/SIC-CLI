
export class ViewFacade {
    private static _inst: ViewFacade
    private static _views: object = {}
    private static _viewsHistory: any = []

    private constructor() {}

    static make(): ViewFacade {
        if(ViewFacade._inst) {
            return this._inst
        } else {
            ViewFacade._inst = new ViewFacade
            return ViewFacade._inst
        }
    }

    static get history() {
        return this._viewsHistory
    }

    static addView(name: string, instance): ViewFacade {
        ViewFacade._views[name] = instance
        return ViewFacade
    }

    static previous(data: any = null) {
        // todo check if less then two
        ViewFacade.render(ViewFacade._viewsHistory[ViewFacade._viewsHistory.length - 2], data)
    }

    static render(name: string, data: any = null): void {
        (new ViewFacade._views[name](data)).render()
        ViewFacade._viewsHistory.push(name)
    }
}