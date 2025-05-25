window.onload = function() {
    updateAgenda();
    updateReadProgress();
}

window.addEventListener('scroll', function() {
    updateReadProgress();
})

function getTitles() {
    let postTitles = Array.from(document.getElementsByClassName("post-title"));
    let sectionTitles = Array.from(document.getElementsByClassName("L1-section-title"));
    return postTitles.concat(sectionTitles);
}

// Generate agenda
function updateAgenda() {
    let agenda = document.getElementById("agenda");

    titles = getTitles();
    for (let i = 0; i < titles.length; i++) {
        let title = titles[i];
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
    let titles = getTitles();
    let bullets = document.querySelectorAll("#agenda > li");
    let scrolly = window.scrollY;

    let reachTop = false;
    let reachBottom = false;
    if (scrolly < titles[0].offsetTop) {
       reachTop = true;
    } else if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        reachBottom = true;
    }
    
    for (let i = 0; i < titles.length - 1; i++) {
        let bullet = bullets[i];                 
        let title = titles[i];
        let nextTitle = titles[i + 1];
        if (i == 0 && reachTop || 
            scrolly >= title.offsetTop && scrolly < nextTitle.offsetTop && !reachBottom) {
            bullet.className = "focus-section";
        } else {
            bullet.className = "non-focus-section";
        }
    }

    let lastTitle = titles[titles.length - 1];
    let lastBullet = bullets[titles.length - 1];
    if (scrolly >= lastTitle.offsetTop || reachBottom) {
        lastBullet.className = "focus-section";
    } else {
        lastBullet.className = "non-focus-section";
    }
}