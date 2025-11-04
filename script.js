document.addEventListener("DOMContentLoaded", function(){
const IO = new AdafruitIO("is4646", "secret key");
    // target the div which as the blur effect
    const blur = document.getElementById("sun-blur");

    // Before the Adafruit Version, I created a local version with a slider. 
    // I target slider to make the blur move. You change it to the adafruit value
    //const slider = document.getElementById("moveBlur");
   // slider.addEventListener("input", function(event){
    //    let value = parseFloat(event.target.value); // slider value
    //    blur.style.marginTop = `-${value}px`;       // update blur effect position

    //    console.log(value); // debug
   // });

    /*  
        setInterval is a way to execute code every X milliseconds
        doc: https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval
    */
    setInterval(function(){
        // here we can use AdafruitIO library to get data. 
        // then, we can modify the blur position (up or down)
        // blur.style.marginTop = `-${value}px`;

        IO.getData("airquality", function(data) {
            console.log(data.feed, data.json[0].value);
            
            // we need to parse 
            let currentData = data.json[0].value.split(",");
            console.log(currentData);

            const tempDisplay = document.getElementById("temp-display");
            tempDisplay.innerHTML = currentData[0].split(".")[0];

            const humiDisplay = document.getElementById("humi-display");
            humiDisplay.innerHTML = currentData[2].split(".")[0];

            const co2Display = document.getElementById("co2-display");
            co2Display.innerHTML = currentData[3].split(".")[0];

            const pressDisplay = document.getElementById("press-display");
            pressDisplay.innerHTML = currentData[1].split(".")[0];

            const poorDisplay = document.getElementById("poor-display");
            poorDisplay.innerHTML = currentData[2].split(".")[0];

            const perfDisplay  = document.getElementById("perf-display");

            const poor = parseFloat(currentData[2]);
            const perfect = Math.max(0, Math.min(100, 100 - poor));
            perfDisplay.textContent = Math.round(perfect);
            poorDisplay.textContent = Math.round(poor);


            // update sun illustration
            blur.style.marginTop = `-${currentData[2].split(".")[0]}px`;
        });

        
    }, 3000);
});
