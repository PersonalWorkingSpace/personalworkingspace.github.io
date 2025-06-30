import { colorCode } from './colorization.js';
import { Pages, Categories, Tags } from '../module/subpageInfo.js';

window.onload = function() {
    init();
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

var g_url;
var g_origin;
var g_path;
var g_file;
var g_category;
var g_tags;

function init() {
    g_url = decodeURIComponent(window.location.href);
    g_origin = decodeURIComponent(new URL(g_url).origin)
    g_path = decodeURIComponent(new URL(g_url).pathname.slice(1));
    g_file = g_path.split('/').pop().replace('.html', '');
    g_category = g_url.split("/category/")[1].split("/")[0];

    let tags = document.querySelector('meta[name="keywords"]').content;
    g_tags = [];
    tags.split(",").forEach((t) => { g_tags.push(t.trim()); });
}

function getTitles() {
    let postTitles = Array.from(document.getElementsByClassName("post-title"));
    let sectionTitles = Array.from(document.getElementsByClassName("L1-section-title"));
    return postTitles.concat(sectionTitles);
}

// Set category bar
function setCategory() {
    let bar = document.getElementById("category-bar");
    let anchor = createAnchor(g_category, "#");
    anchor.setAttribute("class", "tag");
    anchor.style.color = colorCode[g_category]["font"];
    anchor.style.backgroundColor = colorCode[g_category]["bg"];
    bar.appendChild(anchor);
}

// Set tag bar
function setTags() {
    let bar = document.getElementById("tag-bar");

    for (let i = 0; i < g_tags.length; i++) {
        let tag = g_tags[i]
        let anchor = createAnchor(tag, "#");
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

// Display articles from the same category
function setCategoryArticles() {
    let category = Categories[g_category];
    let idx = category["name"].indexOf(g_file);

    if (idx == -1) {
        console.log(`Failed to "${g_file}" find the file in "${g_category}" category list`);
        return;
    }

    let lower = Math.max(0, idx - Math.floor(NUM_CATEGORY_ARTICLE / 2));
    let upper = Math.min(category["name"].length, lower + NUM_CATEGORY_ARTICLE);

    let title = document.getElementById("category-title");
    let anchor = createAnchor(g_category, "#");
    anchor.setAttribute("class", "tag");
    anchor.style.color = colorCode[g_category]["font"];
    anchor.style.backgroundColor = colorCode[g_category]["bg"];

    title.appendChild(anchor);

    let related = document.getElementById("same-category-list");
    related.setAttribute("class", "related-article");

    for (let i = lower; i < upper; i++) {
        let page = Pages[category["pageID"][i]];
        let li = document.createElement("li");
        let a = createAnchor(`Day${i+1} - ${page["title"]}`, `${g_origin}/${page["file"]}`);

        if (i == idx) {
            a.setAttribute("class", "this-article");
        }

        li.appendChild(a);
        related.appendChild(li);
    }
}


// Display articles from the same tags
function setTagArticles() {

    for (let i = 0; i < g_tags.length; i++) {
        let tag = Tags[g_tags[i]];
        let tag_name = g_tags[i];
        let idx = tag["name"].indexOf(g_file);

        if (idx == -1) {
            console.log(`Failed to "${g_file}" find the file in "${tag_name}" category list`);
            return;
        }

        let lower = Math.max(0, idx - Math.floor(NUM_CATEGORY_ARTICLE / 2));
        let upper = Math.min(tag["name"].length, lower + NUM_CATEGORY_ARTICLE);

        if (lower == upper - 1) {
            continue;
        }

        let title = document.createElement("h1");
        let icon = document.createElement("img");
        title.setAttribute("class", "tag-title");
        icon.setAttribute("src", "../../image/TAG-ICON.png");
        icon.setAttribute("class", "inline-icon");
        title.appendChild(icon);

        let anchor = createAnchor(tag_name, "#");
        anchor.setAttribute("class", "tag");
        anchor.style.color = colorCode[tag_name]["font"];
        anchor.style.backgroundColor = colorCode[tag_name]["bg"];
        title.appendChild(anchor);

        let tagRegion = document.getElementById("tag-wrapper");

        tagRegion.appendChild(title);
        tagRegion.appendChild(document.createElement("hr"));

        let tagList = document.createElement("ul");
        tagList.setAttribute("class", "same-tag-list");
        tagRegion.appendChild(tagList);

        for (let i = lower; i < upper; i++) {
            if (i != idx) {
                let page = Pages[tag["pageID"][i]];
                let li = document.createElement("li");
                let a = createAnchor(`${page["title"]}`, `${g_origin}/${page["file"]}`);
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