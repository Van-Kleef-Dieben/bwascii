s7 = (p) =>
{

 

    basic.p = p

    p.draw = () => 
    {
        basic.draw();

        basic.createBitMasks("road");
        basic.drawDataGrid((o, x, y) => { 
            
            if (o.road === 0) {
                return;
            }
            //if (o.mask === 0) return; 

            p.fill(255)
            //p.textSize(8)
            if ((o.mask & 90) === 24) {
                p.text("─", x * dX, y * dY )
            }

            if ((o.mask & 90) === 66) {
                p.text("│", x * dX, y * dY )
            }

            if ((o.mask & 90) === 10) {
                p.text("┘", x * dX, y * dY )
            }

            if ((o.mask & 90) === 18) {
                p.text("└", x * dX, y * dY )
            } 
            if ((o.mask & 90) === 72) {
                p.text("┐", x * dX, y * dY )
            } 
            if ((o.mask & 90) === 80) {
                p.text("┌", x * dX, y * dY )
            } 

            if ((o.mask & 90) === 88) {
                p.text(" ┬", x * dX, y * dY )
            } 
              
            if ((o.mask & 90) === 26) {
                p.text("┴", x * dX, y * dY )
            } 
           

            // let letter;
            // switch (true) {
            //     case (o.mask | 66) === 0: letter = "-"; break;
            //     case (o.mask | 24) === 0: letter = "|"; break;
            //     case (o.mask | 4) === 4: letter = "C"; break;
            //     // case 2: letter = "A"; break;


            // }

            return { letter: o.road !== 0 ? "."  :"", fill: "red"}
        })

        
        
        
    }

    p.setup = () => 
    { 
        basic.setup() 

        basic.updateDatagrid((o) => { o.road = Number(p.random(15) > 12) } )
        
    } 
}