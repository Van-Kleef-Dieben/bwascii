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

            p.fill(basic._primary)
            //p.textSize(8)
            if ((o.mask & 66) === 0) {
                p.text("─", x * dX, y * dY )
            }

            else if ((o.mask & 24) === 0) {
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
                p.text("┬", x * dX, y * dY )
            } 
              
            if ((o.mask & 90) === 26) {
                p.text("┴", x * dX, y * dY )
            } 

            if ((o.mask & 90) === 82) {
                p.text("├", x * dX, y * dY )
            } 

            if ((o.mask & 90) === 74) {
                p.text("┤", x * dX, y * dY )
            } 

            if ((o.mask & 90) === 90) {
                p.text("┼", x * dX, y * dY )
            } 
           

            // let letter;
            // switch (true) {
            //     case (o.mask | 66) === 0: letter = "-"; break;
            //     case (o.mask | 24) === 0: letter = "|"; break;
            //     case (o.mask | 4) === 4: letter = "C"; break;
            //     // case 2: letter = "A"; break;


            // }

            //return { letter: o.road !== 0 ? "░"  :"", fill: "red"}
        })

        
        
        
    }

    let heads = []

    function update() {

        

        let newHeads = []

        for (let head of heads) {

            let ds = [[-1, 0], [1, 0], [0, -1], [0, 1]]

            while (true) {

                if (ds.length === 0) {
                    head.dead = true;
                    break;
                }

                let i = p.random(ds.length) | 0
                let d = ds[i]
                ds.splice(i, 1)

                let [x, y] = d;

                let no = false;

                if (!basic.inGrid(head.x + x, head.y + y)) {
                    continue
                }

                if (basic.dataGrid[head.x + x][head.y + y].road !== 0) {
                    continue
                }

                for (let m of [10, 11, 18, 22, 24, 66, 72, 80, 104, 208]) {
                    
                    if ((basic.dataGrid[head.x + x][head.y + y].mask & m) === m) {
                        no = true;
                    }
                }

                if (no) {
                    continue;
                }
                
                if (p.random(100) > 93) {
                    basic.dataGrid[head.x + x][head.y + y].road = 1;
                    basic.createBitMasks("road");
                    newHeads.push({ x: head.x + x, y: head.y + y, dead: false })
                    break;
                }

                head.x += x;
                head.y += y;

                basic.dataGrid[head.x][head.y].road = 1;
                basic.createBitMasks("road");
                
                break;
            }
        }

        heads = heads.filter(head => head.dead === false)
        heads = heads.concat(newHeads);
    }

    p.setup = () => 
    { 
        basic.setup() 

        heads.push({ x: sizeX /2  | 0, y: sizeY / 2 | 0, dead: false })

        basic.everyNthFrame(2, update)

        basic.updateDatagrid((o) => { o.road = 0  } )
        
    } 
}