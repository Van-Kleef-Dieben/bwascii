s5 = (p) => {
    basic.p = p;

    let maxParticles = 7000;
    let maxMovement = 6;
    let maxRange = 7.5;

    let particles = []
    let chars = ".:-~+xo■"
    let showParticles;
    let gaussianMovement = true;

    let stage = "growing"

    let maxP = 0;

    function update() {

        if (particles.length < 0.01 * maxParticles)
        {
            if (stage === "growing") {
                stage = "dying"
                basic.updateDatagrid((o) => { maxP = p.max(maxP, o.amount ) })
                for (let i = 0; i < sizeX; i++) {
                    for (let j = 0; j < sizeY; j++) {
                        for (let o of basic.arrayGrid[i][j]) {
                            o.age = maxP - o.age
                        }
                    }
                }
            }
            
            for (let i = 0; i < sizeX; i++) {
                for (let j = 0; j < sizeY; j++) {
                    for (let o of basic.arrayGrid[i][j]) {
                        if (p.random(100) > 95) {

                            o.age *= 0.8;
                            
                            if (o.age < 0.1 * maxP) {
                                o.age = 0;
                            }
                        }
                    }
                }
            }
            
        }

        else for (let i = 0; i < particles.length; i++) {

            let particle = particles[i]

            
            let dx = gaussianMovement ? p.randomGaussian(0, maxMovement)  : p.random(-maxMovement, maxMovement)  
            let dy = gaussianMovement ? p.randomGaussian(0, maxMovement)  : p.random(-maxMovement, maxMovement)  

            particle.x += dx;
            particle.y += dy;

            particle.x = p.max(0, p.min(particle.x, 792))
            particle.y = p.max(0, p.min(particle.y, 792))

            if (showParticles) {
                p.fill(128)
                p.circle(particle.x, particle.y, 3)
            }

            let hit = false;

            for (let tx = (particle.x - maxRange) / dX | 0; tx < (particle.x + maxRange) / dX | 0 ; tx++) {
                for (let ty = (particle.y - maxRange) / dY | 0; ty < (particle.y + maxRange) / dY | 0 ; ty++) {
                    
                    // if (tx * tx + ty * ty > maxRange * maxRange) {
                    //     continue
                    // }

                    // let gx = (particle.x + tx ) / dX | 0
                    // let gy = (particle.y + ty ) / dY | 0

                    if (!basic.inGrid(tx, ty)) {
                        continue;
                    }

                    // moet dit nauwkeuriger?

                    // for (let treeParticle of basic.arrayGrid[gx][gy]) {

                    //     let ddx = treeParticle.x - particle.x
                    //     let ddy = treeParticle.y - particle.y
        
                    //     if (ddx * ddx + ddy * ddy <= maxRange * maxRange)
                    //     {
                    //         // tree.push(particle);
                    //         // break;
                    //     }

                    // }

                    if (basic.arrayGrid[tx][ty].length === 0) {
                        continue
                    }

                    for (let treeParticle of basic.arrayGrid[tx][ty]) {

                        let dx = particle.x - treeParticle.x
                        let dy = particle.y - treeParticle.y
                        
                        if (dx * dx + dy * dy > maxRange * maxRange) {
                            continue
                        }

                        particle.hit = true;
                        particle.age = basic.getFramecount()

                        let x = p.constrain(particle.x / dX | 0, 0, sizeX -1)
                        let y = p.constrain(particle.y / dY | 0, 0,sizeY -1)

                        
                        
                        // if (!basic.inGrid(x, y))
                        // {
                        //     console.log("skipping:")
                        //     console.log(x, y)
                        // }

                        basic.arrayGrid[x][y].push(particle)
                        //basic.dataGrid[x][y].amount = basic.arrayGrid[tx][ty].reduce((i, e) => i + e.age, 0) / basic.arrayGrid[tx][ty].length

                        hit = true;
                        break;
                    }

                    if (hit) {
                        break;
                    }
                }

                if (hit) {
                    break;
                }
            }
        }

        
        
        
        particles = particles.filter(particle => particle.hit === false )

        basic.updateDatagrid((o, x, y) => { o.amount = basic.arrayGrid[x][y].reduce((i, e) => i + e.age, 0) / basic.arrayGrid[x][y].length })

        //if (stage === "growing") {
            maxP = 0;
            basic.updateDatagrid((o) => { maxP = p.max(maxP, o.amount ) })
        //}
        

        // tree = []

        // console.log(tree.length)

    }

    function createParticles()
    {
        basic.setupArraygrid();
        basic.updateDatagrid((o) => { o.amount = 0, o.age = 0 });
        particles = []

        stage = "growing"
        let particle = { x: p.random(p.width) , y: p.random(p.height) }
        basic._frameCount = 0;

        let x = (particle.x / dX) | 0
        let y = (particle.y / dY) | 0
        basic.arrayGrid[x][y].push(particle)

        
        for (let i = 0; i < maxParticles; i++) {
            particles.push({ x: p.random(p.width), y: p.random(p.height), hit: false })
        }

    }

    p.setup = () => {

        basic.setup()
        basic.showFramecount(true)
        //basic.everyNthFrame(60, () => { console.log(tree.length )})
        basic.setupDatagrid(() => { return { amount: 0 }})
        basic.setupArraygrid();

        createParticles();

        
       
        currentSettings =  QuickSettings.create(0, 0, "settings", document.querySelector("#settings")).setDraggable(false);
        currentSettings.addRange("max particles", 0, 15000, maxParticles, 1, (v) => { maxParticles = v; createParticles() });
        currentSettings.addRange("max movement", 0, 100, maxMovement, 0.1, (v) => { maxMovement = v });
        currentSettings.addRange("max range", 0, 60, maxRange, 0.1, (v) => { maxRange = v });
        currentSettings.addText("chars", chars, (v) => { chars = v });
        currentSettings.addBoolean("show particles", showParticles, (v) => { showParticles = v });
        currentSettings.addBoolean("Gaussian randomness", gaussianMovement, (v) => { gaussianMovement = v });
    }

    p.draw = () => {

        basic.draw();

        basic.clearGrid();
        update();

        if (stage === "growing") {
            basic.drawGrid((o, x, y) => { return basic.dataGrid[x][y].amount > 0 ? basic.getchar(chars, maxP - basic.dataGrid[x][y].amount, maxP ) : ''});
        } else {
            basic.drawGrid((o, x, y) => { return basic.dataGrid[x][y].amount > 0 ? basic.getchar(chars, basic.dataGrid[x][y].amount, maxP ) : ''});
        }
        basic.postDraw();
    }

}