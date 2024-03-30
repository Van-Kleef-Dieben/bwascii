s9 = (p) =>
{
    let sample;
    let speed = 0.25;

    // let l = 0;
    let m = 0.8;
    let aMult = 4;

    let analyzer;

    p.preload = () => {
        // Load a sound file
        sample = p.loadSound('samples/275315__deleted_user_4798915__robotic_angry_01.wav');
        sample.rate(m * speed)

      

       
    }
    
    basic.p = p

    lMax = 1
    t = 0

    p.draw = () =>  
    {
        let threshold = basic.getSetting("threshold")
        p.clear();

        if (p.random() > 0.8) {
            speed += p.random(-0.1, 0.1);
            speed = p.constrain(speed, 0.75,  1.2)
            sample.rate(m  * speed)
        }

        if (sample.isPlaying()) {
            t++
        }

        if (sample.isPlaying() && p.random() > 0.96) {
            if (t > 25) {
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
            sample.jump(p.random() * sample.duration() * 0.995)
        }


        if (sample.isPlaying()) {

            l = analyzer.getLevel() 

            if (l > lMax) {
                lMax = l
            }

            l = p.pow(l / lMax, 1)

            if (l * aMult > threshold ) {
                p.fill(255)
                p.rect(0, 0, p.width / 2, p.height)
                l = 1
            } else {
                l = 0
            }

            l *= 255

            

        } else {
            l = 0;
        }

      //  l = p.constrain(l, 0, 255)

        // p.fill(255, l)
        // p.rect(0, 0, p.width / 2, p.height)

        // p.fill(0, 50) 
        // p.rect(0, 0, p.width, p.height)
       

        

        if (l > 0) {
           
        }


      



    }

    p.setup = () => 
    { 
        basic.setup() 
        basic.addSettingsRandomize()
        basic.addSetting("threshold", "range", 0.5, 0, 1, 0.01, true)

        sample.loop()
        analyzer = new p5.Amplitude();
        analyzer.setInput(sample);

    }
}

basic.createLink("s9", "FSM")


