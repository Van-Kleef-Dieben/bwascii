class Bus {

    lastMessageTransmitted = -1
    initTimeout = 5000

    entities = []

    register(entity) {
        this.entities.push(entity)
    }

    send(sender, message) {
        for (let entity of this.entities) {
            if (entity == sender) {
                continue
            }

            this.lastMessageTransmitted = new Date().getTime()

            entity.onMessage(message, sender);
        }
    }

    update(p) {

        if (this.lastMessageTransmitted === -1 || this.lastMessageTransmitted + this.initTimeout < new Date().getTime()) {
            
            for (let entity of this.entities) {
                if (p.random(1000) > 800) {
                    entity.sendMessage("initializing contact")
                    return;
                }
            }
        } 
    }
}

class Entity {

    lastMessageSent = -1
    lastMessageReceived = -1
    
    // sendTimeout = 3000
    // receiveTimeout = 3000

    timeout = 5000
    cofactor = -0.001

    other = null

    dimStrength = 200

    osc = null
    envelope = null

    basePitch = 100
    rampTime = 0.1


    constructor(bus, name) {
        this.name = name
        this.bus = bus
        bus.register(this)
        this.osc = new p5.SinOsc();
        this.osc.freq(this.basePitch, this.rampTime)
        this.osc.start()

        this.envelope = new p5.Env();
        this.envelope.setADSR(0.01, 0.1, 0.1, 0.01);

        this.osc.amp(this.envelope)
    }

    onMessage(message, sender) {
        this.lastMessageReceived = new Date().getTime()
        this.otherTimeout = sender.timeout
        // if (this.timeout < 100) {
        //     this.timeout = 100
        // }
        
    }

    sendMessage(message) {
        this.lastMessageSent = new Date().getTime()
        this.bus.send(this, message, this.timeout)
        this.envelope.play()
    }

    update(p) {

        
        this.osc.freq(this.basePitch, this.rampTime)
        if (this.lastMessageReceived !== -1) {
            console.log(this.name + " => " + this.timeout, this.other.timeout)
            this.timeout += this.cofactor * this.other.timeout

            // if (this.timeout < 300) {
            //     this.timeout = 300
            // }

        }
        // console.log(this.name + "=>" + this.timeout)

        // if (this.lastMessageReceived !== -1 && this.lastMessageReceived + this.timeout > new Date().getTime()) {
        //     return
        // }

        // if (this.timeout < 0) {
        //     return;
        // }

        if (this.lastMessageSent === -1 || this.lastMessageSent + this.timeout < new Date().getTime()) {
            if (p.random(1000) > 800) {
                this.sendMessage(this.name + " sending a message")
            }
        }
    }

    brightness (p) {
        let d = new Date().getTime() - this.lastMessageSent
        d = p.max(0, this.dimStrength - d) / this.dimStrength * 255
        return d
    }
}

s10 = (p) =>
    {

        let bus = new Bus();

        let a = new Entity(bus, "Romeo");
        let b = new Entity(bus, "Juliette");

        a.other = b
        b.other = a

        b.basePitch = 2000
        b.rampTime = 0.3

        // b.sendTimeout = 200
        // b.dimStrength = 1000
        b.cofactor = 0.001
        
        // a.onMessage = function (message) {
        //     if (p.random(1000) > 800) {
        //         this.sendMessage("a is sending a message")
        //     }
        // }

        // b.onMessage = function (message) {
        //     if (p.random(1000) > 800) {
        //         this.sendMessage("b is sending a message")
        //     }
        // }

        // setInterval(() => { 
        //     if (p.random(1000) > 995) {
        //         b.sendMessage("b is initiating contact")
        //     } else if (p.random(1000) > 995) {
        //         a.sendMessage("a is initiating contact")
        //     }
        // })

        // let sample;
        // //let speed;
    
        // // let l = 0;
        // let m = 0.8;
        // let aMult = 1;
    
        // let analyzer;
    
        // p.preload = () => {
        //     // Load a sound file
        //     sample = p.loadSound('samples/658932__thearchiveguy99__dial-up_soundmp3.flac');
        //     sample.rate(1)
    
          
    
           
        // }
        
        basic.p = p
    
        lMax = 1
        t = 0
    
        p.draw = () =>  
        {

            p.clear()
            a.update(p)
            b.update(p)

            bus.update(p)

           
           // console.log(a.lastMessageSent - new Date().getTime())
          //  d = p.constrain(500 - d, 0, 500) / 500 * 255
//            let l = (a.lastMessageSent === -1 ? 0 : 100 - new Date().getTime() + a.lastMessageSent ) * 255 / 100
            //            console.log(d)
            p.fill(255, a.brightness(p))
            p.rect(0, 0, p.width / 2, p.height)

            p.fill(255, b.brightness(p))
            p.rect(p.width / 2, 0, p.width, p.height)

            // let threshold = basic.getSetting("threshold")
            // let aMult = basic.getSetting("aMult")
            // let speed = basic.getSetting("speed")
            // p.clear();
    
            // sample.rate(speed)
            // if (p.random() > 0.9) {
            //     // speed += p.random(-0.5, 0.5);
            //     speed *= p.random() 
            //     // speed = p.constrain(speed, 0.75,  1.2)
            //     // sample.rate(m  * speed)
            // }
    
            // if (sample.isPlaying()) {
            //     t++
            // }
    
            // if (sample.isPlaying() && p.random() > 0.96) {
            //     if (t > 50 * p.random()) {
            //         sample.pause()
            //         t = 0   
            //     }
            //     //analyzer = null
            // }
    
            // if (!sample.isPlaying() && p.random() > 0.95) {
            //     //analyzer = new p5.Amplitude();
            //     // Patch the input to an volume analyzer
            //     //analyzer.setInput(sample);
            //     sample.loop()
            // }
    
            // if (p.random() > 0.9998) {
            //     //sample.jump(p.random() * sample.duration() * 0.995)
            // }
    
            // l = 0;
    
            // if (sample.isPlaying()) {
    
            //     l = analyzer.getLevel() 
    
            //     if (l > lMax) {
            //         lMax = l
            //     }
    
            //     l = p.pow(l / lMax, 1)
    
            //     l *= aMult;
    
            //     if (l > threshold ) {
            //         l = 1
            //     } 
            // } 
    
    
            // p.fill(255, l * 255)
           // p.rect(0, 0, p.width / 2, p.height)
    
        }
    
        p.setup = () => 
        { 
            basic.setup() 
            basic.addSettingsRandomize()
            basic.addSetting("threshold", "range", 0.5, 0, 1, 0.01, true)
            basic.addSetting("aMult", "range", 1, 1, 10, 0.01, true)
            basic.addSetting("speed", "range", 1, 0.1, 4, 0.01, true)
    
            // sample.loop()
            // analyzer = new p5.Amplitude();
            // analyzer.setInput(sample);
    
        }
    }
    
    basic.createLink("s10", "Romeo & Juliette")
    
    
    