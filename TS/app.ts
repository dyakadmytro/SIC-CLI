import { uniqueNamesGenerator, Config, names, colors } from 'unique-names-generator';
import {PersonFactory} from "./Factories/PersonFactory";
import {NameGenerator} from "./Factories/Generators/NameGenerator";
import {StrengthGenerator} from "./Factories/Generators/StrengthGenerator";
import {AgilityGenerator} from "./Factories/Generators/AgilityGenerator";
import {ProtectionGenerator} from "./Factories/Generators/ProtectionGenerator";
import {FighterFactory} from "./Factories/FighterFactory";
import {FightersCollection} from "./Collections/FightersCollection";
import {DuelFactory} from "./Factories/DuelFactory";
import {BattleFather} from "./Controllers/BattleFather";
import {Logger} from "./Services/Logger";



const customConfig: Config = {
   dictionaries: [names, colors],
   separator: ' ',
   length: 2,
   style: 'capital'
};

const PF = new PersonFactory([
    new NameGenerator(customConfig),
    new StrengthGenerator({
       min: 20,
       max: 50
    }),
    new AgilityGenerator({
       min: 20,
       max: 50
    }),
    new ProtectionGenerator({
       min: 20,
       max: 50
    })
])
const FF = new FighterFactory([], PF)

const DF = new DuelFactory(new FightersCollection([
    FF.make(),
    FF.make()
]))
const BF = new BattleFather(DF.prepareBattle(), new Logger())
BF.fight()
console.log(BF.getLog())

//
// const fighters = [
//    {fName: 'Dima', lName: 'Neposydiaka', s: 28, a: 32, p:35},
//    {fName: 'Tod', lName: 'Broyvik', s: 48, a: 22, p:45},
//    {fName: 'Zet', lName: 'Data', s: 23, a: 62, p:15},
//    {fName: 'Lomo', lName: 'Pati', s: 33, a: 39, p:37}
// ]
//
// function fighterGenerator(name = null) {
//    if (!name) {
//       name = uniqueNamesGenerator(customConfig)
//    }
//    const person = new Person(
//        new Name(name), new Strength(rangeRandInt(20, 50)), new Agility(rangeRandInt(20, 50)), new Protection(rangeRandInt(20, 50))
//    )
//    return new Fighter(person)
// }
//
// function fight(f1, f2, toConsole = false) {
//    while (f1.isAlive() && f2.isAlive()) {
//       let log = []
//       let initiative = rangeRandInt(1,20) % 2
//       if (initiative == 0) {
//          const hit = f1.hit()
//          f2.damage(hit)
//          log.push(
//              `F2 takes ${hit.damage} damage | ${f2.log()} left`
//          )
//       } else {
//          const hit = f2.hit()
//          f1.damage(hit)
//          log.push(
//              `F1 takes ${hit.damage} damage | ${f1.log()} left`
//          )
//       }
//       if(toConsole) console.log(log)
//    }
//
//    if (f1.isAlive()) {
//       if(toConsole) console.log(`${f1.person.name} Wins!`)
//       if(toConsole) console.log(f1)
//       return f1
//    }
//    if (f2.isAlive()) {
//       if(toConsole) console.log(`${f2.person.name} Wins!`)
//       if(toConsole) console.log(f2)
//       return f2
//    }
// }
//
//
// let fighters1 = Array.from(Array(1024).keys()).map((i) => fighterGenerator())
// let fighters2 = Array.from(Array(1024).keys()).map((i) => fighterGenerator())
//
// let raund = 1
// while (fighters1.length > 1 && fighters2.length > 1) {
//    console.log('Round: '+ raund)
//    console.log(fighters1.length)
//    fighters1 = sliceIntoChunks(fighters1,2).map((para) => fight(para[0], para[1]))
//    fighters2 = sliceIntoChunks(fighters2,2).map((para) => fight(para[0], para[1]))
//    raund++
// }
//
//
// console.log(`Final fight!`)
// console.log(`${fighters1[0].person.name} VS ${fighters2[0].person.name}`)
// fight(fighters1[0], fighters2[0], true)
