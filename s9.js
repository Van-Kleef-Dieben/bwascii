s9 = (p) =>
{
    let sample;
    //let speed;

    // let l = 0;
    let m = 0.8;
    let aMult = 1;

    let analyzer;

    p.preload = () => {
        // Load a sound file
        sample = p.loadSound('samples/658932__thearchiveguy99__dial-up_soundmp3.flac');
        sample.rate(1)

      

       
    }
    
    basic.p = p

    lMax = 1
    t = 0

    p.draw = () =>  
    {
        let threshold = basic.getSetting("threshold")
        let aMult = basic.getSetting("aMult")
        let speed = basic.getSetting("speed")
        p.clear();

        sample.rate(speed)
        if (p.random() > 0.9) {
            // speed += p.random(-0.5, 0.5);
            speed *= p.random() 
            // speed = p.constrain(speed, 0.75,  1.2)
            // sample.rate(m  * speed)
        }

        if (sample.isPlaying()) {
            t++
        }

        if (sample.isPlaying() && p.random() > 0.96) {
            if (t > 50 * p.random()) {
                sample.pause()
                t = 0   
            }
            //analyzer = null
        }

        if (!sample.isPlaying() && p.random() > 0.95) {
            //analyzer = new p5.Amplitude();
            // Patch the input to an volume analyzer
            //analyzer.setInput(sample);
            sample.loop()
        }

        if (p.random() > 0.9998) {
            //sample.jump(p.random() * sample.duration() * 0.995)
        }

        l = 0;

        if (sample.isPlaying()) {

            l = analyzer.getLevel() 

            if (l > lMax) {
                lMax = l
            }

            l = p.pow(l / lMax, 1)

            l *= aMult;

            if (l > threshold ) {
                l = 1
            } 
        } 


        p.fill(255, l * 255)
        p.rect(0, 0, p.width / 2, p.height)

    }

    p.setup = () => 
    { 
        basic.setup() 
        basic.addSettingsRandomize()
        basic.addSetting("threshold", "range", 0.5, 0, 1, 0.01, true)
        basic.addSetting("aMult", "range", 1, 1, 10, 0.01, true)
        basic.addSetting("speed", "range", 1, 0.1, 4, 0.01, true)

        sample.loop()
        analyzer = new p5.Amplitude();
        analyzer.setInput(sample);

    }
}

basic.createLink("s9", "FSM")


