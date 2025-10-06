window.addEventListener('load', setDemo());

function setDemo() {
    let button = document.getElementById("demo-button");
    button.onclick = updateDemoDisplay;

    let consoleButton = document.getElementById("console-button");
    consoleButton.onclick = sayHi;

    let alertButton = document.getElementById("alert-button");
    alertButton.onclick = showAlert;
}

function updateDemoDisplay() {
    let text = document.getElementById("demo-input");
    let value = text.value;
    let display = document.getElementById("demo-display");
    display.textContent = value;
}

function sayHi() {
    console.log("Hi");
}

function showAlert() {
    alert("WOW");
}