window.onload = function() {
    updateAgenda();
    updateReadProgress();
}

window.addEventListener('scroll', function() {
    updateReadProgress();
})


// Generate agenda
function updateAgenda() {
    let sectionTitles = document.getElementsByClassName("L1-section-title");
    let agenda = document.getElementById("agenda");
    
    for (let i = 0; i < sectionTitles.length; i++) {
        let title = sectionTitles[i];
        let newNode = document.createElement("li");
        let anchor = createAnchor(title.innerHTML, "#" + title.innerHTML);

        title.setAttribute("id", title.innerHTML);
        newNode.appendChild(anchor);
        agenda.appendChild(newNode);
    }
}

function createAnchor(text, link) {
    let anchor = document.createElement("a");
    anchor.innerText = text;
    anchor.setAttribute("href", link);
    return anchor;
}


// Update agenda section status to display read progress
function updateReadProgress() {
    let sectionTitles = document.getElementsByClassName("L1-section-title");
    let bullets = document.querySelectorAll("#agenda > li");
    let scrolly = window.scrollY;
    console.log(scrolly, document.querySelector("#main-content").scrollHeight);
    
    for (let i = 0; i < sectionTitles.length - 1; i++) {
        let bullet = bullets[i];                 
        let section = sectionTitles[i];
        let nextSection = sectionTitles[i + 1];
        if (scrolly >= section.offsetTop && scrolly < nextSection.offsetTop) {
            bullet.className = "focus-section";
        } else {
            bullet.className = "non-focus-section";
        }
    }

    let lastSection = sectionTitles[sectionTitles.length - 1];
    let lastBullet = bullets[sectionTitles.length - 1];
    if (scrolly >= lastSection.offsetTop) {
        lastBullet.className = "focus-section";
    } else {
        lastBullet.className = "non-focus-section";
    }
}