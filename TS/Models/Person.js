"use strict";
exports.__esModule = true;
exports.Person = void 0;
var Person = /** @class */ (function () {
    function Person(name) {
        this._name = name;
    }
    Object.defineProperty(Person.prototype, "name", {
        get: function () {
            return this._name.getName();
        },
        enumerable: false,
        configurable: true
    });
    return Person;
}());
exports.Person = Person;
