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

const scoreValue = document.querySelectorAll(".scoreValue")

//tilføj event listeners
btnRollDie.addEventListener('click', () => {
    game.rollDice()

    for (let i = 0; i < dice.length; i++) {
        dice[i].firstChild.src = `images/dice${game.dice[i].value}.png`
    }

    turn.textContent = game.turn
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
function resetUi() {
    for (let i = 0; i < dice.length; i++) {
        dice[i].firstChild.src = 'images/blank.png'
        dice[i].classList.remove('hold')
    }
    turn.textContent = game.turn
}

function createScoreFields() {
    for (let i = 0; i < game.results.length; i++) {
        const label = document.createElement('label')
        const input = document.createElement('input')

        label.textContent = game.results[i].title + ': '
        label.style.gridColumn = 1
        label.style.gridRow = i+1

        input.id = 'score-field' + (i+1)
        input.readOnly = true
        input.style.gridColumn = 2
        input.style.gridRow = i+1

        input.classList.add("scoreValue")

        input.addEventListener('click', () => { 
            if (game.turn > 0 && !game.results[i].isUsed) {
                game.chooseResult(i)
                turn.textContent = game.turn
                input.classList.add("selected")
                if (i < 6) {
                    sum.value = game.sum
                    bonus.value = game.bonus
                }
                total.value = game.getTotal()
                
                resetUi()
                if (game.ended) {
                    window.alert(`Spillet er slut! Du fik: ${total.value} points`)
                    btnRollDie.removeEventListener();
                }
                
            }
            
        })

        scoreContainer.appendChild(input)
        scoreContainer.appendChild(label)
    }
}


function updateScore( ) {
    for (let i = 0; i < scoreValue.length; i++ ) {
        scoreValue[i].value = game.getValue(i) 
    }
}

