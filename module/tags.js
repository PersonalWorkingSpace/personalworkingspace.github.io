import { colorCode } from '../module/colorization.js';
import { Pages, Tags } from '../module/subpageInfo.js';
import { Init, UpdatePosts, CreateAnchor } from '../module/common.js';

window.onload = function() {
    Init();
    updateTag();
    registerTagToggleEvent();
    UpdatePosts(fetchPosts(), false);
}

function fetchPosts() {
    let selectedCG = document.querySelector("#tag-list #selected-tag");
    let tag = selectedCG.innerText.split(" ")[0];
    let pageID = Tags[tag]["pageID"];

    let posts = [];
    for (let i = pageID.length - 1; i >= 0; i--) {
        posts.push(Pages[pageID[i]]);
    }

    return posts;
}

// Generate tag
function updateTag() {
    let container = document.getElementById("tag-list");
    let tagList = Object.entries(Tags);
    tagList.sort(function(a, b) {
        return b[1]["name"].length - a[1]["name"].length;
    })

    const urlParams = new URLSearchParams(window.location.search);
    const selectedTag = urlParams.get('tag');

    for (const [tag, listOfPages] of tagList) {
        let anchor = CreateAnchor(`${tag} (${listOfPages["name"].length})`, "#");
        anchor.style.color = colorCode[tag]["font"];
        anchor.style.backgroundColor = colorCode[tag]["bg"];
        anchor.setAttribute("class", "tag");

        if (tag == selectedTag || selectedTag == null && container.childNodes.length == 0) {
            anchor.setAttribute("id", "selected-tag");
        }

        if (container.childNodes.length > 0) {
            let textNode = document.createTextNode(" ");
            container.appendChild(textNode);
        }
        container.appendChild(anchor);
    }
}

function registerTagToggleEvent() {
    let toggles = document.querySelectorAll("#tag-list .tag");
    for (let i = 0; i < toggles.length; i++) {
        let toggle = toggles[i];
        toggle.addEventListener(
            "click", (event) => {
                let selectedCG = document.querySelector("#tag-list #selected-tag");
                selectedCG.removeAttribute("id");
                toggle.setAttribute("id", "selected-tag");
                UpdatePosts(fetchPosts(), false);
            }
        );
    }
}