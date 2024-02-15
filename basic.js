let grid = []
let font = "iA Writer Mono"
let fontSize = 16;
let dX = 12;
let dY = 18;
let sizeX
let sizeY

let _primary = "white"

let speed = 130

let frameCounter = 0;
let width = 792;
let height = 792;

function gridCircle(x, y, r, qq = false)
{

	for (let i = 0; i < r; i += 0.1)
	{
		for (let j = 0; j < Math.sqrt(r * r - i * i); j++)
		{
			// if (i * i + j * j <= r * r)
			{
				// let p = Math.round(x + i)
				// let q = Math.round(y + j)
				let a = Math.round(255 * Math.sqrt((i * i + j * j) / (r * r) ))

                // let c
				// if (qq)
				// {
				// 	 c = color(255 - a, 255 - a, 255 - a)
	
				// }
				// else
				// {
				// 	 c = color(a, a, a)
				// }
				//c.setAlpha(a)

                if (!qq)
                {
                    a = 256 - a;
                }

                // if (random(100) > 97)
                //     a += random(2) - 4

                //a = min(255, max(a, 0))

                let chars = ".-!^.-.-~+xo░▒▓█"
                let c = chars[(a / 256 * chars.length | 0 ) % chars.length]
                

				dot(Math.round(x + i), Math.round(y + j), { letter: c, fill: _primary })
				dot(Math.round(x + i), Math.round(y - j), { letter: c, fill: _primary })
				dot(Math.round(x - i), Math.round(y + j), { letter: c, fill: _primary })
				dot(Math.round(x - i), Math.round(y - j), { letter: c, fill: _primary })
			}
		}

		
	}

	// for (let i = 0; i < TWO_PI; i += TWO_PI / 100)
	// {
	// 	let p = (x + r * sin(i)) | 0
	// 	let q = (y + r * cos(i)) | 0

	// 	dot(p, q, { letter: ".", fill: "blue" })
	// }
}

function dot(x, y, letter, fill)
{
	if (x < 0 || x >= sizeX)
	{
		return;
	}

	if (y < 0 || y >= sizeY)
	{
		return;
	}

	grid[x][y] = { letter: letter, fill: fill ?? _primary }
}

function getchar(string, index = null)
{
    if (index === null)
    {
        index = random(string.length) | 0
    }

    index = max(0, min(string.length - 1, index))
    return string[index]
}


function drawGrid()
{
	for (let i = 0; i < sizeX; i++) 
	{
		for (let j = 0; j < sizeY; j++) 
		{
			fill(grid[i][j].fill)
			text(grid[i][j].letter || "", i * dX, j * dY)
		}
	}
}

function clearGrid()
{
	for (let i = 0; i < sizeX; i++) 
	{
		grid[i] = []
		for (let j = 0; j < sizeY; j++) 
		{
			grid[i][j] = {
				letter: null,
				fill: _primary
			}
		}
	}
}



