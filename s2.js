let s2 = (p) =>

{

    p.draw  = () =>
    {
        p.clear();
        p.fill("blue")
        p.rect(100, 200, 100, 50);
        console.log("s2")
        // console.log('weoeokweo')
    }

    p.setup = m(p).setup
}