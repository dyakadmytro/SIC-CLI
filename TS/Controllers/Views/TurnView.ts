import {BaseStateView} from "./BaseStateView";
import {ViewFacade as View} from "../../Facades/ViewFacade";
import {GameMasterFacade} from "../../Facades/GameMasterFacade";
import {randomInt} from "crypto";

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

        global.inquirer.prompt(questions, this._data).then(
            this.processResult.bind(this)
        );
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
        GameMasterFacade.battle.selectTarget(guess.looser)
        // console.log(GameMasterFacade.game.showNeedle())
        if (guess.isClear) {
            //@ts-ignore
            console.log('   !!! Critical Hit !!!   '.italic.yellow)
            console.log('New Number ❓ will generated!')
            GameMasterFacade.battle.criticAttack()
            GameMasterFacade.game.genNeedle()
        } else {
            GameMasterFacade.battle.attack()
        }
        const lastLog = GameMasterFacade.battle.logger.last()
        this.renderAttackResult(lastLog)
        if(guess.isDanger) {
            console.log('🍀 Lucky attack 🍀')
            GameMasterFacade.battle.attack()
            this.renderAttackResult(GameMasterFacade.battle.logger.last())
        }

        if( result.promptOrder[0].id !== guess.winner) result.promptOrder.reverse()
        if (!GameMasterFacade.battle.isFightingContinue) {
            console.log('                           ')
            console.log('🎉 And the winner is ' + GameMasterFacade.battle.winner.person.name.underline.magenta + ' 🏆 🎉')

            // console.log(GameMasterFacade.battle.getLog())
            return ;
            /*View.render('congratulations', {})*/
        }
        View.render('turn', data)
    }
    
     renderAttackResult(logData) {
        // @ts-ignore
        let selectedHpStr = `(${logData.initiator.hp}%)`.green
        if(logData.initiator.hp <= 0) {
            // @ts-ignore
            selectedHpStr = `(${logData.initiator.hp}%)`.grey
        }else if(logData.initiator.hp <= 25) {
            // @ts-ignore
            selectedHpStr = `(${logData.initiator.hp}%)`.red
        } else if(logData.initiator.hp <= 65) {
            // @ts-ignore
            selectedHpStr = `(${logData.initiator.hp}%)`.yellow
        }
        // @ts-ignore
        let targetHpStr = `(${logData.target.hp}%)`.green
        if(logData.target.hp <= 0) {
            // @ts-ignore
            targetHpStr = `(${logData.target.hp}%)`.grey
        }else if(logData.target.hp <= 25) {
            // @ts-ignore
            targetHpStr = `(${logData.target.hp}%)`.red
        } else if(logData.target.hp <= 65) {
            // @ts-ignore
            targetHpStr = `(${logData.target.hp}%)`.yellow
        }

        // @ts-ignore
        let dmgStr = ` ${logData.attack.damage} `.gray
        if(logData.attack.damage >= 40) {
            // @ts-ignore
            dmgStr = ` ${logData.attack.damage} `.red
        } else if(logData.attack.damage >= 25) {
            // @ts-ignore
            dmgStr = ` ${logData.attack.damage} `.yellow
        } else if(logData.attack.damage >= 1) {
            // @ts-ignore
            dmgStr = ` ${logData.attack.damage} `.white
        }

        let playerFace = '🙂'

        if(logData.attack.damage === 0) {
            const dogeFaces = ['😀', '🤨', '🙃', '😶', '😲', '😨', '🤡', '🥴', '🛡']
            playerFace = dogeFaces[randomInt(0, --dogeFaces.length)]
        } else if(logData.attack.damage > 70) {
            playerFace = '🥵'
        } else if(logData.attack.damage > 40) {
            playerFace = '😡'
        } else if(logData.attack.damage > 20) {
            playerFace = '😖'
        } else if(logData.attack.damage > 10) {
            playerFace = '😬'
        } else if(logData.attack.damage > 0) {
            playerFace = '😠'
        }
        if (logData.target.hp <= 0) {
            playerFace = '💀'
        }
        // @ts-ignore
        console.log(selectedHpStr + ` ${logData.initiator.person.name.underline.magenta} 🗡 • ${dmgStr} • ${playerFace} ${logData.target.person.name.underline.magenta} ` + targetHpStr)
    }
}