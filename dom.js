const btnRollDie = document.querySelector('#roll-button')
const btnReset = document.querySelector('#reset-button')
const dice = document.querySelectorAll('.dice')

let game = startGame()

btnRollDie.addEventListener('click', () => {
    game.rollDice()

    for (let i = 0; i < dice.length; i++) {
        dice[i].firstChild.src = `Terninger/${game.dice[i].value} terning.png`
    }
})
<<<<<<< HEAD

btnReset.addEventListener('click', () => {
    if (window.confirm("Vil du genstarte spil?")) {
        game = startGame()
        resetUi()
    }
})

function resetUi() {
    for (let i = 0; i < dice.length; i++) {
        dice[i].src = `Terninger/blank.png`
    }
}
=======
>>>>>>> 2569997b5e872e7fab013809337a737f677d5bed
