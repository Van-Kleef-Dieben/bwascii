s3 = (p) =>
{
    basic.p = p

    let speed = 130;

    p.draw = () => 
    {
        basic.draw();

        basic.clearGrid();
        
        basic.circle(sizeX / 2, sizeY / 2, 10 - p.cos(basic.getFramecount() / speed) * 10, (a) => { return { letter: basic.getchar(".-!^.-.-~+xo░▒▓█", 256 - a, 256), fill: basic._primary }})
        basic.circle(sizeX / 2, sizeY / 2, p.sin(basic.getFramecount() / speed) * 9, (a) => { return { letter: basic.getchar(".-!^.-.-~+xo░▒▓█", a, 256), fill: basic._primary }})

        basic.drawGrid();
    }

    p.setup = () => 
    { 
        basic.setup() 
    }
}