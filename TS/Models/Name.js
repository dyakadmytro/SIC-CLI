"use strict";
exports.__esModule = true;
exports.Name = void 0;
var Name = /** @class */ (function () {
    function Name(firstName, lastName, middleName) {
        if (lastName === void 0) { lastName = ''; }
        if (middleName === void 0) { middleName = ''; }
        this._firstName = firstName;
        this._lastName = lastName;
        this._middleName = middleName;
    }
    Name.prototype.getName = function () {
        //todo add middle name check if null
        return this._lastName + ' ' + this._lastName;
    };
    return Name;
}());
exports.Name = Name;
