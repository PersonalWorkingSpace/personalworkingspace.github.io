import { categoryName } from './projection.js';
import { Posts, Categories } from '../module/post-info.js';
import { Init, UpdatePosts, CreateColorfulButton, RegisterNavToggleEvent } from '../module/common.js';

window.onload = function() {
    Init();
    updateCategory();
    registerCategoryToggleEvent();
    registerCategorySelectEvent();
    RegisterNavToggleEvent();
    UpdatePosts(fetchPosts(), true);
}

function fetchPosts() {
    let selectedCG = document.querySelector("#category-list #selected-category");
    let cg = selectedCG.dataset.category;

    let postID = Categories[cg]["postID"];
    let posts = [];
    for (let i = postID.length - 1; i >= 0; i--) {
        posts.push(Posts[postID[i]]);
    }

    return posts;
}

// Generate category
function updateCategory() {
    let container = document.getElementById("category-list");
    let selector = document.getElementById("category-select");
    let cgList = Object.entries(Categories);
    cgList.sort(function(a, b) {
        return b[1]["name"].length - a[1]["name"].length;
    })

    const urlParams = new URLSearchParams(window.location.search);
    const selectedCG = urlParams.get('category');

    for (const [cg, listOfPosts] of cgList) {
        let display = `${categoryName[cg]} (${listOfPosts["name"].length})`;

        let option = document.createElement("option");
        option.value = cg;
        option.textContent = display;
        selector.appendChild(option);

        let button = CreateColorfulButton(display, cg);
        button.setAttribute("data-category", cg);

        if (cg == selectedCG || selectedCG == null && container.childNodes.length == 0) {
            button.setAttribute("id", "selected-category");
            selector.value = cg;
        }

        container.appendChild(button);
    }
}

function registerCategoryToggleEvent() {
    let toggles = document.querySelectorAll("#category-list .tag");
    for (let i = 0; i < toggles.length; i++) {
        let toggle = toggles[i];
        toggle.addEventListener(
            "click", () => {
                let selectedCG = document.querySelector("#category-list #selected-category");
                let selector = document.getElementById("category-select");
                selectedCG.removeAttribute("id");
                selector.value = toggle.dataset.category;
                toggle.setAttribute("id", "selected-category");
                UpdatePosts(fetchPosts(), true);
            }
        );
    }
}

function registerCategorySelectEvent() {
    let selector = document.getElementById("category-select");
    selector.addEventListener(
        "change", (event) => {
            let selectedCG = document.querySelector("#category-list #selected-category");
            let selectedToggle = document.querySelector(`[data-category='${event.target.value}']`);
            selectedCG.removeAttribute("id");
            selectedToggle.setAttribute("id", "selected-category");
            UpdatePosts(fetchPosts(), true);
        }
    );
}