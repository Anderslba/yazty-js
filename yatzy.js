
// funktioner til at udregne de forskellige felters indhold(kopieret fra tidligere java 1. semester projekt)
function oneToSix(frequency, eyes) {
  return frequency[eyes] * eyes;
}

function onePair(frequency) {
  let result = 0;
  let i = frequency.length - 1;

  while (i > 0 && result === 0) {
    if (frequency[i] >= 2) {
      result = i * 2;
    } else {
      i--;
    }
  }
  return result;
}

function twoPairs(frequency) {
  let pairsFound = 0;
  let result = 0;
  let i = frequency.length - 1;

  while (i > 0 && pairsFound < 2) {
    if (frequency[i] >= 2) {
      pairsFound++;
      result += i * 2;
    }
    i--;
  }

  if (pairsFound < 2) {
    result = 0;
  }
  return result;
}

function threeSame(frequency) {
  let result = 0;
  let i = frequency.length - 1;

  while (i > 0 && result === 0) {
    if (frequency[i] >= 3) {
      result = i * 3;
    } else {
      i--;
    }
  }
  return result;
}

function fourSame(frequency) {
  let result = 0;
  let i = frequency.length - 1;

  while (i > 0 && result === 0) {
    if (frequency[i] >= 4) {
      result = i * 4;
    } else {
      i--;
    }
  }
  return result;
}

function fullHouse(frequency) {
  let points = 0;
  let threeSameIsFound = false;
  let twoSameIsFound = false;
  for (let i = 1; i < frequency.length; i++) {
    if (frequency[i] == 3) {
      points = points + i * 3;
      threeSameIsFound = true;
    } else if (frequency[i] == 2) {
      points = points + i * 2;
      twoSameIsFound = true;
    }
  }

  if (!threeSameIsFound || !twoSameIsFound) {
    points = 0;
  }

  return points;
}

function smallStraight(frequency) {
  let points = 15;
  let smallStraight = true;
  let i = 1;
  while (i < 6 && smallStraight) {
    if (frequency[i] < 1) {
      smallStraight = false;
      points = 0;
    }
    i++;
  }
  return points;
}

function largeStraight(frequency) {
  let points = 20;
  let largeStraight = true;
  let i = 2;
  while (i < frequency.length && largeStraight) {
    if (frequency[i] < 1) {
      largeStraight = false;
      points = 0;
    }
    i++;
  }
  return points;
}

function chance(frequency) {
  let result = 0;
  for (let i = 1; i < frequency.length; i++) {
    result += i * frequency[i]
  }
  return result;
}

function yatzy(frequency) {
  let yatzyIsFound = true;
  let points = 50;

  let i = 0;
  while (i < frequency.length && yatzyIsFound) {
    if (frequency[i] < 5 && frequency[i] > 0) {
      yatzyIsFound = false;
      points = 0;
    }
    i++;
  }
  return points;
}

// funktion til at udregne forekomster af hver terning ud fra dice
function calculateFrequencies(dice) {
  let freq = [0, 0, 0, 0, 0, 0, 0];
  for (let die of dice) {
    freq[die.value]++;
  }
  return freq;
}

//Logik til spillets state
function startGame() {
  const game = {}
  let frequency = [0, 0, 0, 0, 0, 0, 0]

  const dice = [
    { value: 0, hold: false },
    { value: 0, hold: false },
    { value: 0, hold: false },
    { value: 0, hold: false },
    { value: 0, hold: false }
  ];

  const results = [
    {
      title: "1-s",
      result: 0, isUsed: false, calcResult: (frequency) => oneToSix(frequency, 1)
    },
    {
      title: "2-s",
      result: 0, isUsed: false,
      calcResult: (frequency) => oneToSix(frequency, 2),
    },
    {
      title: "3-s",
      result: 0, isUsed: false,
      calcResult: (frequency) => oneToSix(frequency, 3),
    },
    {
      title: "4-s",
      result: 0, isUsed: false,
      calcResult: (frequency) => oneToSix(frequency, 4),
    },
    {
      title: "5-s",
      result: 0, isUsed: false,
      calcResult: (frequency) => oneToSix(frequency, 5),
    },
    {
      title: "6-s",
      result: 0, isUsed: false,
      calcResult: (frequency) => oneToSix(frequency, 6),
    },
    {
      title: "One pair",
      result: 0, isUsed: false,
      calcResult: (frequency) => onePair(frequency),
    },
    {
      title: "Two pairs",
      result: 0, isUsed: false,
      calcResult: (frequency) => twoPairs(frequency),
    },
    {
      title: "Three same",
      result: 0, isUsed: false,
      calcResult: (frequency) => threeSame(frequency),
    },
    {
      title: "Four same",
      result: 0, isUsed: false,
      calcResult: (frequency) => fourSame(frequency),
    },
    {
      title: "Full house",
      result: 0, isUsed: false,
      calcResult: (frequency) => fullHouse(frequency),
    },
    {
      title: "Small straight",
      result: 0, isUsed: false,
      calcResult: (frequency) => smallStraight(frequency),
    },
    {
      title: "Large straight",
      result: 0, isUsed: false,
      calcResult: (frequency) => largeStraight(frequency),
    },
    {
      title: "Chance",
      result: 0,
      isUsed: false,
      calcResult: (frequency) => chance(frequency)
    },
    {
      title: "Yatzy",
      result: 0, 
      isUsed: false,
      calcResult: (frequency) => yatzy(frequency)
    },
  ];

  let resultsLeft = results.length
  let total = 0

  const rollDice = function () {
    if (game.turn < 3) {
      for (let die of dice) {
        if (!die.hold) {
          die.value = Math.floor(Math.random() * 6 + 1)
        }
      }
      game.turn++;
      frequency = calculateFrequencies(dice)
    }
  }

  const toggleHold = function (num) {
    if (game.turn > 0) {
      dice[num].hold = !dice[num].hold;
    }
  }

  const chooseResult = function (resultNum) {
    if (!results[resultNum].isUsed && game.turn > 0) {
      // udregn result / point for det trykkede resultat felt
      let resultFromActual = results[resultNum].calcResult(frequency);

      // opdater game variabler og internt i result
      results[resultNum].result = resultFromActual
      

      if (resultNum < 6) {
        game.sum = getSum()
        game.bonus = getBonus()
      }

      total += resultFromActual
      // reset terningerne
      for (let die of dice) {
        die.hold = false
        die.value = 0
      }

      game.turn = 0
      results[resultNum].isUsed = true


      //opdater variabel til at tjekke om spil er slut, og tjek om spil er slut
      resultsLeft--
      if (resultsLeft === 0) {
        game.ended = true
      }
    }
  }

  const getSum = function() {
    let result = 0;
    for (let i = 0; i < 6; i++) {
      result += results[i].result
    }
    return result
  }

  const getBonus = function() {
    if (game.sum >= 63) {
      return 50
    }
    return 0
  }
  
  const getTotal = function() {
    return total + game.bonus
  }

  const getValue = function(index) {
      if (results[index].isUsed) {
        return results[index].result

      } else {
        return results[index].calcResult(frequency)
      }
  }

  game.dice = dice
  game.turn = 0
  game.results = results
  game.sum = 0
  game.bonus = 0
  game.rollDice = rollDice
  game.toggleHold = (diceNum) => toggleHold(diceNum)
  game.chooseResult = (resultNum) => chooseResult(resultNum)
  game.ended = false
  game.getValue = (index) => getValue(index)
  game.getTotal = getTotal


  return game
}