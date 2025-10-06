import { categoryName } from './projection.js';
import { Posts, Categories, Tags } from './post-info.js';
import { NumberToMonth, WinURL, Init, UpdatePosts, CreateAnchor, CreateColorfulButton, RegisterNavToggleEvent } from './common.js';

window.onload = function() {
    Init();
    UpdatePosts(Posts, false);
    updateTimeline();
    updateCategory();
    updateTag();
    registerTimelineToggleEvent();
    RegisterNavToggleEvent();
}

// Generate category
function updateCategory() {
    let container = document.getElementById("category-list");
    for (const [cg, listOfPosts] of Object.entries(Categories)) {
        let button = CreateColorfulButton(`${categoryName[cg]} (${listOfPosts["name"].length})`, cg, `${WinURL["origin"]}/entrypoint/categories.html?category=${cg}`);
        container.appendChild(button);
    }
}

// Generate tag
function updateTag() {
    let container = document.getElementById("tag-list");
    for (const [tag, listOfPosts] of Object.entries(Tags)) {
        let button = CreateColorfulButton(`${tag} (${listOfPosts["name"].length})`, tag, `${WinURL["origin"]}/entrypoint/tags.html?tag=${tag}`);
        container.appendChild(button);
    }
}

// Generate timeline: articles published in past twelve months
function updateTimeline() {
    let timeline = document.getElementById("timeline");
    let now = new Date();
    let month = now.getMonth() + 1; // January gives 0
    let year = now.getFullYear();
    let selectMonth = -1;
    let toggle;

    for (let i = 0; i < Posts.length; i++) {
        let post = Posts[i];
        let created = new Date(post["created"]);
        let postYear = created.getFullYear();
        let postMonth = created.getMonth() + 1;

        if ((year - postYear) * 12 + (month - postMonth) > 12) {
            break;
        }

        if (postMonth != selectMonth) {
            selectMonth = postMonth;
            let state = "collapsed";
            let symbol = "▶";
            if (i == 0) {
                state = "expanded";
                symbol = "▽";
            }

            let key = `${symbol} ${postYear} ${NumberToMonth[postMonth]}`;
            toggle = createToggle(key, state);
            timeline.appendChild(toggle);
        }

        let toggleContainer = toggle.childNodes[1];
        let anchor = CreateAnchor(post["title"], `${WinURL["origin"]}/${post["file"]}`);
        toggleContainer.appendChild(anchor);
    }
}


function createToggle(title, state) {
    let toggle = document.createElement("li");
    let header = document.createElement("h1");
    let container = document.createElement("div");
    header.setAttribute("class", "toggleTitle");
    container.setAttribute("class", "toggleContainer");

    header.textContent = title;
    toggle.setAttribute("class", state);
    toggle.appendChild(header);
    toggle.appendChild(container);
    return toggle;
}

// register toggle event for timeline
function registerTimelineToggleEvent() {
    let toggles = document.querySelectorAll("#timeline li .toggleTitle");

    for (let i = 0; i < toggles.length; i++) {
        let toggle = toggles[i];
        toggle.addEventListener(
            "click", () => {
                let clickedToggle = toggle.parentElement;
                let toggles = document.querySelectorAll("#timeline li");
                for (let i = 0; i < toggles.length; i++) {
                    let toggle = toggles[i];
                    let h1 = toggle.childNodes[0];

                    if (toggle == clickedToggle) {
                        toggle.setAttribute("class", "expanded");
                        h1.innerHTML = h1.innerHTML.replace("▶", "▽");
                    } else {
                        toggle.setAttribute("class", "collapsed");
                        h1.innerHTML = h1.innerHTML.replace("▽", "▶");
                    }
                }
            }
        );
    }
}