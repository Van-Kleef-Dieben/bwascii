let sketch1 = p => 

{

    let flies = []


    p.setup = () => {
        p.createCanvas(width, height, document.getElementById("canvas"));
        p.textFont(font)
        p.textSize(fontSize)
        p.textAlign(p.LEFT, p.TOP)
        
        sizeX = width / dX
        sizeY = height / dY

        for (let i = 0; i < sizeX; i++)
        {
            for (let j = 0; j < sizeY; j++)
            {
                flies.push({ x: i, y: j, timer: p.random(300) | 0, letter: getchar("!@#$%^"), maxTimer: p.random(300) |  0 })
            }
        }
        
    }



    function update()
    {	
        // for (let i = 2; i < sizeX - 2; i++)
        // {
        // 	for (let j = 2; j < sizeY - 2; j++)
        // 	{
        // 		if (i % 2 == 0 && j % 2 == 0)
        // 			dot(i, j, getchar("!@#$!@#%&%", 2))
        // 	}
        // }

        flies.forEach(fly => {
            if (fly.timer === 0)
            {
                dot(fly.x, fly.y, fly.letter)
            }

            fly.timer++;
            if (fly.timer * 10 > fly.maxTimer)
            {
                fly.timer = 0;
            }
        })

    }

    p.draw = () => 
    {

        frameCounter++
        _primary = document.querySelector("body").classList.contains("dark") ? "white" : "black"

        clear()
        clearGrid();

        update();
        
        
        drawGrid(); 
    }
}