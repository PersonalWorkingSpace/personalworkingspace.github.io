import { categoryName } from './projection.js';
import { Pages, Categories } from '../module/subpageInfo.js';
import { Init, UpdatePosts, CreateColorfulButton } from '../module/common.js';

window.onload = function() {
    Init();
    updateCategory();
    registerCategoryToggleEvent();
    UpdatePosts(fetchPosts(), true);
}

function fetchPosts() {
    let selectedCG = document.querySelector("#category-list #selected-category");
    let cg = selectedCG.dataset.category;
    let pageID = Categories[cg]["pageID"];

    let posts = [];
    for (let i = pageID.length - 1; i >= 0; i--) {
        posts.push(Pages[pageID[i]]);
    }

    return posts;
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
        let button = CreateColorfulButton(`${categoryName[cg]} (${listOfPages["name"].length})`, cg);
        button.setAttribute("data-category", cg);

        if (cg == selectedCG || selectedCG == null && container.childNodes.length == 0) {
            button.setAttribute("id", "selected-category");
        }

        if (container.childNodes.length > 0) {
            let textNode = document.createTextNode(" ");
            container.appendChild(textNode);
        }
        container.appendChild(button);
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
                UpdatePosts(fetchPosts(), true);
            }
        );
    }
}