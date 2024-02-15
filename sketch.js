let flies = []


function setup() {
	createCanvas(width, height, document.getElementById("canvas"));
	textFont(font)
	textSize(fontSize)
	textAlign(LEFT, TOP)
	
	sizeX = width / dX
	sizeY = height / dY

	for (let i = 0; i < sizeX; i++)
	{
		for (let j = 0; j < sizeY; j++)
		{
			flies.push({ x: i, y: j, timer: random(300) | 0, letter: getchar("!@#$%^"), maxTimer: random(300) |  0 })
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

function draw() 
{

	frameCounter++
	_primary = document.querySelector("body").classList.contains("dark") ? "white" : "black"

	clear()
	clearGrid();

	update();
	
	
	drawGrid(); 
}