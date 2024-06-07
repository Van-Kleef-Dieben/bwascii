s11 = (p) => { 


  
    basic.p = p

    p.draw = () =>  {



    }

    p.setup = () => 
    { 

        let position; 

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((p) => { 
                position = p 
                console.log(p.coords.latitude, p.coords.longitude)
                let times = SunCalc.getTimes(new Date(), p.coords.latitude, p.coords.longitude);
                let sunrise = times.sunrise.getTime()
                let sunset = times.sunset.getTime()
                console.log(times.sunrise)
                console.log(times.sunset)

                let f = new Date().getTime()
                console.log((f - sunrise) / 1000 / 60 / 60) 
                console.log((sunset - sunrise) / 1000 / 60 / 60)
                console.log()
            
            }, () => { console.log('error') });
        }

        // let times = SunCalc.getTimes(new Date(), 51.5, -0.1);
        // console.log(times)
        // basic.setup()
        p.fill("white")
        p.text("asdfasdf", 20, 20)

    }


}

basic.createLink("s11", "SunCalc")
