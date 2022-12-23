export class MenuItem {
    title: string
    sort: number
    description: string
    options: any

    constructor(title: string, sort: number, description: string, options: any) {
        this.title = title
        this.sort = sort
        this.description = description
        this.options = options
    }
}