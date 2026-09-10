const btnRollDie = document.querySelector('#roll-button')
const btnReset = document.querySelector('reset-button')
const dice = document.querySelectorAll('.dice > img')

const game = startGame()

btnRollDie.addEventListener('click', () => {
    game.rollDice()

    for (let i in dice) {
        dice[i].src = `Terninger/${game.dice[i].value} terning.png`
    }
})
