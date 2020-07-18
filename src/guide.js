
const sidebar = document.getElementById("sidebar-contents");
const headings = document.querySelectorAll("h1");
var ready = false;

// ScrollSpy - track current position in sidebar
function refresh_sidebar() {
    const scrollPos = document.documentElement.scrollTop || document.body.scrollTop;

    if (ready === false)
        return;

    var id = null;

    for (h = 1; h < headings.length; h++ ) {
        let header = headings[h];

        if (header.offsetTop <= scrollPos + 250) {
            id = header.id;
        }
    }

    document.querySelector(".active").classList.remove("active");
    document.getElementById(`nav-${id}`).classList.add("active");
}

window.addEventListener("DOMContentLoaded", () => {
    // Populate sidebar with topics
    var buffer = "";
    for (h = 1; h < headings.length; h++) {
        var heading = headings[h];

        if (heading.tagName.toLowerCase() == "h1") {
            var is_new_chapter = heading.innerText.search('•') == 0 ? true : false;
            var text = heading.innerText;

            if (is_new_chapter === true) {
                text = text.replaceAll('•', ' ').toLowerCase().replace("mate", "MATE");
                buffer += "<div class='nav-separator'></div>";
            }

            buffer += `<a id="nav-${heading.id}" class="nav-item ${is_new_chapter ? 'nav-chapter' : ''} ${h == 1 ? 'active' : ''}" href="#${heading.id}">${text}</a>`;

            if (is_new_chapter === true) {
                heading.innerText = heading.innerText.replaceAll('•', ' ').toLowerCase().replace("mate", "MATE");
            }
        }
    }
    sidebar.innerHTML = buffer;

    window.onscroll = refresh_sidebar;
    ready = true;
    refresh_sidebar();

    // If returning to the page and a hash is in the URL, jump!
    if (window.location.href.search("#") != -1) {
        let href = window.location.href.split("#")[1];
        document.getElementById("nav-" + href).click();
    }
});
