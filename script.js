import { colorCode, categoryName } from './module/projection.js';
import { Pages, Categories, Tags } from './module/subpageInfo.js';
import { NumberToMonth, WinURL, Init, UpdatePosts, CreateAnchor } from './module/common.js';

window.onload = function() {
    Init();
    UpdatePosts(Pages, false);
    updateTimeline();
    updateCategory();
    updateTag();
    registerTimelineToggleEvent();
}

// Generate category
function updateCategory() {
    let container = document.getElementById("category-list");
    for (const [cg, listOfPages] of Object.entries(Categories)) {
        let anchor = CreateAnchor(`${categoryName[cg]} (${listOfPages["name"].length})`, `${WinURL["origin"]}/entrypoint/categories.html?category=${cg}`);
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
        let anchor = CreateAnchor(`${tag} (${listOfPages["name"].length})`, `${WinURL["origin"]}/entrypoint/tags.html?tag=${tag}`);
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

// Generate timeline: articles published in past twelve months
function updateTimeline() {
    let timeline = document.getElementById("timeline");
    let now = new Date();
    let month = now.getMonth() + 1; // January gives 0
    let year = now.getFullYear();
    let selectMonth = -1;
    let toggleList;

    for (let i = 0; i < Pages.length; i++) {
        let page = Pages[i];
        let created = new Date(page["created"]);
        let pageYear = created.getFullYear();
        let pageMonth = created.getMonth() + 1;

        if ((year - pageYear) * 12 + (month - pageMonth) > 12) {
            break;
        }

        if (pageMonth != selectMonth) {
            selectMonth = pageMonth;
            let state = "collapsed";
            let symbol = "▶";
            if (i == 0) {
                state = "expanded";
                symbol = "▽";
            }

            let key = `${symbol} ${pageYear} ${NumberToMonth[pageMonth]}`;
            toggleList = createToggle(key, state);
            timeline.appendChild(toggleList);
        }

        let ul = toggleList.childNodes[1];
        let newNode = document.createElement("li");
        let anchor = CreateAnchor(page["title"], `${WinURL["origin"]}/${page["file"]}`);
        newNode.appendChild(anchor);
        ul.appendChild(newNode);
    }
}


function createToggle(title, state) {
    let toggleList = document.createElement("li");
    let header = document.createElement("h1");
    let member = document.createElement("ul");
    header.setAttribute("class", "toggleTitle");
    member.setAttribute("class", "toggleMemberBullet");

    header.innerText = title;
    toggleList.setAttribute("class", state);
    toggleList.appendChild(header);
    toggleList.appendChild(member);
    return toggleList;
}

// register toggle event for timeline
function registerTimelineToggleEvent() {
    let toggles = document.querySelectorAll("#timeline .toggleTitle");

    for (let i = 0; i < toggles.length; i++) {
        let toggle = toggles[i];
        toggle.addEventListener(
            "click", (event) => {
                let clickedTC = event.target.parentElement;
                let toggleContainers = document.querySelectorAll("#timeline li");
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