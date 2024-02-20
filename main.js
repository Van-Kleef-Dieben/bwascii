let currentSketch;
let currentSettings;

let theme = "dark"

let el = document.querySelector('.toggle');

el.onchange = function() {
    document.querySelector("body").classList.toggle('dark');
    theme = theme === "light" ? "dark" : "light"
}

el = document.querySelector("#toggle-sidebar")
el.onclick = () => {
    const sidebar = document.querySelector(".sidebar")
    sidebar.style.display = window.getComputedStyle(sidebar).display === "block" ? "none" : "block"
}

for (const el of document.querySelectorAll("a.sketch"))
{
    

    el.addEventListener("click", (e) => { 

        document.querySelectorAll("a.sketch").forEach(e => e.classList.remove("active"))
        e.target.classList.add("active")

        if (currentSketch) {
            currentSketch.remove();
            currentSketch = null;
        }

        if (currentSettings) {
            currentSettings.destroy();
            currentSettings = null
        }

        currentSketch = new p5(window[e.target.id], document.querySelector(".container"));
    })
}

let offset = 0
let title = "░▒▓█ B W A S C II █▓▒░  "

setInterval(() => { 

    offset = ++offset % title.length; 
    let p = title.substring(0, offset)
    let r = title.substring(offset, title.length)

    document.title = r + p

}, 200)