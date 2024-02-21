s6 = (p) =>
{
    basic.p = p

    let a = 0;
    let b = 0;
    let max = 0;

    p.draw = () => 
    {
        basic.draw();

        let r0 = basic.getSetting("r0")
        let r1 = basic.getSetting("r1")
        let r2 = basic.getSetting("r2")

        let period = basic.getSetting("period")
        let iterations = basic.getSetting("iterations")
        let step = basic.getSetting("step")
        let decay = basic.getSetting("decay")
        let xy_ratio = basic.getSetting("x/y ratio")
        let ink = basic.getSetting("ink")
        let opacity = basic.getSetting("opacity")
        let ascii = basic.getSetting("ASCII")

        basic.updateDatagrid((o) => { o.amount = p.max(0, o.amount - decay); })
        

        for (let i = 0; i < p.abs(iterations * p.sin(basic.getFramecount() / period)); i++) 
        {
            a += step;
            b += step * (r0 / r1)

            // let x0 =  (sizeX / 2 + 3.7 * r0 * p.cos(a))
            // let y0 = (sizeY / 2 + r0 * p.sin(a))

            let x1 = (sizeX / 2 + xy_ratio * (r0 - r1) * p.cos(a))
            let y1 = (sizeY / 2 + (r0 - r1) * p.sin(a))
            
            let x2 = (x1 + (r2 * p.cos(b))) | 0
            let y2 = (y1 + (r2 * p.sin(b))) | 0

            // basic.dot_direct(x0, y0, "x");
            // basic.dot_direct(x1, y1, "o");

            if (!basic.inGrid(x2, y2)) {
                continue;
            }

            basic.dataGrid[x2][y2].amount += ink;
            //basic.dot_direct(x2, y2, "x");
        }

        max = basic.reduceDataGrid({ method: "max", property: "amount"})

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

            let c = p.color(basic._primary)

            if (opacity) {
                c.setAlpha(255 * o.amount / max | 0)
            }

            return { 
                letter: basic.getchar(ascii, o.amount, max),
                fill: c
            }
        })
        
    }

    p.setup = () => 
    { 
        basic.setup()
        
        basic.addSettingsRandomize((property, setting) => { 
            if (property === "ASCII" && basic.getSetting("ASCII potential") != "") {
                setting.value = basic.randomString(20, basic.getSetting("ASCII potential"))
            }
        });
        basic.addSettingButton("clear canvas", () => { basic.clearDatagrid() })

        basic.addSetting("r0", "range", 4, 0, 25, 0.01, true)
        basic.addSetting("r1", "range", 14, 0, 25, 0.01, true)
        basic.addSetting("r2", "range", 7, 0, 25, 0.01, true)

        basic.addSetting("step", "range", 0.01, 0, 1, 0.01, true)
        basic.addSetting("period", "range", 200, 0, 2000, 1, true)
        basic.addSetting("iterations", "range", 200, 0, 2000, 1, true)
        basic.addSetting("decay", "range", 1, 0, 1000, 1, true)
        basic.addSetting("ink", "range", 5, 0, 1000, 1, true)
        basic.addSetting("x/y ratio", "range", 1, 0.1, 2, 0.1, true);
        basic.addSetting("opacity", "boolean", false, null, null, null, true);
        basic.addSetting("ASCII", "text", ".-+xo░▒▓████" , null, null, null, true);
        basic.addSetting("ASCII potential", "text", ".-+xo░▒▓████~!@#$%^&*()_=/><:';");
    }
    

}

