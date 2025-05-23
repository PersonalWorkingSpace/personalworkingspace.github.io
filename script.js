window.onload = function() {
    updateAgenda();
}

window.addEventListener('scroll', function() {
    fixAgendaPosition();
})


// Generate agenda
function updateAgenda() {
    sectionTitles = document.getElementsByClassName("L1-section-title");
    let agenda = document.getElementById("agenda");
    
    for (let i = 0; i < sectionTitles.length; i++) {
        var title = sectionTitles[i];
        var newNode = document.createElement("li");
        var nodeText = document.createTextNode(title.innerHTML);
        newNode.appendChild(nodeText);
        agenda.appendChild(newNode);
    }
}

// Fix agenda position after scrolling below header

function fixAgendaPosition() {
    let agenda = document.getElementById("agenda");
    if (window.scrollY > agenda.offsetTop) {
        agenda.style.color = "red";
        agenda.style.position = "fixed";
        agenda.style.top = "0";
    } else {
        agenda.style.color = "black";
        agenda.style.position = "";
        agenda.style.top = "0";
    }
}