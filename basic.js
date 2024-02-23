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
        palettes: [["#69d2e7","#a7dbd8","#e0e4cc","#f38630","#fa6900"],["#fe4365","#fc9d9a","#f9cdad","#c8c8a9","#83af9b"],["#ecd078","#d95b43","#c02942","#542437","#53777a"],["#556270","#4ecdc4","#c7f464","#ff6b6b","#c44d58"],["#774f38","#e08e79","#f1d4af","#ece5ce","#c5e0dc"],["#e8ddcb","#cdb380","#036564","#033649","#031634"],["#490a3d","#bd1550","#e97f02","#f8ca00","#8a9b0f"],["#594f4f","#547980","#45ada8","#9de0ad","#e5fcc2"],["#00a0b0","#6a4a3c","#cc333f","#eb6841","#edc951"],["#e94e77","#d68189","#c6a49a","#c6e5d9","#f4ead5"],["#3fb8af","#7fc7af","#dad8a7","#ff9e9d","#ff3d7f"],["#d9ceb2","#948c75","#d5ded9","#7a6a53","#99b2b7"],["#ffffff","#cbe86b","#f2e9e1","#1c140d","#cbe86b"],["#efffcd","#dce9be","#555152","#2e2633","#99173c"],["#343838","#005f6b","#008c9e","#00b4cc","#00dffc"],["#413e4a","#73626e","#b38184","#f0b49e","#f7e4be"],["#ff4e50","#fc913a","#f9d423","#ede574","#e1f5c4"],["#99b898","#fecea8","#ff847c","#e84a5f","#2a363b"],["#655643","#80bca3","#f6f7bd","#e6ac27","#bf4d28"],["#00a8c6","#40c0cb","#f9f2e7","#aee239","#8fbe00"],["#351330","#424254","#64908a","#e8caa4","#cc2a41"],["#554236","#f77825","#d3ce3d","#f1efa5","#60b99a"],["#5d4157","#838689","#a8caba","#cad7b2","#ebe3aa"],["#8c2318","#5e8c6a","#88a65e","#bfb35a","#f2c45a"],["#fad089","#ff9c5b","#f5634a","#ed303c","#3b8183"],["#ff4242","#f4fad2","#d4ee5e","#e1edb9","#f0f2eb"],["#f8b195","#f67280","#c06c84","#6c5b7b","#355c7d"],["#d1e751","#ffffff","#000000","#4dbce9","#26ade4"],["#1b676b","#519548","#88c425","#bef202","#eafde6"],["#5e412f","#fcebb6","#78c0a8","#f07818","#f0a830"],["#bcbdac","#cfbe27","#f27435","#f02475","#3b2d38"],["#452632","#91204d","#e4844a","#e8bf56","#e2f7ce"],["#eee6ab","#c5bc8e","#696758","#45484b","#36393b"],["#f0d8a8","#3d1c00","#86b8b1","#f2d694","#fa2a00"],["#2a044a","#0b2e59","#0d6759","#7ab317","#a0c55f"],["#f04155","#ff823a","#f2f26f","#fff7bd","#95cfb7"],["#b9d7d9","#668284","#2a2829","#493736","#7b3b3b"],["#bbbb88","#ccc68d","#eedd99","#eec290","#eeaa88"],["#b3cc57","#ecf081","#ffbe40","#ef746f","#ab3e5b"],["#a3a948","#edb92e","#f85931","#ce1836","#009989"],["#300030","#480048","#601848","#c04848","#f07241"],["#67917a","#170409","#b8af03","#ccbf82","#e33258"],["#aab3ab","#c4cbb7","#ebefc9","#eee0b7","#e8caaf"],["#e8d5b7","#0e2430","#fc3a51","#f5b349","#e8d5b9"],["#ab526b","#bca297","#c5ceae","#f0e2a4","#f4ebc3"],["#607848","#789048","#c0d860","#f0f0d8","#604848"],["#b6d8c0","#c8d9bf","#dadabd","#ecdbbc","#fedcba"],["#a8e6ce","#dcedc2","#ffd3b5","#ffaaa6","#ff8c94"],["#3e4147","#fffedf","#dfba69","#5a2e2e","#2a2c31"],["#fc354c","#29221f","#13747d","#0abfbc","#fcf7c5"],["#cc0c39","#e6781e","#c8cf02","#f8fcc1","#1693a7"],["#1c2130","#028f76","#b3e099","#ffeaad","#d14334"],["#a7c5bd","#e5ddcb","#eb7b59","#cf4647","#524656"],["#dad6ca","#1bb0ce","#4f8699","#6a5e72","#563444"],["#5c323e","#a82743","#e15e32","#c0d23e","#e5f04c"],["#edebe6","#d6e1c7","#94c7b6","#403b33","#d3643b"],["#fdf1cc","#c6d6b8","#987f69","#e3ad40","#fcd036"],["#230f2b","#f21d41","#ebebbc","#bce3c5","#82b3ae"],["#b9d3b0","#81bda4","#b28774","#f88f79","#f6aa93"],["#3a111c","#574951","#83988e","#bcdea5","#e6f9bc"],["#5e3929","#cd8c52","#b7d1a3","#dee8be","#fcf7d3"],["#1c0113","#6b0103","#a30006","#c21a01","#f03c02"],["#000000","#9f111b","#b11623","#292c37","#cccccc"],["#382f32","#ffeaf2","#fcd9e5","#fbc5d8","#f1396d"],["#e3dfba","#c8d6bf","#93ccc6","#6cbdb5","#1a1f1e"],["#f6f6f6","#e8e8e8","#333333","#990100","#b90504"],["#1b325f","#9cc4e4","#e9f2f9","#3a89c9","#f26c4f"],["#a1dbb2","#fee5ad","#faca66","#f7a541","#f45d4c"],["#c1b398","#605951","#fbeec2","#61a6ab","#accec0"],["#5e9fa3","#dcd1b4","#fab87f","#f87e7b","#b05574"],["#951f2b","#f5f4d7","#e0dfb1","#a5a36c","#535233"],["#8dccad","#988864","#fea6a2","#f9d6ac","#ffe9af"],["#2d2d29","#215a6d","#3ca2a2","#92c7a3","#dfece6"],["#413d3d","#040004","#c8ff00","#fa023c","#4b000f"],["#eff3cd","#b2d5ba","#61ada0","#248f8d","#605063"],["#ffefd3","#fffee4","#d0ecea","#9fd6d2","#8b7a5e"],["#cfffdd","#b4dec1","#5c5863","#a85163","#ff1f4c"],["#9dc9ac","#fffec7","#f56218","#ff9d2e","#919167"],["#4e395d","#827085","#8ebe94","#ccfc8e","#dc5b3e"],["#a8a7a7","#cc527a","#e8175d","#474747","#363636"],["#f8edd1","#d88a8a","#474843","#9d9d93","#c5cfc6"],["#046d8b","#309292","#2fb8ac","#93a42a","#ecbe13"],["#f38a8a","#55443d","#a0cab5","#cde9ca","#f1edd0"],["#a70267","#f10c49","#fb6b41","#f6d86b","#339194"],["#ff003c","#ff8a00","#fabe28","#88c100","#00c176"],["#ffedbf","#f7803c","#f54828","#2e0d23","#f8e4c1"],["#4e4d4a","#353432","#94ba65","#2790b0","#2b4e72"],["#0ca5b0","#4e3f30","#fefeeb","#f8f4e4","#a5b3aa"],["#4d3b3b","#de6262","#ffb88c","#ffd0b3","#f5e0d3"],["#fffbb7","#a6f6af","#66b6ab","#5b7c8d","#4f2958"],["#edf6ee","#d1c089","#b3204d","#412e28","#151101"],["#9d7e79","#ccac95","#9a947c","#748b83","#5b756c"],["#fcfef5","#e9ffe1","#cdcfb7","#d6e6c3","#fafbe3"],["#9cddc8","#bfd8ad","#ddd9ab","#f7af63","#633d2e"],["#30261c","#403831","#36544f","#1f5f61","#0b8185"],["#aaff00","#ffaa00","#ff00aa","#aa00ff","#00aaff"],["#d1313d","#e5625c","#f9bf76","#8eb2c5","#615375"],["#ffe181","#eee9e5","#fad3b2","#ffba7f","#ff9c97"],["#73c8a9","#dee1b6","#e1b866","#bd5532","#373b44"],["#805841","#dcf7f3","#fffcdd","#ffd8d8","#f5a2a2"]],

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

            this._settings[property] = { type: type, value: value, min: min, max: max, step: step, randomize: randomize, options: type === "dropdown" ? value : null }

            let callback = (v) => { 
                // this._settings[property].value = v; 

                // if (this._settings[property].type === "dropdown") {
                //     this._settings[property].value = v.value; 
                // }

                // if (typeof this._onSettingsChanged === "function") {
                //     this._onSettingsChanged(property, this._settings[property])
                // }

                this.setSetting(property, v, false)
            }

            switch(type) 
            {
                case "range":       this._quickSettings.addRange(property, min, max, this._settings[property].value, step, callback); break;
                case "boolean":     this._quickSettings.addBoolean(property, value ?? false, callback); break;
                case "text":        this._quickSettings.addText(property, value ?? "", callback); break;
                case "dropdown":    this._quickSettings.addDropDown(property, value, callback); break;
                case "color":       this._quickSettings.addColor(property, value, callback); break;
                case "button":      this._quickSettings.addButton(property, value, min); break;
            }
          
        },

        setSetting(property, value, setQuickSettings = true) {
            let setting = this._settings[property]

            setting.value = value;

            if (this._settings[property].type === "dropdown" && !setQuickSettings) {
                this._settings[property].value = value.value; 
            }

            if (setQuickSettings) {
                this._quickSettings.setValue(property, setting.type === "dropdown" ? setting.options.indexOf(setting.value): setting.value);
            }

            if (typeof this._onSettingsChanged === "function") {
                this._onSettingsChanged(property, setting)
            }

        },

        randomPalette() {
            return this.p.random(this.palettes)
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

                    let randomValue;

                    switch (setting.type) {
                        case "range":       randomValue = this.p.random(setting.min, setting.max); break;
                        case "boolean":     randomValue = this.p.random(2) > 1; break;
                        case "text":        randomValue = this.randomString(20); break;
                        case "dropdown":    randomValue = this.p.random(setting.options); break;

                        // default:
                        //                     setting.value = 
                    }

                    this.setSetting(property, randomValue);
                    
                }

                if (typeof callback === "function") {
                    callback(this._settings)
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
                        let o = callback(this.dataGrid[i][j], i, j)

                        if (o) {
                            this.dataGrid[i][j] = o;
                        }
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

            if (this._quickSettings) {
                this._quickSettings.destroy();
                this._quickSettings = null
            }

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
            console.log(colors)
            if (colors.length < 2)
            {
                throw "Incorrect use of mixColors, only 1 color"
            }

            let colorA
            let colorB
            
            let i;

            if (value > max) {
                value = max;
            }

            // if (typeof colors[i] === "object") {

            //     for (i = 0; i < colors.length - 1; i++)
            //     {
            //         colorA = colors[i]
            //         colorB = colors[i + 1]

            //         if (value/max < colors[i + 1].stop)
            //         {
            //             break;
            //         }

            //     }


            // } else {
                i = value / max * (colors.length - 1) | 0

                colorA = colors[i]
                colorB = colors[this.p.min(colors.length - 1, i + 1)]
            // }

            if (colorA === undefined || colorB === undefined) {
                console.log(value, max, colorA, colorB)
            }

            

            return this.p.lerpColor(this.p.color(colorA), this.p.color(colorB), value % (max / colors.length) * colors.length)
            
        },

        randomString(length, chars = "abcdefghijklmnopqrstuvwxyz0123456789") {

            let result = ""

            for (let i = 0; i < length; i++){
                result += chars[(this.p.random(chars.length) | 0)]
            }

            return result;
        },

        /*

            bitmask values:


        */ 

        createBitMasks(property) {

            for (let i = 0; i < sizeX; i++) {
                for (let j = 0; j < sizeY; j++) {
                    this.calculateBitMask(property, i, j);
                    
                }
            }
        },

        updateBitMask(property, x, y) {

            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    this.calculateBitMask(property, x + i, x + j);                    
                }
            }
        },

        calculateBitMask(property, x, y) {

            if (!this.inGrid(x, y)) {
                return;
            }

            this.dataGrid[x][y].mask = 0

                    let f = -1
 
                    for (let l = -1; l <=1; l++) {
                        for (let k = -1; k <=1; k++) {

                            if (k == 0 && l == 0) {
                                continue
                            }

                            f++

                            if (!this.inGrid(x + k, y + l)) {
                                continue;
                            }
                                               
                            if (this.dataGrid[x + k][y + l][property]) { // truthy evaluation
                                this.dataGrid[x][y].mask |= 1 << f
                            }
                            
                        }
                    }
        }
    }









