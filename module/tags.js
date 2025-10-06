import { Posts, Tags } from '../module/post-info.js';
import { Init, UpdatePosts, CreateColorfulButton, RegisterNavToggleEvent } from '../module/common.js';

window.onload = function() {
    Init();
    updateTag();
    registerTagToggleEvent();
    registerTagSelectEvent();
    RegisterNavToggleEvent();
    UpdatePosts(fetchPosts(), false);
}

function fetchPosts() {
    let selectedCG = document.querySelector("#tag-list #selected-tag");
    let tag = selectedCG.dataset.tag;

    let postID = Tags[tag]["postID"];
    let posts = [];
    for (let i = postID.length - 1; i >= 0; i--) {
        posts.push(Posts[postID[i]]);
    }

    return posts;
}

// Generate tag
function updateTag() {
    let container = document.getElementById("tag-list");
    let selector = document.getElementById("tag-select");
    let tagList = Object.entries(Tags);
    tagList.sort(function(a, b) {
        return b[1]["name"].length - a[1]["name"].length;
    })

    const urlParams = new URLSearchParams(window.location.search);
    const selectedTag = urlParams.get('tag');

    for (const [tag, listOfPosts] of tagList) {
        let display = `${tag} (${listOfPosts["name"].length})`;

        let option = document.createElement("option");
        option.value = tag;
        option.textContent = display;
        selector.appendChild(option);

        let button = CreateColorfulButton(display, tag);
        button.setAttribute("data-tag", tag);

        if (tag == selectedTag || selectedTag == null && container.childNodes.length == 0) {
            button.setAttribute("id", "selected-tag");
            selector.value = tag;
        }

        container.appendChild(button);
    }
}

function registerTagToggleEvent() {
    let toggles = document.querySelectorAll("#tag-list .tag");
    for (let i = 0; i < toggles.length; i++) {
        let toggle = toggles[i];
        toggle.addEventListener(
            "click", () => {
                let selectedCG = document.querySelector("#tag-list #selected-tag");
                let selector = document.getElementById("tag-select");
                selectedCG.removeAttribute("id");
                selector.value = toggle.dataset.tag;
                toggle.setAttribute("id", "selected-tag");
                UpdatePosts(fetchPosts(), false);
            }
        );
    }
}

function registerTagSelectEvent() {
    let selector = document.getElementById("tag-select");
    selector.addEventListener(
        "change", (event) => {
            let selectedCG = document.querySelector("#tag-list #selected-tag");
            let selectedToggle = document.querySelector(`[data-tag='${event.target.value}']`);
            selectedCG.removeAttribute("id");
            selectedToggle.setAttribute("id", "selected-tag");
            UpdatePosts(fetchPosts(), true);
        }
    );
}