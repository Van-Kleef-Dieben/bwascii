s4 = (p) => {

    basic.p = p;

    let glowTime = 50
    let flies = []
    let r = 2

    function update() {
        flies.forEach(fly => {

            fly.timer++

            if (fly.timer > fly.maxTime)
            {
                fly.timer = 0;
            }

            fly.status = (fly.timer > fly.maxTime - glowTime) ? "on" : "off"
            {
                
            }

            //neighbors.forEach(fly => { fly.timer += 1 })

            let fill = p.color(basic._primary)

            switch (fly.status)
            {            

                case "on":
                   
                    let neighbors = []

                    for (let i = -r; i < r; i++) {
                        for (let j = -r; j < r; j++) {
                            if (!basic.inGrid(fly.x + i, fly.y + j))
                            {
                                continue;
                            }

                            if (i === 0 && j === 0)
                            {
                                continue;
                            }

                            let n = basic.dataGrid[fly.x + i][fly.y + j]
        
                            if (Object.keys(n).length === 0)
                            {
                                continue
                                //neighbors.push(basic.dataGrid[fly.x + i][fly.y + j])
                                
                            }

                            let f = Math.sqrt(i * i + j * j)

                            if (f > r) 
                            {
                                continue
                            }

                            if (n.status === "off")
                            {
                                //let f = ((r - Math.sqrt(i * i + j * j)) * 300) | 0
                                //console.log(Math.sqrt(i * i + j * j))
                                // n.timer -= (f * 3) | 0
                                // n.timer = p.max(0, n.timer)
                                // if (n.timer < n.maxTime - glowTime)
                                // {
                                //     //n.timer += f
                                //     //n.timer = n.maxTime - glowTime
                                // }
                                n.delta += (f * 10) | 0
                            }
                        }
                    }

                    let c = p.color("#FFD700")
                    let g = p.color(basic._primary)

                    fill = p.lerpColor(g, c, p.sin((fly.timer - (fly.maxTime - glowTime)) / glowTime * p.PI))
                    
                    let alpha = (256 - 30) * p.sin((fly.timer - (fly.maxTime - glowTime)) / glowTime * p.PI) | 0
                    fill.setAlpha(30 + alpha)
                  

                    break;


                case "off":
                    fill.setAlpha(30)
                    break;

            }

            basic.dot(fly.x, fly.y, fly.letter, fill)

            
        })

        basic.clearDatagrid();

        flies.forEach(fly => { 
            fly.delta = p.min(fly.delta, 5)

            if (fly.timer > 0.6 * fly.maxTime)
            {
                fly.timer += fly.delta
            }

            
            fly.delta = 0

            basic.dataGrid[fly.x][fly.y] = fly 
        })

    }

    p.draw = () => {
        basic.draw();

        basic.clearGrid();

        update();

        basic.drawGrid();

        basic.postDraw();
    }

    p.setup = () => {
        basic.setup()
        basic.showFramecount(true);
  

        for (let i = 0; i < sizeX; i++) {
            for (let j = 0; j < sizeY; j++) {

                if (p.random(100) > 30)
                {
                    flies.push({ 
                        x: i, 
                        y: j, 
                        letter: "#", 
                        delta: 0,
                       
                        timer: p.random(500 - 1) | 0,
                        maxTime: 500,
                        
                        status: "off"
                    })
                }
            }
        }
    }

}
