s7 = (p) =>
{

    basic.p = p

    function getDirections() {
        if (basic.getSetting("tree mode")) {
            return [[1, 0], [-1, 0], [0, -1]]
        } else {
            return [[-1, 0], [1, 0], [0, -1], [0, 1]]
        }
    }

    p.draw = () => 
    {
        basic.draw();
        basic.createBitMasks("road");

        basic.drawDataGrid((o, x, y) => { 
            
            if (o.road === 0) {
                return;
            }
            

            p.fill(basic._primary)
            
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
           
        })
        
    }

    function createHead(x, y, direction, parent) {

        if (!direction) {
            direction = p.random(getDirections())
        }
        return { x: x, y: y, direction: direction, dead: false }
    }

    function attemptNewHead(head) {

        // @todo: verbeteren met shuffled array
        let attempts = 0;

        while (true) {

            attempts++ 
            if (attempts > 100 ) {
                break;
            }

            let d = p.random(getDirections())
            
            if (d === head.direction) {
                continue;
            }
    
            if (!canGrow(head, d)) {
                continue;
            }
    
            let newHead = createHead(head.x, head.y, d)
    
            grow(newHead, d)
    
            return newHead
        }
    }
    
    function canGrow(head, direction) {

        const [x, y] = direction

        if (!basic.inGrid(head.x + x, head.y + y)) {
            return false
        }

        if (basic.dataGrid[head.x + x][head.y + y].road !== 0) {
            return false
        }

        for (let m of [10, 11, 18, 22, 24, 66, 72, 80, 104, 208]) {
            
            if ((basic.dataGrid[head.x + x][head.y + y].mask & m) === m) {
                return false
            }
        }

        return true;
    }

    function grow(head, direction) {    
        let [x, y] = direction;

        basic.dataGrid[head.x + x][head.y + y].road = 1;
        basic.dataGrid[head.x + x][head.y + y].parent = { x: head.x, y: head.y }
        basic.dataGrid[head.x][head.y].children.push({ x: head.x + x, y: head.y + y})

        basic.updateBitMask("road", head.x + x, head.y + y);

        head.x += x;
        head.y += y;
        // newHeads.push({ x: head.x + x, y: head.y + y, dead: false })
    }

    function kill(x, y) {

        if (!basic.inGrid(x, y)) {
            return;
        }
      
        let nodes = [{ x: x, y: y }];

        while (nodes.length !== 0) {

            let newNodes = []

            for (let node of nodes) {
                let { x, y } = node
                newNodes = newNodes.concat(basic.dataGrid[x][y].children);
                basic.dataGrid[x][y] = resetDatagrid()
            }

            nodes = newNodes
        }

       
    }

    let heads = []

    function update() {

        let newHeads = []

        let branchProbability = basic.getSetting("branch probability")
        let changeDirectionProbability = basic.getSetting("change direction probability"); 

        for (let head of heads) {

            let direction = head.direction

            if (p.random() > (1 - changeDirectionProbability)) {
                head.direction = p.random(getDirections())
            }

            if (p.random() > (1 - branchProbability)) {
                let newHead = attemptNewHead(head);
                if (newHead) {
                    newHeads.push(newHead)
                }
            }

            if (canGrow(head, direction)) {
                grow(head, direction)
                continue;
            }

            let ds = [...getDirections()]

            while (true) {

                if (ds.length === 0) {
                    head.dead = true;
                    break;
                }

                let i = p.random(ds.length) | 0
                let d = ds[i]
                ds.splice(i, 1)

                let [x, y] = d;

                if (!canGrow(head, d)) {
                    continue;
                }
                
                // if (p.random(100) > 93) {
                //     basic.dataGrid[head.x + x][head.y + y].road = 1;
                //     basic.createBitMasks("road");
                //     newHeads.push({ x: head.x + x, y: head.y + y, dead: false })
                //     break;
                // }

              
                grow(head, d)
                head.direction = d;
                
                break;
            }
        }

        heads = heads.filter(head => head.dead === false)
        heads = heads.concat(newHeads);
    }

    function reset() {
        basic.updateDatagrid(resetDatagrid)
        heads = []
        
        heads.push(createHead(sizeX /2  | 0, basic.getSetting("tree mode") ? (sizeY - 1): sizeY / 2 | 0, basic.getSetting("tree mode") ? [0, -1] : null));
    }

    function resetDatagrid() {
        return { road: 0, parent: null, children:  [] } 
    }

    function randomKill() {
        
        while (true) {

            let x = p.random(sizeX) | 0;
            let y = p.random(sizeY) | 0;

            if (basic.dataGrid[x][y].road === 0) {
                continue;                
            }

            kill(x, y);
            break;

        }
    }

    function randomGrow() {

        while (true) {
            let x = p.random(sizeX) | 0;
            let y = p.random(sizeY) | 0;

            if (basic.dataGrid[x][y].road === 0) {
                continue;
            }

            let d = p.random(getDirections());

            let head = attemptNewHead({ x: x, y: y, direction: d})

            if (!head) {
                continue;
            }

            heads.push(head)
            break;
        }
    }

    p.mouseClicked = () => {

        if (p.mouseX !== p.constrain(p.mouseX, 0, 800) || p.mouseY !== p.constrain(p.mouseY, 0, 800)) {
            return;
        }
        
        let x = (p.mouseX / dX) | 0
        let y = (p.mouseY / dY) | 0
        kill(x, y)
    }

    p.setup = () => 
    { 
        basic.setup() 

        
      

        basic.everyNthFrame(1, update)

        basic.addSettingsRandomize(reset);
        basic.addSetting("↻ reset", "button", reset)
        basic.addSetting("☠️ kill", "button", randomKill)
        basic.addSetting("🌱 grow", "button", randomGrow)

        basic.addSetting("branch probability", "range", 0.01, 0, 0.2, 0.001, true); 
        basic.addSetting("change direction probability", "range", 0.01, 0, 1, 0.001, true); 
        basic.addSetting("tree mode", "boolean", false, null, null, null, true); 
        
        reset();

        basic.updateDatagrid((o) => { o.road = 0  } )
        
    } 
}