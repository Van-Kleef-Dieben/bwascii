s9 = (p) =>
{

    
    basic.p = p

    let osc;

    let words = [
        '.--...-.-.',
        '.--',
        '.---',
        '.--.-..',
        '--.-.-.',
        '.-',
        "--.--",
        '..'


    ]

    let filter = new p5.LowPass();
    let delay = new p5.Delay();
    let distortion = new p5.Distortion();
    let reverb = new p5.Reverb();


    let sm_a_word = null
    let sm_a_timestamp = null
    let sm_a_word_index = null

    let light = 0;

    let settings = {
        init: 'neutral',
        transitions: [
          { name: 'neutral', from: "*", to: "neutral"},
          { name: 'hurt', from: "*", to: "hurt" },
          { name: 'angry', from: "*", to: "angry"},
          { name: 'sad', from: "*", to: "*"},
          { name: 'relax', from: "*", to: "neutral"}
        ],
        // methods: {
        //   onMelt:     function() { console.log('I melted')    },
        //   onFreeze:   function() { console.log('I froze')     },
        //   onVaporize: function() { console.log('I vaporized') },
        //   onCondense: function() { console.log('I condensed') }
        // }
    }

     
    let sm_a = new StateMachine(settings);
    let sm_b = new StateMachine(settings);

    function setupEffects() {

        let useFilter = basic.getSetting("use filter")
        let filterType = basic.getSetting("filter type")
        let filterFrequency = basic.getSetting("filter freq")
        let filterR = basic.getSetting("filter R")


        filter.disconnect();

        let useDelay = basic.getSetting("use delay")
        let delayTime = basic.getSetting("delay time")
        let delayFeedback = basic.getSetting("delay feedback")
        let delayFreq = basic.getSetting("delay freq")

        delay.disconnect();
        

        let useDistortion = basic.getSetting("use distortion")
        let distortionAmount = basic.getSetting("distortion amount")
      
        distortion.disconnect();


        let useReverb = basic.getSetting("use reverb")
        let reverbTime = basic.getSetting("reverb time")
        let reverbDecay = basic.getSetting("reverb decay")
        let reverbDryWet = basic.getSetting("reverb dry/wet")

        reverb.disconnect()

        let effect = osc;

        osc.disconnect()
        
        
        if (useFilter) {
           

            filter.setType(filterType)
            filter.freq(filterFrequency)
            filter.res(filterR)
            effect.connect(filter)
            effect = filter;
            
        }

        if (useDelay) {
            effect.connect(delay)
            delay.delayTime(delayTime)
            delay.feedback(delayFeedback)
            delay.filter(delayFreq)
            delay.disconnect();
            effect = delay
           
                       
            //delay.process(osc, delayFreq)
        }

        if (useDistortion) {
            effect.connect(distortion)
            distortion.set(distortionAmount)
            effect = distortion
           
                       
            //delay.process(osc, delayFreq)
        }

        if (useReverb) {
            effect.connect(reverb)
            reverb.set(reverbTime, reverbDecay)
            reverb.drywet(reverbDryWet)
            effect = reverb
           
                       
            //delay.process(osc, delayFreq)
        }

        effect.connect()
        

        // filter.freq(filterFrequency)
        // filter.res(filterR);
        



        // 

        // if (useDelay) {
        //     delay.connect()
            
        // }  else {
        //     delay.disconnect()
        // }
    }

    function updateWord() {

        let slowdown = basic.getSetting("slow down");
        let oscillator = basic.getSetting("oscillator")

        let basePitch = basic.getSetting("base pitch")
        let pitchMultiplier = basic.getSetting("pitch change")
        let lengthMultiplier = basic.getSetting("length multiplier")
        let rampTime = basic.getSetting("Ramp between fqs");

        
        // if (useDelay !== basic.getSetting("use delay")) {
        //     useDelay = basic.getSetting("use delay")
        // }



        let a = basic.getSetting("A")
        let d = basic.getSetting("D")
        let s = basic.getSetting("S")
        let r = basic.getSetting("R")

        let t = a + d + s + r + (slowdown / 1000)

        if (!sm_a_word) {
            return;
        }

        if (sm_a_timestamp === null) {

            if (sm_a_word_index === null) {
                sm_a_word_index = 0
            } else {
                sm_a_word_index++;
            }

            console.log(sm_a_word, sm_a_word_index)

            if (sm_a_word_index < sm_a_word.length) {

                
                let f = sm_a_word[sm_a_word_index]
                if (f === '.') {
                    if (oscillator !== "noise") {
                        osc.freq(basePitch, rampTime)
                    }
                    envelope.setADSR(a, d, s, r);
                    sm_a_timestamp = new Date().getTime() + (t * 1000 | 0)
                   
                }

                if (f === '-') {
                    if (oscillator !== "noise") {
                        osc.freq(basePitch * pitchMultiplier, rampTime)
                    }
                    envelope.setADSR(a, d * lengthMultiplier, s, r);
                    sm_a_timestamp = new Date().getTime() + (t * 1000 * lengthMultiplier | 0  )
                }

               

                light = 255;

                envelope.play()
            } else {
                sm_a_word_index = null
                sm_a_word = null
            }

            return;

        }

        if (sm_a_timestamp < new Date().getTime()) {
            sm_a_timestamp = null;
                        
        }


    }

    function updateStateMachine(one, other) {

        let speakChance = basic.getSetting("speak chance")

        updateWord()

        if (!sm_a_word) {
            if (p.random() > (1 - speakChance))
            sm_a_word = p.random(words)
        }

        if (one.is('angry')) {
           
        }

        if (p.random() > 0.995) {
            if (other.state === "angry" && one.can("hurt")) {
              //  console.log("can hurt!")
                one.hurt();
            } 
        
        }

        if (p.random() > 0.995) {
            if (one.can("angry")) {
              //  console.log("can hurt!")
                one.angry();
            } 
        }

        if (one.state === "hurt" && other.state !== "angry") {
            if (p.random > 0.9) {
                one.neutral();
            }
        }

        if (other.state == "hurt" && p.random() > 0.9) {
            one.neutral();
        }

    }


    osc = new p5.SinOsc();

    envelope = new p5.Env();
    envelope.setADSR(0.1, 0.3, 0.3, 0.5);
    osc.start();
    osc.freq(200)
    osc.amp(envelope)
    // set attackLevel, releaseLevel
    envelope.setRange(1, 0);

    p.draw = () => 
    {
        basic.draw();

        let ligthDim = basic.getSetting("light dim")

        light -= ligthDim
        light = p.max(0, light)

        p.fill(basic._primary)
        p.textFont(font)

        p.fill(light)

        
        p.rect(0, 0, p.width/2, p.height)
      
        updateStateMachine(sm_a, sm_b)
        updateStateMachine(sm_b, sm_a)
        
        p.fill(p.abs(255 - light))

        p.text(sm_a.state, p.width / 4 * 1, p.height / 2)
        p.text(sm_b.state, p.width / 4 * 3, p.height / 2)

        if (sm_a_word) {


            let l = 15 + sm_a_word.length;
            let s = "|   " + sm_a_word.substring(0, sm_a_word_index + 1) + " ".repeat( l - sm_a_word_index - 10) + "|"
            let tt = 20

            p.text("÷" + "-". repeat(l - 6) + "÷",                                      p.width / 4 * 1 - 50, p.height / 2 - 6 * tt - 40)
            p.text("|" + " ".repeat(l - 6) + "|",                                       p.width / 4 * 1 - 50, p.height / 2 - 5 * tt - 40)
            p.text(s,                                                                   p.width / 4 * 1 - 50, p.height / 2 - 4 * tt - 40)
            p.text("|" + " ".repeat(l - 6) + "|",                                       p.width / 4 * 1 - 50, p.height / 2 - 3 * tt - 40)
            p.text("÷" + "-". repeat(l - 6) + "÷",                                      p.width / 4 * 1 - 50, p.height / 2 - 2 * tt - 40)
            p.text("  V ",                                                              p.width / 4 * 1 - 50, p.height / 2 - tt - 40)

           // p.text(sm_a_word.substring(0, sm_a_word_index + 1), p.width / 4 * 1, p.height / 2 - 30)
        }
    }

    p.setup = () => 
    { 
        basic.setup() 

        basic.addSettingsRandomize()

        basic.addSetting("speak chance", "range", 0.01, 0.001, 0.1, 0.001, true);
       
        basic.addSetting("light dim", "range", 25, 0, 50, 0.1)

        basic.addSetting("slow down", "range", 0, 0, 200, 1)

        basic.addSetting("base pitch", "range", 200, 30, 2000, 1)
        basic.addSetting("pitch change", "range", 1.01, 1, 2, 0.01)
        basic.addSetting("length multiplier", "range", 1.01, 1, 2, 0.01)
        basic.addSetting("oscillator", "dropdown", ["sine", "square", "triangle", "saw", "noise", "pwm"], null, null, null, true, (setting) => { 

            switch(setting.value) {
                case "sine": 
                    osc.stop();
                    osc = new p5.SinOsc(); 
                    osc.amp(envelope)
                    setupEffects();
                    osc.start()
                    break;
                case "square": 
                    osc.stop();
                    osc = new p5.SqrOsc(); 
                    osc.amp(envelope)
                    setupEffects();
                    osc.start()
                    break;
                case "triangle": 
                    osc.stop();
                    osc = new p5.TriOsc(); 
                    osc.amp(envelope)
                    setupEffects();
                    osc.start()
                    break;
                case "saw": 
                    osc.stop();
                    osc = new p5.SawOsc(); 
                    osc.amp(envelope)
            setupEffects();
                    osc.start()
                    break;
                case "noise": 
                    osc.stop();
                    osc = new p5.Noise(); 
                    osc.amp(envelope)
                    setupEffects();
                    osc.start()
                    break;
                case "pwm": 
                    osc.stop();
                    osc = new p5.Pulse(); 
                    osc.amp(envelope)
                    setupEffects();
                    osc.start()
                    break;
            }


        });

        basic.addSetting("A", "range", 0.01, 0.001, 0.2, 0.001, true);
        basic.addSetting("D", "range", 0.01, 0.001, 0.2, 0.001, true);
        basic.addSetting("S", "range", 0.01, 0.001, 0.2, 0.001, true);
        basic.addSetting("R", "range", 0.01, 0.001, 0.2, 0.001, true);

        basic.addSetting("Ramp between fqs", "range", 0.0, 0.0, 1, 0.001, true);

        basic.addSetting("use filter", "boolean", false, null, null, null, true, setupEffects);
        basic.addSetting("filter type", "dropdown", ["lowpass", "highpass", "bandpass"], null, null, null, true, setupEffects);
        basic.addSetting("filter freq", "range", 200, 30, 2000, 1, true)
        basic.addSetting("filter R", "range", 1, 0, 50, 1, true)

        basic.addSetting("use delay", "boolean", false, null, null, null, true, setupEffects);
        basic.addSetting("delay time", "range", 0, 0, 1, 0.001, true)
        basic.addSetting("delay feedback", "range", 0, 0, 1, 0.001, true)
        basic.addSetting("delay freq", "range", 0, 0, 1000, 0.001, true)

        basic.addSetting("use distortion", "boolean", false, null, null, null, true, setupEffects);
        basic.addSetting("distortion amount", "range", 0, 0, 1, 0.001, true, setupEffects)

        basic.addSetting("use reverb", "boolean", false, null, null, null, true, setupEffects);
        basic.addSetting("reverb time", "range", 0, 0, 10, 0.001, true, setupEffects)
        basic.addSetting("reverb decay", "range", 0, 0, 100, 1, true, setupEffects)
        basic.addSetting("reverb dry/wet", "range", 0, 0, 1, 0.001, true, setupEffects)
        
        //basic.randomize(["slow down", "base pitch", "pitch change", "length multiplier", "oscillator" ])

    }
}

basic.createLink("s9", "FSM")


