import { colorCode } from './module/colorization.js';
import { NumberToMonth, Pages, Categories, Tags } from './module/statistic.js';

window.onload = function() {
    updateCategory();
    updateTag();
    updateAgenda();
    registerAgendaToggleEvent();
}

window.addEventListener('scroll', function() {
    // updateReadProgress();
})

// Generate category
function updateCategory() {
    let container = document.getElementById("category-list");
    for (const [cg, listOfPages] of Object.entries(Categories)) {
        let anchor = createAnchor(`${cg} (${listOfPages.length})`, "#");
        anchor.setAttribute("class", "tag");
        anchor.style.color = colorCode[cg]["font"];
        anchor.style.backgroundColor = colorCode[cg]["bg"];
        if (container.childNodes.length > 0) {
            let textNode = document.createTextNode(" ");
            container.appendChild(textNode);
        }
        container.appendChild(anchor);
    }
}

// Generate tag
function updateTag() {
    let container = document.getElementById("tag-list");
    for (const [tag, listOfPages] of Object.entries(Tags)) {
        let anchor = createAnchor(`${tag} (${listOfPages.length})`, "#");
        anchor.setAttribute("class", "tag");
        anchor.style.color = colorCode[tag]["font"];
        anchor.style.backgroundColor = colorCode[tag]["bg"];
        if (container.childNodes.length > 0) {
            let textNode = document.createTextNode(" ");
            container.appendChild(textNode);
        }
        container.appendChild(anchor);
    }
}

// Generate agenda: articles published in past twelve months
function updateAgenda() {
    let agenda = document.getElementById("agenda");
    let now = new Date();
    let month = now.getMonth() + 1; // January gives 0
    let year = now.getFullYear();
    let selectMonth = -1;
    let toggleList;

    let url = decodeURIComponent(window.location.href);
    url = url.replace("/index.html", ""); // for local test

    for (let i = 0; i < Pages.length; i++) {
        let page = Pages[i];
        let pageYear = page["created"].getFullYear();
        let pageMonth = page["created"].getMonth() + 1;

        if ((year - pageYear) * 12 + (month - pageMonth) > 12) {
            break;
        }
        
        if (pageMonth != selectMonth) {
            selectMonth = pageMonth;
            let newNode = document.createElement("li");
            let symbol = "▶";
            let state = "collapsed";
            if (i == 0) {
                symbol = "▽";
                state = "expanded";
            }

            let key = `${symbol} ${pageYear} ${NumberToMonth[pageMonth]}`;
            toggleList = createToggle(key, state);
            newNode.appendChild(toggleList);
            agenda.appendChild(newNode);
        }

        let ol = toggleList.childNodes[1];
        let newNode = document.createElement("li");
        let anchor = createAnchor(page["title"], `${url}/category/${page["category"]}/${page["title"]}.html`); 
        newNode.appendChild(anchor);
        ol.appendChild(newNode);
    }
}

function createAnchor(text, link) {
    let anchor = document.createElement("a");
    anchor.innerText = text;
    anchor.setAttribute("href", link);
    return anchor;
}

function createToggle(title, state) {
    let toggleList = document.createElement("div");
    let header = document.createElement("h1");
    let member = document.createElement("ol");
    header.setAttribute("class", "toggleTitle");
    member.setAttribute("class", "toggleMemberBullet");

    header.innerText = title;
    toggleList.setAttribute("class", state);
    toggleList.appendChild(header);
    toggleList.appendChild(member);
    return toggleList;
}

// register toggle event for timeline
function registerAgendaToggleEvent() {
    let toggles = document.querySelectorAll("#agenda .toggleTitle");
    
    for (let i = 0; i < toggles.length; i++) {
        let toggle = toggles[i];
        toggle.addEventListener(
            "click", (event) => {
                let clickedTC = event.target.parentElement;
                let toggleContainers = document.querySelectorAll("#agenda li div");
                console.log(clickedTC);
                for (let i = 0; i < toggleContainers.length; i++) {
                    let tc = toggleContainers[i];
                    let h1 = tc.childNodes[0];
                    
                    if (tc == clickedTC) {
                        tc.setAttribute("class", "expanded");
                        h1.innerHTML = h1.innerHTML.replace("▶", "▽");
                    } else {
                        tc.setAttribute("class", "collapsed");
                        h1.innerHTML = h1.innerHTML.replace("▽", "▶");
                    }
                }
            }
        );
    }
}