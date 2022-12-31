import './Bootstrap/index'
import {  Config, names, colors } from 'unique-names-generator';
import {PersonFactory} from "./Factories/PersonFactory";
import {NameGenerator} from "./Factories/Generators/NameGenerator";
import {StrengthGenerator} from "./Factories/Generators/StrengthGenerator";
import {AgilityGenerator} from "./Factories/Generators/AgilityGenerator";
import {ProtectionGenerator} from "./Factories/Generators/ProtectionGenerator";
import {FighterFactory} from "./Factories/FighterFactory";
import {DuelGame} from "./Controllers/Games/DuelGame"
import {SingleGame} from "./Controllers/Games/SingleGame"
import {MenuManager} from "./Controllers/MenuManager";
const  inquirer = require("inquirer")
import {rangeRandInt} from "./functions";
import {GuessGame} from "./Controllers/Games/GuessGame";
import {InitView} from "./Controllers/Views/InitView";


// const customConfig: Config = {
//     dictionaries: [names, colors],
//     separator: ' ',
//     length: 2,
//     style: 'capital'
// };
//
// const PF = new PersonFactory([
//     new NameGenerator(customConfig),
//     new StrengthGenerator({
//         min: 20,
//         max: 50
//     }),
//     new AgilityGenerator({
//         min: 20,
//         max: 50
//     }),
//     new ProtectionGenerator({
//         min: 20,
//         max: 50
//     })
// ])
// const FF = new FighterFactory({}, PF)
global.game = null;
global.guessGame = new GuessGame();
global.guessed = null;

