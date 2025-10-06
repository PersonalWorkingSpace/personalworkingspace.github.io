import { categoryName } from './projection.js';
import { Posts, Categories, Tags } from '../module/post-info.js';
import { Init, WinURL, CreateAnchor, CreateColorfulButton, RegisterNavToggleEvent, RegisterImageClickEvent } from './common.js';


window.onload = function() {
    Init();
    GetProperty();
    setCategory();
    setTags();
    adjustAgendaPosistion();
    setAgenda();
    updateReadProgress();
    setCategoryArticles();
    setTagArticles();
    setCodeBlock();
    RegisterNavToggleEvent();
    RegisterImageClickEvent();
}

window.addEventListener('scroll', function() {
    updateReadProgress();
})

window.addEventListener('resize', function() {
    adjustAgendaPosistion();
})

const NUM_CATEGORY_ARTICLE = 7;
const NUM_TAG_ARTICLE = 5;

var category;
var tagArray;

function GetProperty() {
    category = WinURL["path"].split("category/")[1].split("/")[0];
    let tags = document.querySelector('meta[name="keywords"]').content;
    tagArray = [];
    tags.split(",").forEach((t) => { tagArray.push(t.trim()); });
}

function getTitles() {
    let sectionTitles = Array.from(document.getElementsByClassName("L1-section-title"));
    return sectionTitles;
}

// Set category bar
function setCategory() {
    let bar = document.getElementById("category-bar");
    let button = CreateColorfulButton(categoryName[category], category, `${WinURL["origin"]}/entrypoint/categories.html?category=${category}`);
    bar.appendChild(button);
}

// Set tag bar
function setTags() {
    let bar = document.getElementById("tag-bar");

    for (let i = 0; i < tagArray.length; i++) {
        let tag = tagArray[i]
        let button = CreateColorfulButton(tag, tag, `${WinURL["origin"]}/entrypoint/tags.html?tag=${tag}`);
        bar.appendChild(button);
    }
}

function adjustAgendaPosistion() {
    let agenda = document.getElementById("agenda-wrapper");
    let intro = document.querySelector(".L1-section");
    let leftRegion = document.getElementById("left-area");

    if (window.matchMedia("(max-width: 1000px)").matches) {
        intro.insertAdjacentElement("afterend", agenda);
    } else {
        leftRegion.appendChild(agenda);
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
    let button = CreateColorfulButton(`${categoryName[category]} (${categoryPosts["name"].length})`, category, `${WinURL["origin"]}/entrypoint/categories.html?category=${category}`);
    title.appendChild(button);

    let related = document.getElementById("same-category-list");

    let len = categoryPosts["postID"].length;
    for (let i = upper - 1; i >= lower; i--) {
        let post = Posts[categoryPosts["postID"][i]];
        let li = document.createElement("li");
        let a = CreateAnchor(`Day${len - i} - ${post["title"]}`, `${WinURL["origin"]}/${post["file"]}`);

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

        if (tagPosts["name"].length == 1) {
            continue;
        }

        let title = document.createElement("h1");
        let icon = document.createElement("img");
        title.setAttribute("class", "tag-title");
        icon.setAttribute("src", "../../image/TAG-ICON.png");
        icon.setAttribute("class", "inline-icon");
        title.appendChild(icon);

        let button = CreateColorfulButton(`${tag} (${tagPosts["name"].length})`, tag, `${WinURL["origin"]}/entrypoint/tags.html?tag=${tag}`);
        title.appendChild(button);

        let tagRegion = document.getElementById("tag-wrapper");

        tagRegion.appendChild(title);
        tagRegion.appendChild(document.createElement("hr"));

        let tagList = document.createElement("ul");
        tagList.setAttribute("class", "same-tag-list");
        tagRegion.appendChild(tagList);
        tagRegion.appendChild(document.createElement("br"));

        let maxDisplay = Math.min(tagPosts["name"].length, NUM_TAG_ARTICLE + 1); // plus 1 to exclude post itself
        let uniqueIdx = new Set([idx]);
        while (uniqueIdx.size < maxDisplay) {
            let i = Math.floor(Math.random() * tagPosts["name"].length);

            if (uniqueIdx.has(i) == false) {
                uniqueIdx.add(i);
                let post = Posts[tagPosts["postID"][i]];
                let li = document.createElement("li");
                let a = CreateAnchor(`${post["title"]}`, `${WinURL["origin"]}/${post["file"]}`);
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
            bullet.setAttribute("class", "focus-section");
        } else {
            bullet.setAttribute("class", "non-focus-section");
        }
    }

    let lastTitle = titles[titles.length - 1];
    let lastBullet = bullets[titles.length - 1];
    if (scrolly >= lastTitle.offsetTop || reachBottom) {
        lastBullet.setAttribute("class", "focus-section");
    } else {
        lastBullet.setAttribute("class", "non-focus-section");
    }
}

/* add language title and copy button for code block */
function setCodeBlock() {
    const codes = document.querySelectorAll('code:not(.inline):not(.prop)');

    codes.forEach(code => {
        let codebar = document.createElement("div");
        codebar.setAttribute("class", "code-bar");

        let langTitle = document.createElement("h4");
        langTitle.textContent = code.classList[0].toUpperCase();

        let copyButton = document.createElement("button");
        copyButton.textContent = "Copy"
        copyButton.addEventListener("click", () => {
            navigator.clipboard.writeText(code.textContent);
            const originalText = copyButton.textContent;
            copyButton.textContent = "✓ Copied";
            copyButton.classList.add("checked");
            setTimeout(() => {
                copyButton.textContent = originalText;
                copyButton.classList.remove("checked");
            }, 900);
        });

        codebar.appendChild(langTitle);
        codebar.appendChild(copyButton);
        code.insertAdjacentElement("beforebegin", codebar);
    });
}