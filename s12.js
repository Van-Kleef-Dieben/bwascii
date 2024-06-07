s12 = (p) => {
        let clockH = 300
        let clockW = 800
    
        isRolling = false
        roll = 0
        rollStep = 0.01
    
        basic.p = p
    
        p.keyPressed = () => {
            isRolling = true
        }
    
        function calculate(value, max) {
            if (value < max / 2) {
                y0 = 0;
                y1 = value / (max / 2);
            }
            else {
                y0 = (value - max / 2) / (max / 2);
                y1 = 1;
            }
    
            return { a: y0, b: y1 }
        }
    
        p.draw = () => 
        {
            p.clear()
    
            let a = new Date().getTime() % (60000) / 60000
    
            x = calculate(a, 1)
    
            if (isRolling) {
                if (roll > 1) {
                    isRolling = false
                    roll = 0
                } else {
                    roll += rollStep
                    let r = calculate((a + roll) % 1, 1)
                    x.a = r.a
                    x.b = r.b
    
                }
            }
            p.rect(x.a * clockW, (p.height - clockH) /2, x.b * clockW,  clockH)
        }
    
        p.update= () => {
    
        }
    
    
        p.setup = () => 
        { 
            basic.setup()
        }
}


basic.createLink("s12", "clock sideways")