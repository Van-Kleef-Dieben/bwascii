s9 = (p) =>
{

    let words = [
        '.--...-.-.',
        '.--',
        '.---',
        '.--.-..',
        '--.-.-.'

    ]

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

        
        if (!sm_a_word) {
            return;
        }
        console.log("asdf")

        if (sm_a_timestamp === null) {

            if (sm_a_word_index === null) {
                sm_a_word_index = 0
            } else {
                sm_a_word_index++;
            }

            console.log(sm_a_word, sm_a_word_index)

            if (sm_a_word_index < sm_a_word.length - 1) {

                
                let f = sm_a_word[sm_a_word_index]
                let d;
                if (f === '.') {
                    osc.freq(200)
                    d = 50
                    envelope.setADSR(0.2, d / 1000, 0.3, 0.5);
                    
                   
                }

                if (f === '-') {
                    d = 150
                    osc.freq(300)
                    envelope.setADSR(0.2, d/ 1000, 0.3, 0.5);
                    
                }

                sm_a_timestamp = new Date().getTime() + d

              //  osc.start();
                envelope.play()
            } else {
                sm_a_word_index = null
                sm_a_word = null
               // osc.stop();
            }

            return;

        }

        if (sm_a_timestamp < new Date().getTime()) {
            sm_a_timestamp = null;
                        
        }


    }

    function updateStateMachine(one, other) {

        updateWord()

        // if (!sm_a_word) [
        //     sm_a_word = p.
        // ]

        if (one.is('angry')) {
            if (!sm_a_word) {
                if (p.random() > 0.95)
                sm_a_word = p.random(words)
            }
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

    basic.p = p

    osc = new p5.SinOsc();

    

    envelope = new p5.Env();
    envelope.setADSR(0.1, 0.3, 0.3, 0.5);

    osc.start();
    // osc.stop();
    
    osc.freq(200)
    osc.amp(envelope)
    //envelope.play(osc, 0, 0.1)

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

        // switch(fsm.state) {


        //     case "solid": p.text("solid", 10, 10)
        //     case "solid": p.text("solid", 10, 10)
        // }
        
    }

    p.setup = () => 
    { 
        basic.setup() 
    }
}

basic.createLink("s9", "FSM")

