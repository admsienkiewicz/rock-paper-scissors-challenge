const points = document.querySelector('.points')
const ruleModal = document.querySelector('.rules-modal')
const rulesBtn = document.querySelector('.btn-rules')
const optionSection = document.querySelector('.options')
const fightSection = document.querySelector('.fight')

let optionsButtons = document.querySelectorAll('.options .btn')

const gameSate = {
    playerPick: '',
    aiPick: '',
    score: 0,
}

rulesBtn.addEventListener('click', () => {
    ruleModal.classList.toggle('hidden')
})

document.querySelector('.close-modal').addEventListener('click', () => {
    ruleModal.classList.toggle('hidden')
})

const updateScore = (win) => {
    const currScore = points.innerHTML
    points.innerHTML = win ? Number(currScore) + 1 : Number(currScore) - 1
    gameSate.score = points.innerHTML
}

const generateUserPick = (btn) => {
    gameSate.playerPick = btn.classList.value
    const selected = gameSate.playerPick.split('--')[1]
    const playerOptionHtml = `<button class="${gameSate.playerPick}">
    <div class="btn-img-container">
        <img src="images/icon-${selected}.svg" alt="${selected}">
    </div>
    </button>`
    document.querySelector('.pick--player').innerHTML += playerOptionHtml
    return selected
}

const generateAiPick = () => {
    const options = []
    optionsButtons.forEach((btn) => {
        options.push(btn.classList.value)
        btn.disabled = true
    })
    const randomChoice = Math.trunc(Math.random() * 3)
    const aiChoice = options[randomChoice]
    gameSate.aiPick = aiChoice
    const selected = aiChoice.split('--')[1]
    const aiOptionHtml = `<button class="${gameSate.aiPick}">
    <div class="btn-img-container">
        <img src="images/icon-${selected}.svg" alt="${selected}">
    </div>
    </button>`
    document.querySelector('.pick--ai').innerHTML += aiOptionHtml
    return selected
}

const getResult = (aiPick, userPick) => {
    switch (true) {
        case aiPick === userPick:
            return 'DRAW'
        case (aiPick === 'paper' && userPick == 'rock') ||
            (aiPick === 'scissors' && userPick === 'paper') ||
            (aiPick === 'rock' && userPick === 'scissors'):
            return 'WIN'
        case (userPick === 'paper' && aiPick == 'rock') ||
            (userPick === 'scissors' && aiPick === 'paper') ||
            (userPick === 'rock' && aiPick === 'scissors'):
            return 'LOSS'
        default:
            break
    }
}

const displayResult = (aiPick, userPick) => {
    const result = getResult(aiPick, userPick)
    document.querySelector('.pick--ai').classList.toggle('animated')
    document.querySelector('.pick--player').classList.toggle('animated')
    const resultHtml = `<div class="result-container">
    <span class="result--message">${result}</span>
    <button class="btn-play-again">play again</button>
    </div>`
    document.querySelector('.fight').innerHTML += resultHtml
    document.querySelector('.btn-play-again').addEventListener('click', init)
    setTimeout(() => {
        if (result === 'WIN') updateScore(true)
        if (result === 'LOSS') updateScore(false)
    }, 5000)
}

const generatePicks = (btn) => {
    const aiPick = generateUserPick(btn)
    const userPick = generateAiPick()
    optionSection.classList.toggle('animated')
    setTimeout(() => {
        optionSection.classList.toggle('hidden')
        fightSection.classList.toggle('animated')
        fightSection.classList.toggle('hidden')
    }, 1000)

    displayResult(aiPick, userPick)
}

optionsButtons.forEach((btn) => {
    btn.addEventListener('click', () => generatePicks(btn))
})

const removeElementsFromDom = () => {
    const fightDiv = document.querySelector('.fight')
    const playerPick = document.querySelector('.pick--player')
    const aiPick = document.querySelector('.pick--ai')
    fightDiv.removeChild(fightDiv.lastChild)
    playerPick.removeChild(playerPick.lastChild)
    aiPick.removeChild(aiPick.lastChild)
}
const init = () => {
    points.innerHTML = gameSate.score
    gameSate.aiPick = ''
    gameSate.playerPick = ''
    optionsButtons.forEach((btn) => {
        btn.disabled = false
    })
    if (optionSection.classList.contains('hidden')) {
        optionSection.classList.toggle('hidden')
        fightSection.classList.toggle('hidden')
        optionSection.classList.toggle('animated')
        document.querySelector('.pick--ai').classList.toggle('animated')
        fightSection.classList.toggle('animated')
        document.querySelector('.pick--player').classList.toggle('animated')
        removeElementsFromDom()
    }
}

init()
