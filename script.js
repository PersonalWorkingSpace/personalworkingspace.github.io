import { colorCode } from './module/colorization.js';
import { NumberToMonth, Pages, Categories, Tags } from './module/statistic.js';

window.onload = function() {
    // updateCategory();
    // updateTag();
    updateAgenda();
    registerAgendaToggleEvent();
    // updateReadProgress();
}

window.addEventListener('scroll', function() {
    // updateReadProgress();
})

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