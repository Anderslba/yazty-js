const btnRollDie = document.querySelector('#roll-button')
const btnReset = document.querySelector('#reset-button')
const dice = document.querySelectorAll('.dice')
const turn = document.querySelector('#turn')

let game = startGame()

//tilføj event listeners
btnRollDie.addEventListener('click', () => {
    game.rollDice()

    for (let i = 0; i < dice.length; i++) {
        dice[i].firstChild.src = `images/dice${game.dice[i].value}.png`
    }

    turn.textContent = game.turn
})

for (let i = 0; i < dice.length; i++) {
    dice[i].addEventListener('click', () => {
        if (game.turn > 0) {
            game.toggleHold(i)
            dice[i].classList.toggle('hold')
        }
        
    })
} 

// event listener og reset af game
btnReset.addEventListener('click', () => {
    if (window.confirm("Vil du genstarte spil?")) {
        game = startGame()
        resetUi()
    }
})


// hjælpemetoder
function resetUi() {
    for (let i = 0; i < dice.length; i++) {
        dice[i].firstChild.src = 'images/blank.png'
        dice[i].classList.remove('hold')
    }
    turn.textContent = game.turn
}

function createScoreFields() {

}
