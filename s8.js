s8 = (p) =>
{
    basic.p = p

    function draw () 
    {
        basic.draw();
        basic.clearGrid();

        let cs = basic.getSetting("ASCII")
        let chars = basic.randomString(p.random(5) | 0 + 1, cs)
        let c = p.random() > 0.5;
        let fillz = basic._primary


        let mode = basic.getSetting("mode")
        let size = basic.getSetting("size")
        let char_mode = basic.getSetting("char mode")
       console.log(size)
        let f = p.random(3) | 0
        let s = 0;

            switch(mode) {

                default: 

                    s = 0;

                    for (let j = 0; j < sizeY; j++) {
                       
                        let f = p.random(4) | 0 + 1
                        s++
                       
                        if (c) {
                            fillz = j % 2 === 0 ? "red" : basic._primary
                        }

                        for (let i = 0; i < sizeX; i++) {
                            switch(char_mode) {
                                case "modulo_X": basic.dot(i, j, basic.getchar(cs, i % cs.length), fillz); break;
                                case "modulo_Y": basic.dot(i, j, basic.getchar(cs, j % cs.length), fillz); break;
                                case "modulo_XY": basic.dot(i, j, basic.getchar(cs, (i + j) % cs.length), fillz); break;
                                case "modulo_i": basic.dot(i, j, basic.getchar(cs, s % cs.length), fillz); break;
                                default: basic.dot(i, j, basic.getchar(cs, s % cs.length)); break;
                            }
                        }
                    }

                    break;

                case "diamond":

                    s = 0;

                    for (let j = 0; j < sizeY; j++) {

                        if (c) {
                            fillz = j % 2 === 0 ? "red" : basic._primary
                        }

                        for (let i = 0; i < sizeX; i++) {

                            s++

                            if ((((i + j) % size) | 0) === 0 || (((i - j ) % size) | 0) === 0) {
                                switch(char_mode) {
                                    case "modulo_X": basic.dot(i, j, basic.getchar(cs, i % cs.length), fillz); break;
                                    case "modulo_Y": basic.dot(i, j, basic.getchar(cs, j % cs.length), fillz); break;
                                    case "modulo_XY": basic.dot(i, j, basic.getchar(cs, (i + j) % cs.length), fillz); break;
                                    case "modulo_i": basic.dot(i, j, basic.getchar(cs, s % cs.length), fillz); break;
                                    default: basic.dot(i, j, "."); break;
                                }
                            }
                        }
                    }

                    break;

                case "square":

                    // let square_size = (p.random(10) | 0) + 2
                    s = 0;
                   
                    for (let j = 0; j < sizeY; j++) {

                        if (c) {
                            fillz = j % 2 === 0 ? "red" : basic._primary
                        }

                        for (let i = 0; i < sizeX; i++) {

                            s++;

                            if (((i % size)  | 0)=== 0 || ((j % size) | 0) === 0) {
                                switch(char_mode) {
                                    case "modulo_X": basic.dot(i, j, basic.getchar(cs, i % cs.length), fillz); break;
                                    case "modulo_Y": basic.dot(i, j, basic.getchar(cs, j % cs.length), fillz); break;
                                    case "modulo_XY": basic.dot(i, j, basic.getchar(cs, (i + j) % cs.length), fillz); break;
                                    case "modulo_i": basic.dot(i, j, basic.getchar(cs, s % cs.length), fillz); break;
                                    default: basic.dot(i, j, "."); break;
                                }
                            }
                        }
                    }

                    break;

                case "circle":

                    // let square_size = (p.random(10) | 0) + 2
                    s = 0;
                   
                    for (let j = 0; j < sizeY; j++) {

                        if (c) {
                            fillz = j % 2 === 0 ? "red" : basic._primary
                        }

                        for (let i = 0; i < sizeX; i++) {

                            s++;

                            let _i =  (i % (2 * size)) - size;
                            let _j =  (j % (2 * size)) - size;


                            if (p.abs(_i * _i + _j * _j  - size * size) <= 10) {
                                switch(char_mode) {
                                    case "modulo_X": basic.dot(i, j, basic.getchar(cs, i % cs.length), fillz); break;
                                    case "modulo_Y": basic.dot(i, j, basic.getchar(cs, j % cs.length), fillz); break;
                                    case "modulo_XY": basic.dot(i, j, basic.getchar(cs, (i + j) % cs.length), fillz); break;
                                    case "modulo_i": basic.dot(i, j, basic.getchar(cs, s % cs.length), fillz); break;
                                    default: basic.dot(i, j, "."); break;
                                }
                            }
                        }
                    }

                    break;

                    

        }

        basic.drawGrid();
        
    }

    

    p.setup = () => 
    { 
        basic.setup() 

       // basic.addSettingsRandomize(draw);

        basic.onSettingsChanged(draw)

        basic.addSettingsRandomize((settings) => { 

            // console.log(basic.getSetting("ASCII potential"))
            if (basic.getSetting("ASCII potential") !== "") {
                basic.setSetting("ASCII", basic.randomString(p.max(1, p.random(20) | 0), basic.getSetting("ASCII potential")))
            }

            //palette = basic.randomPalette();
            draw();

            
           
        });

        basic.addSetting("size", "range", 4, 2, 20, 0.1, true)
        basic.addSetting("mode", "dropdown", ["none", "square", "diamond", "circle"], null, null, null, true);
        basic.addSetting("char mode", "dropdown", ["none", "modulo_X", "modulo_Y", "modulo_XY", "modulo_i"], null, null, null, true);


        basic.addSetting("ASCII", "text", "Van Kleef - Dieben");
        basic.addSetting("ASCII potential", "text", "Van Kleef - Dieben");

        draw();
    }
}

basic.createLink("s8", "Typewriter")

