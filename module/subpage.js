import { colorCode } from './colorization.js';

window.onload = function() {
    updateCategory();
    updateTag();
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

// Generate category
function updateCategory() {
    let url = decodeURIComponent(window.location.href);
    let category = url.split("/category/")[1].split("/")[0];
    let bar = document.getElementById("category-bar");
    let anchor = createAnchor(category, "#");
    anchor.setAttribute("class", "tag");
    anchor.style.color = colorCode[category]["font"];
    anchor.style.backgroundColor = colorCode[category]["bg"];
    bar.appendChild(anchor);
}

// Generate tag
function updateTag() {
    let bar = document.getElementById("tag-bar");
    let tags = document.querySelector('meta[name="keywords"]').content
    let taglist = tags.split(",")
    
    for (let i = 0; i < taglist.length; i++) {
        let tag = taglist[i].trim();
        let anchor = createAnchor(tag, "#");
        anchor.setAttribute("class", "tag");
        anchor.style.color = colorCode[tag]["font"];
        anchor.style.backgroundColor = colorCode[tag]["bg"];
        bar.appendChild(anchor);
        if (i != taglist.length - 1) {
            let textNode = document.createTextNode(" ");
            bar.appendChild(textNode);
        }
    }
}

// Generate agenda
function updateAgenda() {
    let agenda = document.getElementById("agenda");

    let titles = getTitles();
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
    anchor.innerHTML = text;
    anchor.setAttribute("href", link);
    return anchor;
}


// Update agenda section status to display read progress
function updateReadProgress() {
    let titles = getTitles();
    let bullets = document.querySelectorAll("#agenda li");
    let scrolly = window.scrollY;

    // agenda hasn't be generated
    if (bullets.length == 0) {
        return;
    }

    let reachTop = false;
    let reachBottom = false;
    if (scrolly < titles[0].offsetTop) {
       reachTop = true;
    } else if ((window.innerHeight + scrolly) >= document.body.offsetHeight - 30) { // minus 30 for stability
        reachBottom = true;
    }
    
    for (let i = 0; i < titles.length - 1; i++) {
        let bullet = bullets[i];                 
        let title = titles[i];
        let nextTitle = titles[i + 1];
        if (i == 0 && reachTop || 
            scrolly >= (title.offsetTop - 10) && scrolly < (nextTitle.offsetTop - 10) && !reachBottom) { // minus 10 for stability
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