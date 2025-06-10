import { colorCode } from './module/colorization.js';
import { Pages, Categories, Tags } from './module/subpageInfo.js';
import { NumberToMonth } from './module/common.js';

window.onload = function() {
    updatePosts();
    updateAgenda();
    updateCategory();
    updateTag();
    registerAgendaToggleEvent();
}

window.addEventListener('scroll', function() {
    // updateReadProgress();
})

function updatePosts() {
    let container = document.getElementById("main-content");
    let url = decodeURIComponent(window.location.href);
    url = url.replace("/index.html", "/"); // for local test

    for (let i = 0; i < Pages.length; i++) {
        let page = Pages[i];
        let anchor = createAnchor("", `${url}category/${page["category"]}/${page["title"]}.html`);
        anchor.setAttribute("class", "post");

        /* post
            post-title   |
            description  |    img
            post-meta    |
        */

        let leftPart = document.createElement("div");
        leftPart.setAttribute("class", "left-part");
        let postTitle = document.createElement("h1");
        postTitle.setAttribute("class", "post-title");
        postTitle.innerHTML = page["title"];

        let description = document.createElement("p");
        description.setAttribute("class", "post-description");
        description.innerHTML = page["description"];

        let postMeta = getPostMeta(page);
        postMeta.setAttribute("class", "post-meta");

        leftPart.appendChild(postTitle);
        leftPart.appendChild(description);
        leftPart.appendChild(postMeta);

        let thumbnail = getPostThumbnail(page["thumbnail"]);

        anchor.appendChild(leftPart);
        anchor.appendChild(thumbnail);
        container.appendChild(anchor);

        if (i != Pages.length - 1) {
            let hr = document.createElement("hr");
            hr.setAttribute("class", "post-hr");
            container.appendChild(hr);
        }
    }
}


function getPostMeta(post) {
    let postMeta = document.createElement("div");
    let created = document.createElement("time");
    let date = new Date(post["created"]);
    
    created.setAttribute("datetime", date);
    created.innerHTML = `${NumberToMonth[date.getMonth() + 1]} ${date.getDate()}, ${date.getFullYear()}`
    postMeta.appendChild(created);

    let textNode = document.createTextNode(`\xa0 |\xa0 category: \xa0`);
    postMeta.appendChild(textNode);
    
    let categoryBar = getPostCategory(post["category"]);
    postMeta.appendChild(categoryBar);

    textNode = document.createTextNode(`\xa0 |\xa0 tags: \xa0`);
    postMeta.appendChild(textNode);

    let tagBar = getPostTag(post["tag"]);
    postMeta.appendChild(tagBar);
    return postMeta;
}

function getPostCategory(category) {
    let bar = document.createElement("span");
    bar.setAttribute("id", "category-bar");

    let anchor = createAnchor(category, "#");
    anchor.setAttribute("class", "tag");
    anchor.style.color = colorCode[category]["font"];
    anchor.style.backgroundColor = colorCode[category]["bg"];
    bar.appendChild(anchor);
    return bar;
}

function getPostTag(tags) {
    let bar = document.createElement("nav");
    bar.setAttribute("id", "tag-bar");
    let taglist = tags.split(",");

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

    return bar;
}

function getPostThumbnail(thumbnail) {
    let thumbnailContainer = document.createElement("div");
    let thumbnailImg = document.createElement("img");
    thumbnailImg.setAttribute("src", thumbnail);
    thumbnailImg.setAttribute("alt", "thumbnail");
    thumbnailContainer.setAttribute("class", "thumbnail-container");
    thumbnailContainer.appendChild(thumbnailImg);
    return thumbnailContainer;
}

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
        let created = new Date(page["created"]);
        let pageYear = created.getFullYear();
        let pageMonth = created.getMonth() + 1;

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
    anchor.innerHTML = text;
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