// const menu = {
//     init: function (menuManager) {
//         inquirer.prompt({
//             type: 'list',
//             name: 'menu',
//             message: 'Choose game mode',
//             choices: [
//                 {
//                     name: 'Versus',
//                     value: 'versus'
//                 },
//                 {
//                     name: 'Single',
//                     value: 'single'
//                 },
//             ],
//             loop: true
//         },{
//             test: 1,
//             test2: 2,
//         }).then(function (result) {
//             menuManager.render(result.menu, result)
//         })
//     },
//     lcf: function (menuManager) {
//         inquirer.prompt({
//             type: 'list',
//             name: 'menu',
//             message: 'Select Left corner fighter',
//             choices: [
//                 ...global.game.fightersList.collection.map((f, i) => {
//                     return {
//                         name: `${f.person.name} [S: ${f.person.strength.value} | A: ${f.person.agility.value} | P: ${f.person.protection.value}]`,
//                         value: f.uuid,
//                         disabled: (f.uuid == global.game.rightCorner?.uuid)
//                     }
//                 }),
//                 {
//                     name: 'Back to menu',
//                     value: 'back'
//                 },
//             ],
//             loop: true
//         },{
//             test: 1,
//             test2: 2,
//         }).then(function (result) {
//             if (result.menu && result.menu == 'back') {
//                 menuManager.previousTab()
//             } else {
//                 global.game.selectLeftCorner(result.menu)
//                 menuManager.previousTab()
//             }
//         })
//     },
//     rcf: function (menuManager) {
//         inquirer.prompt({
//             type: 'list',
//             name: 'menu',
//             message: 'Select Right corner fighter',
//             choices: [
//                 ...global.game.fightersList.collection.map((f, i) => {
//                     return {
//                         name: `${f.person.name} [S: ${f.person.strength.value} | A: ${f.person.agility.value} | P: ${f.person.protection.value}]`,
//                         value: f.uuid,
//                         disabled: (f.uuid == global.game.leftCorner?.uuid)
//                     }
//                 }),
//                 {
//                     name: 'Back to menu',
//                     value: 'back'
//                 },
//             ],
//             loop: true
//         },{
//             test: 1,
//             test2: 2,
//         }).then(function (result) {
//             if (result.menu && result.menu == 'back') {
//                 menuManager.previousTab()
//             } else {
//
//                 global.game.selectRightCorner(result.menu)
//                 menuManager.previousTab()
//             }
//         })
//     },
//     versus: function (menuManager) {
//         if(!global.game) global.game = DuelGame.init(FF)
//
//         let lf = ''
//         let rf = ''
//         if (global.game.leftCorner) lf = ` (${global.game.leftCorner?.person.name})`
//         if (global.game.rightCorner) rf = ` (${global.game.rightCorner?.person.name})`
//         inquirer.prompt({
//             type: 'list',
//             name: 'menu',
//             message: 'Versus',
//             choices: [
//                 {
//                     name: 'Select left corner fighter' + lf,
//                     value: 'lcf',
//                 },
//                 {
//                     name: 'Select right corner fighter' + rf,
//                     value: 'rcf'
//                 },
//                 {
//                     name: 'Start',
//                     value: 'start'
//                 },
//                 {
//                     name: 'Back to menu',
//                     value: 'back'
//                 },
//             ],
//             loop: true
//         }).then(function (result) {
//             if (result.menu == 'back') {
//                 global.game = null
//                 menuManager.render('init')
//             } else {
//                 menuManager.render(result.menu, result)
//             }
//         })
//     },
//     single: function (menuManager) {
//         if(!global.game) global.game = SingleGame.init(FF)
//         let lf = ''
//         let rf = ''
//         if (global.game.leftCorner) lf = ` (${global.game.leftCorner?.person.name})`
//         if (global.game.rightCorner) rf = ` (${global.game.rightCorner?.person.name})`
//         inquirer.prompt({
//             type: 'list',
//             name: 'menu',
//             message: 'Single',
//             choices: [
//                 {
//                     name: 'Select fighter' + lf,
//                     value: 'lcf',
//                 },
//                 {
//                     name: 'Start',
//                     value: 'start'
//                 },
//                 {
//                     name: 'Back to menu',
//                     value: 'back'
//                 },
//             ],
//             loop: true
//         }).then(function (result) {
//             if (result.menu == 'back') {
//                 global.game = null
//                 menuManager.render('init')
//             } else {
//                 menuManager.render(result.menu, result)
//             }
//         })
//     },
//     start: function (menuManager) {
//         const data = {
//             leftID: global.game.leftCorner.uuid,
//             rightID: global.game.rightCorner.uuid,
//             sort: [
//                 {name: 'left', massage: 'Left guess'},
//                 {name: 'right', massage: 'Right guess'}
//             ]
//         }
//         global.game = global.game.startBattle()
//         global.guessGame.genNeedle()
//         menuManager.render('turn' , data)
//     },
//     turn: function (menuManager, data) {
//         // todo need turn for different game types
//
//         console.log('guess the number?')
//
//         const questions = []
//
//         const playerPrompt = {
//             type: 'input',
//             name: data.sort[0].name,
//             message: data.sort[0].massage,
//             validate: function (answer) {
//                 if(answer && Number.isInteger(Number(answer))) {
//                     // if (Number(answer) === global.guessed) {
//                     //     return 'Shouldn`t be same!'
//                     // }
//                     global.guessed = Number(answer)
//                     return true
//                 } else {
//                     return 'Should be number!'
//                 }
//             },
//         }
//
//         const aiPrompt = {
//             type: 'number',
//             name: '',
//             message: 'test'
//         }
//
//         if(data.sort[0].name === 'left') {
//
//         } else {
//
//         }
//
//         inquirer.prompt(questions, data).then((answers) => {
//
//
//             if (global.game.isFightingContinue) {
//
//                 const l = Math.abs(global.guessGame.showNeedle() - Number(answers.left) )
//                 const r = Math.abs(global.guessGame.showNeedle() - Number(answers.right) )
//
//                 if(Number(answers.left) == global.guessGame.showNeedle() || Number(answers.right) == global.guessGame.showNeedle()) {
//                     global.guessGame.genNeedle()
//                     global.gueessMatch = true
//                     console.log('!!!Critical Hit!!!')
//                     console.log('New Number will generated!')
//                 } else {
//                     global.gueessMatch = false
//                 }
//
//                 if (l < r) {
//                     if (global.gueessMatch) {
//                         global.game.selectFighter(answers.leftID).criticAttack(answers.rightID)
//                     } else {
//                         global.game.selectFighter(answers.leftID).attack(answers.rightID)
//                     }
//
//                     if( answers.sort[0].name !== 'left') answers.sort.reverse()
//                 } else if(r < l){
//                     if (global.gueessMatch) {
//                         global.game.selectFighter(answers.rightID).criticAttack(answers.leftID)
//                     } else {
//                         global.game.selectFighter(answers.rightID).attack(answers.leftID)
//                     }
//
//                     if( answers.sort[0].name !== 'right') answers.sort.reverse()
//                 } else {
//                     console.log('miss')
//                 }
//                 const data = {leftID: answers.leftID, rightID: answers.rightID, sort: answers.sort}
//                 menuManager.render('turn', data)
//             } else {
//                 console.log('and the winner is ' + global.game.winner.person.name)
//             }
//         });
//     }
// }
// const menuManager = new MenuManager(menu)
//
//
//
//
//
//
//
// console.log('Forever arena!')
// menuManager.render('init')


const init = new InitView()
init.render()