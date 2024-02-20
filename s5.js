s5 = (p) => {
    basic.p = p;

    basic.setTheme("light");

    let maxParticles = 4000;
    let maxMovement = 20;
    let maxRange = 10;

    let particles = []
    let chars = ".:=+x░▒▓█"    /* ▓ */
    let showParticles = false;
    let gaussianMovement = true;

    let rootParticle;

    let stage = "growing"

    let maxP = 0;

    let drops = []

    function update() {

        if (particles.length < 0.01 * maxParticles)
        {
            // if (stage === "growing") {
            //     stage = "dying"
            //     basic.updateDatagrid((o) => { maxP = p.max(maxP, o.amount ) })
            //     for (let i = 0; i < sizeX; i++) {
            //         for (let j = 0; j < sizeY; j++) {
            //             for (let o of basic.arrayGrid[i][j]) {
            //                 o.age = maxP - o.age
            //             }
            //         }
            //     }
            // }
            
            // for (let i = 0; i < sizeX; i++) {
            //     for (let j = 0; j < sizeY; j++) {
            //         for (let o of basic.arrayGrid[i][j]) {
            //             if (p.random(100) > 95) {

            //                 o.age *= 0.8;
                            
            //                 if (o.age < 0.1 * maxP) {
            //                     o.age = 0;
            //                 }
            //             }
            //         }
            //     }
            // }
            
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
                p.noStroke()
                p.fill("brown")
                p.circle(particle.x, particle.y, 2)
            }

            let hit = false;

            for (let tx = (particle.x - maxRange) / dX | 0; tx < (particle.x + maxRange) / dX | 0 ; tx++) {
                for (let ty = (particle.y - maxRange) / dY | 0; ty < (particle.y + maxRange) / dY | 0 ; ty++) {

                    if (!basic.inGrid(tx, ty)) {
                        continue;
                    }

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
                        treeParticle.children.push(particle)
                       
                        let x = p.constrain(particle.x / dX | 0, 0, sizeX -1)
                        let y = p.constrain(particle.y / dY | 0, 0,sizeY -1)

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

    function drawDrops() {

        basic.updateDatagrid((o )=> { o.flow -= 2; o.flow = p.max(0, o.flow) });

        let newDrops = []
       
        for (let drop of drops) {
            drop.age++;

            if (drop.age % 3 !== 0) {
                newDrops.push(drop)
                
            } else {
           
                for (let particle of drop.particle.children) {
                    newDrops.push({ particle: particle, age: drop.age })
                }
            }

            let x = drop.particle.x / dX | 0
            let y = drop.particle.y / dY | 0

            if (basic.inGrid(x, y)) {
                basic.dataGrid[x][y].flow += 100;
            }

            

            // if (drop.age % 10 === 0) {
            //     drop.nodes.shift();
            // }

            // if (drop.nodes.length === 0) {
            //     drop.age = -1
            //     continue;
            
          
            //let node = drop.nodes[0]
           // console.log(node)

           //for (let i = 0; i < drop.nodes.length; i++) {
            // let c = p.color("blue")
            // c.setAlpha(p.max(10, 255 - drop.age))
            // basic.dot(drop.particle.x / dX | 0, drop.particle.y / dY | 0, "■", c)
           //}

        }

        drops = newDrops;

        let maxFlow = basic.reduceDataGrid((o, acc) => { return p.max(o.flow, acc )}, 0)
        console.log(maxFlow)

        basic.drawGrid((o, x, y) => { 
            let c = p.color("blue");
            c.setAlpha(basic.dataGrid[x][y].flow / maxFlow * 255 |0)
            return { letter: "█" /* "■"  "█" */, fill: c };
        })
    }

    function createDrop() {

        let drop = { particle: rootParticle, age: 0}
        //let particle = rootParticle
        // console.log(particle)

        // while(particle.children.length > 0) {
        //     //console.log("I")
        //     drop.nodes.push(particle)
        //     particle = p.random(particle.children)
        //     //console.log(particle)
        // }

        return drop
    }

    function createRandomParticle() {
        return { x: p.random(p.width) , y: p.random(p.height), hit: false, children: [] }
    }

    function createParticles()
    {
        basic.setupArraygrid();
        basic.updateDatagrid((o) => { o.amount = 0; o.age = 0; o.flow = 0 });
        particles = []

        stage = "growing"
        rootParticle = createRandomParticle();
        basic._frameCount = 0;

        let x = (rootParticle.x / dX) | 0
        let y = (rootParticle.y / dY) | 0
        basic.arrayGrid[x][y].push(rootParticle)

        
        for (let i = 0; i < maxParticles; i++) {
            particles.push(createRandomParticle())
        }

    }

    function randomize() {
        maxParticles = p.random(15000)
        currentSettings.setValue("max particles", maxParticles)

        maxMovement = p.random(100)
        currentSettings.setValue("max movement", maxMovement)

        maxRange = p.random(60)
        currentSettings.setValue("max range", maxRange)

        // chars = basic.randomString((p.random(10) | 0) + 3, "~!@#$%^&*()_+=01234567890-\\/';:,.<>")
        // currentSettings.setValue("chars", chars)

        createParticles();
    }

    p.setup = () => {

        basic.setup()
        basic.showFramecount(true)

        //sdrops.push(createDrop()) 

        basic.everyNthFrame(60, () => { 
            //console.log(drops.length); 
            //for (let i = 0; i < 1000; i++)
                drops.push(createDrop()) 
        })
        basic.setupDatagrid(() => { return { amount: 0 }})
        basic.setupArraygrid();

        createParticles();

        
       
        currentSettings =  QuickSettings.create(0, 0, "settings", document.querySelector("#settings")).setDraggable(false);
        currentSettings.addButton("🎲 randomize", randomize);                        // creates a button
        currentSettings.addRange("max particles", 0, 15000, maxParticles, 1, (v) => { maxParticles = v; createParticles() });
        currentSettings.addRange("max movement", 0, 100, maxMovement, 0.1, (v) => { maxMovement = v; createParticles() });
        currentSettings.addRange("max range", 0, 60, maxRange, 0.1, (v) => { maxRange = v; createParticles(); });
        currentSettings.addText("chars", chars, (v) => { chars = v });
        currentSettings.addBoolean("show particles", showParticles, (v) => { showParticles = v });
        currentSettings.addBoolean("Gaussian randomness", gaussianMovement, (v) => { gaussianMovement = v });
        
    }

    p.draw = () => {

        basic.draw();

        basic.clearGrid();
       // drawDrops();
        update();

        if (stage === "growing") {
            basic.drawGrid((o, x, y) => { return basic.dataGrid[x][y].amount > 0 ? basic.getchar(chars, maxP - basic.dataGrid[x][y].amount, maxP ) : ''});
        } else {
            basic.drawGrid((o, x, y) => { return basic.dataGrid[x][y].amount > 0 ? basic.getchar(chars, basic.dataGrid[x][y].amount, maxP ) : ''});
        }

       

        basic.postDraw();
    }

}