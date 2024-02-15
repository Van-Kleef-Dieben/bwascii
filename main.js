let m = (p) =>

{
        
    return {
        setup: () =>
        {
            p.createCanvas(792, 792, document.querySelector("#canvas"))
            console.log('asdfasf')
        }
    }

}

let currentSketch;


for (const el of document.querySelectorAll("a.sketch"))
{
    

    el.addEventListener("click", (e) => { 

        document.querySelectorAll("a.sketch").forEach(e => e.classList.remove("active"))
        e.target.classList.add("active")

        if (currentSketch) 
            currentSketch.remove();
        console.log(e.target.id)
        switch(e.target.id){
            case "s1": 
                currentSketch = new p5(s1); break;
            case "s2": 
                currentSketch = new p5(s2); break;
        }

    })
}