const menuElement = document.getElementById("menu");
const pageContent = document.getElementById("pageContent");

async function loadMenu() {

    const response = await fetch("data/menu.json");
    const data = await response.json();

    menuElement.innerHTML = "";

    createMenu(data.menu, menuElement);

}

function createMenu(items, parent) {

    const ul = document.createElement("ul");

    items.forEach(item => {

        const li = document.createElement("li");

        if(item.page){

            li.textContent = item.title;

            li.onclick = () => {

                loadPage(item.page);

            };

        }

        if (item.children) {

    const title = document.createElement("div");
    title.className = "folder";
    title.textContent = "▶ " + item.title;

    const childContainer = document.createElement("div");
    childContainer.style.display = "none";

    title.onclick = () => {

        if (childContainer.style.display === "none") {

            childContainer.style.display = "block";
            title.textContent = "▼ " + item.title;

        } else {

            childContainer.style.display = "none";
            title.textContent = "▶ " + item.title;

        }

    };

    li.appendChild(title);

    createMenu(item.children, childContainer);

    li.appendChild(childContainer);

}
        ul.appendChild(li);

    });

    parent.appendChild(ul);

}

async function loadPage(page){

    const response = await fetch("pages/" + page + ".html");

    const html = await response.text();

    pageContent.innerHTML = html;

}

loadMenu();

loadPage("home");
