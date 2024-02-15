s1 = (p) =>

{

    basic.p = p;

    let fp = 0.02
    let df = 20
    let dv = 5000
    let vp = 0.01
    let chars = " .:-=+#▓▒░█"
    let c = "#222"
    let o = false
    let vkdPeriod = 300
    let lastVKDframeCount = vkdPeriod

    function addDrop()
    {
        let x = p.random(sizeX) | 0
        let y = p.random(sizeY) | 0
    
        if (x >= sizeX || y >= sizeY)
        {
            return;
        }
    
        basic.dataGrid[x][y].amount = dv
    }

    function updateGrid()
    {
			
        for (let i = 0; i < sizeX; i++) 
        {
            for (let j = 0; j < sizeY; j++) 
            {

                let p0 = basic.dataGrid[i][j]
                p0._amount += p0.amount
                let flow = 0

                for (const {x, y } of [{x: -1, y: 0}, {x: 1, y: 0}, {x: 0, y: -1}, {x: 0, y: 1}])
                {
                    if (i + x >= 0 && i + x < sizeX && j + y >= 0 && j + y < sizeY)
                    {
                        let p1 = basic.dataGrid[i + x][j + y];

                        if (p1.amount < p0.amount)
                        {
                            let f = (p0.amount - p1.amount) * fp
                            p1._amount += f
                            flow += f
                            p0._amount -= f
                        }
                    }
                    
                }
            
                

            }
        }

        for (let i = 0; i < sizeX; i++) 
        {
            for (let j = 0; j < sizeY; j++) 
            {
                let p = basic.dataGrid[i][j]
                p.amount = p._amount * (1 - vp)
                p._amount = 0
            }
        }
    }

    p.draw  = () =>
    {
        basic.draw()

        if ((frameCount + (p.random(20) | 0)) % df === 0)
        {
            addDrop()
        }

    	updateGrid()
	    basic.drawGrid((o, x, y) => { return { letter: basic.getchar(chars, basic.dataGrid[x][y].amount, 255), fill: basic._primary }})

    }

    p.setup = () => 
    {
        basic.setup()
        basic.setupDatagrid((o) => { return { amount: 0, _amount: 0 }})
    }
}



// let grid = []
// let sizeX
// let sizeY


// let frameCount = 0;

// let direction = false
// let string = "###-##-###"
// let font = "iA Writer Mono"

// // let f = 100;
// // let myNumberMin = 0;
// // let myNumberMax = 1000;
// // let myNumberStep = 10;

// let gui;

// const dX = 15

// const dY = 23



// // function setup() {

// // 	var qs = QuickSettings.create(10, 10, "Rain drops", document.querySelector("body")[0]);
// // 	qs.addRange("flow", 0, 0.5, fp, 0.01, (e) => { fp = e})
// // 	qs.addRange("drop frequency", 1, 300, df, 1, (e) => { df = e})
// // 	qs.addRange("drop volume", 1, 15000, dv, 1, (e) => { dv = e})
// // 	qs.addRange("vaporization", 0, 0.1, vp, 0.001, (e) => { vp = e})
// // 	qs.addText("ASCII chars", chars, (e) => { chars = e });    
// // 	qs.addColor("color", c, e => { console.log(e); c = color(e) });                  // creates a color input    
// // 	qs.addBoolean("opacity", o, e => o = e)



// // 	let w = 800
// // 	let h = 800

// // 	createCanvas(w, h);
// // 	textFont(font)
// // 	// textStyle("bold")
// // 	textSize(20)
// // 	textAlign(CENTER, TOP)

// // 	sizeX = (w / dX) | 0
// // 	sizeY = (h / dY) | 0

// // 	for (let i = 0; i < sizeX; i++) 
// // 	{
// // 		grid[i] = []
// // 		for (let j = 0; j < sizeY; j++) 
// // 		{
// // 			grid[i][j] = 
// // 			{ 
// // 				amount: 0,
// // 				_amount: 0
// // 			}
// // 		}
// // 	}
// // }





// // function drawGrid()
// // {
// // 	for (let i = 0; i < sizeX; i++) 
// // 	{
// // 		for (let j = 0; j < sizeY; j++) 
// // 		{
// // 			let p = grid[i][j]

// // 			const index = min((p.amount / 256 * chars.length) | 0, chars.length - 1)
			
// // 			textAlign("left, top")
			
// // 			let cc = color(c)
// // 			cc.setAlpha(o ? min(p.amount, 255) : 255)
// // 			fill(cc)
// // 			text(chars[index], i * dX, j * dY)
// // 		}
// // 	}
// // }

// function draw() 
// {

// 	frameCount++

// 	if ((frameCount + (random(20) | 0)) % df === 0)
// 	{
// 		addDrop()
// 	}

// 	clear()
// 	background(255)
	
// 	updateGrid()
// 	drawGrid()

// }
	

