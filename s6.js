s6 = (p) =>
{
    basic.p = p

    let a = 0;
    let b = 0;
    let max = 0;

    //let palette = basic.randomPalette();

    p.draw = () => 
    {
        basic.draw();

        let r0 = basic.getSetting("r0")
        let r1 = basic.getSetting("r1")
        let r2 = basic.getSetting("r2")

        let period = basic.getSetting("period")
        let iterations = basic.getSetting("iterations")
        let step = 0.001
        let fade = basic.getSetting("fade")
        let xy_ratio = basic.getSetting("x/y ratio")
        let ink = 1; //basic.getSetting("ink")
        let opacity = basic.getSetting("opacity")
        let ascii = basic.getSetting("ASCII")
        let maxCutoff = basic.getSetting("max cutoff")
        let oscillateSpeed = basic.getSetting("oscillate speed")
        let colors = basic.getSetting("colors")
        let palette = basic.getSetting("palette")

        basic.updateDatagrid((o) => { o.amount = p.max(0, o.amount - fade); })

        let steps = iterations

        if (oscillateSpeed) {
            let q = p.sin(basic.getFramecount() / period)
            steps = p.max(1, (iterations * q * q) | 0)
        }

        for (let i = 0; i < steps; i++) 
        {
            a += step;
            b += step * (r0 / r1)
          
            let x1 = (sizeX / 2 + xy_ratio * (r0 - r1) * p.cos(a))
            let y1 = (sizeY / 2 + (r0 - r1) * p.sin(a))
            
            let x2 = (x1 + (r2 * p.cos(b))) | 0
            let y2 = (y1 + (r2 * p.sin(b))) | 0

            if (!basic.inGrid(x2, y2)) {
                continue;
            }

            basic.dataGrid[x2][y2].amount = ink //(basic.dataGrid[x2][y2].amount + ink) / 2;
           
        }

        // max = basic.reduceDataGrid({ method: "max", property: "amount"})
        // max *= maxCutoff

        // max = 1

        basic.drawDataGrid((o, x, y) => {
            if (o.amount === 0) {
                return; 
            }

            // let c = basic.mixColors([
            //     { color:  "#D04848", stop: 0.0 },
            //     { color:  "#F3B95F", stop: 0.1 },
            //     { color:  "#FDE767", stop: 0.2 },
            //     { color: "#6895D2", stop: 0.3 },
            //     { color: basic._primary, stop: 0.5 },
            // ], o.amount, max)

            let c = colors ? basic.mixColors(palette, p.min(maxCutoff, o.amount) / maxCutoff) : p.color(basic._primary)

            if (opacity) {
                c.setAlpha(255 * p.min(maxCutoff, o.amount) / maxCutoff | 0)
            }

            return { 
                letter: basic.getchar(ascii, p.min(maxCutoff, o.amount) / maxCutoff, maxCutoff),
                fill: c
            }
        })
        
    }

    p.setup = () => 
    { 
        basic.setup()
        
        basic.addSettingsRandomize((property, setting) => { 
            if (property === "ASCII" && basic.getSetting("ASCII potential") != "") {
                setting.value = basic.randomString(p.max(1, p.random(20) | 0), basic.getSetting("ASCII potential"))
            }

            //palette = basic.randomPalette();

            
           
        });

        basic.onSettingsChanged((property, setting) => {
            if (property === "palette") {
                setting.value = setting.value.split(",")
            }

        })

        basic.addSettingButton("clear canvas", () => { basic.clearDatagrid() })

        basic.addSetting("r0", "range", 21, 0, 25, 0.01, true)
        basic.addSetting("r1", "range", 10, 0, 25, 0.01, true)
        basic.addSetting("r2", "range", 9, 0, 25, 0.01, true)

        // basic.addSetting("step", "range", 0.001, 0.001, 0.01, 0.001, true)
        basic.addSetting("period", "range", 350, 0, 500, 1, true)
        basic.addSetting("iterations", "range", 100, 0, 5000, 1, true)
        basic.addSetting("oscillate speed", "boolean", true, null, null, null, true);
        
        basic.addSetting("fade", "range", 0.017, 0, 0.02, 0.0001, true)
        // basic.addSetting("ink", "range", 5, 0, 100, 1, true)
        basic.addSetting("max cutoff", "range", 1, 0.01, 1, 0.01 );

        

        basic.addSetting("x/y ratio", "range", 1, 0.1, 2, 0.1, true);
        basic.addSetting("opacity", "boolean", true, null, null, null, true);
        
        basic.addSetting("ASCII", "text", ".:-~+xoO&░▒▓█" , null, null, null, true);
        basic.addSetting("ASCII potential", "text", ".-+xo░▒▓████~!@#$%^&*()_=/><:';");

        basic.addSetting("palette", "dropdown", basic.palettes, null, null, null, true);
        basic.addSetting("colors", "boolean", false, null, null, null, true);
        
    }
    

}

