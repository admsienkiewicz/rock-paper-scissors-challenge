const points = document.querySelector('.points')

const optionSection = document.querySelector('.options')
const fightSection = document.querySelector('.fight')

const optionsButtons = document.querySelectorAll('.btn')

const gameSate = {
    playerPick: '',
    aiPick: '',
    score: 0,
}

const updateScore = (win) => {
    const currScore = points.innerHTML
    points.innerHTML = win ? Number(currScore) + 1 : Number(currScore) - 1
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
        case (aiPick === 'paper' && userPick == 'rock') || (aiPick === 'scissors' && userPick === 'paper'):
            return 'LOOSE'
        case (userPick === 'paper' && aiPick == 'rock') || (userPick === 'scissors' && aiPick === 'paper'):
            return 'WIN'
        default:
            break
    }
}

const displayResult = (aiPick, userPick) => {
    const result = getResult(aiPick, userPick)
    document.querySelector('.pick--ai').classList.toggle('animated')
    document.querySelector('.pick--player').classList.toggle('animated')
}

const generatePicks = (btn) => {
    const aiPick = generateUserPick(btn)
    const userPick = generateAiPick()
    optionSection.classList.toggle('hidden')
    fightSection.classList.toggle('hidden')
    removeListners()
    displayResult(aiPick, userPick)
}

const removeListners = () => {
    optionsButtons.forEach((btn) => {
        btn.removeEventListener('click', generatePicks)
    })
}
const init = () => {
    optionsButtons.forEach((btn) => {
        btn.addEventListener('click', () => generatePicks(btn))
    })
    points.innerHTML = gameSate.score
    gameSate.aiPick = ''
    gameSate.playerPick = ''
}

init()
