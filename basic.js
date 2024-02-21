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

let basic = {

        p: null,

        grid: [],
        dataGrid: [],
        arrayGrid: [],
        _primary: "white",
        _frameCount: 0,
        _showFramecount: false,
        _nthFrameCallbacks: [],

        _settings: {},
        _quickSettings: null,
        _onSettingsChanged: null,

        addSetting(property, type, value = null, min = null, max = null, step = null, randomize = false) {

            if (this._quickSettings === null) {
                this._quickSettings = QuickSettings.create(0, 0, "settings", document.querySelector("#settings")).setDraggable(false);
            }

            this._settings[property] = { type: type, value: value, min: min, max: max, step: step, randomize: randomize }

            let callback = (v) => { 
                this._settings[property].value = v; 
                if (typeof this._onSettingsChanged === "function") {
                    this._onSettingsChanged()
                }
            }

            switch(type) 
            {
                case "range":    this._quickSettings.addRange(property, min, max, this._settings[property].value, step, callback); break;
                case "boolean":  this._quickSettings.addBoolean(property, value ?? false, callback); break;
                case "text":     this._quickSettings.addText(property, value ?? "", callback); break;
            }
            // this._quickSettings.add

            // currentSettings =  QuickSettings.create(0, 0, "settings", document.querySelector("#settings")).setDraggable(false);
            // currentSettings.addButton("🎲 randomize", randomize);                        // creates a button
            // currentSettings.addRange("max particles", 0, 15000, maxParticles, 1, (v) => { maxParticles = v; createParticles() });
            // currentSettings.addRange("max movement", 0, 100, maxMovement, 0.1, (v) => { maxMovement = v; createParticles() });
            // currentSettings.addRange("max range", 0, 60, maxRange, 0.1, (v) => { maxRange = v; createParticles(); });
            // currentSettings.addText("chars", chars, (v) => { chars = v });
        },

        addSettingButton(label, callback) {
            if (this._quickSettings === null) {
                this._quickSettings = QuickSettings.create(0, 0, "settings", document.querySelector("#settings")).setDraggable(false);
            }

            this._quickSettings.addButton(label, callback)
        },

        addSettingsRandomize(callback = null) {
            
            if (this._quickSettings === null) {
                this._quickSettings = QuickSettings.create(0, 0, "settings", document.querySelector("#settings")).setDraggable(false);
            }

            this._quickSettings.addButton("🎲 randomize", () => {

                for (let property in this._settings) {
                    let setting = this._settings[property]
                    if (!setting.randomize) {
                        continue
                    }

                    switch (setting.type) {
                        case "range":   setting.value = this.p.random(setting.min, setting.max); break;
                        case "boolean": setting.value = this.p.random(2) > 1; break;
                        case "text":    setting.value = this.randomString(20); break;
                    }

                    if (typeof callback === "function") {
                        callback(property, setting)
                    }

                    this._quickSettings.setValue(property, setting.value);
                }

                
            });

        },

        onSettingsChanged(callback) {
            this._onSettingsChanged = callback
        },

        getSetting(property) {
            return this._settings[property].value
        },

        setTheme(t) {
            console.log(theme, t)
            if (theme === t) {
                return;
            }

            document.querySelector('.toggle').click();
        },

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
            if (!this.inGrid(x, y)) {
                return;
            }
        
            this.grid[x][y].letter = letter,
            this.grid[x][y].fill = fill ?? this._primary 
            
        },

        dot_direct(x, y, letter, fill = null) 
        {

            if (!this.inGrid(x, y)) {
                return;
            }
        
            // this.grid[x][y].letter = letter,
            //this.grid[x][y].fill = fill ?? this._primary 

            this.p.fill(fill ?? this._primary)
            this.p.text(letter || "", x * dX, y * dY)
            
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

            if (index > string.length -1)
            {
                //throw new "ASDfasdf"
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

        setupArraygrid()
        {
            for (let i = 0; i < sizeX; i++)
            {
                this.arrayGrid[i] = []
                
                for (let j = 0; j < sizeY; j++)
                {
                    this.arrayGrid[i][j] = []
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

        drawDataGrid(callback) 
        {
            this.p.textFont(font)
            for (let i = 0; i < sizeX; i++) 
            {
                for (let j = 0; j < sizeY; j++) 
                {
                    let o = callback(this.dataGrid[i][j], i, j);

                    if (!o) {
                        continue;
                    }

                    this.p.fill(o.fill ?? this._primary)
                    this.p.text(o.letter || "", i * dX, j * dY)
                }
            }
        },
        
        drawGrid(callback = null) 
        {
            this.p.textFont(font)
            for (let i = 0; i < sizeX; i++) 
            {
                for (let j = 0; j < sizeY; j++) 
                {
                    if (callback !== null)
                    {
                        let o = callback(this.grid[i][j], i, j)

                        if (typeof o === "object")
                        {
                            this.p.fill(o.fill)
                            this.p.text(o.letter || "", i * dX, j * dY)
                        }

                        if (typeof o === "string")
                        {
                            // this.p.fill(o.fill)
                            this.p.fill(this._primary)
                            this.p.text(o || "", i * dX, j * dY)
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
                        callback(this.dataGrid[i][j], i, j)
                    }
                }
            }
        },

        reduceDataGrid(callback, acc) {

            if (typeof callback === "object") {

                switch(callback.method) {
                    case "max": return this.reduceDataGrid((o, a) => { return this.p.max(o[callback.property], a) } , 0);
                }

            }

            for (let i = 0; i < sizeX; i++) 
            {
                for (let j = 0; j < sizeY; j++) 
                {
                    acc = callback(this.dataGrid[i][j], acc)
                }
            } 

            return acc;
        },

        clearDatagrid(callback)
        {
            for (let i = 0; i < sizeX; i++) 
            {
                for (let j = 0; j < sizeY; j++) 
                {
                    if (typeof callback === "function")
                    {
                        this.dataGrid[i][j] = callback(this.dataGrid[i][j])
                    }
                    else 
                    {
                        this.dataGrid[i][j] = {}
                    }
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
            this.p.textSize(fontSize)
            this.p.textAlign(this.p.LEFT, this.p.TOP)

            screenX = this.p.min(preferredWidth, this.p.displayWidth)
            screenY = screenX === preferredWidth ? this.p.min(preferredHeight, this.p.displayHeight) : this.p.displayHeight

            sizeX = (screenX / dX) | 0
            sizeY = (screenY / dY) | 0

            this.p.createCanvas(screenX, screenY)
            this.setupGrid();
        },

        draw(clear = true) 
        {
            if (clear) {
                this.p.clear();
            }
            this._frameCount++
            this._primary = document.querySelector("body").classList.contains("dark") ? "white" : "black"

            for (let nfc of this._nthFrameCallbacks) {
                if (this._frameCount % nfc.count == 0) {
                    nfc.callback();
                }

            }
        },
    

        showFramecount(show = false) {
            this._showFramecount = show;
        },

        getFramecount() {
            return this._frameCount;
        },
        
        everyNthFrame(count, callback)
        {
            this._nthFrameCallbacks.push({ count: count, callback: callback })
        },

        postDraw()
        {
            if (this._showFramecount) {
                this.p.fill("red")
                this.p.text("fps: " + this._frameCount, 10, 10)
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

        randomString(length, chars = "abcdefghijklmnopqrstuvwxyz0123456789") {

            let result = ""

            for (let i = 0; i < length; i++){
                result += chars[(this.p.random(chars.length) | 0)]
            }

            return result;
        }
    }









