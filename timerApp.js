const durationInput = document.querySelector("#duration");

const circle = document.querySelector("circle");
const circlePerimeter = circle.getAttribute("r") * 2 * Math.PI;
circle.setAttribute("stroke-dasharray", circlePerimeter);
let duration;

const timer = new Timer(durationInput, document.querySelector("#start"), document.querySelector("#pause"),document.querySelector("#rounds"),document.querySelector("#rest"),document.querySelector("#convertedTime"), { 
    onStart(totalDuration, resting) { 
        duration = totalDuration;
        if(!resting){
            const audio = new Audio('start.ogg');
        audio.play();
        }


     },
    onTick(timeRemaining) { 
        circle.setAttribute("stroke-dashoffset", 
        circlePerimeter * timeRemaining / duration - circlePerimeter);

    },
    onComplete() { 
        const audio = new Audio('buzzer.ogg');
        audio.play();
     }
});


document.querySelector("#blackbelt").addEventListener("click", function (){durationInput.value = 600;});
document.querySelector("#brownbelt").addEventListener("click", function (){durationInput.value = 480;});
document.querySelector("#purplebelt").addEventListener("click", function (){durationInput.value = 420;});
document.querySelector("#bluebelt").addEventListener("click", function (){durationInput.value = 360;});
document.querySelector("#whitebelt").addEventListener("click", function (){durationInput.value = 300;});

