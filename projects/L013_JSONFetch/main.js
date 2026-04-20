let deckId = '';
let playerCards = [];
let dealerCards = [];
let gameActive = false;
let balance = 1000; 
let currentBet = 0;

const hitButton = document.querySelector('#hitButton');
const standButton = document.querySelector('#standButton');
const newGameButton = document.querySelector('#NewGameButton');
const balanceDisplay = document.querySelector('#balanceDisplay');
const betSelect = document.querySelector('#betSelect');
const playerHandEl = document.querySelector('#player-hand');
const dealerHandEl = document.querySelector('#dealer-hand');
const playerScoreEl = document.querySelector('#playerScore');
const dealerScoreEl = document.querySelector('#dealerScore');
const gameMessageEl = document.querySelector('#gameMessage');

newGameButton.addEventListener('click', startNewGame);
hitButton.addEventListener('click', hit);
standButton.addEventListener('click', stand);

async function startNewGame() {
    currentBet = parseInt(betSelect.value);

    
    if (currentBet > balance) {
        gameMessageEl.innerText = "Insufficient funds!";
        return;
    }

    balance -= currentBet;
    updateBalanceUI();
    
    resetBoard();
    gameMessageEl.innerText = "Card dealing...";

    try {
        const deckRes = await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6`);
        const deckData = await deckRes.json();
        deckId = deckData.deck_id;

        const drawRes = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`);
        const drawData = await drawRes.json();

        playerCards.push(drawData.cards[0], drawData.cards[2]);
        dealerCards.push(drawData.cards[1], drawData.cards[3]);

        gameActive = true;
        updateUI();

        if (calculateScore(playerCards) === 21) {
            endGame("BLACKJACK! You win!", "win");
        } else {
            hitButton.disabled = false;
            standButton.disabled = false;
            newGameButton.disabled = true;
            betSelect.disabled = true;
        }
    } catch (e) {
        gameMessageEl.innerText = "Errore API.";
    }
}

async function hit() {
    const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    const data = await res.json();
    playerCards.push(data.cards[0]);
    updateUI();

    if (calculateScore(playerCards) > 21) {
        endGame("You busted!", "lose");
    }
}

async function stand() {
    gameActive = false;
    hitButton.disabled = true;
    standButton.disabled = true;
    updateUI();

    let dScore = calculateScore(dealerCards);
    while (dScore < 17) {
        const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        const data = await res.json();
        dealerCards.push(data.cards[0]);
        dScore = calculateScore(dealerCards);
        updateUI();
    }
    determineWinner();
}

function determineWinner() {
    const pScore = calculateScore(playerCards);
    const dScore = calculateScore(dealerCards);

    if (dScore > 21) endGame("The dealer busted! You win!", "win");
    else if (pScore > dScore) endGame("You win!", "win");
    else if (pScore < dScore) endGame("The dealer wins!", "lose");
    else endGame("It's a tie! Your bet is returned.", "push");
}

function endGame(msg, result) {
    gameActive = false;
    gameMessageEl.innerText = msg;

    if (result === "win") {
        balance += (currentBet * 2); 
    } else if (result === "push") {
        balance += currentBet;
    }
    
    updateBalanceUI();
    hitButton.disabled = true;
    standButton.disabled = true;
    newGameButton.disabled = false;
    betSelect.disabled = false;
}

function calculateScore(hand) {
    let score = 0;
    let aces = 0;
    hand.forEach(card => {
        if (['JACK', 'QUEEN', 'KING'].includes(card.value)) score += 10;
        else if (card.value === 'ACE') { score += 11; aces++; }
        else score += parseInt(card.value);
    });
    while (score > 21 && aces > 0) { score -= 10; aces--; }
    return score;
}

function updateUI() {
    playerHandEl.innerHTML = '';
    dealerHandEl.innerHTML = '';
    playerCards.forEach(c => {
        const img = document.createElement('img');
        img.src = c.images.png;
        playerHandEl.appendChild(img);
    });
    dealerCards.forEach((c, i) => {
        const img = document.createElement('img');
        img.src = (gameActive && i === 1) ? 'https://deckofcardsapi.com/static/img/back.png' : c.images.png;
        dealerHandEl.appendChild(img);
    });
    playerScoreEl.innerText = calculateScore(playerCards);
    dealerScoreEl.innerText = gameActive ? "?" : calculateScore(dealerCards);
}

function updateBalanceUI() {
    balanceDisplay.innerText = balance;
}

function resetBoard() {
    playerCards = [];
    dealerCards = [];
    playerScoreEl.innerText = '0';
    dealerScoreEl.innerText = '0';
}