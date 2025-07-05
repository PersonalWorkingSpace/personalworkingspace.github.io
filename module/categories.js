import { colorCode } from '../module/colorization.js';
import { Pages, Categories } from '../module/subpageInfo.js';
import { NumberToMonth } from '../module/common.js';

window.onload = function() {
    init();
    updateCategory();
    registerCategoryToggleEvent();
    updatePosts();
}

var g_url;
var g_origin;
var g_path;
var g_file;

function init() {
    g_url = decodeURIComponent(window.location.href);
    g_origin = decodeURIComponent(new URL(g_url).origin)
    g_path = decodeURIComponent(new URL(g_url).pathname.slice(1));
    g_file = g_path.split('/').pop().replace('.html', '');
}

function updatePosts() {
    let container = document.getElementById("main-content");
    container.innerHTML = "";

    let selectedCG = document.querySelector("#category-list #selected-category");
    let cg = selectedCG.innerText.split(" ")[0];
    let pageID = Categories[cg]["pageID"];

    for (let i = 0; i < pageID.length; i++) {
        let page = Pages[pageID[i]];
        let anchor = createAnchor("", `${g_origin}/${page["file"]}`);
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
        postTitle.innerHTML = `Day${i+1} - ${page["title"]}`;

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

        if (i != pageID.length - 1) {
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
    created.innerHTML = `${NumberToMonth[date.getMonth() + 1]} ${date.getDate()}, ${date.getFullYear()} | `
    postMeta.appendChild(created);

    let categoryICON = document.createElement("img");
    categoryICON.setAttribute("src", "../image/CATEGORY-ICON.png");
    categoryICON.setAttribute("class", "inline-icon");
    postMeta.appendChild(categoryICON);

    let categoryBar = getPostCategory(post["category"]);
    postMeta.appendChild(categoryBar);

    let tagICON = document.createElement("img");
    tagICON.setAttribute("src", "../image/TAG-ICON.png");
    tagICON.setAttribute("class", "inline-icon");
    postMeta.appendChild(tagICON);

    let tagBar = getPostTag(post["tag"]);
    postMeta.appendChild(tagBar);
    return postMeta;
}

function getPostCategory(category) {
    let bar = document.createElement("span");
    bar.setAttribute("class", "category-bar");

    let anchor = createAnchor(category, `${g_origin}/entrypoint/categories.html?category=${category}`);
    anchor.setAttribute("class", "tag");
    anchor.style.color = colorCode[category]["font"];
    anchor.style.backgroundColor = colorCode[category]["bg"];
    bar.appendChild(anchor);
    return bar;
}

function getPostTag(tags) {
    let bar = document.createElement("nav");
    bar.setAttribute("class", "tag-bar");
    let taglist = tags.split(",");

    for (let i = 0; i < taglist.length; i++) {
        let tag = taglist[i].trim();
        let anchor = createAnchor(tag, `${g_origin}/entrypoint/tags.html?tag=${tag}`);
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
    let cgList = Object.entries(Categories);
    cgList.sort(function(a, b) {
        return b[1]["name"].length - a[1]["name"].length;
    })

    const urlParams = new URLSearchParams(window.location.search);
    const selectedCG = urlParams.get('category');

    for (const [cg, listOfPages] of cgList) {
        let anchor = createAnchor(`${cg} (${listOfPages["name"].length})`, "#");
        anchor.style.color = colorCode[cg]["font"];
        anchor.style.backgroundColor = colorCode[cg]["bg"];
        anchor.setAttribute("class", "tag");

        if (cg == selectedCG || selectedCG == null && container.childNodes.length == 0) {
            anchor.setAttribute("id", "selected-category");
        }

        if (container.childNodes.length > 0) {
            let textNode = document.createTextNode(" ");
            container.appendChild(textNode);
        }
        container.appendChild(anchor);
    }
}

function registerCategoryToggleEvent() {
    let toggles = document.querySelectorAll("#category-list .tag");
    for (let i = 0; i < toggles.length; i++) {
        let toggle = toggles[i];
        toggle.addEventListener(
            "click", (event) => {
                let selectedCG = document.querySelector("#category-list #selected-category");
                selectedCG.removeAttribute("id");
                toggle.setAttribute("id", "selected-category");
                updatePosts();
            }
        );
    }
}

function createAnchor(text, link) {
    let anchor = document.createElement("a");
    anchor.innerHTML = text;
    anchor.setAttribute("href", link);
    return anchor;
}