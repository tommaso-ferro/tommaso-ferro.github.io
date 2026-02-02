const button = document.querySelector('#sendButton');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const message = document.querySelector('#message');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');

function main() {
    console.log("It Works!");
}

window.addEventListener('load', main);
window.addEventListener('beforeunload', initScroll);

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

function initScroll() {
    window.scrollTo(0, 0);
}

button.addEventListener('click', () => {
    console.log("Name: ", name.value);
    console.log("Email: ", email.value);
    console.log("Message: ", message.value);
});