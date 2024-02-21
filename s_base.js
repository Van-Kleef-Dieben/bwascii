s_base = (p) =>
{
    basic.p = p

    p.draw = () => 
    {
        basic.draw();
        
    }

    p.setup = () => 
    { 
        basic.setup() 
    }
}