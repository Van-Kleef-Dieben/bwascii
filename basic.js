let font = "iA Writer Mono"
let fontSize = 16;
let dX = 12;
let dY = 18;
let width = 792;
let height = 792;

let sizeX = width / dX;
let sizeY = height/ dY;

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
            this.p.createCanvas(792, 792, document.querySelector("#canvas"))
            this.p.textFont(font)
            this.p.textAlign(this.p.LEFT, this.p.TOP)
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
                this.p.text(frameCount, 10, 10)
            }
        }

    }









