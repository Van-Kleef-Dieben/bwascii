let font = "DM Mono"
let fontSize = 16;
let dX = 12;
let dY = 18;
let preferredWidth = 792;
let preferredHeight = 792;

let sizeX;
let sizeY;
let screenX
let screenY

let frameCount = 0;

let basic = {

        p: null,

        grid: [],
        dataGrid: [],
        _primary: "white",
        _showFramecount: false,

        circle(x, y, r, callback, letter, fill) 
        {
        
            for (let i = 0; i < r; i += 0.1)
            {
                for (let j = 0; j < Math.sqrt(r * r - i * i); j++)
                {
                    let a = Math.round(255 * Math.sqrt((i * i + j * j) / (r * r) ))
                        
                    if (callback)
                    {
                        let o = callback(a)
                        this.dot(Math.round(x + i), Math.round(y + j), o.letter, o.fill)
                        this.dot(Math.round(x + i), Math.round(y - j), o.letter, o.fill)
                        this.dot(Math.round(x - i), Math.round(y + j), o.letter, o.fill)
                        this.dot(Math.round(x - i), Math.round(y - j), o.letter, o.fill)
                    }
                    else
                    {
                        this.dot(Math.round(x + i), Math.round(y + j), letter, fill)
                        this.dot(Math.round(x + i), Math.round(y - j), letter, fill)
                        this.dot(Math.round(x - i), Math.round(y + j), letter, fill)
                        this.dot(Math.round(x - i), Math.round(y - j), letter, fill)

                    }
                   
                }
        
                
            }
        },
        
        dot(x, y, letter, fill = null) 
        {
            if (x < 0 || x >= sizeX)
            {
                return;
            }
        
            if (y < 0 || y >= sizeY)
            {
                return;
            }
        
            this.grid[x][y].letter = letter,
            this.grid[x][y].fill = fill ?? this._primary 
            
        },
        
        getchar(string, index = null, max = null) 
        {
            if (max !== null)
            {
                index = ((index / max) * string.length | 0) % string.length
            }
           
            if (index === null)
            {
                index = this.p.random(string.length) | 0
            }

           
        
            index = this.p.max(0, this.p.min(string.length - 1, index))
            return string[index]
        },

        inGrid(x, y){
            return x >= 0 && x < sizeX && y >= 0 && y < sizeY
        },
        
        setupGrid() 
        {
            for (let i = 0; i < sizeX; i++)
            {
                this.grid[i] = []
                this.dataGrid[i] = []
                
                for (let j = 0; j < sizeY; j++)
                {
                    this.grid[i][j] = {
                        fill: this._primary,
                        letter: null
                    }
        
                    this.dataGrid[i][j] = {}
                }
            }
        },

        setupDatagrid(callback)
        {
            for (let i = 0; i < sizeX; i++)
            {
                this.dataGrid[i] = []
                
                for (let j = 0; j < sizeY; j++)
                {
                    this.dataGrid[i][j] = callback(this.dataGrid[i][j])
                }
            }
        },

        dataGridEmpty(x, y)
        {
            if (!this.dataGrid[x][y])
            {
                return true;
            }
            return Object.keys(this.dataGrid[x][y]).length === 0
        },
        
        drawGrid(callback = null) 
        {
            for (let i = 0; i < sizeX; i++) 
            {
                for (let j = 0; j < sizeY; j++) 
                {
                    if (callback !== null)
                    {
                        let o = callback(this.grid[i][j], i, j)

                        if (o)
                        {
                            this.p.fill(o.fill)
                            this.p.text(o.letter || "", i * dX, j * dY)
                        }
                    }
                    else 
                    {
                        this.p.fill(this.grid[i][j].fill)
                        this.p.text(this.grid[i][j].letter || "", i * dX, j * dY)
                    }
                }
            }
        },

        updateDatagrid(callback = null)
        {
            for (let i = 0; i < sizeX; i++) 
            {
                for (let j = 0; j < sizeY; j++) 
                {
                    if (callback !== null)
                    {
                        this.dataGrid[i][j] = callback(this.dataGrid[i][j], i, j)
                    }
                }
            }
        },

        clearDatagrid()
        {
            for (let i = 0; i < sizeX; i++) 
            {
                for (let j = 0; j < sizeY; j++) 
                {
                    this.dataGrid[i][j] = {}
                }
            }
        },
        
        clearGrid() 
        {
            for (let i = 0; i < sizeX; i++) 
            {
                for (let j = 0; j < sizeY; j++) 
                {
                    this.grid[i][j] = {
                        letter: null,
                        fill: this._primary
                    }
                }
            }
        },

        setup()
        {
            
            this.p.textFont(font)
            this.p.textAlign(this.p.LEFT, this.p.TOP)

            screenX = this.p.min(preferredWidth, this.p.displayWidth)
            screenY = screenX === preferredWidth ? this.p.min(preferredHeight, this.p.displayHeight) : this.p.displayHeight

            sizeX = (screenX / dX) | 0
            sizeY = (screenY / dY) | 0

            this.p.createCanvas(screenX, screenY)
            this.setupGrid();
        },

        draw() 
        {
            this.p.clear();
            // clearGrid();
            frameCount++
            this._primary = document.querySelector("body").classList.contains("dark") ? "white" : "black"
        },

        showFramecount(show = false)
        {
            this._showFramecount = show;
        },

        postDraw()
        {
            if (this._showFramecount) {
                this.p.fill("red")
                this.p.text("fps: " + frameCount, 10, 10)
            }
        },

        mixColors(colors, value, max = 1.0)
        {
            if (colors.length < 2)
            {
                throw "Incorrect use of mixColors, only 1 color"
            }

            let colorA
            let colorB

            for (let i = 0; i < colors.length - 1; i++)
            {
                colorA = colors[i]
                colorB = colors[i + 1]

                if (value/max < colors[i + 1].stop)
                {
                    break;
                }
                
            }

            return this.p.lerpColor(this.p.color(colorA.color), this.p.color(colorB.color), ((value / max) - colorA.stop) / (colorB.stop - colorA.stop))
            
        },
    }









