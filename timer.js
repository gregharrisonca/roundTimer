class Timer{
    constructor(durationInput, startButton, pauseButton, rounds,  nextRoundTime, convertedTime, callbacks){
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        this.rounds = rounds;
        this.nextRoundTime = nextRoundTime;
        this.convertedTime = convertedTime;
        this.resting = false;
        if(callbacks){
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }
        

        this.startButton.addEventListener("click", this.start);
        this.pauseButton.addEventListener("click", this.pause);
    }
    
    
    start = () => {
        if(this.onStart){
            this.onStart(this.durationInput.value, this.resting);
        }
            this.roundTime = this.durationInput.value;

            this.startButton.style.display = "none";
            this.pauseButton.style.display = "block";
            this.durationInput.style.display = "none";
            this.convertedTime.style.display = "block";

            this.tick();
            this.interval = setInterval(this.tick, 50);
        
    }

    pause = () =>{
        clearInterval(this.interval);
        this.startButton.style.display = "block";
        this.pauseButton.style.display = "none";
        this.durationInput.style.display = "block";
        this.convertedTime.style.display = "none";
    }

    tick = () => {
        if(this.durationInput.value > 0 && this.durationInput.value != null){
            
            this.timeRemaining = this.durationInput.value - .05;
            this.durationInput.value = this.timeRemaining.toFixed(2);
            let styledTime = this.fancyTime(this.timeRemaining);
            this.convertedTime.innerHTML = styledTime;



            if(this.onTick){
                this.onTick(this.durationInput.value);
            }
        }else{

            this.pause();
            
            if(!this.resting){
                this.resting = true;
                if(this.onComplete){
                    this.onComplete();
                }
                this.rounds.value -= 1;
                if(this.rounds.value > 0 && this.rounds.value != null){
                    
                    this.durationInput.value = this.nextRoundTime.value;
                    this.nextRoundTime.value = this.roundTime;
                    this.start();
                }
                

            }else{
                this.resting = false;
                if(this.rounds.value > 0 && this.rounds.value != null){
                    this.durationInput.value = this.nextRoundTime.value;
                    this.nextRoundTime.value = this.roundTime;
                    this.start();
                }
                
            }
        }
    }

    // Fancy Timer
    fancyTime = (duration) => {
        // Hours, minutes and seconds
        var hrs = ~~(duration / 3600);
        var mins = ~~((duration % 3600) / 60);
        var secs = ~~duration % 60;

        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }


}

