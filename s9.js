s9 = (p) =>
{

    
    basic.p = p

    let osc;

    let words = [
        '.--...-.-.',
        '.--',
        '.---',
        '.--.-..',
        '--.-.-.'

    ]

    let filter = new p5.LowPass();
    let delay = new p5.Delay();
    let useDelay;
    let useFilter;

    let sm_a_word = null
    let sm_a_timestamp = null
    let sm_a_word_index = null

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

    function updateWord() {

        let slowdown = basic.getSetting("slow down");
        let oscillator = basic.getSetting("oscillator")

        let basePitch = basic.getSetting("base pitch")
        let pitchMultiplier = basic.getSetting("pitch change")
        let lengthMultiplier = basic.getSetting("length multiplier")
        let rampTime = basic.getSetting("Ramp between fqs");

        if (useFilter !== basic.getSetting("use filter")) {
            useFilter = basic.getSetting("use filter");
            filter.toggle();
        }

        // if (useDelay !== basic.getSetting("use delay")) {
        //     useDelay = basic.getSetting("use delay")
        // }

        let useDelay = basic.getSetting("use delay")

        let filterFrequency = basic.getSetting("filter freq")
        let filterR = basic.getSetting("filter R")

        let delayTime = basic.getSetting("delay time")
        let delayFeedback = basic.getSetting("delay feedback")
        let delayFreq = basic.getSetting("delay freq")

        filter.freq(filterFrequency)
        filter.res(filterR);

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

                delay.process(osc, delayTime, delayFeedback, delayFreq)

                if (useDelay) {
                    delay.connect()
                    
                }  else {
                    delay.disconnect()
                }

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
    osc.connect(filter)
    osc.start();
    osc.freq(200)
    osc.amp(envelope)
    // set attackLevel, releaseLevel
    envelope.setRange(1, 0);

    p.draw = () => 
    {
        basic.draw();

        p.fill(basic._primary)
        p.textFont(font)

      
        updateStateMachine(sm_a, sm_b)
        updateStateMachine(sm_b, sm_a)
        
        p.text(sm_a.state, p.width / 4 * 1, p.height / 2)
        p.text(sm_b.state, p.width / 4 * 3, p.height / 2)

        if (sm_a_word) {


            let l = 15 + sm_a_word.length;
            let s = "|   " + sm_a_word.substring(0, sm_a_word_index + 1) + " ".repeat( l - sm_a_word_index - 10) + "|"
            let tt = 20

            p.text("÷" + "-". repeat(l - 6) + "÷", p.width / 4 * 1, p.height / 2 - 6 * tt - 40)
            p.text("|" + " ".repeat(l - 6) + "|", p.width / 4 * 1, p.height / 2 - 5 * tt - 40)
            p.text(s, p.width / 4 * 1, p.height / 2 - 4 * tt - 40)
            p.text("|" + " ".repeat(l - 6) + "|", p.width / 4 * 1, p.height / 2 - 3 * tt - 40)
            p.text("÷" + "-". repeat(l - 6) + "÷", p.width / 4 * 1, p.height / 2 - 2 * tt - 40)
            p.text("  V ", p.width / 4 * 1, p.height / 2 - tt - 40)

           // p.text(sm_a_word.substring(0, sm_a_word_index + 1), p.width / 4 * 1, p.height / 2 - 30)
        }
    }

    p.setup = () => 
    { 
        basic.setup() 

        basic.addSettingsRandomize()

        basic.addSetting("speak chance", "range", 0.01, 0.001, 0.1, 0.001, true);
       
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
                    osc.connect(filter)
                    osc.start()
                    break;
                case "square": 
                    osc.stop();
                    osc = new p5.SqrOsc(); 
                    osc.amp(envelope)
                    osc.connect(filter)
                    osc.start()
                    break;
                case "triangle": 
                    osc.stop();
                    osc = new p5.TriOsc(); 
                    osc.amp(envelope)
                    osc.connect(filter)
                    osc.start()
                    break;
                case "saw": 
                    osc.stop();
                    osc = new p5.SawOsc(); 
                    osc.amp(envelope)
                    osc.connect(filter)
                    osc.start()
                    break;
                case "noise": 
                    osc.stop();
                    osc = new p5.Noise(); 
                    osc.amp(envelope)
                    osc.connect(filter)
                    osc.start()
                    break;
                case "pwm": 
                    osc.stop();
                    osc = new p5.Pulse(); 
                    osc.amp(envelope)
                    osc.connect(filter)
                    osc.start()
                    break;
            }


        });

        basic.addSetting("A", "range", 0.01, 0.001, 0.2, 0.001, true);
        basic.addSetting("D", "range", 0.01, 0.001, 0.2, 0.001, true);
        basic.addSetting("S", "range", 0.01, 0.001, 0.2, 0.001, true);
        basic.addSetting("R", "range", 0.01, 0.001, 0.2, 0.001, true);

        basic.addSetting("Ramp between fqs", "range", 0.0, 0.0, 1, 0.001, true);

        basic.addSetting("use filter", "boolean", false);
        basic.addSetting("filter freq", "range", 200, 30, 2000, 1, true)
        basic.addSetting("filter R", "range", 1, 0, 50, 1, true)

        basic.addSetting("use delay", "boolean", false)
        basic.addSetting("delay time", "range", 0, 0, 1, 0.001, true)
        basic.addSetting("delay feedback", "range", 0, 0, 1, 0.001, true)
        basic.addSetting("delay freq", "range", 0, 0, 1000, 0.001, true)
        
        basic.randomize(["slow down", "base pitch", "pitch change", "length multiplier", "oscillator" ])

    }
}

basic.createLink("s9", "FSM")


