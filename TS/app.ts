import {  Config, names, colors } from 'unique-names-generator';
import {PersonFactory} from "./Factories/PersonFactory";
import {NameGenerator} from "./Factories/Generators/NameGenerator";
import {StrengthGenerator} from "./Factories/Generators/StrengthGenerator";
import {AgilityGenerator} from "./Factories/Generators/AgilityGenerator";
import {ProtectionGenerator} from "./Factories/Generators/ProtectionGenerator";
import {FighterFactory} from "./Factories/FighterFactory";
import {DuelGame} from "./Controllers/Games/DuelGame"
import {MenuManager} from "./Controllers/MenuManager";
const  inquirer = require("inquirer")
import {rangeRandInt} from "./functions";
import {GuessGame} from "./Controllers/Games/GuessGame";

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
const FF = new FighterFactory({}, PF)
global.game = null;
global.guessGame = new GuessGame();
global.guessed = null;

const menu = {
    init: function (menuManager) {
        inquirer.prompt({
            type: 'list',
            name: 'menu',
            message: 'Choose game mode',
            choices: [
                {
                    key: 'h',
                    name: 'Game 1',
                    value: 'game1'
                },
            ],
            loop: true
        },{
            test: 1,
            test2: 2,
        }).then(function (result) {
            menuManager.render(result.menu, result)
        })
    },
    lcf: function (menuManager) {
        inquirer.prompt({
            type: 'list',
            name: 'menu',
            message: 'Select Left corner fighter',
            choices: [
                ...global.game.fightersList.collection.map((f, i) => {
                    return {
                        name: `${f.person.name} [S: ${f.person.strength.value} | A: ${f.person.agility.value} | P: ${f.person.protection.value}]`,
                        value: f.uuid,
                        disabled: (f.uuid == global.game.rightCorner?.uuid)
                    }
                }),
                {
                    name: 'Back to menu',
                    value: 'back'
                },
            ],
            loop: true
        },{
            test: 1,
            test2: 2,
        }).then(function (result) {
            if (result.menu && result.menu == 'back') {
                menuManager.previousTab()
            } else {
                global.game.selectLeftCorner(result.menu)
                menuManager.render('game1', result)
            }
        })
    },
    rcf: function (menuManager) {
        inquirer.prompt({
            type: 'list',
            name: 'menu',
            message: 'Select Right corner fighter',
            choices: [
                ...global.game.fightersList.collection.map((f, i) => {
                    return {
                        name: `${f.person.name} [S: ${f.person.strength.value} | A: ${f.person.agility.value} | P: ${f.person.protection.value}]`,
                        value: f.uuid,
                        disabled: (f.uuid == global.game.leftCorner?.uuid)
                    }
                }),
                {
                    name: 'Back to menu',
                    value: 'back'
                },
            ],
            loop: true
        },{
            test: 1,
            test2: 2,
        }).then(function (result) {
            if (result.menu && result.menu == 'back') {
                menuManager.previousTab()
            } else {

                global.game.selectRightCorner(result.menu)
                menuManager.render('game1', result)
            }
        })
    },
    game1: function (menuManager) {
        if(!global.game) global.game = DuelGame.init(FF)

        let lf = ''
        let rf = ''
        if (global.game.leftCorner) lf = ` (${global.game.leftCorner?.person.name})`
        if (global.game.rightCorner) rf = ` (${global.game.rightCorner?.person.name})`
        inquirer.prompt({
            type: 'list',
            name: 'menu',
            message: 'Game 1',
            choices: [
                {
                    name: 'Select left corner fighter' + lf,
                    value: 'lcf',
                },
                {
                    name: 'Select right corner fighter' + rf,
                    value: 'rcf'
                },
                {
                    name: 'Start',
                    value: 'start'
                },
                {
                    name: 'Back to menu',
                    value: 'back'
                },
            ],
            loop: true
        }).then(function (result) {
            if (result.menu == 'back') {
                global.game = null
                menuManager.render('init')
            } else {
                menuManager.render(result.menu, result)
            }
        })
    },
    start: function (menuManager) {
        const data = {
            leftID: global.game.leftCorner.uuid,
            rightID: global.game.rightCorner.uuid,
            sort: [
                {name: 'left', massage: 'Left guess'},
                {name: 'right', massage: 'Right guess'}
            ]
        }
        global.game = global.game.startBattle()
        global.guessGame.genNeedle()
        menuManager.render('turn' , data)
    },
    turn: function (menuManager, data) {
        console.log('guess the number?')

        const questions = [
            {
                type: 'input',
                name: data.sort[0].name,
                message: data.sort[0].massage,
                validate: function (answer) {
                    if(answer && Number.isInteger(Number(answer))) {
                        global.guessed = Number(answer)
                        return true
                    } else {
                        return 'Should be number!'
                    }
                },
            },
            {
                type: 'input',
                name: data.sort[1].name,
                message: data.sort[1].massage,
                validate: function (answer) {
                    if(answer && Number.isInteger(Number(answer))) {

                        if (Number(answer) === global.guessed) {
                            return 'Shouldn`t be same!'
                        }

                        return true
                    } else {
                        return 'Should be number!'
                    }
                },
            },
        ];
        inquirer.prompt(questions, data).then((answers) => {


            if (global.game.isFightingContinue) {

                const l = Math.abs(global.guessGame.showNeedle() - Number(answers.left) )
                const r = Math.abs(global.guessGame.showNeedle() - Number(answers.right) )

                if(Number(answers.left) == global.guessGame.showNeedle() || Number(answers.right) == global.guessGame.showNeedle()) {
                    global.guessGame.genNeedle()
                    global.gueessMatch = true
                    console.log('!!!Critical Hit!!!')
                    console.log('New Number will generated!')
                } else {
                    global.gueessMatch = false
                }

                if (l < r) {
                    if (global.gueessMatch) {
                        global.game.selectFighter(answers.leftID).criticAttack(answers.rightID)
                    } else {
                        global.game.selectFighter(answers.leftID).attack(answers.rightID)
                    }

                    if( answers.sort[0].name !== 'left') answers.sort.reverse()
                } else if(r < l){
                    if (global.gueessMatch) {
                        global.game.selectFighter(answers.rightID).criticAttack(answers.leftID)
                    } else {
                        global.game.selectFighter(answers.rightID).attack(answers.leftID)
                    }

                    if( answers.sort[0].name !== 'right') answers.sort.reverse()
                } else {
                    console.log('miss')
                }
                const data = {leftID: answers.leftID, rightID: answers.rightID, sort: answers.sort}
                menuManager.render('turn', data)
            } else {
                console.log('and the winner is ' + global.game.winner.person.name)
            }
        });
    }
}
const menuManager = new MenuManager(menu)



console.log('Forever arena!')
menuManager.render('init')



// console.log(game)


// const customConfig: Config = {
//    dictionaries: [names, colors],
//    separator: ' ',
//    length: 2,
//    style: 'capital'
// };
//
// const PF = new PersonFactory([
//     new NameGenerator(customConfig),
//     new StrengthGenerator({
//        min: 20,
//        max: 50
//     }),
//     new AgilityGenerator({
//        min: 20,
//        max: 50
//     }),
//     new ProtectionGenerator({
//        min: 20,
//        max: 50
//     })
// ])
// const FF = new FighterFactory([], PF)
//
// const DF = new DuelFactory(new FightersCollection([
//     FF.make(),
//     FF.make()
// ]))
// const BF = new BattleFather(DF.prepareBattle(), new Logger())
// console.log(BF.getLog())

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
