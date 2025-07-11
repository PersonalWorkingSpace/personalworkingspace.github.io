import { colorCode } from './colorization.js';
import { Pages, Categories, Tags } from '../module/subpageInfo.js';
import { Init, CreateAnchor, WinURL } from '../module/common.js';


window.onload = function() {
    Init();
    GetProperty();
    setCategory();
    setTags();
    setAgenda();
    updateReadProgress();
    setCategoryArticles();
    setTagArticles();
}

window.addEventListener('scroll', function() {
    updateReadProgress();
})

const NUM_CATEGORY_ARTICLE = 7;

var category;
var tagArray;

function GetProperty() {
    category = WinURL["path"].split("category/")[1].split("/")[0];
    let tags = document.querySelector('meta[name="keywords"]').content;
    tagArray = [];
    tags.split(",").forEach((t) => { tagArray.push(t.trim()); });
}

function getTitles() {
    let postTitles = Array.from(document.getElementsByClassName("post-title"));
    let sectionTitles = Array.from(document.getElementsByClassName("L1-section-title"));
    return postTitles.concat(sectionTitles);
}

// Set category bar
function setCategory() {
    let bar = document.getElementById("category-bar");
    let anchor = CreateAnchor(category, `${WinURL["origin"]}/entrypoint/categories.html?category=${category}`);
    anchor.setAttribute("class", "tag");
    anchor.style.color = colorCode[category]["font"];
    anchor.style.backgroundColor = colorCode[category]["bg"];
    bar.appendChild(anchor);
}

// Set tag bar
function setTags() {
    let bar = document.getElementById("tag-bar");

    for (let i = 0; i < tagArray.length; i++) {
        let tag = tagArray[i]
        let anchor = CreateAnchor(tag, `${WinURL["origin"]}/entrypoint/tags.html?tag=${tag}`);
        anchor.setAttribute("class", "tag");
        anchor.style.color = colorCode[tag]["font"];
        anchor.style.backgroundColor = colorCode[tag]["bg"];
        bar.appendChild(anchor);
    }
}

// Set agenda
function setAgenda() {
    let agenda = document.getElementById("agenda");

    let titles = getTitles();
    for (let i = 0; i < titles.length; i++) {
        let title = titles[i];
        let newNode = document.createElement("li");
        let anchor = CreateAnchor(title.innerHTML, "#" + title.innerHTML);

        title.setAttribute("id", title.innerHTML);
        newNode.appendChild(anchor);
        agenda.appendChild(newNode);
    }
}

// Display articles from the same category
function setCategoryArticles() {
    let categoryPosts = Categories[category];
    let idx = categoryPosts["name"].indexOf(WinURL["file"]);

    if (idx == -1) {
        console.log(`Failed to "${WinURL["file"]}" find the file in "${category}" category list`);
        return;
    }

    let lower = Math.max(0, idx - Math.floor(NUM_CATEGORY_ARTICLE / 2));
    let upper = Math.min(categoryPosts["name"].length, lower + NUM_CATEGORY_ARTICLE);

    let title = document.getElementById("category-title");
    let anchor = CreateAnchor(category, `${WinURL["origin"]}/entrypoint/categories.html?category=${category}`);
    anchor.setAttribute("class", "tag");
    anchor.style.color = colorCode[category]["font"];
    anchor.style.backgroundColor = colorCode[category]["bg"];

    title.appendChild(anchor);

    let related = document.getElementById("same-category-list");
    related.setAttribute("class", "related-article");

    let len = categoryPosts["pageID"].length;
    for (let i = upper - 1; i >= lower; i--) {
        let page = Pages[categoryPosts["pageID"][i]];
        let li = document.createElement("li");
        let a = CreateAnchor(`Day${len - i} - ${page["title"]}`, `${WinURL["origin"]}/${page["file"]}`);

        if (i == idx) {
            a.setAttribute("class", "this-article");
        }

        li.appendChild(a);
        related.appendChild(li);
    }
}


// Display articles from the same tags
function setTagArticles() {

    for (let i = 0; i < tagArray.length; i++) {
        let tag = tagArray[i];
        let tagPosts = Tags[tag];
        let idx = tagPosts["name"].indexOf(WinURL["file"]);

        if (idx == -1) {
            console.log(`Failed to "${WinURL["file"]}" find the file in "${tag}" tag list`);
            return;
        }

        let lower = Math.max(0, idx - Math.floor(NUM_CATEGORY_ARTICLE / 2));
        let upper = Math.min(tagPosts["name"].length, lower + NUM_CATEGORY_ARTICLE);

        if (lower == upper - 1) {
            continue;
        }

        let title = document.createElement("h1");
        let icon = document.createElement("img");
        title.setAttribute("class", "tag-title");
        icon.setAttribute("src", "../../image/TAG-ICON.png");
        icon.setAttribute("class", "inline-icon");
        title.appendChild(icon);

        let anchor = CreateAnchor(tag, `${WinURL["origin"]}/entrypoint/tags.html?tag=${tag}`);
        anchor.setAttribute("class", "tag");
        anchor.style.color = colorCode[tag]["font"];
        anchor.style.backgroundColor = colorCode[tag]["bg"];
        title.appendChild(anchor);

        let tagRegion = document.getElementById("tag-wrapper");

        tagRegion.appendChild(title);
        tagRegion.appendChild(document.createElement("hr"));

        let tagList = document.createElement("ul");
        tagList.setAttribute("class", "same-tag-list");
        tagRegion.appendChild(tagList);

        for (let i = upper - 1; i >= lower; i--) {
            if (i != idx) {
                let page = Pages[tagPosts["pageID"][i]];
                let li = document.createElement("li");
                let a = CreateAnchor(`${page["title"]}`, `${WinURL["origin"]}/${page["file"]}`);
                li.appendChild(a);
                tagList.appendChild(li);
            }
        }
    }
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