export class MenuManager {

    menu: {}
    protected tabsHistory: any;

    constructor(menu) {
        this.menu = menu
        this.tabsHistory = []
    }


    render(key: string, data: any = null) {
        if (typeof this.menu[key] !== 'function') throw new Error('Not found menu tab!')

        this.menu[key](this, data)
        this.tabsHistory.push(key)
    }

    previousTab() {
        this.render(this.tabsHistory[this.tabsHistory.length - 2])
    }
}