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
        let step = basic.getSetting("step")
        let fade = basic.getSetting("fade")
        let xy_ratio = basic.getSetting("x/y ratio")
        let ink = 1; //basic.getSetting("ink")
        let opacity = basic.getSetting("opacity")
        let ascii = basic.getSetting("ASCII")
        let maxCutoff = basic.getSetting("max cutoff")
        let oscillateSpeed = basic.getSetting("oscillate speed")
        let colors = basic.getSetting("colors")
        let palette = basic.getSetting("palette")

        let color1 = basic.getSetting("color 1")
        let color2 = basic.getSetting("color 2")
        let color3 = basic.getSetting("color 3")
        let color4 = basic.getSetting("color 4")
        let color5 = basic.getSetting("color 5")

        basic.updateDatagrid((o) => { o.amount = p.max(0, o.amount - fade); })

        let steps = iterations

        if (oscillateSpeed) {
            let q = p.sin(basic.getFramecount() / period)
            steps = p.max(1, (iterations * q * q) | 0)
        }

        for (let i = 0; i < iterations; i++) 
        {

            // a = i * step;
            // b = i * step * (r0 / r1);


            for (let pp = 0; pp < p.TWO_PI; pp += step * p.TWO_PI) {
                a += step;
                b += step * (r0 / r1)
            
                let x1 = (sizeX / 2 + xy_ratio * (r0 - r1) * p.cos(a))
                let y1 = (sizeY / 2 + (r0 - r1) * p.sin(a))
                
                let x2 = (x1 + (r2 * p.cos(b))) | 0
                let y2 = (y1 + (r2 * p.sin(b))) | 0

                if (!basic.inGrid(x2, y2)) {
                    continue;
                }

                basic.dataGrid[x2][y2].amount = ink
            }
           
        }

        basic.drawDataGrid((o, x, y) => {
            if (o.amount === 0) {
                return; 
            }

            let c = colors ? basic.mixColors([color1, color2, color3, color4, color5], p.min(maxCutoff, o.amount) / maxCutoff) : p.color(basic._primary)

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
        
        basic.addSettingsRandomize((settings) => { 

            if (basic.getSetting("ASCII potential") != "") {
                basic.setSetting("ASCII", basic.randomString(p.max(1, p.random(20) | 0), basic.getSetting("ASCII potential")))
            }

            //palette = basic.randomPalette();

            
           
        });

        basic.onSettingsChanged((property, setting) => {
            if (property === "palette") {
                
                let colors = setting.value.split(",")
               
                colors.forEach((e, i) => {
                    basic.setSetting("color " + (i + 1), e)
                });
            }

        })

        basic.addSettingButton("clear canvas", () => { basic.clearDatagrid() })

        basic.addSetting("r0", "range", 5.38, 0, 25, 0.01, true)
        basic.addSetting("r1", "range", 10.67, 0, 25, 0.01, true)
        basic.addSetting("r2", "range", 16.4, 0, 25, 0.01, true)

        basic.addSetting("step", "range", 0.001, 0.001, 1, 0.001, true)
        basic.addSetting("iterations", "range", 1, 1, 25, 1, true)


        basic.addSetting("oscillate speed", "boolean", true, null, null, null, true);
        basic.addSetting("period", "range", 350, 0, 500, 1, true)
        
        basic.addSetting("fade", "range", 0.017, 0, 0.1, 0.0001, true)
        // basic.addSetting("ink", "range", 5, 0, 100, 1, true)
        basic.addSetting("max cutoff", "range", 1, 0.01, 1, 0.01 );

       

        

        basic.addSetting("x/y ratio", "range", 1, 0.1, 2, 0.1, true);
        basic.addSetting("opacity", "boolean", true, null, null, null, true);
        
        basic.addSetting("ASCII", "text", "012345689" , null, null, null, true);
        basic.addSetting("ASCII potential", "text", ".-+xo░▒▓████~!@#$%^&*()_=/><:';");

        basic.addSetting("colors", "boolean", true, null, null, null, true);

        basic.addSetting("color 1", "color", "#fa1234"); 
        basic.addSetting("color 2", "color", "#a1f234"); 
        basic.addSetting("color 3", "color", "#23423f"); 
        basic.addSetting("color 4", "color", "#113a2f"); 
        basic.addSetting("color 5", "color", "#aa0a24"); 

        basic.addSetting("palette", "dropdown", basic.palettes, null, null, null, true);

        
    }
    

}

