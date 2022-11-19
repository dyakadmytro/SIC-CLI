"use strict";
exports.__esModule = true;
var Person_1 = require("./Models/Person");
var Name_1 = require("./Models/Name");
var name = new Name_1.Name('Dima', 'Neposydiaka');
var person = new Person_1.Person(name);
console.log(person.name);
