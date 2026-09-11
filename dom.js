const btnRollDie = document.querySelector('#roll-button')
const btnReset = document.querySelector('#reset-button')
const dice = document.querySelectorAll('.dice')
const turn = document.querySelector('#turn')
const scoreContainer = document.querySelector(".score-container")
const sum = document.querySelector(".sum > input")
const bonus = document.querySelector(".bonus > input")
const total = document.querySelector(".total > input") 

let game = startGame()
createScoreFields()

const scoreValues = document.querySelectorAll(".score-value")

//tilføj event listeners
btnRollDie.addEventListener('click', () => {
    game.rollDice()

    for (let i = 0; i < dice.length; i++) {
        dice[i].querySelector('img').src = `images/dice${game.dice[i].value}.png`
    }

    turn.textContent = game.turn
    btnRollDie.disabled = game.turn === 3
    updateScore()
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
function resetDice() {
    for (let die of dice) {
        die.querySelector('img').src = 'images/blank.png'
        die.classList.remove('hold')
    }
}

function resetUi() {
    resetDice()
    turn.textContent = game.turn
    btnRollDie.disabled = false
    sum.value = 0
    bonus.value = 0
    total.value = 0

    for (let field of scoreValues) {
        field.value = 0
        field.classList.remove('selected')
    }
}

function createScoreFields() {
    const results = game.getResults()
    for (let i = 0; i < results.length; i++) {
        const label = document.createElement('label')
        const input = document.createElement('input')

        label.textContent = results[i].title + ': '
        label.style.gridColumn = 1
        label.style.gridRow = i+1

        input.id = 'score-field' + (i+1)
        input.readOnly = true
        input.style.gridColumn = 2
        input.style.gridRow = i+1
        input.value = 0

        input.classList.add("score-value")

        input.addEventListener('click', () => {
            if (game.turn > 0 && !game.getResults()[i].isUsed) {
                game.chooseResult(i)
                turn.textContent = game.turn
                input.classList.add("selected")
                if (i < 6) {
                    sum.value = game.sum
                    bonus.value = game.bonus
                }
                total.value = game.getTotal()
                
                resetDice()
                updateScore()

                btnRollDie.disabled = game.isEnded
                if (game.isEnded) {
                    window.alert(`Spillet er slut! Du fik: ${total.value} point`)
                    btnRollDie.disabled = true
                }
            }
            
        })

        scoreContainer.appendChild(input)
        scoreContainer.appendChild(label)
    }
}


function updateScore( ) {
    for (let i = 0; i < scoreValues.length; i++) {
        scoreValues[i].value = game.getValue(i) 
    }
}

