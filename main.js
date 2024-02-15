let currentSketch;

let el = document.querySelector('.toggle');

el.onchange = function() {
    document.querySelector("body").classList.toggle('dark');
}

for (const el of document.querySelectorAll("a.sketch"))
{
    

    el.addEventListener("click", (e) => { 

        document.querySelectorAll("a.sketch").forEach(e => e.classList.remove("active"))
        e.target.classList.add("active")

        if (currentSketch) 
        {
            currentSketch.remove();
        }
        
        currentSketch = new p5(window[e.target.id]);
    })
}