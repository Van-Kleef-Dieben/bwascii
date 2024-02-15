s4 = (p) => {

    basic.p = p;

    let flies = []

    function update() {
        flies.forEach(fly => {
            if (fly.timer === 0) {
                basic.dot(fly.x, fly.y, fly.letter)
            }

            fly.timer++;
            if (fly.timer * 10 > fly.maxTimer) {
                fly.timer = 0;
            }
        })

    }

    p.draw = () => {
        basic.draw();

        basic.clearGrid();

        update();

        basic.drawGrid();
    }

    p.setup = () => {
        basic.setup()

        for (let i = 0; i < sizeX; i++) {
            for (let j = 0; j < sizeY; j++) {
                flies.push({ x: i, y: j, timer: p.random(300) | 0, letter: basic.getchar("!@#$%^"), maxTimer: p.random(300) | 0 })
            }
        }
    }

}
