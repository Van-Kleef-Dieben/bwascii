let s1 = (p) =>

{

    p.draw  = () =>
    {
        p.clear()
        p.fill("red")
        p.circle(100, 200, 100);
        console.log("s1")
        // console.log('weoeokweo')
    }

    p.setup = m(p).setup
}