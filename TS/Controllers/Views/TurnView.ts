import {BaseStateView} from "./BaseStateView";
import {ViewFacade as View} from "../../Facades/ViewFacade";
import {GameMasterFacade} from "../../Facades/GameMasterFacade";

export class TurnView extends BaseStateView{
    render() {
        // todo need turn for different game types

        console.log('                   ')
        console.log('guess the number?')

        const questions = this._data.promptOrder.map((item) => ({
            type: 'input',
            name: item.name,
            message: item.massage,
            validate: function (answer) {
                if(answer && Number.isInteger(Number(answer.replace('!', '')))) {
                    if (Number(answer.replace('!', '')) === global.guessed) {
                        return 'Shouldn`t be same!'
                    }
                    global.guessed = Number(answer.replace('!', ''))
                    return true
                } else {
                    return 'Should be number!'
                }
            }
        }))

        global.inquirer.prompt(questions, this._data).then(this.processResult);
    }

    protected processResult(result) {
        const data = {player1ID: result.player1ID, player2ID: result.player2ID, sort: result.sort, promptOrder: result.promptOrder}

        const guesses = {}
        guesses[result.player1ID] = result.left
        guesses[result.player2ID] = result.right
        const guess = GameMasterFacade.game.compare(guesses)

        if (guess.isNichja) {
            // GameMasterFacade.battle.parirovat(guess.looser)
            console.log('⚔ miss ⚔')
            View.render('turn', data)
            return;
        }

        GameMasterFacade.battle.selectFighter(guess.winner)
        // console.log(GameMasterFacade.game.showNeedle())
        if (guess.isClear) {
            //@ts-ignore
            console.log('   !!! Critical Hit !!!   '.italic.yellow)
            console.log('New Number ❓ will generated!')
            GameMasterFacade.battle.criticAttack(guess.looser)
            GameMasterFacade.game.genNeedle()
        } else {
            GameMasterFacade.battle.attack(guess.looser)
        }
        if(guess.isDanger) {
            console.log('🍀 Lucky attack 🍀')
            GameMasterFacade.battle.attack(guess.looser)
        }

        if( result.promptOrder[0].id !== guess.winner) result.promptOrder.reverse()
        if (!GameMasterFacade.battle.isFightingContinue) {
            console.log('                           ')
            console.log('🎉 And the winner is ' + GameMasterFacade.battle.winner.person.name.underline.magenta + ' 🏆 🎉')
            return ;
            /*View.render('congratulations', {})*/
        }
        View.render('turn', data)
    }
}