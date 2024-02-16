s4 = (p) => {

    basic.p = p;

    let glowTime = 50
    let flies = []
    let r = 5

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

                            let n = basic.dataGrid[fly.x + i][fly.y + j]
        
                            if (Object.keys(n).length === 0)
                            {
                                continue
                                //neighbors.push(basic.dataGrid[fly.x + i][fly.y + j])
                                
                            }

                            if (n.status === "off")
                            {
                                let f = ((r - Math.sqrt(i * i + j * j)) * 50) | 0
                                n.timer += f
                                if (n.timer > n.maxTime - glowTime)
                                {
                                    n.timer = n.maxTime - glowTime
                                }
                            }
                        }
                    }

                    let fill = p.color(basic._primary)
                    let alpha = 255 * p.sin((fly.timer - (fly.maxTime - glowTime)) / glowTime * p.PI) | 0
                    fill.setAlpha(alpha)
                    basic.dot(fly.x, fly.y, fly.letter, fill)

                    break;


                case "off":
                    // fly.timer++;
                    // if (fly.timer >= fly.maxTime) {
                    //     fly.blinkTimer = 0;
                    //     fly.status = "on"
                    // }
                    break;

            }

            // if (fly.status === "on") {
                
            // }
            // else
            // {
            //     //basic.dot(fly.x, fly.y, ".", "red")
            // }
            
        })

        basic.clearDatagrid();

        flies.forEach(fly => { basic.dataGrid[fly.x][fly.y] = fly })

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
                       
                        timer: p.random(300 - 1) | 0,
                        maxTime: 300,
                        
                        status: "off"
                    })
                }
            }
        }
    }

}
