
const sidebar = document.getElementById("sidebar-contents");
const headings = document.querySelectorAll("h1");
var ready = false;

// ScrollSpy - track current position in sidebar
function refresh_sidebar() {
    const scrollPos = document.documentElement.scrollTop || document.body.scrollTop;

    if (ready === false)
        return;

    var id = null;

    for (h = 0; h < headings.length; h++ ) {
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
    for (h = 0; h < headings.length; h++) {
        var heading = headings[h];
        switch(heading.tagName.toLowerCase()) {
            case "h1":
                buffer += `<a id="nav-${heading.id}" class="${h == 0 ? 'active' : ''}" href="#${heading.id}">${heading.innerText}</a>`;
                break;
        }
        sidebar.innerHTML = buffer;
    }

    window.onscroll = refresh_sidebar;
    ready = true;
});
