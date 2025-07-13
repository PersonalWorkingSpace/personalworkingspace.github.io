import { categoryName } from './module/projection.js';
import { Posts, Categories, Tags } from './module/post-info.js';
import { NumberToMonth, WinURL, Init, UpdatePosts, CreateAnchor, CreateColorfulButton } from './module/common.js';

window.onload = function() {
    Init();
    UpdatePosts(Posts, false);
    updateTimeline();
    updateCategory();
    updateTag();
    registerTimelineToggleEvent();
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
    let toggleList;

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
            toggleList = createToggle(key, state);
            timeline.appendChild(toggleList);
        }

        let ul = toggleList.childNodes[1];
        let newNode = document.createElement("li");
        let anchor = CreateAnchor(post["title"], `${WinURL["origin"]}/${post["file"]}`);
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