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
        let post = posts[i];
        let anchor = CreateAnchor("", `${WinURL["origin"]}/${post["file"]}`);
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
            postTitle.innerHTML = `Day${i+1} - ${post["title"]}`;
        } else {
            postTitle.innerHTML = post["title"];
        }

        let description = document.createElement("p");
        description.setAttribute("class", "post-description");
        description.innerHTML = post["description"];

        let postMeta = getPostMeta(post);
        postMeta.setAttribute("class", "post-meta");

        leftPart.appendChild(postTitle);
        leftPart.appendChild(description);
        leftPart.appendChild(postMeta);

        let thumbnail = getPostThumbnail(post["thumbnail"]);

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
        button.textContent = text;
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

function RegisterNavToggleEvent() {
    let menu = document.getElementById("hamburger");
    let siteNav = document.getElementById("site-nav");

    menu.addEventListener(
        "click", () => {
            siteNav.classList.toggle('open');
        }
    );

    // close nav when click any place on the screen
    document.addEventListener('click', (event) => {
        const isClickInsideMenu = siteNav.contains(event.target) || menu.contains(event.target);
        if (!isClickInsideMenu) {
            siteNav.classList.remove("open");
        }
    });

    // when the burger is hidden, open classes will be removed
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1000) {
            siteNav.classList.remove('open');
        }
    });
}

function RegisterImageClickEvent() {
    let images = document.querySelectorAll("img");
    let validImages = [];

    images.forEach(function(image, index) {
        if (image.getAttribute("id") != "cover" && image.getAttribute("class") != "content-img") {
            return;
        }
        validImages.push(image);
    })

    validImages.forEach(function(image, index) {
        image.addEventListener(
            "click", () => {
                let indexLabel = document.createElement("span");
                indexLabel.setAttribute("class", "lightbox-index");
                indexLabel.textContent = `${index+1} / ${validImages.length}`

                let closeBtn = document.createElement("span");
                closeBtn.setAttribute("class", "close-btn");
                closeBtn.innerHTML = "&times;"

                let displayBar = document.createElement("div");
                displayBar.setAttribute("class", "lightbox-displaybar");
                displayBar.appendChild(indexLabel);
                displayBar.appendChild(closeBtn);

                let img = document.createElement("img");
                img.setAttribute("class", "lightbox-img");
                img.setAttribute("src", image.src);
                img.setAttribute("alt", image.alt);

                let prevBtn = document.createElement("span");
                prevBtn.setAttribute("class", "lightbox-btn prev");
                prevBtn.textContent = "←";

                let nextBtn = document.createElement("span");
                nextBtn.setAttribute("class", "lightbox-btn next");
                nextBtn.textContent = "→";

                let contentRegion = document.createElement("div");
                contentRegion.setAttribute("class", "lightbox-content");
                contentRegion.appendChild(prevBtn);
                contentRegion.appendChild(img);
                contentRegion.appendChild(nextBtn);

                let lightbox = document.createElement("div");
                lightbox.setAttribute("class", "lightbox");
                lightbox.addEventListener('click', (event) => {
                    switch (event.target.getAttribute("class")) {
                        case "lightbox-img":
                            break;
                        case "lightbox-btn prev":
                            validImages[(index + validImages.length - 1) % validImages.length].click();
                            lightbox.remove();
                            break;
                        case "lightbox-btn next":
                            validImages[(index + 1) % validImages.length].click();
                            lightbox.remove();
                            break;
                        default:
                            lightbox.remove();
                            break;
                    };
                });
                lightbox.appendChild(displayBar);
                lightbox.appendChild(contentRegion);
                document.body.appendChild(lightbox);
            }
        );
    });
}

export { NumberToMonth, WinURL, Init, UpdatePosts, CreateAnchor, CreateColorfulButton, RegisterNavToggleEvent, RegisterImageClickEvent };