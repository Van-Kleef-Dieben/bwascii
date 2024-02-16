s4 = (p) => {

    basic.p = p;

    // let glowTime = 1000
    let flies = []
    let r = 2
    let maxDelta = 10;
    let immuneTime = 0.7
    let glowTime = 40
    let maxTime = 400
    let chars = "..:-+xo■■"

    let minOpacity = 50


    function update() {
        flies.forEach(fly => {

            fly.timer++

            if (fly.timer > fly.maxTime)
            {
                fly.timer = 0;
            }

           

            fly.status = (fly.timer > fly.maxTime - fly.glowTime) ? "on" : "off"
            {
                
            }

            //neighbors.forEach(fly => { fly.timer += 1 })

            let fill = p.color(basic._primary)
            let alpha = 0;

            switch (fly.status)
            {            

                case "on":
                   
                    let neighbors = []

                    for (let i = -r; i < r + 1; i++) {
                        for (let j = -r; j < r + 1; j++) {
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

                    // let c = p.color("#FFD700")
                    // let g = p.color(basic._primary)

                    let mix = [
                        { stop: 0.0, color: "grey" },
                        { stop: 0.3, color: "gold" },
                        { stop: 0.6, color: "yellow" },
                        { stop: 0.9, color: basic._primary }
                    ]

                    fill = basic.mixColors(mix, p.sin((fly.timer - (fly.maxTime - fly.glowTime)) / fly.glowTime * p.PI))
                    
                    alpha = (255 - minOpacity) * p.sin((fly.timer - (fly.maxTime - fly.glowTime)) / fly.glowTime * p.PI) | 0
                    fill.setAlpha(alpha)
                  

                    break;


                case "off":
                    alpha = minOpacity;
                    fill.setAlpha(alpha)
                    break;

            }

            basic.dot(fly.x, fly.y, basic.getchar(chars, alpha, 255), fill)
            

            
        })

        basic.clearDatagrid();

        flies.forEach(fly => { 
            fly.delta = p.min(fly.delta, maxDelta)

            if (fly.timer > immuneTime * fly.maxTime)
            {
                fly.timer += fly.delta
            }

            
            fly.delta = 0

            if (p.random(100) > 98)
            {
                // let dx = p.random([-1, 0, 1])
                // let dy = p.random([-1, 0, 1])

                // if (Math.pow(fly.x + dx - fly.originalX, 2) + Math.pow(fly.y + dy - fly.originalY, 2) < 25)
                // {

                // }

                // if (basic.inGrid(fly.x + dx, fly.y + dy) && basic.dataGridEmpty(fly.x + dx, fly.x + dx))
                // {
                //     fly.x += dx
                //     fly.y += dy
                // }
            }

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

                // if (i % 2 === 0 && j % 2 === 0 )
               
                {
                    flies.push({ 
                        x: i, 
                        y: j, 
                        originalX: i,
                        originalY: j,
                        letter: "#", 
                        delta: 0,
                       
                        timer: p.random(maxTime) | 0,
                        glowTime: glowTime,
                        maxTime: maxTime,
                        
                        status: "off"
                    })
                }
            }
        }
    }

}

