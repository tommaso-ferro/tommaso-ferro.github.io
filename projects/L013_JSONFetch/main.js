const drawButton = document.querySelector("#drawButton");

async function init(){

let deck = await fetch(
    `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=2`
);

const deckData = await deck.json();
const deckID = deckData.deck_id;

    const response = await fetch(
        `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`
    );

    const data = await response.json();
    const cardLink = data.cards[0].images.svg;
    document.querySelector("#cardImage1").src = cardLink;
    const cardLink2 = data.cards[1].images.svg;
    document.querySelector("#cardImage2").src = cardLink2;
    console.log(data);
}



window.addEventListener("load", init);
