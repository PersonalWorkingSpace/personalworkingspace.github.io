import { colorCode, categoryName } from './projection.js';

const NumberToMonth = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec"
}


var WinURL = {};

function Init() {
    WinURL["url"] = decodeURIComponent(window.location.href);
    WinURL["origin"] = decodeURIComponent(new URL(WinURL["url"]).origin)
    WinURL["path"] = decodeURIComponent(new URL(WinURL["url"]).pathname.slice(1));
    WinURL["file"] = WinURL["path"].split('/').pop().replace('.html', '');
}


function UpdatePosts(posts, showDayNumber) {
    let container = document.getElementById("main-content");
    container.innerHTML = "";

    for (let i = 0; i < posts.length; i++) {
        let page = posts[i];
        let anchor = CreateAnchor("", `${WinURL["origin"]}/${page["file"]}`);
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

        if (showDayNumber == true) {
            postTitle.innerHTML = `Day${i+1} - ${page["title"]}`;
        } else {
            postTitle.innerHTML = page["title"];
        }

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

        if (i != posts.length - 1) {
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
    categoryICON.setAttribute("src", `${WinURL["origin"]}/image/CATEGORY-ICON.png`);
    categoryICON.setAttribute("class", "inline-icon");
    postMeta.appendChild(categoryICON);

    let categoryBar = getPostCategory(post["category"]);
    postMeta.appendChild(categoryBar);

    let tagICON = document.createElement("img");
    tagICON.setAttribute("src", `${WinURL["origin"]}/image/TAG-ICON.png`);
    tagICON.setAttribute("class", "inline-icon");
    postMeta.appendChild(tagICON);

    let tagBar = getPostTag(post["tag"]);
    postMeta.appendChild(tagBar);
    return postMeta;
}

function getPostCategory(category) {
    let bar = document.createElement("span");
    bar.setAttribute("class", "category-bar");

    let anchor = CreateColorfulButton(categoryName[category], category, `${WinURL["origin"]}/entrypoint/categories.html?category=${category}`);
    bar.appendChild(anchor);
    return bar;
}

function getPostTag(tags) {
    let bar = document.createElement("nav");
    bar.setAttribute("class", "tag-bar");
    let taglist = tags.split(",");

    for (let i = 0; i < taglist.length; i++) {
        let tag = taglist[i].trim();
        let button = CreateColorfulButton(tag, tag, `${WinURL["origin"]}/entrypoint/tags.html?tag=${tag}`);
        bar.appendChild(button);
    }

    return bar;
}

function CreateColorfulButton(text, code, href) {
    let button;
    if (typeof href === "undefined") {
        button = document.createElement("button");
        button.innerText = text;
    } else {
        button = CreateAnchor(text, href);
    }
    button.setAttribute("class", "tag");
    button.style.color = colorCode[code]["font"];
    button.style.backgroundColor = colorCode[code]["bg"];
    return button;
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

function CreateAnchor(text, link) {
    let anchor = document.createElement("a");
    anchor.innerHTML = text;
    anchor.setAttribute("href", link);
    return anchor;
}

export { NumberToMonth, WinURL, Init, UpdatePosts, CreateAnchor, CreateColorfulButton };