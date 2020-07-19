
const sidebar = document.getElementById("sidebar-contents");
const headings = document.querySelectorAll("h1");
const sidebar_toggle = document.getElementById("mobile-nav-toggle");
const sidebar_btn = document.getElementById("sidebar-invisible");
var ready = false;

// ScrollSpy - track current position in sidebar
function refresh_sidebar(event) {
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

    var active = document.querySelector(".active");

    if (active == null || active == undefined) {
        active = sidebar.childNodes[1];
        active.classList.add("active");
    }

    active.classList.remove("active");
    document.getElementById(`nav-${id}`).classList.add("active");

    // Keep current topic centered in the sidebar, but only if scrolling
    if (event != null && event != undefined) {
        sidebar.scrollTop = active.offsetTop - window.innerHeight / 2;
    }
}

window.addEventListener("DOMContentLoaded", function() {
    try {
        // Populate sidebar with topics
        var buffer = "";
        for (h = 1; h < headings.length; h++) {
            var heading = headings[h];

            if (heading.tagName.toLowerCase() == "h1") {
                var is_new_chapter = heading.innerText.search('•') == 0 ? true : false;
                var text = heading.innerText;

                if (is_new_chapter === true) {
                    text = text.split('•').join("").toLowerCase().replace("mate", "MATE");
                    buffer += "<div class='nav-separator'></div>";
                }

                buffer += `<a id="nav-${heading.id}" class="nav-item ${is_new_chapter ? 'nav-chapter' : ''} ${h == 1 ? 'active' : ''}" href="#${heading.id}">${text}</a>`;

                if (is_new_chapter === true) {
                    heading.innerText = heading.innerText.split('•').join("").toLowerCase().replace("mate", "MATE");
                }
            }
        }
        sidebar.innerHTML = buffer;

        // If returning to the page and a hash in the URL, jump!
        if (window.location.href.search("#") != -1) {
            let href = window.location.href.split("#")[1];
            let btn = document.getElementById("nav-" + href);

            if (btn != null || btn != undefined) {
                btn.click();
            }
        }

        // Some headings are linked within articles. Make sure those links don't have a class.
        let chapter_links = document.querySelectorAll(".nav-chapter");
        for (c = 0; c < chapter_links.length; c++) {
            let link = chapter_links[c];
            if (link.parentElement.tagName.toLowerCase() == "p") {
                link.classList.remove("nav-chapter");
            }
        }

        // On mobile, clicking a topic closes the menu.
        sidebar.addEventListener("click", function() {
            sidebar_toggle.checked = false;
        });

        document.getElementById("guide-viewer").classList.remove("loading");

        window.onscroll = refresh_sidebar;
        ready = true;
        refresh_sidebar();

        document.getElementById("prev-section").disabled = false;
        document.getElementById("next-section").disabled = false;

    } catch(e) {
        console.error(e);
        document.getElementById("guide-viewer").classList.remove("loading");
        window.alert("There was an error loading the guide. Your mileage may vary.\n\nDetails:\n " + e);
    }
});

// Set up mobile menu
sidebar_btn.addEventListener("click", function() {
    sidebar_toggle.checked = false;
});

// Buttons for jumping forward/backwards from sections
function prevSection() {
    var active = document.querySelector(".active");
    var target = active.previousSibling;

    if (target == null)
        return null;

    if (target.className == "nav-separator") {
        target = target.previousSibling;
    }

    if (target == null)
        return null;

    target.click();
}

function nextSection() {
    var active = document.querySelector(".active");
    var target = active.nextSibling;

    if (target == null)
        return null;

    if (target.className == "nav-separator") {
        target = target.nextSibling;
    }

    if (target == null)
        return null;

    target.click();
}
