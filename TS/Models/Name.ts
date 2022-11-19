export class Name {
    protected _firstName: string
    protected _middleName: string
    protected _lastName: string

    constructor(firstName: string, lastName: string = '',  middleName: string = '') {
        this._firstName = firstName.trim();
        this._lastName = lastName.trim();
        this._middleName = middleName.trim();
    }

    getName(): string {
        //todo add middle name check if null
        return [this._lastName, this._middleName, this._firstName].filter((i) => Boolean(i) != false).join(' ');
    }
}