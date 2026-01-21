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