s2 = (p) =>
{
    basic.p = p
    
    let worm = []
    let interval = 4

    let maxLength = 150
    let maxDeath = 512;

    let wormStatus = "alive"

    function wormDies()
    {
        
        // colorState = colorState === "white" ? "black" : "white"

        for (let pp of worm)
        {
            basic.dataGrid[pp.x][pp.y].death = maxDeath
        }

        worm = []
        wormStatus = "dead"
    }


    function updateWorm() {
        
        let pp = {}
        let found = false
    
        let rounds = 0

        if (wormStatus === "dead")
        {
            let decaying = false;

            basic.updateDatagrid((o, x, y) => { 

                if (o.death > 0)
                {
                    decaying = true;
                }

                o.death -= (p.random() * 20) | 0
                o.death = p.max(0, o.death)

                return o;
            })

            if (!decaying)
            {
                wormStatus = "alive"
            }

            return;
        }
    
        if (worm.length === 0)
        {
            pregnancy = 512;
            
            worm.push({ x: p.random(sizeX / 2) | 0 + 5, y : p.random(sizeY / 2) | 0  + 5})
            return;
    
        }
    
        // if (pregnancy > 0)
        // {
        //     pregnancy -= 10;
        //     return;
        // }
    
        // if (worm.length === 0)
        // {
        //     return;
        // }
    
        while (!found) {
    
            rounds++
    
            if (worm.length === 1) {
                switch (p.random(0, 4) | 0) {
                    case 0: pp.x = worm[0].x - 1;   pp.y = worm[0].y; break
                    case 1: pp.x = worm[0].x + 1;   pp.y = worm[0].y; break
                    case 2: pp.x = worm[0].x;       pp.y = worm[0].y - 1; break
                    case 3: pp.x = worm[0].x;       pp.y = worm[0].y + 1; break
                }
            }
    
            else {
    
                let dx = worm[0].x - worm[1].x
                let dy = worm[0].y - worm[1].y
    
                if (dx === 0) {
                    switch (p.random(0, 3) | 0) {
                        case 0: pp.x = worm[0].x - 1;   pp.y = worm[0].y; break
                        case 1: pp.x = worm[0].x + 1;   pp.y = worm[0].y; break
                        case 2: pp.x = worm[0].x;       pp.y = worm[0].y + dy; break
                    }
                }
                else {
                    switch (p.random(0, 3) | 0) {
                        case 0: pp.x = worm[0].x;       pp.y = worm[0].y - 1; break
                        case 1: pp.x = worm[0].x;       pp.y = worm[0].y + 1; break
                        case 2: pp.x = worm[0].x + dx;  pp.y = worm[0].y; break
                    }
                }
            }
    
            if (pp.x < 0 || pp.x >= sizeX || pp.y < 0 || pp.y >= sizeY) {
                continue
            }
    
            if (worm.length > 1)
            {
                let ppp = worm.find(q => q.x === pp.x && q.y === pp.y)
            
                if (ppp)
                {
                    rounds++
                    if (rounds > 100)
                    {
                        wormDies();
                        return;
                    }
                    continue
    
                }
            }
    
            found = true
    
        }
    
        worm.unshift(pp);
        worm = worm.slice(0, maxLength)
    
    }

    p.draw  = () =>
    {
        basic.draw();
        // p.clear();
        // p.fill("blue")
        // p.rect(100, 200, 100, 50);
        // console.log("s2")
        // console.log('weoeokweo')

        basic.clearGrid();

        if (frameCount % interval === 0)
        {
            updateWorm(worm)
        }

       
        let i = 0

        switch(wormStatus)
        {
            case "alive":
                for (let w of worm)
                {
                    let chars = "█▓▒░"
                    basic.dot(w.x, w.y, basic.getchar(chars, i, worm.length))
                    i++
                    // basic.grid[p.x][p.y] = "x"
                }
                basic.drawGrid();
                break;

            case "dead":
                let chars = ".  .. . .::.  .. ††††††††††††††††††††††††††††††††††††††††††††††††††††††††††††††††††††††††"
                let pc = p.color(basic._primary)

                basic.drawGrid((o, x, y) => { 

                    if (!basic.dataGrid[x][y].death)
                    {
                        return;
                    }

                    let death = basic.dataGrid[x][y].death
                    pc.setAlpha(death > 128 ? 255 : death * 2);
                    let fill = p.lerpColor(pc, p.color(255, 0, 0, 255), death / maxDeath);

                    return { 
                        letter: basic.getchar(chars, basic.dataGrid[x][y].death, maxDeath), 
                        fill: fill 
                    }
                })
                break;
        }

       

        

        
    }

    p.setup = () => { basic.setup() }
}