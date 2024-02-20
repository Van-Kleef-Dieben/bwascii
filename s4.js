s4 = (p) => {

    basic.p = p;

    let flies = []
    let neighborRange = 4
    let mouseDisturbRange = 3;
    let mouseDisturbStrength = 0.05;
    let maxSync = 2;
    let ignoreTime = 0.7
    let glowTime = 40
    let maxTime = 650
    let chars = "..:-+xo■■"
    let move = false;

    let minOpacity = 50


    function update() {
        flies.forEach(fly => {

            fly.timer++

            if (fly.timer > maxTime) {
                fly.timer = 0;
            }


            fly.status = (fly.timer > maxTime - glowTime) ? "on" : "off"

            let fill = p.color(basic._primary)
            let alpha = 0;

            switch (fly.status) {

                case "on":

                    let neighbors = []

                    for (let i = -neighborRange; i < neighborRange + 1; i++) {
                        for (let j = -neighborRange; j < neighborRange + 1; j++) {
                            if (!basic.inGrid(fly.x + i, fly.y + j)) {
                                continue;
                            }

                            if (i === 0 && j === 0) {
                                continue;
                            }

                            let n = basic.dataGrid[fly.x + i][fly.y + j]

                            if (Object.keys(n).length === 0) {
                                continue
                                //neighbors.push(basic.dataGrid[fly.x + i][fly.y + j])

                            }

                            let f = Math.sqrt(i * i + j * j)

                            if (f > neighborRange) {
                                continue
                            }

                            if (n.status === "off") {
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

                    fill = basic.mixColors(mix, p.sin((fly.timer - (maxTime - glowTime)) / glowTime * p.PI))

                    alpha = (255 - minOpacity) * p.sin((fly.timer - (maxTime - glowTime)) / glowTime * p.PI) | 0
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
            fly.delta = p.min(fly.delta, maxSync)

            if (fly.timer > ignoreTime * maxTime) {
                fly.timer += fly.delta
            }


            fly.delta = 0

            if (move)
            {

                if (p.random(100) > 98) {
                    let dx = p.random([-1, 0, 1])
                    let dy = p.random([-1, 0, 1])

                    if (Math.pow(fly.x + dx - fly.originalX, 2) + Math.pow(fly.y + dy - fly.originalY, 2) < 25) {

                    }

                    if (basic.inGrid(fly.x + dx, fly.y + dy) && basic.dataGridEmpty(fly.x + dx, fly.x + dx)) {
                        fly.x += dx
                        fly.y += dy
                    }
                }
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

    let setupAll = () => 
    {
        for (let i = 0; i < sizeX; i++) {
                for (let j = 0; j < sizeY; j++) {
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

    let setupSparse = (n) => 
    {
        for (let q = 0; q < n; q++) {
            let i = p.random(sizeX) | 0
            let j = p.random(sizeY) | 0

            flies.push({
                x: i,
                y: j,
                originalX: i,
                originalY: j,
                letter: "#",
                delta: 0,

                timer: p.random(maxTime) | 0,
                // glowTime: glowTime,
                // maxTime: maxTime,

                status: "off"
            })
        }
    }

    p.setup = () => {
        basic.setup()

        setupAll();

        currentSettings =  QuickSettings.create(0, 0, "settings", document.querySelector("#settings")).setDraggable(false);
        currentSettings.addRange("max sync", 0, 25, maxSync, 1, (v) => { maxSync = v });
        currentSettings.addRange("glow time", 0, 1000, glowTime, 1, (v) => { glowTime = v });
        currentSettings.addRange("total time", 0, 3000, maxTime, 1, (v) => { maxTime = v });
        currentSettings.addRange("ignore time", 0, 1, ignoreTime, 0.05, (v) => { ignoreTime = v });
        currentSettings.addRange("neighbor range", 0, 30, neighborRange, 1, (v) => { neighborRange = v });
        currentSettings.addRange("mouse disturb range", 0, 30, mouseDisturbRange, 1, (v) => { mouseDisturbRange = v });
        currentSettings.addRange("mouse disturb strength", 0, 1, mouseDisturbStrength, 0.01, (v) => { mouseDisturbStrength = v });
        currentSettings.addText("ASCII", chars, (v) => { chars = v });

        // basic.showFramecount(true);

        let a = p.createElement('div', "<p>Based on Nicky Case's interactive fireflies: <a target='_link' href='https://ncase.me/fireflies/'>https://ncase.me/fireflies/</a></p>", p)
        a.position(0, 800)

        
    }

    p.mouseMoved = () => {

       

        let mx = p.mouseX / dX | 0
        let my = p.mouseY / dY | 0

        for (let x = mx - mouseDisturbRange; x < mx + mouseDisturbRange; x++) {
            for (let y = my - mouseDisturbRange; y < my + mouseDisturbRange; y++) {

                if (!basic.inGrid(x, y)) {
                    continue;
                }

                basic.dataGrid[x][y].timer += p.random(maxTime) * mouseDisturbStrength | 0

            }
        }
    }


    


}

