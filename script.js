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

        if(item.children){

            const title = document.createElement("div");

            title.textContent = "▼ " + item.title;

            title.className = "folder";

            li.appendChild(title);

            createMenu(item.children, li);

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
